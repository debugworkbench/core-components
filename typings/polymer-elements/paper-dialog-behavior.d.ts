// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

/// <reference path="../polymer/polymer.d.ts" />
/// <reference path="./iron-overlay-behavior.d.ts" />

declare namespace PolymerElements {
    interface PaperDialogBehaviorImpl {
        modal: boolean;
    }
    interface PaperDialogBehavior extends IronOverlayBehavior, PaperDialogBehaviorImpl {
    }
}

declare namespace polymer {
    interface Global {
        PaperDialogBehaviorImpl: PolymerElements.PaperDialogBehaviorImpl;
        PaperDialogBehavior: PolymerElements.PaperDialogBehavior;
    }
}
