// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { IElementFactory } from './element-factory';
import { IDebugConfig, IDebugEngine } from 'debug-engine';
import { GdbMiDebugEngineProvider } from './gdb-mi-debug-engine';
import DebugConfigManager from './debug-config-manager';
import * as engineProvider from 'debug-engine';

var _config: IActivationConfig;
export var debugConfigs: DebugConfigManager;

export interface IActivationConfig {
  // FIXME: openDebugConfig should probably move into DebugConfigManager?
  openDebugConfig: (configName: string) => void;
  elementFactory: IElementFactory;
  debugConfigManager: DebugConfigManager;
}

export function activate(config: IActivationConfig) {
  _config = config;
  debugConfigs = config.debugConfigManager;
  engineProvider.register(new GdbMiDebugEngineProvider());
}

export function deactivate(): void {
  engineProvider.unregisterAll();
  _config = null;
}

export function openDebugConfig(configName?: string): void {
  _config.openDebugConfig(configName);
}

export function getDebugEngine(engineName: string): IDebugEngine {
  return engineProvider.getEngine(engineName);
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