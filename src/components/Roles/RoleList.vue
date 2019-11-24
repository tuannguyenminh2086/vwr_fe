<template>
  <section class="vw_role__list">
    <VWSection title="Role list">
    <!-- component -->
    <div class="vw-table">
    <div class="vw-table__control vw-table__control--justify-between">
      <div class="vw-table__control-col">
        <b-button class="vw-button vw-button--primary vw-button--large" >Add new Role</b-button>
      </div>
      <div class="vw-table__control-col vw-table__control-col--50">
        <TableSearch :query.sync="query" @onInput="handleQueryChange" @onClear="handleClearSearch" />
      </div>
    </div>
    <div class="vw-table__table">
      <b-table
        show-empty
        responsive
        tbody-tr-class="vw-table__table-row"
        :items="roles"
        :fields="fields"
        :per-page="itemsPerPage"
        :busy="isBusy"
        @sort-changed="handleSortChange">
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="role" slot-scope="data">{{ data.item.name }}</template>
        <template slot="permissions" slot-scope="data">
          <div v-for="(item, index) in data.value" :key="index" class="vw-tag" >
            <span class="vw-tag__label">{{ item.name }}</span>
          </div>
        </template>
        <template slot="timeAdded" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
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
          @onChange="handlePerPageChange" />
      </div>
      <div class="vw-table__control-col">
        <TablePagination
          :currentPage.sync="currentPage"
          :total="total"
          :itemsPerPage="itemsPerPage"
          @onChange="handlePaginationChange"/>
      </div>
    </div>
  </div>
    <!-- component -->
    </VWSection>
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
import { debounce } from 'lodash'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  name: 'RoleList',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    ToggleButton
  },
  computed: {
    ...mapState({
      isBusy: state => state.roles.loading,
      total: state => state.roles.totalDocs,
      roles: state => state.roles.items
    })
  },
  data () {
    return {
      reports: [],
      fields: [
        {
          key: 'id',
          label: '#',
          class: 'id-column text-center'
        },
        {
          key: 'role',
          label: 'Role',
          class: 'role-column',
          sortable: true
        },
        {
          key: 'permissions',
          label: 'Permissions',
          tdClass: 'text-left',
          class: 'permissions-column',
          sortable: true
        },
        {
          key: 'timeAdded',
          label: 'Time Added',
          class: 'time-added-column',
          sortable: true
        },
        {
          key: 'active',
          label: 'Active',
          class: 'active-column',
          sortable: true
        },
        {
          key: 'actions',
          label: '',
          class: 'actions-column'
        }
      ],
      query: '',
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: '',
      editItem: undefined,
      buttons: [
        {
          title: 'Remove',
          handler: (i, event, payload) => {
            this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
              .then(value => {
                if (value && payload) {}
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
  methods: {
    ...mapActions({
      fetchAllRoles: 'roles/fetchAllRoles',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    handleQueryChange: debounce(function () {}, 1500),
    handleClearSearch () {},
    handleSortChange (ctx) {},
    handlePaginationChange () {},
    handlePerPageChange () {},
    retrieveRoles () {
      let options = `limit=${this.itemsPerPage}`
      options += `&offset=${(this.currentPage - 1) * this.itemsPerPage}`
      options += this.sort ? `&sort=${this.sor}` : ''
      options += this.query ? `&query=${this.query}` : ''
      this.fetchAllRoles(options)
    },
    onChangeEventHandler (data) {
      console.log(data)
    }
  },
  created () {
    this.retrieveRoles()
  }
}
</script>

<style lang="scss">
  @import './../../assets/scss/base/variables';
  .vw_role__list {
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
  }
</style>
