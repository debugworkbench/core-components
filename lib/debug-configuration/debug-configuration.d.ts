import { IDebugConfigElementBehavior, IDebugConfig } from '../debug-engine';
import { Disposable } from 'event-kit';
/**
 * Base behavior of the DebugConfigurationElement.
 */
export default class DebugConfigurationElement implements IDebugConfigElementBehavior {
    private debugConfig;
    private emitter;
    static create(debugConfig: IDebugConfig): Promise<IDebugConfigurationElement>;
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
export interface IDebugConfigurationElement extends DebugConfigurationElement, HTMLElement {
}
export declare function register(): typeof DebugConfigurationElement;
