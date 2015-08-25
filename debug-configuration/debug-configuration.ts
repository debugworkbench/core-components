import * as pd from 'polymer-ts-decorators';

/**
 * Base behavior of the DebugConfigurationElement.
 */
@pd.is('debug-configuration')
export class DebugConfigurationElement {
  /** The returned object will only be valid after the element has been upgraded to a custom element. */
  get base(): polymer.Base {
    return <any> this;
  }
  
  ready(): void {
    
  }

  attached(): void {
    console.log("I've been attached!");
  }

  detached(): void {
    console.log("I've been detached!");
  }
  
  open(): void {
    const dialog = this.base.$.dialog;
    if (dialog) {
      dialog.open();
    }
  }
  
  close(): void {
    const dialog = this.base.$.dialog;
    if (dialog) {
      dialog.close();
    }
  }
}

export function register(): typeof DebugConfigurationElement {
  return Polymer<typeof DebugConfigurationElement>(DebugConfigurationElement.prototype);
}
