<template>
  <section class="vw_datahub_list">
    <VWSection :title="'Type: ' + pageTitle">
      <!-- statistic component -->
      <b-container fluid >
        <!-- campaign header -->
        <b-row class="vw-campaign__header">
          <b-col lg="2" md="3" >
            <b-button
              v-if="croleName != 'Staff'"
              class="vw-button vw-button--primary vw-button--large mb-3 mb-sm-3 mb-md-0"
              v-b-modal.modalAddCate
            >
             Add new Category
            </b-button>
          </b-col>
          <b-col lg="6" md="6" offset-md="3" offset-lg="4">
            <TableSearch :query.sync="query" @onClear="handleClearSearch"></TableSearch>
          </b-col>
        </b-row>
        <!-- campaign header -->
        <!-- campaign body -->
        <b-row class="vw-campaign__body pt-4 ">
          <b-col class="vw-table">
            <div class="vw-table__table">
              <b-table
                show-empty
                responsive
                tbody-tr-class="vw-table__table-row"
                :items="hub"
                :fields="fields"
                :busy="isBusy"
                :current-page="currentPage"
                :filter="query"
              >
                <TableLoading slot="table-busy" />
                <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
                <template slot="label" slot-scope="data">
                  {{ data.item.label }}
                </template>
                <template slot="createdAt" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
                <template slot="actions" slot-scope="data">
                  <TableActon :item="data.item" :buttons="buttons"></TableActon>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
        <!-- campaign body -->
      </b-container>
      <!-- statistic component -->
    </VWSection>
     <!--- modal -->
    <AddCateModal :type-id="$route.params.id" @retrieveCate="fetchData"></AddCateModal>
    <UpdateAType :item="editItem" v-if="editItem"></UpdateAType>
  </section>
</template>

<script>
import { tableItemsPerPage, modalConfirmConfig } from '@/variables'
import { mapState, mapActions } from 'vuex'
import { isEmpty } from 'lodash'
import {
  ADD_CHILD_BREADCRUMB
} from '@/store/action-types'

export default {
  name: 'DataHubType',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    TableSearch: () => import('@/components/Table/Search'),
    TableLoading: () => import('@/components/Table/Loading'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    AddCateModal: () => import('./modal/AddNewCate'),
    UpdateAType: () => import('./modal/UpdateAType')
  },
  data () {
    return {
      items: [],
      fields: [
        { key: 'id', label: '#', class: 'id-column text-center' },
        { key: 'label', label: 'Category', class: 'label-column', tdClass: 'type-column-td', sortable: true },
        { key: 'createdAt', label: 'Time Added', class: 'time-added-column', sortable: true },
        { key: 'actions', label: '', class: 'actions-column' }
      ],
      hub: null,
      isBusy: false,
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: '',
      query: '',
      editItem: {},
      pageTitle: '',
      cid: '',
      buttons: [{
        title: 'Edit',
        handler: (i, event, payload) => {
          if (!isEmpty(payload)) {
            this.editItem = Object.assign({}, payload)
            this.$bvModal.show('modalUpdateType')
          }
        }
      },
      {
        title: 'Remove',
        handler: (i, event, payload) => {
          this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
            .then(value => {
              console.log(value)
            })
            .catch(err => {
              // An error occurred
              console.log(err)
            })
        }
      }]
    }
  },
  computed: {
    ...mapState({
      // typeDetail: state => state.dataHub.typeDetail
      croleName: state => state.user.currentUser.roleName
    })
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions({
      add_child_breadcrumb: `breadcrumb/${ADD_CHILD_BREADCRUMB}`,
      initTypeDetail: 'dataHub/initTypeDetail'
    }),
    handleClearSearch () {
      this.query = ''
    },
    async fetchData () {
      let { id, item, cid } = this.$route.params
      let res = await this.initTypeDetail(id)
      if (typeof item === 'undefined' || !cid || !id) {
        this.$router.push('/data-hub')
      } else {
        this.hub = res.data
        this.pageTitle = item.label
        this.cid = cid
        this.add_child_breadcrumb({ label: item.label })
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
.vw-table .table {
  .label-column {
    width: 80%;
  }
}
</style>
