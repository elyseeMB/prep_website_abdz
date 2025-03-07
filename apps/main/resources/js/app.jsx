import '@unocss/reset/tailwind.css'
import '@website/design-system/src/css/index.css'
import 'virtual:uno.css'
import { createRoot } from 'react-dom/client'
import { Footer } from '@website/design-system'

class FooterCustomElement extends HTMLElement {
  connectedCallback() {
    this.render()
  }
  render() {
    createRoot(this).render(<Footer />)
  }
}

customElements.define('footer-element', FooterCustomElement)
