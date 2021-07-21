/**
 *
 * Lit Faq Search Element
 *
 * */

// Import litelement base class, html helper function & typescript decorators
import { SkhemataBase, property, html, CSSResult } from '@skhemata/skhemata-base';

// Import lit-html, directives & etc

// Import custom style elements
import { SkhemataFormTextbox } from '@skhemata/skhemata-form';
import { SkhemataFaqSearchStyles } from '../style/SkhemataFaqSearchStyle';

import { translationEngDefault } from '../translation/SkhemataFaqSearch/eng';

export class SkhemataFaqSearch extends SkhemataBase {
  // Property decorator (requires TypeScript or Babel)
  // Attributes that can be passed into different elements
  @property({ type: String, attribute: 'faq-site-host' })
  faqSiteHost = '';

  @property({ type: String, attribute: 'faq-page-path' })
  faqPagePath = '';

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault
  };

  @property({ type: String })
  searchTerm: String | null = '';

  static get scopedElements() {
    return {
      'sk-form-textbox': SkhemataFormTextbox,
    };
  }

  static get styles() { 
    return <CSSResult[]> [
      ...super.styles, 
      SkhemataFaqSearchStyles
    ];
  }
  
  constructor() {
    // Always call super() first
    super();
    const params = new URLSearchParams(window.location.search);
    this.searchTerm = params.get('s');
    window.addEventListener('clearfaqsearch', () => {
      this.searchTerm = '';
      this.requestUpdate();
    })
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return html`
      <sk-form-textbox
        id="search-input"
        .value=${this.searchTerm || ''}
        type="search"
        placeholder="${this.getStr("SkhemataFaqSearch.searchPlaceholder")}"
        @keyup=${this.onSearch}
      ></sk-form-textbox>
    `;
  }

  /**
   *  Search posts when value is entered
   */
  onSearch(event: any) {
    const params = new URLSearchParams(window.location.search);
    params.set('s', event.target.value);
    this.searchTerm = event.target.value;
    window.history.pushState(
      {},
      '',
      `/${this.faqPagePath}?${params.toString()}`
    );
    window.dispatchEvent(new Event('popstate'));
  }
}
