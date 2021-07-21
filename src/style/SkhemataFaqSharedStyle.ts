/**
 *
 * Lit Faq Post Styles
 *
 */

import { css } from '@skhemata/skhemata-base';

export const SkhemataFaqSharedStyles = css`
  :host {
    display: block;

    --default-text-color: var(--skhemata-faq-text-color, #5c6365);
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

    color: var(--default-text-color);
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  em {
    color: var(--default-text-color);
  }

  h3.title {
    color: var(--skhemata-faq-post-heading-color);
  }

  a {
    color: #3295dc;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  a:hover {
    color: #1c77b9;
  }

  .card {
    color: var(--default-text-color);
  }

  .faq-category-item {
    display: inline;
    color: rgb(50, 149, 220);
    transition: all 0.3s ease 0s;
    cursor: pointer;
  }

  .faq-category-item:hover {
    color: rgb(28, 119, 185);
  }

  .faq-tags > a {
    color: var(--skhemata-faq-link-color, rgb(50, 149, 220));
  }

  p {
    margin: 0 0 1em;
  }

  pre {
    margin: 0 0 1em;
  }
`;
