import * as pd from 'polymer-ts-decorators';

export interface IAuthorProperty {
  name: string;
  age: number;
}

/**
 * Base behavior of the DebugConfigurationElement.
 */
@pd.is('debug-configuration')
export class DebugConfigurationElement {
  /** The returned object will only be valid after the element has been upgraded to a custom element. */
  get base(): polymer.Base {
    return <any> this;
  }
  
  @pd.property({ type: Boolean })
  fancy: boolean;
  
  @pd.property({
    type: Object,
    value: () => {
      return {
        name:  'John Smith',
        age: 35
      };
    }
  })
  author: IAuthorProperty;

  somefunc(): void {
    console.log(this.author.name);
  }

  ready(): void {
    console.log("I'm ready!");
    this.somefunc();
  }

  attached(): void {
    console.log("I've been attached!");
  }

  detached(): void {
    console.log("I've been detached!");
  }
}

// Don't register the element on import since in TypeScript import statements can only appear
// at the top level file scope not in function scope, and the html template must be loaded via
// HTML import before the element can be created and registered via Polymer().
//Polymer(DebugConfigurationElement.prototype);
