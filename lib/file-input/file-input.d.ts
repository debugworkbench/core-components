export declare class FileInputElement {
    /** The returned object will only be valid after the element has been upgraded to a custom element. */
    base: polymer.Base;
    inputLabel: string;
    filePath: string;
    openBrowseDialog(): void;
}
export declare function register(): typeof FileInputElement;
