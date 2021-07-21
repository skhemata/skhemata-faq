import { html } from '@skhemata/skhemata-base';
import '../skhemata-faq.js';
import { argTypes, ArgTypes, Story } from './argTypes';

export default {
  title: 'Wordpress/SkhemataFaq/SkhemataFaqCategories',
  component: 'skhemata-faq',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    faqPagePath: argTypes.faqPagePath,
    navigate: argTypes.navigate,
    skhemataFaqCategoriesBackgroundColor:
      argTypes.skhemataFaqCategoriesBackgroundColor,
    skhemataFaqCategoriesTextColor: argTypes.skhemataFaqCategoriesTextColor,
  },
};

const Template: Story<ArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2',
  },
  faqPagePath = '',
  skhemataFaqCategoriesTextColor,
  skhemataFaqCategoriesBackgroundColor,
}: ArgTypes) => html`
  <style>
    body {
      --skhemata-faq-categories-text-color: ${skhemataFaqCategoriesTextColor};
      --skhemata-faq-categories-background-color: ${skhemataFaqCategoriesBackgroundColor};
    }
  </style>
  <skhemata-faq-categories
    .apiWordpress=${apiWordpress}
    .faqPagePath=${faqPagePath}
  >
  </skhemata-faq-categories>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2',
  },
};
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-faq-categories
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(
    /"/g,
    '\\"'
  )}"
  faq-page-path=""
>
</skhemata-faq-categories>
      `,
    },
  },
};
