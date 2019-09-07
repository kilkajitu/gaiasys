interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItemsAdmin: NavData[] = [
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-home',
    children: [
      {
        name: 'ToolGroups',
        url: '/home/toolgroups',
        icon: 'icon-layers'
      },
      {
        name: 'Tools',
        url: '/home/tools',
        icon: 'icon-basket-loaded'
      },
      {
        name: 'Assign User',
        url: '/home/assign',
        icon: 'icon-user-follow'
      }
    ]
  }
];
export const navItemsUser: NavData[] = [
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-home',
    children: [
      {
        name: 'User',
        url: '/home/user',
        icon: 'icon-user'
      }
    ]
  }
];
