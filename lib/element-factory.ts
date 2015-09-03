// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

export interface IElementFactory {
  setElementConstructor(tagName: string, elementConstructor: Function): void;
  createElement(tagName: string, ...args: any[]): Promise<HTMLElement>;
  /**
   * Create an element from the debug-workbench namespace.
   * @param tagName Name of the element to create, without the 'debug-workbench-' namespace prefix.
   *                e.g. to create an element that was registered under the name
   *                'debug-workbench-my-element' specify 'my-element'. 
   * @param args Arguments to pass through to the element constructor.
   */
  createCoreElement(tagName: string, ...args: any[]): Promise<HTMLElement>;
}
