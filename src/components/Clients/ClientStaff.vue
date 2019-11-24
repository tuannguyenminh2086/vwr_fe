<template>
  <section class="vw_clients__list">
    <VWSection :title="pageTitle">
      <section v-if="loading">
        <VWLoading />
      </section>
      <section class="vw__form" v-else>
        <b-container fluid class="">
          <b-row>
            <b-col>
              <b-form-group
                id="label-staff_name"
                label="User name"
                label-for="staff_name"
                label-class="vw-form__label"
                class="vw-form__group"
                :state="!errors.has('name')"
                :invalid-feedback="errors.first('name')"
              >
                <b-form-input
                  id="staff_name"
                  name="name"
                  type="text"
                  v-model.trim="staff.name"
                  class="vw-form__control"
                  v-validate="'required'"
                  :readonly="isDetailMode && !editable"
                  placeholder="Enter user name"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors.first('name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="label-staff_client"
                label="Client"
                label-for="staff_client"
                label-class="vw-form__label"
                class="vw-form__group"
              >
                <b-form-input
                  id="staff_client"
                  name="client"
                  type="text"
                  :readonly="true"
                  v-model.trim="clientInfo.name"
                  class="vw-form__control"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!--- row 2-->
          <b-row>
            <b-col>
              <b-form-group
                id="label-staff_email"
                label="Email"
                label-for="staff_email"
                label-class="vw-form__label"
                class="vw-form__group"
                :state="!errors.has('email')"
                :invalid-feedback="errors.first('email')"
              >
                <b-form-input
                  id="staff_email"
                  name="email"
                  type="email"
                  v-model.trim="staff.email"
                  class="vw-form__control"
                  v-validate="'required'"
                  :readonly="isDetailMode && !editable"
                  placeholder="Enter email"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors.first('email') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="label-staff_type"
                label="Type"
                label-for="staff_type"
                label-class="vw-form__label"
                class="vw-form__group"
                :disabled="roleOpts.length == 1"
                :state="!errors.has('type')"
                :invalid-feedback="errors.first('type')"
              >
                <b-form-select v-model="staff.type" :options="roleOpts" size="lg"></b-form-select>
                <b-form-invalid-feedback>
                  {{ errors.first('type') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6" v-if="!isDetailMode">
              <b-form-group
                id="label-staff_pwd"
                label="Password"
                label-for="staff_pwd"
                label-class="vw-form__label"
                class="vw-form__group"
                :state="!errors.has('pwd')"
                :invalid-feedback="errors.first('pwd')"
              >
                <b-form-input
                  id="staff_pwd"
                  name="pwd"
                  type="password"
                  v-model.trim="staff.pwd"
                  class="vw-form__control"
                  v-validate="'required'"
                  :readonly="isDetailMode && !editable"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors.first('pwd') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </section>
      <!-- footer-->
      <section class="vw_form-footer">
        <b-row>
          <b-col class="text-right">
            <div class="" v-if="isDetailMode">
              <div  v-if="!editable">
                <b-button class="vw-button vw-button--primary vw-button--large" @click="handleEditClick">Edit</b-button>
              </div>
              <div v-else>
                <b-button class="vw-button vw-button--primary vw-button--large"  @click="handleSaveClick">
                  <b-spinner small v-if="loading"></b-spinner>
                  <span v-else>Save</span>
                </b-button>
                 <b-button class="vw-button vw-button--outline-secondary vw-button--large btn-secondary" @click="handleCancelClick">Cancel</b-button>
              </div>
            </div>
            <div class="" v-else>
            <b-button class="vw-button vw-button--primary vw-button--large"  @click="handleSaveClick">
              <b-spinner small v-if="loading"></b-spinner>
              <span v-else>Save</span>
            </b-button>
            <b-button class="vw-button vw-button--outline-secondary vw-button--large btn-secondary" @click="handleCancelClick">Cancel</b-button>
            </div>
          </b-col>
        </b-row>
      </section>
    </VWSection>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { isEmpty, head } from 'lodash'
import {
  ADD_CHILD_BREADCRUMB,
  UPDATE_BREADCRUMB,
  MAKE_TOAST
} from '@/store/action-types'

export default {
  name: 'ClientStaff',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    VWLoading: () => import('@/components/Loading/Loading.vue')
  },
  data () {
    return {
      pageTitle: '',
      editable: false,
      loading: false,
      staff: {
        name: '',
        email: '',
        type: null,
        pwd: ''
      },
      roleOpts: [{ value: null, text: 'Please select an option' }],
      isDetailMode: false,
      client: null,
      hasAdmin: false
    }
  },
  computed: {
    ...mapState({
      roles: state => state.roles.items,
      clientInfo: state => state.clients.detail
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      getClientById: 'clients/getClientById',
      createNewStaff: 'clients/createUserForClient',
      fetchAllRoles: 'roles/fetchAllRoles',
      getUserById: 'user/getUserById',
      updateUserById: 'user/updateUserById',
      updateClientAdminRole: 'clients/updateClientAdminRole',
      add_child_breadcrumb: `breadcrumb/${ADD_CHILD_BREADCRUMB}`,
      updateBreadcrumb: `breadcrumb/${UPDATE_BREADCRUMB}`
    }),
    handleReset () {},
    handleEditClick () {
      this.editable = !this.editable
    },
    handleCancelClick () {},
    async handleSaveClick () {
      if (this.$user.get().role === 'Super Admin') {
        const isValid = await this.$validator.validateAll()
        if (isValid) {
          let { name, email, type } = this.staff
          let payload = {
            fullName: name,
            email: email,
            roles: []
          }
          payload.roles = this.roles.filter(role => role._id === type)
          // hi hi
          if (this.isDetailMode) {
            // update mode
            payload = Object.assign({}, payload, { _id: this.$route.params.sid })
            if (this.hasAdmin) {
              this.makeToast({
                title: 'We can only have one Admin. Please another type',
                variant: 'danger'
              })
              return
            }
            if (!this.loading) {
              let res = await this.updateUserById(payload)
              if (res) {
                this.makeToast({
                  title: 'Update a Staff is successful!!!',
                  variant: 'success'
                })
                this.$router.push({ name: 'clients' })
              } else {
                this.makeToast({
                  title: 'Update a Staff is failed!',
                  variant: 'danger'
                })
              }
            }
          } else {
            // save new
            payload = Object.assign({}, payload, { password: this.staff.pwd })
            // go
            if (!this.loading) {
              let res = await this.createNewStaff({ payload, cid: this.client._id })
              if (res) {
                this.makeToast({
                  title: 'Create a Staff is successful!!!',
                  variant: 'success'
                })
                this.$router.push({ name: 'clients' })
              } else {
                this.makeToast({
                  title: 'Create a Staff is failed!',
                  variant: 'danger'
                })
              }
            }
          }
        }
      }
    },
    async retrieveRoles () {
      if (this.roles) {
        if (this.clientInfo && !isEmpty(this.clientInfo.users)) {
          let { users } = this.clientInfo
          let promises = []
          users.forEach(user => {
            promises.push(this.getUserById(user).then(res => {
              return head(res.data.roles).name
            }))
          })
          Promise.all(promises).then(roleNames => {
            if (roleNames.findIndex(k => k === 'Admin') > -1) {
              this.hasAdmin = true
              let rolesListWithOutSA = this.roles.filter(role => role.name !== 'Super Admin')
              if (!this.isDetailMode && this.hasAdmin) {
                rolesListWithOutSA = rolesListWithOutSA.filter(role => role.name !== 'Admin')
              }
              // console.log(rolesListWithOutSA)
              rolesListWithOutSA.forEach(role => {
                this.roleOpts.push({ value: role._id, text: role.name })
              })
            }
          }).catch(error => console.error(error))
        }
      }
    },
    retrieveStaffDetail (payload) {
      let { email, fullName, roles } = payload.data
      this.staff.name = fullName
      this.staff.email = email
      this.staff.type = head(roles)._id
      this.pwd = '**********'
    },
    renderPageName () {
      if (this.isDetailMode) {
        this.updateBreadcrumb([
          { id: 1, label: 'Clients', url: '/clients' },
          { id: 2, label: this.clientInfo.name, url: `/clients/client/${this.clientInfo._id}` },
          { id: 3, label: this.staff.name, url: '' }
        ])
        this.pageTitle = 'Edit user'
      } else {
        this.updateBreadcrumb([
          { id: 1, label: 'Clients', url: '/clients' },
          { id: 2, label: this.clientInfo.name, url: `/clients/client/${this.clientInfo._id}` },
          { id: 3, label: 'Add new User', url: '' }
        ])
        this.pageTitle = 'Add new user'
      }
    },
    async fetchdata () {
      this.loading = true
      let res = null
      if (typeof this.$route.params.id !== 'undefined') {
        try {
          await this.getClientById(this.$route.params.id)
          if (typeof this.$route.params.sid !== 'undefined') {
            this.isDetailMode = true
            res = await this.getUserById(this.$route.params.sid)
          }
        } catch (e) {
          console.error(e)
        } finally {
          const rolesResp = await this.fetchAllRoles()
          if (rolesResp.success) {
            this.retrieveRoles()
          }
          if (res && res.success) {
            this.retrieveStaffDetail(res)
          }
          this.renderPageName()
          this.loading = false
        }
      }
    }
  },
  created () {
    this.fetchdata()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/base/_variables.scss';

.vw_form{
  &-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    padding: 2rem 0 1.5rem;
    border-top: 0.0625rem solid $color-border;
  }
}
.custom-select-lg{
  font-size: 0.8125rem;
  height: 48px;
}
</style>
