import { Card } from '@website/design-system'
import { createRoot } from 'react-dom/client'

export class ArtileElement extends HTMLElement {
  connectedCallback() {
    this.items = JSON.parse(this.getAttribute('value'))
    createRoot(this).render(
      <Card
        title={this.items.title}
        content={this.items.summary}
        asset={this.items.thumbnails[0].filename}
      />
    )
  }
}
