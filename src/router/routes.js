// route level code-splitting
// this generates a separate chunk (view-[request].[hash].js) for this route
// which is lazy-loaded when the route is visited.
const lazyLoad = view => () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
const lazyLoadComp = component => () => import(`@/components/${component}`)

const routes = [
  {
    path: '/',
    name: 'home',
    component: lazyLoad('Master'),
    meta: {
      requiresAuth: true
    },
    redirect: 'network',
    children: [
      {
        path: '/network',
        name: 'network',
        component: lazyLoad('Network'),
        meta: {
          requiresAuth: true,
          listBreadcrumb: [
            {
              id: 1,
              label: 'Network',
              url: '/network'
            }
          ]
        }
      },
      {
        path: '/network/:id',
        name: 'influencer-detail',
        component: lazyLoad('InfluencerDetail'),
        meta: {
          requiresAuth: true,
          listBreadcrumb: [
            {
              id: 1,
              label: 'Network',
              url: '/network'
            },
            {
              id: 2,
              label: 'Influencer\'s profile',
              url: 'javascript:void(0);'
            }
          ]
        }
      },
      {
        path: '/campaign',
        name: 'campaign',
        component: lazyLoad('Campaign'),
        meta: {
          requiresAuth: true,
          view: 'CLIENT',
          listBreadcrumb: [
            {
              id: 1,
              label: 'Campaign',
              url: '/campaign'
            }
          ]
        }
      },
      {
        path: '/campaign/create',
        name: 'campaign-create',
        component: lazyLoad('CampaignDetail'),
        props: { campaignType: 'create' },
        meta: {
          requiresAuth: true,
          // listBreadcrumb will be update on Component
          listBreadcrumb: [
            {
              id: 1,
              label: 'Campaign',
              url: '/campaign'
            }
          ]
        }
      },
      {
        path: '/campaign/detail/:id',
        name: 'campaign-detail',
        component: lazyLoad('CampaignDetail'),
        props: { campaignType: 'detail' },
        meta: {
          requiresAuth: true,
          // listBreadcrumb will be update on Component
          listBreadcrumb: [
            {
              id: 1,
              label: 'Campaign',
              url: '/campaign'
            }
          ]
        }
      },
      {
        path: '/reports',
        component: lazyLoad('Reports'),
        children: [
          {
            path: '',
            name: 'reports',
            component: lazyLoadComp('Report/ReportList'),
            props: { reportData: {} },
            meta: {
              requiresAuth: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Report',
                  url: '/reports'
                }
              ]
            }
          },
          {
            path: 'report/:id',
            name: 'detail-report',
            component: lazyLoadComp('Report/ReportCreate'),
            props: { reportData: { type: 'detail' } },
            meta: {
              requiresAuth: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Report',
                  url: '/reports'
                },
                {
                  id: 2,
                  label: '',
                  url: ''
                }
              ]
            }
          },
          {
            path: 'create',
            name: 'create-report',
            component: lazyLoadComp('Report/ReportCreate'),
            props: { reportData: { type: 'create' } },
            meta: {
              requiresAuth: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Report',
                  url: '/reports'
                },
                {
                  id: 2,
                  label: 'Create Report',
                  url: 'javascript:void(0);'
                }
              ]
            }
          }
        ]
      },
      {
        path: '/data-hub',
        component: lazyLoad('DataHub'),
        children: [
          {
            path: '',
            name: 'Data Hub',
            component: lazyLoadComp('DataHub/DataHubList'),
            meta: {
              requiresAuth: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Data Hub',
                  url: '/data-hub'
                }
              ]
            }
          },
          {
            path: ':id',
            name: 'data-cate',
            component: lazyLoadComp('DataHub/Type'),
            props: true,
            meta: {
              requiresAuth: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Data Hub',
                  url: '/data-hub'
                },
                {
                  id: 2,
                  label: '',
                  url: 'javascript:void(0);'
                }
              ]
            }
          }
        ]
      },
      {
        path: '/account',
        component: lazyLoad('Account'),
        children: [
          {
            path: '',
            name: 'accounts-admin',
            component: lazyLoadComp('Accounts/List'),
            requiresAuth: true,
            meta: {
              requiresAuth: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Accounts',
                  url: '/account'
                }
              ]
            }
          },
          {
            path: 'detail',
            name: 'account-detail',
            component: lazyLoadComp('Accounts/Detail'),
            meta: {
              requiresAuth: true,
              viewUser: false,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Accounts',
                  url: '/account'
                },
                {
                  id: 2,
                  label: 'Detail',
                  url: 'javascript:void(0);'
                }
              ]
            }
          },
          {
            path: 'detail/:sid',
            name: 'user-detail',
            component: lazyLoadComp('Accounts/Detail'),
            meta: {
              requiresAuth: true,
              viewUser: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Accounts',
                  url: '/account'
                },
                {
                  id: 2,
                  label: 'Detail',
                  url: 'javascript:void(0);'
                }
              ]
            }
          }
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: lazyLoadComp('Accounts/Detail'),
        meta: {
          requiresAuth: true,
          isSuperAdmin: true,
          listBreadcrumb: [
            {
              id: 1,
              label: 'Accounts',
              url: '/account'
            }
          ]
        }
      },
      {
        path: '/clients',
        component: lazyLoad('Clients'),
        children: [
          {
            path: '',
            name: 'clients',
            component: lazyLoadComp('Clients/ClientList'),
            meta: {
              requiresAuth: true,
              isSuperAdmin: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Clients',
                  url: '/clients'
                }
              ]
            }
          },
          {
            path: 'client/:id',
            name: 'client-detail',
            component: lazyLoadComp('Clients/ClientDetail'),
            props: true,
            meta: {
              requiresAuth: true,
              isSuperAdmin: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Clients',
                  url: '/clients'
                },
                {
                  id: 2,
                  label: '',
                  url: 'javascript:void(0);'
                }
              ]
            }
          },
          {
            path: 'client/:id/add',
            name: 'client-staff-add',
            component: lazyLoadComp('Clients/ClientStaff'),
            props: true,
            meta: {
              requiresAuth: true,
              isdetail: false,
              isSuperAdmin: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Clients',
                  url: '/clients'
                },
                {
                  id: 2,
                  label: '',
                  url: 'javascript:void(0);'
                }
              ]
            }
          },
          {
            path: 'client/:id/detail/:sid',
            name: 'client-staff-detail',
            component: lazyLoadComp('Clients/ClientStaff'),
            props: true,
            meta: {
              requiresAuth: true,
              isdetail: true,
              isSuperAdmin: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Clients',
                  url: '/clients'
                },
                {
                  id: 2,
                  label: '',
                  url: 'javascript:void(0);'
                }
              ]
            }
          }

        ]
      },
      {
        path: '/roles',
        component: lazyLoad('Roles'),
        children: [
          {
            path: '',
            name: 'roles',
            component: lazyLoadComp('Roles/RoleList'),
            meta: {
              requiresAuth: true,
              isSuperAdmin: true,
              listBreadcrumb: [
                {
                  id: 1,
                  label: 'Roles',
                  url: '/roles'
                }
              ]
            }
          }
        ]
      },
      {
        path: '/influencers',
        component: lazyLoad('Network'),
        name: 'Influencers',
        meta: {
          requiresAuth: true,
          isSuperAdmin: true,
          listBreadcrumb: [
            {
              id: 1,
              label: 'Influencers',
              url: '/influencers'
            }
          ]
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: lazyLoad('Login')
  },
  {
    path: '/forgot-password',
    name: 'forgot',
    component: lazyLoad('Forgot')
  },
  {
    path: '/reset-password',
    name: 'reset',
    component: lazyLoad('ResetPassword')
  },
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   component: lazyLoad('Logout'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/404',
    name: 'not-found',
    component: lazyLoad('NotFound')
  },
  {
    path: '*',
    redirect: { name: 'not-found' }
  }
]

export default routes
