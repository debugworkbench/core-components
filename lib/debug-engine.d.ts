export interface IDebugConfig {
    name: string;
    engine: string;
}
export interface IDebugSession {
    end(): Promise<void>;
}
export interface IDebugEngine {
    name: string;
    createConfig(configName: string): IDebugConfig;
    cloneConfig(config: IDebugConfig): IDebugConfig;
    startDebugSession(config: IDebugConfig): Promise<IDebugSession>;
}
