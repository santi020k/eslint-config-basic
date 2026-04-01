import { Component, Prop } from '@stencil/core'

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name of the person.
   */
  @Prop() readonly _first: string = 'Santi'

  public get first(): string {
    // eslint-disable-next-line no-var
    var testVar = 'stencil test'

    return this._first + testVar
  }
}
