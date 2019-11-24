<template>
  <section class="vw_accounts__detail">
    <VWSection :title="title">
      <b-container fluid >
        <!-- Content here -->
        <b-row>
          <b-col md="4" v-if="userData">
            <VWAccountInfo label="ID" :text="clientID" :action="idAction" :owner="isOwner" />
            <VWAccountInfo label="Username" :text="userData.fullName" :action="usernameAction" :owner="isOwner" />
            <VWAccountInfo label="Email" :text="userData.email" :action="emailAction" :owner="isOwner" />
            <VWAccountInfo label="Password" text="1234" type="password" :action="pwAction" :owner="isOwner" />
            <VWPermissionsInfo
              v-if="roleName !== 'Super Admin'"
              label="Permissions"
              :permissions="permissions"
              :action="pwPermissions"
              :readonly="roleName === 'Staff'"
            />
          </b-col>
          <b-col md="4" lg="4" xl="2" class="d-flex flex-column" v-if="userData">
            <VMProfileAvatar :avatar-url="userData.avatar" :name="userData.fullName" :owner="isOwner" :user-data="userData" />
            <div class="vw_accounts__detail_role" :class="roleClass">{{roleName}}</div>
          </b-col>
        </b-row>
      </b-container>
    </VWSection>
    <!-- modal-->
    <VMModalChangeEmail  v-if="isOwner" :user-data="userData"/>
    <VMModalChangeUsername v-if="isOwner" :user-data="userData"/>
    <VMModalChangePassword  v-if="isOwner" :user-data="userData"/>
    <VMModalForgotPassword  v-if="isOwner" :user-data="userData"/>
    <VMModalEditPermission  v-if="isOwner" :user-data="userData"/>
  </section>
</template>

<script>
import {
  MAKE_TOAST
} from '@/store/action-types'
import { head, uniq } from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountDetail',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    VWAccountInfo: () => import('./elements/DisplayInfo'),
    VWPermissionsInfo: () => import('./elements/Permissions'),
    VMModalChangeEmail: () => import('./modal/ChangeEmail'),
    VMModalChangeUsername: () => import('./modal/ChangeUsername'),
    VMModalChangePassword: () => import('./modal/ChangePassword'),
    VMModalForgotPassword: () => import('./modal/ForgotPwd'),
    VMModalEditPermission: () => import('./modal/EditPermissions'),
    VMProfileAvatar: () => import('./elements/ProfileAvatar')
  },
  data () {
    return {
      title: '',
      idAction: {
        title: 'Copy ID',
        desc: 'Click to Copy ID',
        handler: (i, event) => {
          if (this.userData.client && this.userData.client.client_id !== '') {

          }
          this.copyToClipboard(this.userData.client.client_id)
        }
      },
      usernameAction: {
        title: 'Change username',
        desc: 'Click to change your username',
        handler: (i, event) => {
          this.$bvModal.show('modalChangeUsername')
        }
      },
      emailAction: {
        title: 'Change email',
        desc: 'Click to change your email',
        handler: (i, event) => {
          this.$bvModal.show('modalChangeEmail')
        }
      },
      pwAction: {
        title: 'Change password',
        desc: 'Click to change your password',
        handler: (i, event) => {
          this.$bvModal.show('modalChangePassword')
        }
      },
      permissions: [],
      pwPermissions: {
        title: 'Edit',
        desc: 'Click to edit',
        handler: (i, event) => {
          this.$bvModal.show('modalEditPermissions')
        }
      },
      roleClass: '',
      isOwner: true,
      userData: null,
      roleName: ''
    }
  },
  computed: {
    ...mapState({
      loading: state => state.user.loading,
      detail: state => state.user.currentUser,
      croleName: state => state.user.currentUser.roleName
    }),
    clientID () {
      if (!this.userData.client) {
        return ''
      } else {
        return this.userData.client.client_id
      }
    }
  },
  watch: {
    '$route': 'initSettingDetail'
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      getLoggedUserData: 'user/getLoggedUserData',
      getUserById: 'user/getUserById',
      fetchAllPermisions: 'roles/fetchAllPermisions'
    }),
    checkIsOwner () {
      if (this.userData && this.detail) {
        if (this.userData._id === this.detail._id) {
          this.isOwner = true
        } else {
          this.isOwner = false
        }
      }
    },
    async initSettingDetail () {
      // get user data
      await this.getLoggedUserData()
      const resp = await this.fetchAllPermisions()
      // check type
      if (this.$route.params.sid && this.$route.meta.viewUser) {
        const userResp = await this.getUserById(this.$route.params.sid)
        // console.log(userResp)
        if (userResp.statusCode === 200) {
          this.userData = Object.assign({}, userResp.data)
        } else {
          this.$route.push('/account')
        }
      } else {
        if (this.detail) {
          this.userData = Object.assign({}, this.detail)
        }
      }
      // update style Class for role
      this.roleName = head(this.userData.roles).name
      this.roleClass += head(this.userData.roles).name === 'Staff' ? '' : 'is-admin'
      // update page title
      switch (this.roleName) {
        case 'Staff':
          this.title = 'Staff account'
          break
        default:
          this.title = 'Admin account'
          break
      }
      // init permission list
      let permissionData = resp.data
      let permissionsList = head(this.userData.roles).permissions
      permissionsList.forEach((permission, idx) => {
        permissionData.forEach((item, idx) => {
          if (item._id === permission) {
            this.permissions.push(item.name)
          }
        })
      })
      // uniqe data
      this.permissions = uniq(this.permissions)
      // check is owner
      this.checkIsOwner()
    },
    async copyToClipboard (str) {
      try {
        await navigator.clipboard.writeText(str)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSettingDetail()
    })
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/base/variables';

.vw_accounts__detail {
  .vw-section .vw-section__content {
    padding: 4rem;
  }
  .vw_profile__avatar { margin: 0 auto }
  .vw_accounts__detail_role {
    border-radius: 4px;
    background: rgba(18, 175, 45, 0.2);
    color: $color-success;
    display: inline-block;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    text-align: center;
    margin: 1rem auto;
    padding: 0.375rem 2rem;
    &.is-admin {
      background: rgba(255, 59, 48, 0.2);
      color: $color-warning;
    }
  }
}
</style>
