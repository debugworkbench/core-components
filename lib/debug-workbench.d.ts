import { IElementFactory } from './element-factory';
import { IDebugEngine } from 'debug-engine';
import DebugConfigManager from './debug-config-manager';
import { INotificationPresenter } from './notification-presenter';
export declare var debugConfigs: DebugConfigManager;
export declare var notifications: INotificationPresenter;
export interface IActivationConfig {
    openDebugConfig: (configName: string) => void;
    elementFactory: IElementFactory;
    debugConfigManager: DebugConfigManager;
    notificationPresenter: INotificationPresenter;
}
export declare function activate(config: IActivationConfig): void;
export declare function deactivate(): void;
export declare function openDebugConfig(configName?: string): void;
export declare function getDebugEngine(engineName: string): IDebugEngine;
export declare function createElement(tagName: string, ...args: any[]): Promise<HTMLElement>;
export declare function createCoreElement(tagName: string, ...args: any[]): Promise<HTMLElement>;
export declare function setElementConstructor(tagName: string, elementConstructor: Function): void;
