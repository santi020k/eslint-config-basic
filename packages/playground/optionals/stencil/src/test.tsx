import { Component, Prop } from '@stencil/core'

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop() first: string = ''
}
