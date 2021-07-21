import { TemplateResult } from '@skhemata/skhemata-base';

export interface API {
  url?: string;
}

export interface ArgTypes {
  apiWordpress?: API;
  postsPerPage?: number;
  faqPagePath?: string;
  postPagePath?: string;
  slug?: string;
  skhemataFaqTextColor?: string;
  skhemataFaqLinkColor?: string;
  skhemataFaqListTitleColor?: string;
  skhemataFaqCategoriesBackgroundColor: string;
  skhemataFaqCategoriesTextColor: string;
}

export interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
  parameters?: any;
}

const category = {
  attributes: 'HTML Attributes',
  events: 'Events',
};

export const argTypes = {
  apiWordpress: {
    name: 'api-wordpress',
    control: 'object',
    table: {
      category: category.attributes,
      type: {
        summary: 'object',
        detail: `
{ 
  url: string
}
`,
      },
    },
    description: 'Wordpress API Object',
  },
  postsPerPage: {
    name: 'posts-per-page',
    control: 'number',
    table: {
      category: category.attributes,
      type: {
        summary: 'number',
      },
    },
    description:
      'Number of posts that initially display, and that load when "Show More..." is clicked',
  },
  faqPagePath: {
    name: 'faq-page-path',
    table: {
      category: category.attributes,
      type: {
        summary: 'string',
      },
    },
    description: 'The url path the faq component is embedded on',
  },
  slug: {
    name: 'slug',
    control: 'text',
    table: {
      category: category.attributes,
      type: {
        summary: 'string',
      },
    },
    description: 'The slug of the faq post to display',
  },
  navigate: {
    name: 'navigate',
    table: {
      category: category.events,
      type: {
        summary: 'event',
        detail: `
{
  detail: { 
    slug: string
  }
}
`,
      },
    },
    description: `Fires when link is clicked.`,
  },
  skhemataFaqTextColor: {
    name: '--skhemata-faq-text-color',
    control: 'color',
    description: 'Color of the normal text',
    defaultValue: 'rgb(92, 98, 101)',
    table: {
      category: 'CSS Properties',
      type: 'color',
    },
  },
  skhemataFaqLinkColor: {
    name: '--skhemata-faq-link-color',
    control: 'color',
    description: 'Text color of the links',
    defaultValue: 'rgb(50, 149, 220)',
    table: {
      category: 'CSS Properties',
      type: 'color',
    },
  },
  skhemataFaqListTitleColor: {
    name: '--skhemata-faq-list-title-color',
    control: 'color',
    description: 'Color of the normal text',
    defaultValue: 'rgb(50, 149, 220)',
    table: {
      category: 'CSS Properties',
      type: 'color',
    },
  },
  skhemataFaqCategoriesTextColor: {
    name: '--skhemata-faq-categories-text-color',
    control: 'color',
    description: 'Color of the text',
    defaultValue: 'rgba(0, 0, 0, 0.7)',
    table: {
      category: 'CSS Properties',
      type: 'color',
    },
  },
  skhemataFaqCategoriesBackgroundColor: {
    name: '--skhemata-faq-categories-background-color',
    control: 'color',
    description: 'Color of the background',
    defaultValue: 'rgb(245, 245, 245)',
    table: {
      category: 'CSS Properties',
      type: 'color',
    },
  },
};
