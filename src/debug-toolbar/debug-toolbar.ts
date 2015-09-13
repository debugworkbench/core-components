// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import * as pd from 'polymer-ts-decorators';
import { CompositeDisposable, Disposable } from 'event-kit';
import addDisposableListener from '../disposable-dom-event-listener';
import * as debugWorkbench from '../debug-workbench';
import { IDebugSession } from '../debug-engine'

interface ILocalDOM {
  startButton: PolymerElements.PaperIconButton;
  stopButton: PolymerElements.PaperIconButton;
  settingsButton: PolymerElements.PaperIconButton;
  configs: PolymerElements.PaperDropdownMenu;
  newConfigItem: PolymerElements.PaperItem;
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

function getDebugConfigNames(): string[] {
  return debugWorkbench.debugConfigs.getAll().map((debugConfig) => debugConfig.name);
}

@pd.is('debug-workbench-debug-toolbar')
export default class DebugToolbarElement {
  private subscriptions: CompositeDisposable;
  private debugSession: IDebugSession;
  
  @pd.property({ type: Array, value: getDebugConfigNames })
  private debugConfigs: string[];
  
  static create(): Promise<IDebugToolbarElement> {
	  return debugWorkbench.createElement((<any> DebugToolbarElement.prototype).is);
  }
  
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
  
  created(): void {
    this.subscriptions = new CompositeDisposable();
  }
  
  ready(): void {
    this.subscriptions.add(debugWorkbench.debugConfigs.onDidAddConfig(
      (addedConfig) => {
        base(this).push('debugConfigs', addedConfig.name);
      }
    ));
    this.subscriptions.add(debugWorkbench.debugConfigs.onDidRemoveConfig(
      (removedConfig) => {
        const idx = this.debugConfigs.indexOf(removedConfig.name);
        if (idx > -1) {
          base(this).splice('debugConfigs', idx, 1);
        }
      }
    ));
    this.subscriptions.add(debugWorkbench.debugConfigs.onDidRenameConfig(
      ({ newName, oldName }) => {
        const idx = this.debugConfigs.indexOf(oldName);
        if (idx > -1) {
          base(this).set(['debugConfigs', idx], newName);
        }
      }
    ));
  }
  
  destroy(): void {
    if (this.subscriptions) {
      this.subscriptions.dispose();
      this.subscriptions = null;
    }
  }
    
  @pd.listener('startButton.tap')
  private startDebugging(): void {
    base(this).fire(START_DEBUGGING_EVENT);
    // TODO: factor this out into a start-debugging <configuration> command that can be dispatched
    // from here or from a yet to be implemented command terminal window.
    // TODO: hide the start button, show the stop button
    Promise.resolve().then(() => {
      const debugConfig = debugWorkbench.debugConfigs.get($(this).configs.selectedItemLabel);
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
    if ($(this).configs.selectedItemLabel) {
      debugWorkbench.openDebugConfig($(this).configs.selectedItemLabel);
    }
  }
  
  @pd.listener('configs.iron-activate')
  private willSelectDebugConfig(e: PolymerElements.IronActivateEvent): void {
    // when the user selects the 'New...' item in the configurations dropdown display a dialog
    // that lets them create a new configuration
    if ($(this).newConfigItem === e.detail.item) {
      // skip default selection logic so that 'New...' doesn't show up in the input element
      e.preventDefault();
      $(this).configs.close();
      // when the config name is omitted the user will be prompted to create a new config 
      debugWorkbench.openDebugConfig();
    }
  }
  
  @pd.listener('configs.selected-item-changed')
  private didSelectDebugConfig(): void {
    // TODO: notify anyone that cares that the current debug config changed 
  }
}

export interface IDebugToolbarElement extends DebugToolbarElement, HTMLElement {
}

export function register(): typeof DebugToolbarElement {
  return Polymer<typeof DebugToolbarElement>(DebugToolbarElement.prototype);
}
