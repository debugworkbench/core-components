// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import * as pd from 'polymer-ts-decorators';

@pd.is('debug-workbench-debug-toolbar')
export class DebugToolbarElement {
  /** The returned object will only be valid after the element has been upgraded to a custom element. */
  get base(): polymer.Base {
    return <any> this;
  }
}

export function register(): typeof DebugToolbarElement {
  return Polymer<typeof DebugToolbarElement>(DebugToolbarElement.prototype);
}
