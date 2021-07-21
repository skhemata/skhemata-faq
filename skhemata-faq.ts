import { SkhemataFaq } from './src/SkhemataFaq';
import { SkhemataFaqPost } from './src/component/SkhemataFaqPost';
import { SkhemataFaqList } from './src/component/SkhemataFaqList';
import { SkhemataFaqSearch } from './src/component/SkhemataFaqSearch';
import { SkhemataFaqCategories } from './src/component/SkhemataFaqCategories';

window.customElements.define('skhemata-faq', SkhemataFaq);
window.customElements.define('skhemata-faq-post', SkhemataFaqPost);
window.customElements.define('skhemata-faq-search', SkhemataFaqSearch);
window.customElements.define('skhemata-faq-list', SkhemataFaqList);
window.customElements.define('skhemata-faq-categories', SkhemataFaqCategories);
