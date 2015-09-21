import { Disposable } from 'event-kit';
import { IDebugConfig } from 'debug-engine';
export interface IDebugConfigElementBehavior {
    onOpened(callback: () => void): Disposable;
    onClosed(callback: (closingReason: PolymerElements.IClosingReason) => void): Disposable;
    open(): void;
    close(): void;
    destroy(): void;
}
export interface IDebugConfigElement extends IDebugConfigElementBehavior, HTMLElement {
}
export declare function createElement(debugConfig: IDebugConfig): Promise<IDebugConfigElement>;
