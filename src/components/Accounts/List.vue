<template>
  <section class="vw_accounts__list">
    <VWSection title="List of Accounts">
      <!-- component -->
      <div class="vw-table">
      <div class="vw-table__control vw-table__control--justify-between">
        <div class="vw-table__control-col">
          <b-button
            v-if="cUserRole !== 'Staff'"
            class="vw-button vw-button--primary vw-button--large"
            v-b-modal.modalAddStaff
          >
          Add new Staff
          </b-button>
        </div>
        <div class="vw-table__control-col vw-table__control-col--50">
          <TableSearch :query.sync="query" />
        </div>
      </div>
      <div class="vw-table__table">
        <b-table
          show-empty
          responsive
          tbody-tr-class="vw-table__table-row"
          :items="items"
          :filter="query"
          :fields="fields"
          :per-page="itemsPerPage"
          :current-page="currentPage"
          :busy="loading"
        >
          <TableLoading slot="table-busy" />
          <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
          <template slot="user" slot-scope="data">
            <span class="vw-table__table-influencer-avatar">
              <img :src="data.item.avatar ? data.item.avatar : 'https://via.placeholder.com/32/666'" :alt="data.item.fullName">
            </span>
            <router-link class="vw-table__table-link" :to="{ name: 'user-detail', params: { sid: data.item._id} }">
              {{ data.item.fullName }}
            </router-link>
            </template>
          <template slot="email"></template>
          <template slot="role" slot-scope="data">
            <span v-for="(role,index) in data.item.roles" :key="index" class="vw-staff__role" :class="{'text-danger': role.name === 'Admin'}" >
              {{ role.name }}
            </span>
          </template>
          <template slot="permissions" slot-scope="data">
            <div v-for="(role,index) in data.item.roles" :key="index" class="vw-staff__permisions" >
              <div v-for="(item, index) in role.permissions" :key="index" class="vw-tag" >
                <span class="vw-tag__label">{{ item.name }}</span>
              </div>
            </div>
          </template>
          <template slot="time_added" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
          <template slot="actions" slot-scope="data">
            <TableActon :item="data.item" :buttons="buttons"></TableActon>
          </template>
        </b-table>
      </div>
      <div class="vw-table__control vw-table__control--footer vw-table__control--justify-end vw-table__control--align-center" v-if="!isBusy">
        <div class="vw-table__control-col vw-table__control-col--pull-left">
          <TableCounter :total="total" />
        </div>
        <div class="vw-table__control-col">
          <TableItemsPerPage
            :itemsPerPage.sync="itemsPerPage"
            :optionItemsPerPage="optionItemsPerPage"
          />
        </div>
        <div class="vw-table__control-col">
          <TablePagination
            :currentPage.sync="currentPage"
            :total="total"
            :itemsPerPage="itemsPerPage"/>
        </div>
      </div>
    </div>
    <!-- component -->
    </VWSection>
     <!--- modal-->
    <VWAddStaff v-if="currentUser" />
  </section>
</template>

<script>
import {
  tableItemsPerPage,
  modalConfirmConfig
} from '@/variables'

import {
  MAKE_TOAST
} from '@/store/action-types'
import { mapState, mapActions } from 'vuex'
import { size, head } from 'lodash'

export default {
  name: 'ListOfAccounts',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    VWAddStaff: () => import('./modal/AddStaff')
  },
  data () {
    return {
      query: '',
      isBusy: false,
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: '',
      items: [],
      fields: [
        { key: 'id', label: '#', class: 'id-column text-center' },
        { key: 'user', label: 'User', class: 'user-column', sortable: true },
        { key: 'email', label: 'Email', class: 'email-column', sortable: true },
        { key: 'role', label: 'Role', class: 'role-column', sortable: true },
        { key: 'permissions', label: 'Permissions', class: 'permissions-column' },
        { key: 'time_added', label: 'Time Added', class: 'time-added-column', sortable: true },
        { key: 'actions', label: '', class: 'actions-column' }
      ],
      buttons: [
        {
          title: 'Remove',
          handler: (i, event, payload) => {
            this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
              .then(value => {
                if (payload) {
                  // this.removeReport(payload._id)
                  let currentUserRole = this.currentUser.roleName
                  let rowRole = head(payload.roles).name
                  if (rowRole !== currentUserRole) {
                    const res = this.removeStaffById({ cid: this.currentUser.client._id, sid: payload._id })
                    if (res) {
                      this.makeToast({
                        title: 'Remove a Staff is successful!!!',
                        variant: 'success'
                      })
                    } else {
                      this.makeToast({
                        title: 'Remove a Staff is failed!',
                        variant: 'danger'
                      })
                    }
                  }
                }
              })
              .catch(err => {
              // An error occurred
                console.log(err)
              })
          }
        }
      ]
    }
  },
  watch: {
    '$route': '_initStaff'
  },
  computed: {
    ...mapState({
      loading: state => state.clients.loading,
      staff: state => state.clients.staffs,
      currentUser: state => state.user.currentUser,
      cUserRole: state => state.user.currentUser.roleName
    }),
    total () {
      return size(this.staff)
    }
  },
  methods: {
    ...mapActions({
      fetchAllStaff: 'clients/getStaffByCId',
      removeStaffById: 'clients/removeStaffById',
      getLoggedUserData: 'user/getLoggedUserData',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    async _initStaff () {
      await this.getLoggedUserData()
      let res = await this.fetchAllStaff(this.currentUser.client._id)
      if (res.data.statusCode === 200) {
        this.items = this.staff
      }
    }
  },
  mounted () {
    this._initStaff()
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/base/variables';
  .vw-tag {
    display: inline-block;
    align-items: center;
    color: $color-main;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: $color-app-bg;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }
  .permissions-column{
    max-width: 30rem;
  }
  .vw-staff__role {
    color: $color-success
  }
.vw_accounts__list{
  .role-column {
    width: 8.875rem
  }
  .user-column{
    width: 25rem;
    .vw-table__table-influencer-avatar {
      display: block;
      float: left;
      margin-right: 8px;
    }
    .vw-table__table-link{
      display: block;
      float: left;
      line-height: 34px
    }
  }
}
</style>
