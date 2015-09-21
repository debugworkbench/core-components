import { IDebugConfig, IDebugEngine, IDebugEngineProvider } from 'debug-engine';
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
