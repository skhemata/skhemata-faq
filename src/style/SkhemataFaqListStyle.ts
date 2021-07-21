/**
 *
 * Lit Faq List Styles
 *
 * */

import { css } from '@skhemata/skhemata-base';

export const SkhemataFaqListStyles = css`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

    color: var(--default-text-color);
  }

  .faq-list button {
    padding: 1rem 1.3rem;
    height: auto;
    min-height: 2.5em;
    line-height: 1;
    text-align: left;
    justify-content: space-between;
  }

  .faq-entry {
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    padding: 1rem 1rem 1rem 1rem;
    margin-bottom: 1rem;
    margin-top: 0;
    cursor: pointer;
  }

  .article-date {
    margin-bottom: 1rem;
    font-size: 14px;
  }

  .faq-list button span {
    white-space: normal;
  }

  button.faq-item {
    box-shadow: 0 0 0 1px var(--lighter-grey-color);
    margin-bottom: 50px;
    border-radius: 4px;
    width: 100%;
    padding: 2rem;
  }

  .faq-item .card-content {
    padding: 60px;
  }

  .faq-author-info {
    margin-top: -80px;
    margin-bottom: 30px;
  }

  button.faq-title.is-ghost {
    text-decoration: none;
    margin-bottom: 10px;
    border: none;
  }

  button.faq-title.is-ghost:active {
    border: none;
  }

  .faq-entry > a {
    color: var(--skhemata-faq-list-title-color, rgb(50, 149, 220));
  }

  .faq-entry > a:hover {
    color: var(--skhemata-faq-list-title-color, rgb(50, 149, 220));
    opacity: 60%;
  }

  .faq-title .title {
    transition: all 0.3s ease 0s;
    color: rgb(50, 149, 220);
  }

  .faq-title .title:hover {
    color: rgb(28, 119, 185);
  }

  .faq-author-info .image {
    display: inline-block;
  }

  .faq-post-date {
    margin: 6px 0;
  }

  .faq-excerpt {
    margin-top: 15px;
  }

  .load-more-button {
    text-align: center;
  }

  .load-more-button .button {
    padding: 8px 28px;
  }
`;
