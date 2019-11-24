export default {
  name: 'sidebar',
  components: {
    LogoIcon: () => import('@/components/Logo/LogoIcon.vue'),
    Logo: () => import('@/components/Logo/Logo.vue'),
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  data () {
    return {
      menu: [
        {
          groupId: 1,
          groupLabel: 'MANAGEMENT',
          class: 'vv-roles_role__client',
          menuList: [
            {
              menuId: 1,
              menuLabel: 'Network',
              menuIcon: 'network',
              menuUrl: '/network',
              roles: ['client']
            },
            {
              menuId: 2,
              menuLabel: 'Campaign',
              menuIcon: 'campaign',
              menuUrl: '/campaign',
              roles: ['client']
            },
            {
              menuId: 3,
              menuLabel: 'Report',
              menuIcon: 'report',
              menuUrl: '/reports',
              roles: ['client']
            }
          ]
        },
        {
          groupId: 2,
          groupLabel: 'MANAGEMENT',
          class: 'vv-roles_role__admin',
          menuList: [
            {
              menuId: 1,
              menuLabel: 'Influencer',
              menuIcon: 'campaign',
              menuUrl: '/influencers',
              roles: ['admin']
            },
            {
              menuId: 2,
              menuLabel: 'Clients',
              menuIcon: 'accounts',
              menuUrl: '/clients',
              roles: ['admin']
            }
          ]
        },
        {
          groupId: 3,
          groupLabel: 'ADMIN',
          class: 'vv-roles_role__admin',
          menuList: [
            {
              menuId: 1,
              menuLabel: 'Roles',
              menuIcon: 'roles',
              menuUrl: '/roles',
              roles: 'admin'
            }
          ]
        },
        {
          groupId: 4,
          groupLabel: 'SETTINGS',
          class: 'vv-roles_role__client',
          menuList: [
            {
              menuId: 1,
              menuLabel: 'Data hub',
              menuIcon: 'data-hub',
              menuUrl: '/data-hub',
              roles: 'admin'
            },
            {
              menuId: 2,
              menuLabel: 'Account',
              menuIcon: 'account',
              menuUrl: '/account'
            },
            {
              menuId: 4,
              menuLabel: 'Logout',
              menuIcon: 'logout',
              menuUrl: '/logout'
            }
          ]
        },
        {
          groupId: 5,
          groupLabel: 'SETTINGS',
          class: 'vv-roles_role__admin',
          menuList: [
            {
              menuId: 3,
              menuLabel: 'Profile',
              menuIcon: 'account',
              menuUrl: '/profile'
            },
            {
              menuId: 4,
              menuLabel: 'Logout',
              menuIcon: 'logout',
              menuUrl: '/logout'
            }
          ]
        }
      ]
    }
  }
}
