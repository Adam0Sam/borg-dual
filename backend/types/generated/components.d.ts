import type { Schema, Attribute } from '@strapi/strapi';

export interface EventEvent extends Schema.Component {
  collectionName: 'components_event_events';
  info: {
    displayName: 'Event';
    icon: 'calendar';
  };
  attributes: {
    year: Attribute.String;
    RichText: Attribute.Component<'page.rich-text', true>;
  };
}

export interface GalleryImageGallery extends Schema.Component {
  collectionName: 'components_gallery_image_galleries';
  info: {
    displayName: 'Image Gallery';
    icon: 'apps';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    info: Attribute.String;
    images: Attribute.Media;
  };
}

export interface HomeAlert extends Schema.Component {
  collectionName: 'components_home_alerts';
  info: {
    displayName: 'Alert';
    icon: 'earth';
  };
  attributes: {
    TextInstance: Attribute.Blocks;
  };
}

export interface HomeInfoColumn extends Schema.Component {
  collectionName: 'components_home_info_columns';
  info: {
    displayName: 'InfoColumn';
    icon: 'feather';
  };
  attributes: {
    image: Attribute.Media;
    name: Attribute.String;
    TextInstance: Attribute.Blocks;
  };
}

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
    description: '';
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
  };
}

export interface PublicationPublicationButton extends Schema.Component {
  collectionName: 'components_publication_publication_buttons';
  info: {
    displayName: 'Publication Button';
    icon: 'cursor';
  };
  attributes: {
    name: Attribute.String;
    PublicationLink: Attribute.Component<'publication.publication-link', true>;
  };
}

export interface PublicationPublicationLink extends Schema.Component {
  collectionName: 'components_publication_publication_links';
  info: {
    displayName: 'Publication Link';
    icon: 'link';
  };
  attributes: {
    name: Attribute.String;
    publication: Attribute.Relation<
      'publication.publication-link',
      'oneToOne',
      'api::publication.publication'
    >;
  };
}

export interface TaskTaskExample extends Schema.Component {
  collectionName: 'components_task_task_examples';
  info: {
    displayName: 'Task Example';
    icon: 'puzzle';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    info: Attribute.String;
    RichText: Attribute.Component<'page.rich-text', true>;
    cover: Attribute.Media;
  };
}

export interface TaskTaskLink extends Schema.Component {
  collectionName: 'components_task_task_links';
  info: {
    displayName: 'Task Link';
    icon: 'link';
  };
  attributes: {
    task: Attribute.Relation<'task.task-link', 'oneToOne', 'api::task.task'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'event.event': EventEvent;
      'gallery.image-gallery': GalleryImageGallery;
      'home.alert': HomeAlert;
      'home.info-column': HomeInfoColumn;
      'icon.country': IconCountry;
      'icon.logo': IconLogo;
      'navigation.nav-link': NavigationNavLink;
      'page.rich-text': PageRichText;
      'publication.publication-button': PublicationPublicationButton;
      'publication.publication-link': PublicationPublicationLink;
      'task.task-example': TaskTaskExample;
      'task.task-link': TaskTaskLink;
    }
  }
}
