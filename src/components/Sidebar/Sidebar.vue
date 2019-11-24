<template>
  <aside class="vw-sidebar">
    <div class="vw-sidebar__logo">
      <div class="vw-sidebar__logo-icon">
        <LogoIcon color="white" :width="47" :height="41" />
      </div>
      <div class="vw-sidebar__app-info">
        <Logo class="vw-sidebar__app-name" color="white" :width="77" :height="12" font-size="0.75rem" />
      </div>
    </div>
    <div class="vw-sidebar__menu">
      <!-- Group menu -->
      <div class="vw-sidebar__menu-group" v-for="group in roleMenus" :key="group.groupId" :class="group.class" >
        <div class="vw-sidebar__menu-group-label">{{ group.groupLabel }}</div>
        <!-- Group sub menu -->
        <div class="vw-sidebar__menu-list">
          <router-link
            v-for="item in group.menuList"
            :key="item.menuId"
            :class="item.permissions"
            :to='item.menuUrl'
            class="vw-sidebar__menu-link"
            active-class="vw-sidebar__menu-link--active"
          >
            <span class="vw-sidebar__menu-link-icon" v-if="item.menuIcon">
              <Icon :name="item.menuIcon"/>
            </span>
            <span class="vw-sidebar__menu-link-label">{{ item.menuLabel }}</span>
          </router-link>

          <router-link
            v-if="group.groupLabel==='SETTINGS'"
            to="/login"
            class="vw-sidebar__menu-link"
          >
            <span class="vw-sidebar__menu-link-icon">
              <Icon name="logout"/>
            </span>
            <span class="vw-sidebar__menu-link-label">Logout</span>
          </router-link>
        </div>
         <!--// Group sub menu -->
      </div>
      <!--// Group menu -->
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sidebar',
  components: {
    LogoIcon: () => import('@/components/Logo/LogoIcon.vue'),
    Logo: () => import('@/components/Logo/Logo.vue'),
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  computed: {
    ...mapState({
      userRole: state => state.user.currentUser.roleName
    })
  },
  data () {
    return {
      menus: [
        {
          groupId: 1,
          groupLabel: 'MANAGEMENT',
          class: 'vv-roles_role__client',
          role: 'CLIENT',
          menuList: [
            {
              menuId: 11,
              menuLabel: 'Network',
              menuIcon: 'network',
              menuUrl: '/network',
              permissions: 'staff'
            },
            {
              menuId: 12,
              menuLabel: 'Campaign',
              menuIcon: 'campaign',
              menuUrl: '/campaign',
              permissions: 'admin'
            },
            {
              menuId: 13,
              menuLabel: 'Report',
              menuIcon: 'report',
              menuUrl: '/reports',
              permissions: 'admin'
            }
          ]
        },
        {
          groupId: 2,
          groupLabel: 'MANAGEMENT',
          class: 'vv-roles_role__admin',
          role: 'ADMIN',
          menuList: [
            {
              menuId: 21,
              menuLabel: 'Influencer',
              menuIcon: 'campaign',
              menuUrl: '/influencers'
            },
            {
              menuId: 22,
              menuLabel: 'Clients',
              menuIcon: 'accounts',
              menuUrl: '/clients'
            }
          ]
        },
        {
          groupId: 3,
          groupLabel: 'Client',
          class: 'vv-roles_role__admin',
          role: 'ADMIN',
          menuList: [
            {
              menuId: 31,
              menuLabel: 'Roles',
              menuIcon: 'roles',
              menuUrl: '/roles',
              permissions: 'admin'
            }
          ]
        },
        {
          groupId: 4,
          groupLabel: 'SETTINGS',
          class: 'vv-roles_role__client vv-roles_role__client-settings',
          role: 'CLIENT',
          menuList: [
            {
              menuId: 41,
              menuLabel: 'Data hub',
              menuIcon: 'data-hub',
              menuUrl: '/data-hub',
              permissions: 'admin'
            },
            {
              menuId: 42,
              menuLabel: 'Account',
              menuIcon: 'account',
              menuUrl: '/account',
              permissions: 'admin'
            },
            {
              menuId: 43,
              menuLabel: 'Account',
              menuIcon: 'account',
              menuUrl: '/account/detail',
              permissions: 'staff'
            }
          ]
        },
        {
          groupId: 5,
          groupLabel: 'SETTINGS',
          class: 'vv-roles_role__admin',
          role: 'ADMIN',
          menuList: [
            {
              menuId: 51,
              menuLabel: 'Profile',
              menuIcon: 'account',
              menuUrl: '/profile'
            }
          ]
        }
      ],
      roleMenus: []
    }
  },
  watch: {
    userRole: {
      handler: function () {
        this.renderMenuByRole()
      },
      deep: true
    }
  },
  methods: {
    renderMenuByRole () {
      if (!this.userRole) return
      let { menus } = this
      switch (this.userRole) {
        case 'Staff':
        case 'Admin':
          this.roleMenus = menus.filter(menu => menu.role === 'CLIENT')
          break
        case 'Super Admin':
          this.roleMenus = menus.filter(menu => menu.role === 'ADMIN')
          break
      }
    }
  },
  mounted () {
    this.renderMenuByRole()
  }
}
</script>
<style src="./Sidebar.scss" lang="scss" scoped></style>
