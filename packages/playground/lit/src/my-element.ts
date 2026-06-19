// Plain custom element — exercises the wc-recommended rules from the Lit config
// without requiring the lit runtime as a playground dependency.
export class MyElement extends HTMLElement {
  connectedCallback(): void {
    this.textContent = 'Hello from a custom element'
  }
}

customElements.define('my-element', MyElement)
