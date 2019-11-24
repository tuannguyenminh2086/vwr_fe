<template>
  <section class="vw_clients__list">
    <VWSection title="Clients">
    <!-- component -->
    <div class="vw-table">
      <div class="vw-table__control vw-table__control--justify-between">
        <div class="vw-table__control-col">
          <b-button
            v-if="$user.get().role === 'Super Admin'"
            class="vw-button vw-button--primary vw-button--large"
            v-b-modal.modalAddClient
          >
            Add new Client
          </b-button>
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
          :items="filteredClients"
          :fields="fields"
          :per-page="itemsPerPage"
          :current-page="currentPage"
          :busy="isBusy"
          :filter="query"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
        >
          <TableLoading slot="table-busy" />
          <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
          <template slot="name" slot-scope="data">
            <router-link class="vw-table__table-link" :to="{ name: 'client-detail', params: { id: data.item._id } }">
              {{ data.item.name }}
            </router-link>
          </template>
          <template slot="clientId" slot-scope="data">
            {{ data.item.client_id }}
          </template>
          <template slot="createdAt" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
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
    <!-- component -->
    </VWSection>
    <!--- modal-->
    <VWAddClient @addPostHandle="addPostHandle"></VWAddClient>
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
import { env } from '@/config'
import { mapState, mapActions } from 'vuex'
import { debounce, filter, size } from 'lodash'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  name: 'ClientList',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    TableSearch: () => import('@/components/Table/Search'),
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    VWAddClient: () => import('./modal/addNewClient'),
    ToggleButton
  },
  data () {
    return {
      sortBy: 'createdAt',
      sortDesc: true,
      fields: [
        { key: 'id', label: '#', class: 'id-column text-center' },
        { key: 'name', label: 'Clients', class: 'clients-column', sortable: true },
        { key: 'clientId', label: 'ID', tdClass: 'text-left', class: 'clientid-column', sortable: true },
        { key: 'createdAt', label: 'Time Added', class: 'time-added-column', sortable: true },
        { key: 'active', label: 'Active', class: 'active-column time-added-column', sortable: true },
        { key: 'actions', label: '', class: 'actions-column' }
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
            if (this.$user.get().role === env.USER_ROLE_SUPER_ADMIN) {
              this.$bvModal.msgBoxConfirm(env.MESSAGE.REMOVE_MSG, modalConfirmConfig)
                .then(value => {
                  if (value && payload) {
                    this.removeClientById(payload._id)
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
      isBusy: state => state.clients.loading,
      clients: state => state.clients.items
    }),
    filteredClients () {
      let clients = this.clients
      if (clients) {
        return filter(clients, o => { return o.status !== 3 })
      }
      return []
    },
    total () {
      return size(this.filteredClients)
    }
  },
  methods: {
    ...mapActions({
      fetchAllClients: 'clients/fetchAllClients',
      removeClientById: 'clients/removeClientById',
      makeToast: `toast/${MAKE_TOAST}`
    }),
    addPostHandle () {},
    handleQueryChange: debounce(function () {
      this.retrieveClients()
    }, 1500),
    handleClearSearch () {
      this.query = ''
      this.retrieveClients()
    },
    handleSortChange (ctx) {
      this.sort = `${ctx.sortDesc ? '-' : ''}${ctx.sortBy}`
    },
    retrieveClients () {
      let options = `limit=${this.itemsPerPage}`
      options += `&offset=${(this.currentPage - 1) * this.itemsPerPage}`
      options += this.sort ? `&sort=${this.sor}` : ''
      options += this.query ? `&query=${this.query}` : ''
      this.fetchAllClients(options)
    },
    onChangeEventHandler (val) {
      console.log(val)
    }
  },
  created () {
    this.retrieveClients()
  }
}
</script>

<style lang="scss">
.active-column {
  width: 4rem
}
</style>
