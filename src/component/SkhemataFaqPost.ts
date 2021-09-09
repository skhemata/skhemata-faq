/**
 *
 * Lit Faq Post Element
 *
 */

// Import litelement base class, html helper function & typescript decorators
import { SkhemataBase, property, html, CSSResult } from '@skhemata/skhemata-base';

// Import custom style elements
import { SkhemataFaqPostStyles } from '../style/SkhemataFaqPostStyle';
import { SkhemataFaqSharedStyles } from '../style/SkhemataFaqSharedStyle';

// Import custom font awesome dependencies
import { faCalendarAlt, faUser, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';

// Import custom element directives
import { stringToHtml } from '@skhemata/skhemata-base/dist/directives/stringToHtml.js';
import { decodeHtmlEntities } from '@skhemata/skhemata-base/dist/directives/decodeHtmlEntities.js';
import { translationEngDefault } from '../translation/SkhemataFaqPost/eng';

export class SkhemataFaqPost extends SkhemataBase {

  @property({ type: Object, attribute: 'api-wordpress' })
  apiWordpress = {
    url: ''
  };

  @property({ type: String, attribute: 'faq-page-path' })
  faqPagePath = '';

  @property({ type: Boolean, attribute: 'has-featured-image' })
  hasFeaturedImage = false;

  // Component specific properties
  @property({ type: String })
  slug: String | undefined = '';

  @property({ type: Object })
  private faqPost: any;

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault
  };

  static get styles() { 
    return <CSSResult[]> [
      ...super.styles,
      SkhemataFaqPostStyles,
      SkhemataFaqSharedStyles
    ];
  }

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  constructor(){
    super();
    window.onhashchange = () => {
      this.shadowRoot.getElementById(window.location.hash.slice(1)).scrollIntoView()
    }
  }

  handleGoBack() {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {
          slug: '',
        },
        composed: true,
        bubbles: true,
      })
    );
  }

  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */
  protected render() {
    return this.faqPost ? html`
        <div class="faq-info">
          <figure class="faq-author-avatar image is-64x64">
            <img
              class="is-rounded"
              src="${this.faqPost.author.avatar_urls[96]}"
              alt="avatar"
            />
          </figure>
          <div class="faq-user">By ${this.faqPost.author.name}</div>
          <div><fa-icon .icon=${faCalendarAlt}></fa-icon> ${this.faqPost.date}</div>
        </div>
      <h3 class="title is-4">${decodeHtmlEntities(this.faqPost.title)}</h3>
      <div class="answer is-size-6 content">
        ${this.faqPost.content ? stringToHtml(this.faqPost.content) : null}
      </div>
      <div class="columns">
            <div class="column">
              <button
                class="button back-button is-link is-rounded"
                @click=${this.handleGoBack}
              >
                ${this.getStr('SkhemataFaqPost.backToFaq')}
              </button>
            </div>
          </div>
      <div class="columns">
      ${console.log(this.faqPost.tags)}
        <div class="column faq-tags">
        ${this.faqPost.tags
          ?
            html`<fa-icon .icon=${faFolder}></fa-icon> ${this.getStr('SkhemataFaqPost.categories')}: ${
            this.faqPost.tags[0].map(
                (item: any, index: Number, arr: any) => html`
                  <a
                    value=${item.id}
                    @click="${() => {
                      this.filterPostsBy(item.id, 't');
                    }}"
                    @keydown=${(e: any) => {
                      if (e.keyCode === '13')
                        this.filterPostsBy(item.id, 't');
                    }}
                  >
                    ${item.name}</a>${arr.length > 1 && arr.length - 1 !== index
                    ? html`, `
                    : html``}
                `
              )}`
            : ''}
        </div>
      </div>
    ` : html``;
  }

  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */
  async firstUpdated() {
    await super.firstUpdated();
    this.getPost();
  }

  /**
   * Fetch a single post based on post id from WP REST API
   */
  private getPost() {
    if (typeof this.slug !== 'undefined') {
      // Use fetch method to make a request
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      fetch(`${this.apiWordpress.url}/ufaq?_embed&slug=${this.slug}`)
        .then(response => {
          const contentType = response.headers.get('Content-Type');

          // Check if response header content type is json
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          // Throw error if above condition isn't met
          throw new TypeError('The format is not JSON.');
        })
        .then((data: any) => {
          const postData = data[0];
          if (postData && postData.status === 'publish') {
            // Pass data to Object to be used to bind data on the template
            this.faqPost = {
              id: postData.id,
              title: postData.title.rendered,
              content: postData.content.rendered.replaceAll('href="#', `href="${window.location.href}#`),
              excerpt: postData.excerpt.rendered,
              date: this.formatDate(postData.date),
              author: postData._embedded.author[0],
              tags: postData._embedded['wp:term']
            };
            console.log(this.faqPost);
            this.setMetaTags();
          }
        });
    }
  }
  
  private formatDate = (date: string) => {
    const dateObj = new Date(date);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      dateObj
    );
    return `${month} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
  };
  
  /**
   * Sets the meta tags for the head
   */
  setMetaTags() {
    const metaDesc = document.querySelector("meta[name='description' i]");
    const excerpt = this.faqPost.excerpt.replace(/<[^>]*>?/gm, '');
    if (metaDesc) {
      metaDesc.setAttribute('content', excerpt);
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = excerpt;
      document.getElementsByTagName('head')[0].appendChild(newMetaDesc);
    }

    const title = document.querySelector("title");
    if (title) {
      title.innerHTML = this.faqPost.title;
    } else {
      const newTitle = document.createElement('title');
      newTitle.innerHTML = this.faqPost.title;
      document.getElementsByTagName('head')[0].appendChild(newTitle);
    }

  }

  filterPostsBy(id: string, queryId: string) {
    const params = new URLSearchParams(window.location.search);
    if (params.get(queryId) === id) {
      params.delete(queryId);
    } else {
      params.set(queryId, id);
    }
    window.history.pushState(
      {},
      '',
      decodeURIComponent(`${this.faqPagePath}?${params.toString()}`)
    );
    window.scrollTo({ top: 0 });

    window.dispatchEvent(new Event('popstate'));
  }
}
