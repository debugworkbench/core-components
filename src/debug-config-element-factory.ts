// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { Disposable } from 'event-kit';
import { IDebugConfig } from 'debug-engine';
import GdbMiDebugConfigElement from './gdb-mi-debug-config/gdb-mi-debug-config';

export interface IDebugConfigElementBehavior {
  onOpened(callback: () => void): Disposable;
  onClosed(callback: (closingReason: PolymerElements.IClosingReason) => void): Disposable;
  open(): void;
  close(): void;
  destroy(): void;
}

export interface IDebugConfigElement extends IDebugConfigElementBehavior, HTMLElement {
}

export function createElement(debugConfig: IDebugConfig): Promise<IDebugConfigElement> {
  return GdbMiDebugConfigElement.create(debugConfig);
}
