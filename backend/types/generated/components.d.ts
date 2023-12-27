import type { Schema, Attribute } from '@strapi/strapi';

export interface IconCountry extends Schema.Component {
  collectionName: 'components_icon_countries';
  info: {
    displayName: 'Country';
    icon: 'picture';
    description: '';
  };
  attributes: {
    flag: Attribute.Media;
    url: Attribute.String;
    name: Attribute.String;
    info: Attribute.String;
  };
}

export interface IconLogo extends Schema.Component {
  collectionName: 'components_icon_logos';
  info: {
    displayName: 'Logo';
    icon: 'picture';
  };
  attributes: {
    logo: Attribute.Media;
    name: Attribute.String;
  };
}

export interface NavigationNavLink extends Schema.Component {
  collectionName: 'components_navigation_nav_links';
  info: {
    displayName: 'NavLink';
    icon: 'link';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    page: Attribute.Relation<
      'navigation.nav-link',
      'oneToOne',
      'api::page.page'
    >;
  };
}

export interface PageRichText extends Schema.Component {
  collectionName: 'components_page_rich_texts';
  info: {
    displayName: 'Rich Text';
    description: '';
  };
  attributes: {
    TextInstance: Attribute.Blocks;
    year: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'icon.country': IconCountry;
      'icon.logo': IconLogo;
      'navigation.nav-link': NavigationNavLink;
      'page.rich-text': PageRichText;
    }
  }
}
