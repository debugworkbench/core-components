// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TODO: Move this into its own package

import { IDebugConfigElement, IDebugConfig, IDebugSession, IDebugEngine } from './debug-engine';
import { IDebugEngineProvider } from './debug-engine-provider';
import DebugConfigElement from '../debug-configuration/debug-configuration';

interface IGdbMiDebugConfig extends IDebugConfig {
  debuggerType?: string;
  debuggerPath?: string;
}

class GdbMiDebugSession implements IDebugSession {
  end(): Promise<void> {
    return Promise.resolve();
  }
}

// custom type guard function for IGdbMiDebugConfig
function isGdbMiDebugConfig(config: IDebugConfig): config is IGdbMiDebugConfig {
  return config.engine === 'gdb-mi';
}

class GdbMiDebugEngine implements IDebugEngine {
  get name(): string {
    return 'gdb-mi';
  }
    
  createConfig(configName: string): IDebugConfig {
    return <IGdbMiDebugConfig> {
      name: configName,
      engine: this.name
    };
  }
  
  cloneConfig(config: IDebugConfig): IDebugConfig {
    if (isGdbMiDebugConfig(config)) {
      return <IGdbMiDebugConfig> {
        name: config.name,
        engine: config.engine,
        debuggerType: config.debuggerType,
        debuggerPath: config.debuggerPath
      };
    } else {
      throw new Error(`Debug engine ${this.name} can't clone debug config for engine ${config.engine}.`);
    }
  }
  
  createConfigElement(config: IDebugConfig): Promise<IDebugConfigElement> {
    return DebugConfigElement.create(config);
  }
  
  startDebugSession(config: IDebugConfig): Promise<IDebugSession> {
    return Promise.resolve(new GdbMiDebugSession());
  }
}

export class GdbMiDebugEngineProvider implements IDebugEngineProvider {
  get engineName(): string {
    return 'gdb-mi';
  }
  
  createEngine(): IDebugEngine {
    return new GdbMiDebugEngine();
  }
}
