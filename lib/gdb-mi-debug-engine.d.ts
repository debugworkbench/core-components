import { IDebugEngine } from './debug-engine';
import { IDebugEngineProvider } from './debug-engine-provider';
export declare class GdbMiDebugEngineProvider implements IDebugEngineProvider {
    engineName: string;
    createEngine(): IDebugEngine;
}
