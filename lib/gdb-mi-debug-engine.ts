// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TODO: Move this into its own package

import { IDebugConfigElement, IDebugConfig, IDebugSession, IDebugEngine } from './debug-engine';
import { IDebugEngineProvider } from './debug-engine-provider';
import DebugConfigElement from '../debug-configuration/debug-configuration';

class GdbMiDebugConfig implements IDebugConfig {
  debuggerType: string;
  debuggerPath: string;
  
  constructor(public name: string, public engine: string) {
  }
  
  createElement(): Promise<IDebugConfigElement> {
    return DebugConfigElement.create(this);
  }
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
    return new GdbMiDebugConfig(configName, this.name);
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
