/**
 *
 * Lit Blog Post Styles
 *
 */

import { css, CSSResult } from '@skhemata/skhemata-base';

export const SkhemataFaqPostStyles = <CSSResult>css`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
    background-color: #ffffff;
    border: 1px solid var(--lighter-grey-color);
    border-radius: 4px;
    padding: 1rem 30px 30px 30px;
    margin-top: 3rem;
  }

  button.back-button.is-link.is-rounded {
    background-color: var(--skhemata-faq-post-back-button-background-color, rgb(50, 115, 220));
    color: var(--skhemata-faq-post-back-button-color, white);
  }


  .faq-info {
    margin-bottom: 2rem;
    margin-top: -3rem;
    text-align: left;
    font-size: 14px;
  }

  .faq-user {
    margin-bottom: 7px;
  }

  .faq-author-avatar {
    margin-bottom: 1.5rem;
  }

  .faq-tags {
    font-size: 14px;
  }
  .answer figure,
  .answer img {
    max-width: 95%;
  }

  .faq-post-content.content h1,
  .faq-post-content.content h2,
  .faq-post-content.content h3,
  .faq-post-content.content h4,
  .faq-post-content.content h5,
  .faq-post-content.content h6,
  .faq-post-title.title {
    color: var(--skhemata-faq-post-heading-color, rgb(54, 54, 54));
  
  `;
