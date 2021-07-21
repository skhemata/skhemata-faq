import { html } from '@skhemata/skhemata-base';
import '../skhemata-faq.js';
import { argTypes, ArgTypes, Story } from './argTypes.js';

export default {
  title: 'Wordpress/SkhemataFaq/SkhemataFaqPost',
  component: 'skhemata-faq',
  argTypes: {
    apiWordpress: argTypes.apiWordpress,
    faqPagePath: argTypes.faqPagePath,
    navigate: argTypes.navigate,
    slug: argTypes.slug,
    skhemataFaqTextColor: argTypes.skhemataFaqTextColor,
    skhemataFaqLinkColor: argTypes.skhemataFaqLinkColor,
    skhemataFaqPostBackButtonColor: {
      name: '--skhemata-faq-post-back-button-color',
      control: 'color',
      description: 'Text color of the back button on the faq post',
      defaultValue: 'rgb(255, 255, 255)',
      table: {
        category: 'CSS Properties',
        type: 'color',
      },
    },
    skhemataFaqPostBackButtonBackgroundColor: {
      name: '--skhemata-faq-post-back-button-background-color',
      control: 'color',
      description: 'Background color of the back button on the faq post',
      defaultValue: 'rgb(50, 115, 220)',
      table: {
        category: 'CSS Properties',
        type: 'color',
      },
    },
    skhemataFaqPostHeadingColor: {
      name: '--skhemata-faq-post-heading-color',
      control: 'color',
      description: 'Color of the content headings',
      defaultValue: 'rgb(54, 54, 54)',
      table: {
        category: 'CSS Properties',
        type: 'color',
      },
    },
  },
};

interface SkhemataFaqPostArgTypes extends ArgTypes {
  skhemataFaqPostHeadingColor?: string;
  skhemataFaqPostBackButtonColor?: string;
  skhemataFaqPostBackButtonBackgroundColor?: string;
  skhemataFaqPostSocialIconColor?: string;
}

const Template: Story<SkhemataFaqPostArgTypes> = ({
  apiWordpress = {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2',
  },
  faqPagePath = '',
  slug = 'thrinacia-atlas-hosting-questions',
  skhemataFaqTextColor,
  skhemataFaqLinkColor,
  skhemataFaqPostHeadingColor,
  skhemataFaqPostBackButtonColor,
  skhemataFaqPostBackButtonBackgroundColor,
}: SkhemataFaqPostArgTypes) => html`
  <style>
  body {
    --skhemata-faq-link-color: ${skhemataFaqLinkColor};
    --skhemata-faq-text-color: ${skhemataFaqTextColor};
    --skhemata-faq-post-heading-color: ${skhemataFaqPostHeadingColor};
    --skhemata-faq-post-back-button-color: ${skhemataFaqPostBackButtonColor};
    --skhemata-faq-post-back-button-background-color: ${skhemataFaqPostBackButtonBackgroundColor};
  }
  </style>
  <skhemata-faq-post
    .apiWordpress=${apiWordpress}
    .faqPagePath=${faqPagePath}
    .slug=${slug}
  >
  </skhemata-faq>
`;

export const Example = Template.bind({});
Example.args = {
  apiWordpress: {
    url: 'https://wp.thrinacia.com/wp-json/wp/v2',
  },
  slug: 'thrinacia-atlas-hosting-questions',
};
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-faq-post
  api-wordpress="${JSON.stringify(Example.args.apiWordpress, null, 2).replace(
    /"/g,
    '\\"'
  )}"
  slug="${Example.args.slug}"
>
</skhemata-faq-post>
      `,
    },
  },
};
