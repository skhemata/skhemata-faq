import { html } from '@skhemata/skhemata-base';
import '../skhemata-faq.js';
import { argTypes, ArgTypes, Story } from './argTypes.js';

export default {
  title: 'Wordpress/SkhemataFaq/SkhemataFaqSearch',
  component: 'skhemata-faq',
  argTypes: {
    faqPagePath: argTypes.faqPagePath
  },
};

const Template: Story<ArgTypes> = ({
  faqPagePath = ''
}: ArgTypes) => html`
  <skhemata-faq-search
    faqPagePath=${faqPagePath}
  >
  </skhemata-faq-search>
`;

export const Example = Template.bind({});
Example.args = {
  faqPagePath: '',
}
Example.parameters = {
  docs: {
    source: {
      code: `
<skhemata-faq-search
  faq-page-path="${Example.args.faqPagePath}"
>
</skhemata-faq-search>
      `,
    },
  },
}