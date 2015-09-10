// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

// TODO: Move this into https://github.com/debugworkbench/debug-engine

import { Disposable } from 'event-kit';

export interface IDebugConfigElementBehavior {
  onOpened(callback: EventListener): Disposable;
  onClosed(callback: EventListener): Disposable;
  open(): void;
  close(): void;
}

export interface IDebugConfigElement extends IDebugConfigElementBehavior, HTMLElement {
}

export interface IDebugConfig {
  name: string;
  engine: string;
}

export interface IDebugSession {
  end(): Promise<void>;
}

export interface IDebugEngine {
  name: string;
  
  createConfig(configName: string): IDebugConfig;
  createConfigElement(config: IDebugConfig): Promise<IDebugConfigElement>;
  startDebugSession(config: IDebugConfig): Promise<IDebugSession>;
}
