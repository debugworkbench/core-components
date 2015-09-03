import * as pd from 'polymer-ts-decorators';
import { Disposable } from 'event-kit';
import addDisposableListener from '../lib/disposable-dom-event-listener';
import { IDebugConfig } from '../lib/debug-engine';
import { createElement, getDebugEngine } from '../lib/debug-workbench';

interface ILocalDOM {
  dialog: PolymerElements.PaperDialog;
  configName: PolymerElements.PaperInput;
  engines: PolymerElements.PaperDropdownMenu;
}

function $(element: NewDebugConfigDialogElement): ILocalDOM {
  return (<any> element).$;
}

/**
 * A simple dialog that lets the user enter the name for a new debug config and select
 * the debug engine the new config will be used with.
 */
@pd.is('debug-workbench-new-debug-config-dialog')
export default class NewDebugConfigDialogElement {
  static create(): Promise<INewDebugConfigDialogElement> {
	  return createElement((<any> NewDebugConfigDialogElement.prototype).is);
  }
  
  /** Add a listener to be called when the dialog is opened. */
  onOpened(callback: () => void): Disposable {
    return addDisposableListener($(this).dialog, 'iron-overlay-opened', (e: CustomEvent) => {
      if (Polymer.dom(e).localTarget === $(this).dialog) {
        callback();
      } else {
        e.stopPropagation();
      }
    });
  }
  
  /** Add a listener to be called when the dialog is closed. */
  onClosed(callback: (debugConfig: IDebugConfig) => void): Disposable {
    return addDisposableListener($(this).dialog, 'iron-overlay-closed', (e: CustomEvent) => {
      if (Polymer.dom(e).localTarget === $(this).dialog) {
        const debugEngine = getDebugEngine($(this).engines.selectedItemLabel);
        if ($(this).dialog.closingReason.confirmed) {
          callback(debugEngine ? debugEngine.createConfig($(this).configName.value) : null);
        } else {
          callback(null);
        }
      } else {
        e.stopPropagation();
      }
    });
  }
  
  open(): void {
    $(this).dialog.open();
  }
  
  close(): void {
    $(this).dialog.close();
  }
}

export interface INewDebugConfigDialogElement extends NewDebugConfigDialogElement, HTMLElement {
}

export function register(): typeof NewDebugConfigDialogElement {
  return Polymer<typeof NewDebugConfigDialogElement>(NewDebugConfigDialogElement.prototype);
}
