// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

/// <reference path="../polymer/polymer.d.ts" />

declare namespace PolymerElements {
	/** Interface for CustomEvent.detail when CustomEvent.type is `iron-activate`. */
	interface IronActivateEventDetail {
		/** Identifier of the item that will be activated. */
  		selected: string;
		/** The item that will be activated. */
  		item: HTMLElement;
	}
	
	/**
	 * Custom event that's emitted by [[IronSelectableBehavior]] before an item is selected.
	 * To prevent an item from being selected call `preventDefault()` on the event.
	 */
	interface IronActivateEvent extends CustomEvent {
		detail: IronActivateEventDetail;
	}
}
