import * as pd from 'polymer-ts-decorators';
import { IDebugConfigElementBehavior, IDebugConfig } from '../debug-engine';
import * as debugWorkbench from '../debug-workbench';
import { Disposable, Emitter } from 'event-kit';

interface ILocalDOM {
  dialog: PolymerElements.PaperDialog;
}

function $(element: any): ILocalDOM {
  return element.$;
}

const OPENED_EVENT = 'opened';
const CLOSED_EVENT = 'closed';

/**
 * Base behavior of the DebugConfigurationElement.
 */
@pd.is('debug-configuration')
export default class DebugConfigurationElement implements IDebugConfigElementBehavior {
  private debugConfig: IDebugConfig;
  private emitter: Emitter;
  
  static create(debugConfig: IDebugConfig): Promise<IDebugConfigurationElement> {
	  return debugWorkbench.createElement((<any> DebugConfigurationElement.prototype).is, debugConfig);
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
  
  /** Called after ready() with arguments passed to the element constructor function. */
  factoryImpl(debugConfig: IDebugConfig): void {
    this.debugConfig = debugConfig;
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
      if (e.detail.confirmed) {
        debugWorkbench.debugConfigs.save(this.debugConfig);
      }
      this.emitter.emit(CLOSED_EVENT, e.detail);
    } else {
      e.stopPropagation();
    }
  }
  
  /** Add a function to be called when the dialog is opened. */
  onOpened(callback: () => void): Disposable {
    return this.emitter.on(OPENED_EVENT, callback);
  }
  
  /** Add a function to be called when the dialog is closed. */
  onClosed(callback: (closingReason: PolymerElements.IClosingReason) => void): Disposable {
    return this.emitter.on(CLOSED_EVENT, callback);
  }
  
  open(): void {
    $(this).dialog.open();
  }
  
  close(): void {
    $(this).dialog.close();
  }
}

export interface IDebugConfigurationElement extends DebugConfigurationElement, HTMLElement {
}

export function register(): typeof DebugConfigurationElement {
  return Polymer<typeof DebugConfigurationElement>(DebugConfigurationElement.prototype);
}