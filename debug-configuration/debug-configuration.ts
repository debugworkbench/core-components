import * as pd from 'polymer-ts-decorators';

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
export class DebugConfigurationElement {
  /** The returned object will only be valid after the element has been upgraded to a custom element. */
  get base(): polymer.Base {
    return <any> this;
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

export function register(): typeof DebugConfigurationElement {
  return Polymer<typeof DebugConfigurationElement>(DebugConfigurationElement.prototype);
}
