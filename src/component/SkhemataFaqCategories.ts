/**
 *
 * Lit Faq Search Element
 *
 */

// Import litelement base class, html helper function & typescript decorators
import { SkhemataBase, property, html, CSSResult } from '@skhemata/skhemata-base';

import { SkhemataFaqCategoriesStyles } from '../style/SkhemataFaqCategoriesStyle';
import { translationEngDefault } from '../translation/SkhemataFaqCategories/eng';

export class SkhemataFaqCategories extends SkhemataBase {

  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: String, attribute: 'faq-page-path' })
  faqPagePath = '';

  @property({ type: Array })
  categories = [];

  @property({ type: Number })
  currentCategory?: number;

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault
  };

  static get styles() {
    return <CSSResult[]> [
      ...super.styles,
      SkhemataFaqCategoriesStyles
    ];
  }

  constructor() {
    super();
    let params = new URLSearchParams(window.location.search);
    let c: string = params.get('c') || '';
    if (c !== '') {
      this.currentCategory = parseInt(c, 10);
    }
    window.addEventListener('popstate', () => {
      params = new URLSearchParams(window.location.search);
      c = params.get('c') || '';
      if (c !== '') {
        this.currentCategory = parseInt(c, 10);
      } else {
        this.currentCategory = undefined;
      }
    });
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return html`
      <h3 class="title is-4 has-text-centered">${this.getStr('SkhemataFaqCategories.categoriesTitle')}</h3>
        <div class="buttons">
        <button
          class="category-item button is-light is-fullwidth"
          @click="${() => this.filterCategory(-1)}"
        >
        ${this.getStr('SkhemataFaqCategories.allCategories')}
        </button>
      ${this.categories.map(
        (category: any) => html`
          <button
            class="category-item button is-light is-fullwidth ${this
              .currentCategory === category.id
              ? 'active'
              : ''}"
            @click=${() => this.filterCategory(category.id)}
          >
            <span>${category.name}</span>
          </button>
          </div>
        `
      )}
    `;
  }

  async firstUpdated() {
    await super.firstUpdated();
    this.getCategories();
  }

  /**
   *  Get categories
   */
  private async getCategories() {
    await fetch(`${this.apiWordpress.url}/ufaq-category?parent=0&per_page=100`)
      .then(response => response.json())
      .then(async data => {
        this.categories = data;
      });
  }

  filterCategory(id: number) {
    const params = new URLSearchParams(window.location.search);
    if (parseInt(params.get('c') || '', 10) === id || id === -1) {
      this.currentCategory = undefined;
      params.delete('c');
    } else {
      this.currentCategory = id;
      params.set('c', id.toString());
    }
    window.history.pushState(
      {},
      '',
      decodeURIComponent(`/${this.faqPagePath}?${params.toString()}`)
    );
    window.scrollTo({ top: 0 });

    window.dispatchEvent(new Event('popstate'));
  }
}
