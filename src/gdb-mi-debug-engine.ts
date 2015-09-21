// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TODO: Move this into its own package

import { IDebugConfig, IDebugSession, IDebugEngine, IDebugEngineProvider } from 'debug-engine';
import { startDebugSession, DebuggerType } from 'dbgmits';

export interface IGdbMiDebugConfig extends IDebugConfig {
  debuggerType?: DebuggerType;
  debuggerPath?: string;
  executable?: string;
  executableArgs?: string;
  targetIsRemote?: boolean;
  host?: string;
  port?: number;
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
        debuggerPath: config.debuggerPath,
        executable: config.executable,
        executableArgs: config.executableArgs,
        targetIsRemote: config.targetIsRemote,
        host: config.host,
        port: config.port
      };
    } else {
      throw new Error(`Debug engine "${this.name}"" can't clone debug config for engine "${config.engine}".`);
    }
  }
  
  startDebugSession(config: IDebugConfig): Promise<IDebugSession> {
    const debugConfig = <IGdbMiDebugConfig> config;
    return Promise.resolve().then(() => {
      if (!isGdbMiDebugConfig(config)) {
        throw new Error(`Debug config "${config.name}" can't be used with engine "${config.engine}".`);
      }
      return startDebugSession(debugConfig.debuggerType, debugConfig.debuggerPath);
    })
    .then((debugSession) => {
      return debugSession.setExecutableFile(debugConfig.executable)
      .then(() => {
        if (debugConfig.executableArgs) {
          return debugSession.setInferiorArguments(debugConfig.executableArgs);
        }
      })
      .then(() => {
        if (debugConfig.targetIsRemote) {
          debugSession.connectToRemoteTarget(debugConfig.host, debugConfig.port)
        }
      })
      .then(() => { return debugSession });
    });
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
