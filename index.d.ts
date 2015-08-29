//
// Auto-generated by dts-generator (https://github.com/enlight/dts-generator/)
//


declare module 'debug-workbench-core-components/debug-configuration/debug-configuration' {
	/**
	 * Base behavior of the DebugConfigurationElement.
	 */
	export class DebugConfigurationElement {
	    /** The returned object will only be valid after the element has been upgraded to a custom element. */
	    base: polymer.Base;
	    open(): void;
	    close(): void;
	}
	export function register(): typeof DebugConfigurationElement;

}

declare module 'debug-workbench-core-components/lib/disposable-dom-event-listener' {
	import { Disposable } from 'event-kit';
	/**
	 * Add an event listener to a DOM node.
	 *
	 * @return An object that upon being disposed will remove the event listener from the node it was
	 *         originally added to.
	 */
	export default function add(node: HTMLElement, eventName: string, callback: EventListener): Disposable;

}

declare module 'debug-workbench-core-components/debug-toolbar/debug-toolbar' {
	import { Disposable } from 'event-kit';
	export class DebugToolbarElement {
	    /** Add a listener to be called when the Start button is pressed. */
	    onStartButtonPressed(callback: EventListener): Disposable;
	    /** Add a listener to be called when the Stop button is pressed. */
	    onStopButtonPressed(callback: EventListener): Disposable;
	    /** Add a listener to be called when the Settings button is pressed. */
	    onSettingsButtonPressed(callback: EventListener): Disposable;
	    private startDebugging();
	    private stopDebugging();
	    private openSettings();
	}
	export function register(): typeof DebugToolbarElement;

}

declare module 'debug-workbench-core-components/file-input/file-input' {
	export class FileInputElement {
	    /** The returned object will only be valid after the element has been upgraded to a custom element. */
	    base: polymer.Base;
	    inputLabel: string;
	    filePath: string;
	    openBrowseDialog(): void;
	}
	export function register(): typeof FileInputElement;

}

declare module 'debug-workbench-core-components/register-element/register-element' {
	/** Custom element that loads and registers a custom element from a CommonJS module. */
	export class RegisterElementElement {
	    /** The returned object will only be valid after the element has been upgraded to a custom element. */
	    base: polymer.Base;
	    path: string;
	    ready(): void;
	}
	export function register(): typeof RegisterElementElement;

}
