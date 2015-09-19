import { IDebugConfig, IDebugEngine } from './debug-engine';
import { IDebugEngineProvider } from './debug-engine-provider';
import { DebuggerType } from 'dbgmits';
export interface IGdbMiDebugConfig extends IDebugConfig {
    debuggerType?: DebuggerType;
    debuggerPath?: string;
    executable?: string;
    executableArgs?: string;
    targetIsRemote?: boolean;
    host?: string;
    port?: number;
}
export declare class GdbMiDebugEngineProvider implements IDebugEngineProvider {
    engineName: string;
    createEngine(): IDebugEngine;
}
