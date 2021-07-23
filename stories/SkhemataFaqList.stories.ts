import { html } from '@skhemata/skhemata-base';
import '../skhemata-faq.js';
import { argTypes, ArgTypes, Story } from './argTypes.js';

export default {
  title: 'Wordpress/SkhemataFaq/SkhemataFaqList',
  component: 'skhemata-faq',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    postsPerPage: argTypes.postsPerPage,
    pagerType: argTypes.pagerType,
    navigate: argTypes.navigate,
    skhemataFaqTextColor: argTypes.skhemataFaqTextColor,
    skhemataFaqListTitleColor: argTypes.skhemataFaqListTitleColor,
  },
};

const Template: Story<ArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2',
  },
  postsPerPage = 10,
  pagerType = '',
  skhemataFaqTextColor,
  skhemataFaqListTitleColor,
}: ArgTypes) => html`
  <style>
    body {
      --skhemata-faq-text-color: ${skhemataFaqTextColor};
      --skhemata-faq-list-title-color: ${skhemataFaqListTitleColor};
    }
  </style>
  <skhemata-faq-list
    .apiWordpress=${apiWordpress}
    .postsPerPage=${postsPerPage}
    .pagerType=${pagerType}
  >
  </skhemata-faq-list>
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
<skhemata-faq-list
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(
    /"/g,
    '\\"'
  )}"
  posts-per-page="${Example.args.postsPerPage}"
  pager-type="${Example.args.pagerType}"
>
</skhemata-faq-list>
      `,
    },
  },
};
