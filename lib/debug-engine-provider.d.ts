import { IDebugEngine } from './debug-engine';
export interface IDebugEngineProvider {
    engineName: string;
    createEngine(): IDebugEngine;
}
export declare function register(provider: IDebugEngineProvider): void;
export declare function unregisterAll(): void;
export declare function getEngine(engineName: string): IDebugEngine;
