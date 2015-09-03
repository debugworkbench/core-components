// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TODO: Move this into its own package

import { IDebugConfigElement, IDebugConfig, IDebugSession, IDebugEngine } from './debug-engine';
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

export class GdbMiDebugEngine implements IDebugEngine {
  name: string = 'gdb-mi';
    
  createConfig(configName: string): IDebugConfig {
    return new GdbMiDebugConfig(configName, this.name);
  }
    
  startDebugSession(config: IDebugConfig): Promise<IDebugSession> {
    return Promise.resolve(new GdbMiDebugSession());
  }
}
