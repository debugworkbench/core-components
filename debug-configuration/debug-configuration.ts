import * as pd from 'polymer-ts-decorators';
import { IDebugConfigElementBehavior, IDebugConfig } from '../lib/debug-engine';
import { createElement } from '../lib/debug-workbench';
import { Disposable } from 'event-kit';
import addDisposableListener from '../lib/disposable-dom-event-listener';

interface ILocalDOM {
  dialog: PolymerElements.PaperDialog;
}

function $(element: any): ILocalDOM {
  return element.$;
}

/**
 * Base behavior of the DebugConfigurationElement.
 */
@pd.is('debug-configuration')
export default class DebugConfigurationElement implements IDebugConfigElementBehavior {
  static create(debugConfig: IDebugConfig): Promise<IDebugConfigurationElement> {
	  return createElement((<any> DebugConfigurationElement.prototype).is, debugConfig);
  }
  
  /** Add a listener to be called when the dialog is opened. */
  onOpened(callback: EventListener): Disposable {
    return addDisposableListener($(this).dialog, 'iron-overlay-opened', callback);
  }
  
  /** Add a listener to be called when the dialog is closed. */
  onClosed(callback: EventListener): Disposable {
    return addDisposableListener($(this).dialog, 'iron-overlay-closed', callback);
  }
  
  open(): void {
    const dialog = $(this).dialog;
    if (dialog) {
      dialog.open();
    }
  }
  
  close(): void {
    const dialog = $(this).dialog;
    if (dialog) {
      dialog.close();
    }
  }
}

export interface IDebugConfigurationElement extends DebugConfigurationElement, HTMLElement {
}

export function register(): typeof DebugConfigurationElement {
  return Polymer<typeof DebugConfigurationElement>(DebugConfigurationElement.prototype);
}
