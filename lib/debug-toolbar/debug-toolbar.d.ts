import { Disposable } from 'event-kit';
export default class DebugToolbarElement {
    private subscriptions;
    private debugSession;
    private debugConfigs;
    static create(): Promise<IDebugToolbarElement>;
    /** Add a listener to be called when the Start button is pressed. */
    onStartButtonPressed(callback: EventListener): Disposable;
    /** Add a listener to be called when the Stop button is pressed. */
    onStopButtonPressed(callback: EventListener): Disposable;
    /** Add a listener to be called when the Settings button is pressed. */
    onSettingsButtonPressed(callback: EventListener): Disposable;
    created(): void;
    ready(): void;
    destroy(): void;
    private startDebugging();
    private stopDebugging();
    private openSettings();
    private willSelectDebugConfig(e);
    private didSelectDebugConfig();
}
export interface IDebugToolbarElement extends DebugToolbarElement, HTMLElement {
}
export declare function register(): typeof DebugToolbarElement;
