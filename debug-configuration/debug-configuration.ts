import * as pd from 'polymer-ts-decorators';
import { FileInputElement } from '../file-input/file-input';

/**
 * Base behavior of the DebugConfigurationElement.
 */
@pd.is('debug-configuration')
export class DebugConfigurationElement {
  static register(): typeof DebugConfigurationElement {
    // FIXME: Ugh... yeah, the dependencies are already referenced in the .html once, I don't like
    // repeating myself, each dependency should be registered auto-magically when the .html is
    // loaded.
    FileInputElement.register();
    return Polymer<typeof DebugConfigurationElement>(DebugConfigurationElement.prototype);
  }
  
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
