import { Component, Prop } from '@stencil/core'

@Component({
  shadow: true,
  styleUrl: 'my-component.css',
  tag: 'my-component'
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
