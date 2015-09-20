import { IDebugConfig } from '../debug-engine';
import { IDebugConfigElementBehavior } from '../debug-config-element-factory';
import { Disposable } from 'event-kit';
/**
 * An element that lets the user edit a debug configuration for the gdb-mi debug engine.
 */
export default class GdbMiDebugConfigElement implements IDebugConfigElementBehavior {
    private emitter;
    private debugConfig;
    static create(debugConfig: IDebugConfig): Promise<IGdbMiDebugConfigElement>;
    created(): void;
    destroy(): void;
    /** Called after ready() with arguments passed to the element constructor function. */
    factoryImpl(debugConfig: IDebugConfig): void;
    private onIronOverlayOpened(e);
    private onIronOverlayClosed(e);
    /** Add a function to be called when the dialog is opened. */
    onOpened(callback: () => void): Disposable;
    /** Add a function to be called when the dialog is closed. */
    onClosed(callback: (closingReason: PolymerElements.IClosingReason) => void): Disposable;
    open(): void;
    close(): void;
}
export interface IGdbMiDebugConfigElement extends GdbMiDebugConfigElement, HTMLElement {
}
export declare function register(): typeof GdbMiDebugConfigElement;
