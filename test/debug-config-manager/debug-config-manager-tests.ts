// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

require('source-map-support').install();

import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import DebugConfigManager, { IDebugConfigLoader, DebugConfigFileLoader } from '../../lib/debug-config-manager';
import { IDebugConfig, IDebugEngine } from 'debug-engine';
import { GdbMiDebugEngineProvider } from 'gdb-mi-debug-engine';
import * as engineProvider from 'debug-engine';
import * as path from 'path';

chai.use(chaiAsPromised);
var expect = chai.expect;

class DebugConfigTestLoader implements IDebugConfigLoader {
  private configs: IDebugConfig[];

  canRead(): Promise<boolean> {
    return Promise.resolve(true);
  }

  read(): Promise<Array<IDebugConfig>> {
    return Promise.resolve(this.configs);
  }

  write(configs: IDebugConfig[]): Promise<void> {
    return Promise.resolve().then(() => {
      this.configs = configs;
    });
  }
}

class UnreadableConfigLoader extends DebugConfigTestLoader {
  canRead(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

describe("DebugConfigManager", () => {
  let inMemLoader: DebugConfigTestLoader;
  let debugEngine: IDebugEngine;

  before(() => {
    engineProvider.register(new GdbMiDebugEngineProvider());
    debugEngine = engineProvider.getEngine('gdb-mi');
  });

  beforeEach(() => {
    inMemLoader = new DebugConfigTestLoader();
  });

  after(() => {
    engineProvider.unregisterAll();
  });

  describe("#load", () => {
    it("loads nothing if the config file doesn't exist", () => {
      let manager: DebugConfigManager;
      return Promise.resolve().then(() => {
        const loader = new UnreadableConfigLoader();
        manager = new DebugConfigManager(loader);
        return manager.load();
      })
      .then(() => manager.getAll())
      .then((configs) => { expect(configs).to.have.lengthOf(0); });
    });

    it("loads a non-empty config file", () => {
      let manager: DebugConfigManager;
      return Promise.resolve().then(() => {
        const loader = new DebugConfigFileLoader(path.join(__dirname, 'data/load-config.json'));
        manager = new DebugConfigManager(loader);
        return manager.load();
      })
      .then(() => manager.getAll())
      .then((configs) => { expect(configs).to.have.lengthOf(3); });
    });
  }); // #load

  describe("#modify", () => {
    it("doesn't clone a new config", () => {
      const newConfig = debugEngine.createConfig('Config 1');
      const manager = new DebugConfigManager(inMemLoader);
      const configToModify = manager.modify(newConfig);
      expect(configToModify).to.equal(newConfig);
      expect(manager.getAll()).to.have.lengthOf(0);
    });

    it("does clone an existing config", () => {
      return Promise.resolve().then(() => {
        const config = debugEngine.createConfig('Config 1');
        const manager = new DebugConfigManager(inMemLoader);
        return manager.save(config)
        .then(() => {
          expect(manager.getAll()).to.have.lengthOf(1);
          const configToModify = manager.modify(config);
          expect(configToModify).not.to.equal(config);
          expect(manager.getAll()).to.have.lengthOf(1);
        });
      });
    });

    it("throws an error when given a config that is already being modified", () => {
      return Promise.resolve().then(() => {
        const config = debugEngine.createConfig('Config 1');
        const manager = new DebugConfigManager(inMemLoader);
        return manager.save(config)
        .then(() => {
          const configToModify = manager.modify(config);
          expect(manager.modify.bind(manager, config)).to.throw();
        });
      });
    });
  }); // #modify

  describe("#save", () => {
    it("saves a new config", () => {
      return Promise.resolve().then(() => {
        const newConfig = debugEngine.createConfig('Config 1');
        const manager = new DebugConfigManager(inMemLoader);
        expect(manager.getAll()).to.have.lengthOf(0);
        return manager.save(newConfig)
        .then(() => {
          expect(manager.getAll()).to.have.lengthOf(1);
          expect(manager.get(newConfig.name)).to.equal(newConfig);
        });
      });
    });

    it("saves a modified config", () => {
      return Promise.resolve().then(() => {
        const newConfig = debugEngine.createConfig('Config 1');
        const manager = new DebugConfigManager(inMemLoader);
        return manager.save(newConfig)
        .then(() => {
          const configToModify = manager.modify(newConfig);
          return manager.save(configToModify);
        })
        .then(() => {
          expect(manager.getAll()).to.have.lengthOf(1);
        });
      });
    });

    it("throws an error when given a new config that has already been saved", () => {
      return Promise.resolve().then(() => {
        const newConfig = debugEngine.createConfig('Config 1');
        const manager = new DebugConfigManager(inMemLoader);
        return manager.save(newConfig)
        .then(() => {
          return expect(manager.save(newConfig)).to.be.rejected;
        });
      });
    });

    it("throws an error when given a modified config that has already been saved", () => {
      return Promise.resolve().then(() => {
        const newConfig = debugEngine.createConfig('Config 1');
        const manager = new DebugConfigManager(inMemLoader);
        return manager.save(newConfig)
        .then(() => {
          const configToModify = manager.modify(newConfig);
          return manager.save(configToModify)
          .then(() => {
            return expect(manager.save(configToModify)).to.be.rejected;
          });
        });
      });
    });
  }); // #save
});
