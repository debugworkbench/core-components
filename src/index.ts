// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

export { register as registerRegisterElement } from './register-element/register-element';

export {
  default as NewDebugConfigDialogElement,
  INewDebugConfigDialogElement
} from './new-debug-config-dialog/new-debug-config-dialog';

export {
  default as DebugToolbarElement,
  IDebugToolbarElement
} from './debug-toolbar/debug-toolbar';

export {
  createElement as createDebugConfigElement,
  IDebugConfigElement
} from './debug-config-element-factory';

export * from './element-factory';
export * from './debug-engine';
export { default as DebugConfigManager, DebugConfigFileLoader } from './debug-config-manager';
import * as debugEngineProvider from './debug-engine-provider';
export { debugEngineProvider };
import * as debugWorkbench from './debug-workbench';
export { debugWorkbench };