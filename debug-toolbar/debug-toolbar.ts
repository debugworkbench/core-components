// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import * as pd from 'polymer-ts-decorators';
import { Disposable } from 'event-kit';
import createDisposableListener from '../lib/disposable-dom-event-listener';

interface ILocalDOM {
  startButton: PolymerElements.PaperIconButton;
  stopButton: PolymerElements.PaperIconButton;
  settingsTool: PolymerElements.PaperIconButton;
}

function $(element: DebugToolbarElement): ILocalDOM {
  return (<any> element).$;
}

function base(element: DebugToolbarElement): polymer.Base {
  return <any> element;
}

const START_DEBUGGING_EVENT = 'start-debugging';
const STOP_DEBUGGING_EVENT = 'stop-debugging';
const OPEN_SETTINGS_EVENT = 'open-settings';

@pd.is('debug-workbench-debug-toolbar')
export class DebugToolbarElement {
  /** Add a listener to be called when the Start button is pressed. */
  onStartButtonPressed(callback: EventListener): Disposable {
    return createDisposableListener(<any> this, START_DEBUGGING_EVENT, callback);
  }
  
  /** Add a listener to be called when the Stop button is pressed. */
  onStopButtonPressed(callback: EventListener): Disposable {
    return createDisposableListener(<any> this, STOP_DEBUGGING_EVENT, callback);
  }
  
  /** Add a listener to be called when the Settings button is pressed. */
  onActivateSettingsTool(callback: EventListener): Disposable {
    return createDisposableListener(<any> this, OPEN_SETTINGS_EVENT, callback);
  }
  
  private startDebugging(): void {
    base(this).fire(START_DEBUGGING_EVENT);
    // debugger may take some time to start up, prevent the user from pressing the start button
    // again while that's happening
    $(this).startButton.disabled = true;
  }
  
  private stopDebugging(): void {
    base(this).fire(STOP_DEBUGGING_EVENT);
    // debugger may take some time to shut down, prevent the user from pressing the stop button
    // again while that's happening
    $(this).stopButton.disabled = true;
  }
  
  private openSettings(): void {
    base(this).fire(OPEN_SETTINGS_EVENT);
  }
}

export function register(): typeof DebugToolbarElement {
  return Polymer<typeof DebugToolbarElement>(DebugToolbarElement.prototype);
}
