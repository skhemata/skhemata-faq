import { html } from '@skhemata/skhemata-base';
import '../skhemata-faq.js';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'Wordpress/SkhemataFaq/SkhemataFaq',
  component: 'skhemata-faq',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    postsPerPage: argTypes.postsPerPage,
    pagerType: argTypes.pagerType,
    faqPagePath: argTypes.faqPagePath,
    slug: argTypes.slug,
    navigate: argTypes.navigate,
    skhemataFaqTextColor: argTypes.skhemataFaqTextColor,
    skhemataFaqListTitleColor: argTypes.skhemataFaqListTitleColor,
    skhemataFaqCategoriesTextColor: argTypes.skhemataFaqCategoriesTextColor,
    skhemataFaqCategoriesBackgroundColor:
      argTypes.skhemataFaqCategoriesBackgroundColor,
  },
};

const Template: Story<ArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2',
  },
  faqPagePath = '',
  postsPerPage = 10,
  pagerType = '',
  slug = '',
  skhemataFaqTextColor,
  skhemataFaqListTitleColor,
  skhemataFaqCategoriesTextColor,
  skhemataFaqCategoriesBackgroundColor,
}: ArgTypes) => html`
  <style>
    body {
      --skhemata-faq-text-color: ${skhemataFaqTextColor};
      --skhemata-faq-list-title-color: ${skhemataFaqListTitleColor};
      --skhemata-faq-categories-text-color: ${skhemataFaqCategoriesTextColor};
      --skhemata-faq-categories-background-color: ${skhemataFaqCategoriesBackgroundColor};
    }
  </style>
  <skhemata-faq
    .apiWordpress=${apiWordpress}
    .faqPagePath=${faqPagePath}
    .postsPerPage=${postsPerPage}
    .pagerType=${pagerType}
    .slug=${slug}
  >
  </skhemata-faq>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2',
  },
  postsPerPage: 10,
  pagerType: "infinite",
};

Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-faq
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(
    /"/g,
    '\\"'
  )}"
  faq-page-path=""
  posts-per-page="${Example.args.postsPerPage}"
  pager-type="${Example.args.pagerType}"
  slug=""
>
</skhemata-faq>
      `,
    },
  },
};
