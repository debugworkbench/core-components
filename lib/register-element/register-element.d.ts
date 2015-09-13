/** Custom element that loads and registers a custom element from a CommonJS module. */
export declare class RegisterElementElement {
    /** The returned object will only be valid after the element has been upgraded to a custom element. */
    base: polymer.Base;
    path: string;
    ready(): void;
}
export declare function register(): typeof RegisterElementElement;
