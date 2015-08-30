// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TODO: Move this into its own package

import { IDebugConfig, IDebugSession, IDebugEngine } from './debug-engine';

interface IGdbMiDebugConfig extends IDebugConfig {
  debuggerType?: string;
  debuggerPath?: string;
}

class GdbMiDebugSession implements IDebugSession {
  end(): Promise<void> {
    return Promise.resolve();
  }
}

export class GdbMiDebugEngine implements IDebugEngine {
  name: string = 'gdb-mi';
    
  startDebugSession(config: IDebugConfig): Promise<IDebugSession> {
    return Promise.resolve(new GdbMiDebugSession());
  }
}
