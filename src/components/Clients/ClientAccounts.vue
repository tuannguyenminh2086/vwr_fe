<template>
   <div class="vw-table">
    <div class="vw-table__control vw-table__control--justify-between">
      <div class="vw-table__control-col">
        <b-button
          v-if="$user.get().role === 'Super Admin'"
          class="vw-button vw-button--primary vw-button--large"
          :to="{ name: 'client-staff-add' }">
          Add new User
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
        :items="staffs"
        :fields="fields"
        :filter="query"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :per-page="itemsPerPage"
        :current-page="currentPage"
        :busy="loading">
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="user" slot-scope="data">
           <router-link class="vw-table__table-link" :to="{ name: 'client-staff-detail', params: { sid: data.item._id} }">
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
        <template slot="createdAt" slot-scope="data"> {{ data.item.createdAt | convertDate }}</template>
        <template slot="active" slot-scope="data">
          <toggle-button
            v-model= 'data.item.status'
            color="#FFF"
            switch-color="#1EC53B"
            :height="20"
            :width="40"
            @change="onChangeEventHandler(data.item)"
          />
        </template>
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
          :itemsPerPage="itemsPerPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  tableItemsPerPage,
  modalConfirmConfig
} from '@/variables'
import {
  MAKE_TOAST
} from '@/store/action-types'

import { ToggleButton } from 'vue-js-toggle-button'
import { mapState, mapActions } from 'vuex'
import { size } from 'lodash'

export default {
  name: 'ClientAccounts',
  components: {
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    ToggleButton
  },
  data () {
    return {
      query: '',
      isBusy: false,
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: '',
      sortBy: 'createdAt',
      sortDesc: true,
      items: [],
      fields: [
        { key: 'id', label: '#', class: 'id-column text-center' },
        { key: 'user', label: 'User', class: 'user-column', sortable: true },
        { key: 'email', label: 'Email', class: 'email-column', sortable: true },
        { key: 'role', label: 'Role', class: 'role-column', sortable: true },
        { key: 'permissions', label: 'Permissions', class: 'permissions-column' },
        { key: 'createdAt', label: 'Time Added', class: 'time-added-column', sortable: true },
        { key: 'active', label: 'Active', class: 'actions-column', sortable: true },
        { key: 'actions', label: '', class: 'actions-column' }
      ],
      buttons: [
        {
          title: 'Remove',
          handler: (i, event, payload) => {
            if (this.$user.get().role === 'Super Admin') {
              this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
                .then(value => {
                  if (payload) {
                    const res = this.removeStaffById({ cid: this.$route.params.id, sid: payload._id })
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
                })
                .catch(err => {
                // An error occurred
                  console.log(err)
                })
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.clients.loading,
      staffs: state => state.clients.staffs
    }),
    total () {
      return size(this.staffs)
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      getClientById: 'clients/getClientById',
      getStaffByCId: 'clients/getStaffByCId',
      removeStaffById: 'clients/removeStaffById',
      inactiveStaffById: 'clients/inactiveStaffById'
    }),
    fetchData () {
      let { id } = this.$route.params
      if (typeof id !== 'undefined') {
        this.getClientById(id)
        this.getStaffByCId(id)
      }
    },
    onChangeEventHandler (payload) {
      if (this.$user.get().role === 'Super Admin') {
        this.inactiveStaffById({ cid: this.$route.params.id, sid: payload._id })
      }
    }
  },
  created () {
    this.fetchData()
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
</style>
