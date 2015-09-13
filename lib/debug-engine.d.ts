import { Disposable } from 'event-kit';
export interface IDebugConfigElementBehavior {
    onOpened(callback: () => void): Disposable;
    onClosed(callback: (closingReason: PolymerElements.IClosingReason) => void): Disposable;
    open(): void;
    close(): void;
    destroy(): void;
}
export interface IDebugConfigElement extends IDebugConfigElementBehavior, HTMLElement {
}
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
    createConfigElement(config: IDebugConfig): Promise<IDebugConfigElement>;
    startDebugSession(config: IDebugConfig): Promise<IDebugSession>;
}
