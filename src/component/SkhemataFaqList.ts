/**
 *
 * Lit Faq List Element
 *
 */

// Import litelement base class, html helper function & typescript decorators
import { SkhemataBase, property, html, CSSResult } from '@skhemata/skhemata-base';

// Import custom font awesome dependencies
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';

import { SkhemataFaqListStyles } from '../style/SkhemataFaqListStyle';
import { SkhemataFaqSharedStyles } from '../style/SkhemataFaqSharedStyle';

// Import element dependencies
import './SkhemataFaqSearch';
import { decodeHtmlEntities } from '@skhemata/skhemata-base/dist/directives/decodeHtmlEntities.js';
import { translationEngDefault } from '../translation/SkhemataFaqList/eng';

export class SkhemataFaqList extends SkhemataBase {

  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: Number, attribute: 'posts-per-page' })
  postsPerPage = 20;
  
  @property({ type: Array })
  private faqPosts: any = [];

  @property({ type: Number })
  totalPages = 0;

  @property({ type: Number })
  totalCount = 0;

  @property({ type: Number })
  maxLoadCount = 0;

  @property({ type: Number })
  private count = 1;

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault
  };

  static get styles() {
    return <CSSResult[]> [
      ...super.styles,
      SkhemataFaqListStyles,
      SkhemataFaqSharedStyles,
    ];
  }

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  constructor() {
    // Always call super() first
    super();

    window.addEventListener(
      'popstate',
      () => {
        this.getPosts();
      },
      false
    );
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return html`
      <div class="faq-list block">
        ${this.faqPosts.map(
          (faq: any) => html`
            <div class="faq-entry"  @click=${() => {
              this.navigateToPost(faq.slug);
            }}>
                <div class="article-date">
                  <fa-icon .icon=${faCalendarAlt}></fa-icon> ${this.formatDate(faq.date)}
                </div>
                <a class="is-size-4 has-text-weight-bold" @click=${() => {
                  this.navigateToPost(faq.slug);
                }}>
                  ${decodeHtmlEntities(faq.title.rendered)}
                </a>
            </div>
          `
        )}
      </div>

      <div class="load-more-button block">
      ${(this.count < this.maxLoadCount)? 
        html`<button @click="${this.loadMorePosts}" class="button">${this.getStr('SkhemataFaqList.showMoreButton')}</button>` : ``}
      </div>
    `;
  }

  navigateToPost(slug: string) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: {
        slug
      },
      composed: true,
      bubbles: true
    }));
    window.dispatchEvent(new CustomEvent('clearfaqsearch'));
  }

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getPosts();
  }


  private formatDate = (date: string) => {
    const dateObj = new Date(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      dateObj
    );
    return `${month} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
  };

  /**
   * Fetch Posts from WP REST API
   */
  private getPosts() {
    // Use fetch method to make a request
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const params = new URLSearchParams(window.location.search);
    const search = params.get('s');
    const category = params.get('c');
    let searchParams = '';
    let categoryParams = '';
    const orderbyParam = `&orderby=relevance`;

    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }
    if (category) {
      categoryParams = `&ufaq-category=${category}`;
    }

    fetch(`${this.apiWordpress.url}/ufaq?${searchParams}${categoryParams}&per_page=${this.postsPerPage}`)
      .then(response => {
        this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
        this.totalCount = Number(response.headers.get('X-WP-Total'));
        const contentType = response.headers.get('Content-Type');

        this.maxLoadCount = Math.ceil(this.totalCount/10);
        // Check if response header content type is json
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        // Throw error if above condition isn't met
        throw new TypeError('The format is not JSON.');
      })
      .then(data => {
        if (typeof data !== 'undefined') {
          // Loop through data
          // data.forEach((element: any) => {
          //   // this.formatCategories(element);
          // });

          this.faqPosts = data;
        }
      });
  }

  /**
   * Load more posts event handler
   */
  private loadMorePosts() {
    this.count += 1;
    const params = new URLSearchParams(window.location.search);
    const search = params.get('s');
    const category = params.get('c');
    let searchParams = '';
    let categoryParams = '';
    const orderbyParam = `&orderby=relevance`;

    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }
    if (category) {
      categoryParams = `&ufaq-category=${category}`;
    }
    fetch(
      `${this.apiWordpress.url}/ufaq?page=${this.count}${searchParams}${categoryParams}&per_page=${this.postsPerPage}`
    )
      .then(response => response.json())
      .then(posts => {
        for (const post of posts) {
          // this.formatCategories(posts[index]);
          // Use spread operator for dynamic re-rendering on template
          this.faqPosts = [...this.faqPosts, post];
        }
      });
  }
}
