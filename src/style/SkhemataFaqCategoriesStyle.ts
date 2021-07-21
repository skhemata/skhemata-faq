/**
 *
 * Lit Faq Categories Styles
 *
 */

import { css } from '@skhemata/skhemata-base';

export const SkhemataFaqCategoriesStyles = css`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
  }

  .category-item {
    margin-bottom: 10px;
    height: auto;
  }

  .category-item.active {
    background: lightgrey;
  }
  .category-item.active:hover {
    background: lightgrey;
  }

  .category-item:last-child {
    margin-bottom: 0;
  }

  button > span {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    button > span {
      max-width: 15em;
    }
  }

  .buttons {
    width: 100%;
  }

  .buttons > button.category-item.is-light {
    color: var(--skhemata-faq-categories-text-color, rgba(0, 0, 0, 0.74221));
    background-color: var(
      --skhemata-faq-categories-background-color,
      rgb(245, 245, 245)
    );
    margin-bottom: 10px;
    height: auto;
  }
`;
