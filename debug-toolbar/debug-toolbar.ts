// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import * as pd from 'polymer-ts-decorators';
import { Disposable } from 'event-kit';
import addDisposableListener from '../lib/disposable-dom-event-listener';
import * as debugWorkbench from '../lib/debug-workbench';
import { IDebugSession } from '../lib/debug-engine'

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
  private debugSession: IDebugSession;
  
  /** Add a listener to be called when the Start button is pressed. */
  onStartButtonPressed(callback: EventListener): Disposable {
    return addDisposableListener(<any> this, START_DEBUGGING_EVENT, callback);
  }
  
  /** Add a listener to be called when the Stop button is pressed. */
  onStopButtonPressed(callback: EventListener): Disposable {
    return addDisposableListener(<any> this, STOP_DEBUGGING_EVENT, callback);
  }
  
  /** Add a listener to be called when the Settings button is pressed. */
  onSettingsButtonPressed(callback: EventListener): Disposable {
    return addDisposableListener(<any> this, OPEN_SETTINGS_EVENT, callback);
  }
  
  @pd.listener('startButton.tap')
  private startDebugging(): void {
    base(this).fire(START_DEBUGGING_EVENT);
    // TODO: factor this out into a start-debugging <configuration> command that can be dispatched
    // from here or from a yet to be implemented command terminal window.
    // TODO: hide the start button, show the stop button
    debugWorkbench.getDebugConfig('Launch')
    .then((debugConfig) => {
      const debugEngine = debugWorkbench.getDebugEngine(debugConfig.engine);
      return debugEngine.startDebugSession(debugConfig/*, { console }*/);
    })
    .then((debugSession) => {
      this.debugSession = debugSession;
      // TODO: enable the restart, step in/out/over buttons
    });
  }
  
  @pd.listener('stopButton.tap')
  private stopDebugging(): void {
    base(this).fire(STOP_DEBUGGING_EVENT);
    if (this.debugSession) {
      // TODO: disable the restart, step in/out/over buttons
      this.debugSession.end()
      .then(() => {
        this.debugSession = null;
        // TODO: hide the stop button, show the start button
      })
    }    
  }
  
  @pd.listener('settingsButton.tap')
  private openSettings(): void {
    base(this).fire(OPEN_SETTINGS_EVENT);
  }
}

export function register(): typeof DebugToolbarElement {
  return Polymer<typeof DebugToolbarElement>(DebugToolbarElement.prototype);
}
