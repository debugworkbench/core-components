import * as pd from 'polymer-ts-decorators';
import { Disposable, Emitter } from 'event-kit';
import addDisposableListener from '../disposable-dom-event-listener';
import { IDebugConfig } from '../debug-engine';
import * as debugWorkbench from '../debug-workbench';

interface ILocalDOM {
  dialog: PolymerElements.PaperDialog;
  configName: PolymerElements.PaperInput;
  engines: PolymerElements.PaperDropdownMenu;
}

function $(element: NewDebugConfigDialogElement): ILocalDOM {
  return (<any> element).$;
}

const OPENED_EVENT = 'opened';
const CLOSED_EVENT = 'closed';

/**
 * A simple dialog that lets the user enter the name for a new debug config and select
 * the debug engine the new config will be used with.
 */
@pd.is('debug-workbench-new-debug-config-dialog')
export default class NewDebugConfigDialogElement {
  private emitter: Emitter;
  
  static create(): Promise<INewDebugConfigDialogElement> {
	  return debugWorkbench.createElement((<any> NewDebugConfigDialogElement.prototype).is);
  }
  
  created(): void {
    this.emitter = new Emitter();
  }
  
  destroy(): void {
    if (this.emitter) {
      this.emitter.dispose();
      this.emitter = null;
    }
  }
  
  @pd.listener('dialog.iron-overlay-opened')
  private onIronOverlayOpened(e: CustomEvent): void {
    if (Polymer.dom(e).localTarget === $(this).dialog) {
      this.emitter.emit(OPENED_EVENT);
    } else {
      e.stopPropagation();
    }
  }
  
  @pd.listener('dialog.iron-overlay-closed')
  private onIronOverlayClosed(e: PolymerElements.IronOverlayClosedEvent): void {
    if (Polymer.dom(e).localTarget === $(this).dialog) {
      let debugConfig: IDebugConfig = null;
      const debugEngine = debugWorkbench.getDebugEngine($(this).engines.selectedItemLabel);
      if (e.detail.confirmed && debugEngine) {
        debugConfig = debugEngine.createConfig($(this).configName.value);
      }
      this.emitter.emit(CLOSED_EVENT, debugConfig);
    } else {
      e.stopPropagation();
    }
  }
  
  /** Add a function to be called when the dialog is opened. */
  onOpened(callback: () => void): Disposable {
    return this.emitter.on(OPENED_EVENT, callback);
  }
  
  /** Add a function to be called when the dialog is closed. */
  onClosed(callback: (debugConfig: IDebugConfig) => void): Disposable {
    return this.emitter.on(CLOSED_EVENT, callback);
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
