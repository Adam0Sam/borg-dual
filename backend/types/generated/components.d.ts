import type { Schema, Attribute } from '@strapi/strapi';

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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'navigation.nav-link': NavigationNavLink;
    }
  }
}
