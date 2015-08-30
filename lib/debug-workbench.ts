// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IDebugConfig, IDebugEngine } from './debug-engine';
import { GdbMiDebugEngine } from './gdb-mi-debug-engine';

var debugEngine: IDebugEngine;

export function getDebugConfig(configName: string): Promise<IDebugConfig> {
  return Promise.resolve({ name: 'Launch', engine: 'gdb-mi' });
}

export function getDebugEngine(engine: string): IDebugEngine {
  if (!debugEngine) {
    debugEngine = new GdbMiDebugEngine();
  }
  return debugEngine;
}
