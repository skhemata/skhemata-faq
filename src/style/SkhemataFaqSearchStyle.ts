/**
 * 
 * Lit Faq Post Styles
 * 
 */

import { css, CSSResult } from '@skhemata/skhemata-base';

export const SkhemataFaqSearchStyles = <CSSResult> css`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
  }

  .search-control {
    position: relative;
  }

  fa-icon {
    width: 30px;
    display: inline-block;
    position: absolute;
    top: 15px;
    right: 20px;
    pointer-events: none;
  }

  fa-icon::slotted(*){
    color: rgba(10, 10, 10, 0.05);
  }

  #search-input {
    padding-right: 60px;
  }
`;
