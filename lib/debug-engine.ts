// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TODO: Move this into https://github.com/debugworkbench/debug-engine

export interface IDebugConfig {
  name: string;
  engine: string;
}

export interface IDebugSession {
  end(): Promise<void>;
}

export interface IDebugEngine {
  name: string;
  startDebugSession(config: IDebugConfig): Promise<IDebugSession>;
}
