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
