// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

/// <reference path="../polymer/polymer.d.ts" />
/// <reference path="./iron-fit-behavior.d.ts" />
/// <reference path="./iron-resizable-behavior.d.ts" />

declare namespace PolymerElements {
    interface IronOverlayBackdrop extends polymer.Base {
        // Properties that can be bound to
        
        /** `true` if the backdrop is currently displayed. */
        opened: boolean;
        
        /** Append the backdrop to the document body. */
        prepare(): void;
        /** Display the backdrop (unless another is already displayed). */
        open(): void;
        /** Hide the backdrop. */
        close(): void;
        /** Remove the backdrop from the document body. */
        complete(): void;
    }
    
    interface IronOverlayBehaviorImpl {
        // Properties that can be bound to
        
        /** `true` if the overlay is currently displayed. */
        opened: boolean;
        /** `true` if the overlay was cancelled last time it was closed. */
        canceled: boolean;
        /** Set to `true` to display a backdrop behind the overlay, defaults to `false`. */
        withBackdrop: boolean;
        /** Set to `true` to disable auto-focus, defaults to `false`. */
        noAutoFocus: boolean;
        /**
         * Set to `true` if the overlay shouldn't be closed when the ESC key is pressed,
         * defaults to `false`.
         */
        noCancelOnEscKey: boolean;
        /**
         * Set to `true` if the overlay shouldn't be closed when a click occurs out of bounds,
         * defaults to `false`.
         */
        noCancelOnOutsideClick: boolean;
        /** The reason the overlay last closed. */
        closingReason: Object;
        
        // Properties that can't be bound to
        
        backdropElement: IronOverlayBackdrop;
        
        /** Open/close the overlay. */
        toggle(): void;
        /** Open the overlay. */
        open(): void;
        /** Close the overlay. */
        close(): void;
        /** Cancel the overlay. */
        cancel(): void;
    }
    interface IronOverlayBehavior extends IronFitBehavior, IronResizableBehavior, IronOverlayBehaviorImpl {
        
    }
}

declare namespace polymer {
    interface Global {
        IronOverlayBehaviorImpl: PolymerElements.IronOverlayBehaviorImpl;
        IronOverlayBehavior: PolymerElements.IronOverlayBehavior;
    }
}