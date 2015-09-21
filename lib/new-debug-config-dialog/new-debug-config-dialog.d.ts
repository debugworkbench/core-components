import { Disposable } from 'event-kit';
import { IDebugConfig } from 'debug-engine';
/**
 * A simple dialog that lets the user enter the name for a new debug config and select
 * the debug engine the new config will be used with.
 */
export default class NewDebugConfigDialogElement {
    private emitter;
    static create(): Promise<INewDebugConfigDialogElement>;
    created(): void;
    destroy(): void;
    private onIronOverlayOpened(e);
    private onIronOverlayClosed(e);
    /** Add a function to be called when the dialog is opened. */
    onOpened(callback: () => void): Disposable;
    /** Add a function to be called when the dialog is closed. */
    onClosed(callback: (debugConfig: IDebugConfig) => void): Disposable;
    open(): void;
    close(): void;
}
export interface INewDebugConfigDialogElement extends NewDebugConfigDialogElement, HTMLElement {
}
export declare function register(): typeof NewDebugConfigDialogElement;
