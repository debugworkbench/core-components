// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import * as pd from 'polymer-ts-decorators';
import { Disposable } from 'event-kit';
import createDisposableListener from '../lib/disposable-dom-event-listener';

interface ILocalDOM {
  settingsTool: HTMLElement; /*PolymerElements.PaperIconButton;*/
}

function $(element: DebugToolbarElement): ILocalDOM {
  return (<any> element).$;
}

function base(element: DebugToolbarElement): polymer.Base {
  return <any> element;
}

const OPEN_SETTINGS_EVENT = 'open-settings';

@pd.is('debug-workbench-debug-toolbar')
export class DebugToolbarElement {
  /** Add a listener to be called when the Settings button is pressed. */
  onActivateSettingsTool(callback: EventListener): Disposable {
    return createDisposableListener(<any> this, OPEN_SETTINGS_EVENT, callback);
  }
  
  private openSettings(): void {
    base(this).fire(OPEN_SETTINGS_EVENT);
  }
}

export function register(): typeof DebugToolbarElement {
  return Polymer<typeof DebugToolbarElement>(DebugToolbarElement.prototype);
}
