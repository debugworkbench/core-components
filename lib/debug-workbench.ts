// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IElementFactory } from './element-factory';
import { IDebugConfig, IDebugEngine } from './debug-engine';
import { GdbMiDebugEngine } from './gdb-mi-debug-engine';

var _config: IActivationConfig;
var debugEngine: IDebugEngine;

export interface IActivationConfig {
  openDebugConfig: (configName: string) => void;
  elementFactory: IElementFactory;
}

export function activate(config: IActivationConfig) {
  _config = config;
}

export function deactivate(): void {
  _config = null;
}

export function getDebugConfig(configName: string): Promise<IDebugConfig> {
  return Promise.resolve({ name: 'Launch', engine: 'gdb-mi' });
}

export function openDebugConfig(configName?: string): void {
  _config.openDebugConfig(configName);
}

export function getDebugEngine(engine: string): IDebugEngine {
  if (!debugEngine) {
    debugEngine = new GdbMiDebugEngine();
  }
  return debugEngine;
}

export function createElement(tagName: string, ...args: any[]): Promise<HTMLElement> {
  return _config.elementFactory.createElement.apply(_config.elementFactory, arguments);
}

export function createCoreElement(tagName: string, ...args: any[]): Promise<HTMLElement> {
  return _config.elementFactory.createCoreElement.apply(_config.elementFactory, arguments);
}

export function setElementConstructor(tagName: string, elementConstructor: Function) {
  return _config.elementFactory.setElementConstructor(tagName, elementConstructor);
}