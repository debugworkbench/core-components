import * as pd from 'polymer-ts-decorators';
import * as remote from 'remote';

@pd.is('file-input')
export class FileInputElement {
  static register(): typeof FileInputElement {
    return Polymer<typeof FileInputElement>(FileInputElement.prototype);
  }
  
  /** The returned object will only be valid after the element has been upgraded to a custom element. */
  get base(): polymer.Base {
    return <any> this;
  }
  
  @pd.property({ type: String })
  inputLabel: string;
  
  @pd.property({ type: String })
  filePath: string;
    
  openBrowseDialog(): void {
    // Apparently on OS X the open dialog shouldn't have a parent window
    const parentWindow = (process.platform !== 'darwin') ? remote.getCurrentWindow() : null;
    const dialog = remote.require('dialog');
    dialog.showOpenDialog(
      parentWindow,
      {
        title: 'Open File',
        properties: ['openFile'],
        defaultPath: this.filePath
      },
      (paths: string[]) => {
        if (paths && (paths.length > 0)) {
          this.filePath = paths[0];
        }
      }
    );
  }
}
