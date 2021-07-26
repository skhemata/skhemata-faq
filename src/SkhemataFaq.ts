/**
 *
 * Lit Faq parent component to handle routing
 *
 * */
import { SkhemataBase, property, html, css, CSSResult } from '@skhemata/skhemata-base';

// Import element dependencies
import { SkhemataFaqList } from './component/SkhemataFaqList';
import { SkhemataFaqPost } from './component/SkhemataFaqPost';
import { SkhemataFaqSearch } from './component/SkhemataFaqSearch';
import { SkhemataFaqCategories } from './component/SkhemataFaqCategories';

import { translationEngDefault } from './translation/SkhemataFaq/eng';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
export class SkhemataFaq extends SkhemataBase {
  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: '',
  };

  @property({ type: String, attribute: 'faq-page-path' })
  faqPagePath = '';

  @property({ type: Number, attribute: 'posts-per-page' })
  postsPerPage = 20;
  
  @property({ type: String, attribute: 'pager-type' })
  pagerType = "infinite";

  @property({ type: String })
  slug?: string = '';

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault,
  };

  static get scopedElements() {
    return {
      'skhemata-faq-list': SkhemataFaqList,
      'skhemata-faq-post': SkhemataFaqPost,
      'skhemata-faq-search': SkhemataFaqSearch,
      'skhemata-faq-categories': SkhemataFaqCategories,
    };
  }

  static get styles(): CSSResult[] {
    return <CSSResult[]>[
      ...super.styles,
      css`
        :host {
          display: block;
          padding: 25px 0;
          color: var(--skhemata-faq-text-color);
        }

        @media screen and (max-width: 430px) {
          :host {
            padding: 25px 20px;
          }
        }

        .mr {
          margin-right: 1.5rem;
        }

        .my {
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .back-button {
          margin: 0 0 1em;
        }

        .columns {
          width: 100%;
          margin: 0px;
        }

        .columns.search,
        .columns.search .column {
          margin-top: 0px;
          margin-bottom: 0px;
          padding-top: 0px;
          padidng-bottom: 0px;
        }
      `,
    ];
  }

  constructor() {
    super();
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }

  handleNavigate(e: CustomEvent) {
    this.slug = e.detail.slug || '';
    // const search = <SkhemataFaqSearch> this.shadowRoot.getElementById('search');
    // search.searchTerm = '';
  }

  handleGoBack() {
    this.slug = '';
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {
          slug: '',
        },
      })
    );
  }

  render() {
    return html`
      <div class="columns search">
        <div class="column">
          <skhemata-faq-search
            id="search"
            .faqPagePath=${this.faqPagePath}
            .translationData=${this.translationData}
          ></skhemata-faq-search>
        </div>
      </div>
      <div class="columns is-desktop">
        <div class="column is-three-quarters-desktop">
          ${this.slug
            ? html`
                <skhemata-faq-post
                  .apiWordpress=${this.apiWordpress}
                  .faqPagePath=${this.faqPagePath}
                  slug=${this.slug}
                  @navigate=${this.handleNavigate}
                  .translationData=${this.translationData}
                ></skhemata-faq-post>
              `
            : html`
                <skhemata-faq-list
                  .apiWordpress=${this.apiWordpress}
                  .faqPagePath=${this.faqPagePath}
                  .postsPerPage=${this.postsPerPage}
                  .pagerType=${this.pagerType}
                  @navigate=${this.handleNavigate}
                  .translationData=${this.translationData}
                ></skhemata-faq-list>
              `}
        </div>
        <skhemata-faq-categories
          class="column"
          .apiWordpress=${this.apiWordpress}
          .faqPagePath=${this.faqPagePath}
          .translationData=${this.translationData}
        ></skhemata-faq-categories>
      </div>
    `;
  }
}
