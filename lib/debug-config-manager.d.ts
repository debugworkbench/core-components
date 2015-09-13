import { IDebugConfig } from './debug-engine';
import { Disposable } from 'event-kit';
export interface IDebugConfigRenameInfo {
    newName: string;
    oldName: string;
}
/**
 * Manages access to debug configs.
 *
 * Debug configs are saved to a single file stored at the path passed to the constructor.
 * To modify a config, clone an existing one, modify the clone, then save the clone (this will
 * replace the existing config).
 */
export default class DebugConfigManager {
    private configPath;
    /** Original unmodified configs, should always be kept in sync with what's actually on disk. */
    private debugConfigs;
    /** Copies of original configs, these contain changes that may be saved to disk or discared. */
    private pendingChanges;
    private emitter;
    constructor(configPath: string);
    /** Add a function that should be called after a new debug config is saved. */
    onDidAddConfig(callback: (addedConfig: IDebugConfig) => void): Disposable;
    /** Add a function that should be called after a debug config is permanently removed. */
    onDidRemoveConfig(callback: (removedConfig: IDebugConfig) => void): Disposable;
    /** Add a function that should be called after a name change is saved. */
    onDidRenameConfig(callback: {
        ({newName, oldName}: IDebugConfigRenameInfo): void;
    }): Disposable;
    /**
     * Get a saved debug config with the given name.
     *
     * The returned config should be considered read-only, to modify a config call [[modify]].
     * @return A matching IDebugConfig, or null.
     */
    get(configName: string): IDebugConfig;
    /**
     * Get all saved debug configs.
     * The returned configs should be considered read-only, to modify a config call [[modify]].
     */
    getAll(): IDebugConfig[];
    /**
     * Make a copy of a config for modification.
     *
     * Once the returned config has been modified the changes can be saved to disk
     * by calling [[save]], or discarded by calling [[discardChanges]].
     * @return A copy of the given config.
     */
    modify(debugConfig: IDebugConfig): IDebugConfig;
    /**
     * Discard any modifications made to a config.
     *
     * @param debugConfig An unsaved config returned by [[modify]].
     */
    discardChanges(debugConfig: IDebugConfig): void;
    /**
     * Save a new or modified config.
     *
     * @param debugConfig A newly created config or one returned by [[modify]].
     * @return A promise that will be resolved once the change has been written to disk.
     */
    save(debugConfig: IDebugConfig): Promise<void>;
    /**
     * Permanently remove a config from memory and disk.
     *
     * @return A promise that will be resolved once the change has been written to disk.
     */
    remove(debugConfig: IDebugConfig): Promise<void>;
    /**
     * Load all configs from disk.
     *
     * @return A promise that will be resolved once all configs have been loaded.
     */
    load(): Promise<void>;
    private checkConfigFileExists();
    private readFromDisk();
    private writeToDisk(configs);
}
