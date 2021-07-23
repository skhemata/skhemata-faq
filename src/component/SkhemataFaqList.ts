/**
 *
 * Lit Faq List Element
 *
 */

// Import litelement base class, html helper function & typescript decorators
import { SkhemataBase, property, html, css, CSSResult } from '@skhemata/skhemata-base';

// Import custom font awesome dependencies
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';

// Import element dependencies
import './SkhemataFaqSearch';
import { decodeHtmlEntities } from '@skhemata/skhemata-base/dist/directives/decodeHtmlEntities.js';
import { translationEngDefault } from '../translation/SkhemataFaqList/eng';

import { SkhemataFaqListStyles } from '../style/SkhemataFaqListStyle';
import { SkhemataFaqSharedStyles } from '../style/SkhemataFaqSharedStyle';

export class SkhemataFaqList extends SkhemataBase {

  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: Number, attribute: 'posts-per-page' })
  postsPerPage = 20;

  @property({ type: String, attribute: 'pager-type' })
  pagerType = "infinite";

  @property({ type: Number})
  currentPage = 1;

  @property({ type: String, attribute: 'faq-page-path' })
  faqPagePath = '';

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
      css`
        .traditional-pager {
          text-align: center;
        }
      `,
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
        if(this.pagerType === "traditional") {
          this.loadPostPage();
        } else {
          this.getPosts();
        }
      },
      false
    );
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    let previous = html``;
    let next = html``;
    let previousPages = html``;
    let nextPages = html``;
    let count = 1;

    const params = new URLSearchParams(window.location.search);
    let page = 1;
    const leadingTrailingCount = 3;
    const pParam = params.get('p');
    const pageParam = parseInt(pParam, 10);

    if(pageParam != null && !Number.isNaN(pageParam) ) {
      page = pageParam;
    }

    previous = html`<button @click="${() => this.setPageNumber(1)}" class="button" > First </button>
    <button @click="${() => this.setPageNumber(page-1)}" class="button" > Previous </button>`;
    if (page <= 1) {
      previous = html``;
    }
    
    next = html`<button @click="${() => this.setPageNumber(page+1)}" class="button" > Next </button>
    <button @click="${() => this.setPageNumber(this.totalPages)}" class="button" > Last </button>`;
    if (page >= this.totalPages) {
      next = html``;
    }
    
    for (let index = page; index > 1; index -= 1) {
      if(count > leadingTrailingCount) {
        break;
      }
      previousPages = html`<button @click="${(event: any) => this.goToButtonPage(event)}" page-value="${page-count}"  class="button" >${page-count}</button>${previousPages}`;
      count += 1;
    }
    
    count = 1;
    for (let index = page; index < this.totalPages; index += 1) {
      if(count > leadingTrailingCount) {
        break;
      }
      nextPages = html`${nextPages}<button @click="${(event: any) => this.goToButtonPage(event)}" page-value="${page+count}" class="button" >${page+count}</button>`;
      count += 1;
    }

    let pagination = html``;
    if (this.totalPages > 1) {
      pagination = html`
      <div class="traditional-pager">
        ${previous}${previousPages}<button @click="" class="button" ><b>${page}</b></button>${nextPages}${next}
      </div>`;
    }

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

      ${(this.pagerType === "traditional") ? 
        pagination : 
        html`<div class="load-more-button block">
        ${(this.count < this.maxLoadCount)? 
          html`<button @click="${this.loadMorePosts}" class="button">${this.getStr('SkhemataFaqList.showMoreButton')}</button>` : ``}
        </div>`
      }
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

  private goToButtonPage(event: any) {
    let page = 1;
    const buttonValue = event.target.attributes["page-value"].value;
    if(buttonValue != null) {
      page = parseInt(buttonValue, 10);
    }
    this.setPageNumber(page);
  }

  private setPageNumber(page: any) {
    let setPage = page;
    if(setPage < 1) {
      setPage = 1;
    }
    if(setPage > this.totalPages) {
      setPage = this.totalPages;
    }
    const params = new URLSearchParams(window.location.search);
    params.set('p', setPage);
    this.currentPage = setPage;
    window.history.pushState(
      {},
      '',
      `/${this.faqPagePath}?${params.toString()}`
    );
    window.dispatchEvent(new Event('popstate'));
  }

  private loadPostPage() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('p');
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
      `${this.apiWordpress.url}/ufaq?page=${page}${searchParams}${categoryParams}&per_page=${this.postsPerPage}`
    )
      .then(response => {
        if(response.status === 200) {
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
        } else {
          return response.json();
        }
      })
      .then(response => {
        // Set page to 1 if invalid page number.
        if(response.code && response.code === "rest_post_invalid_page_number") {
          this.setPageNumber(1);
        } else if (!response.code && typeof response !== 'undefined') {
          this.faqPosts = response;
        }
      });
  }
}
