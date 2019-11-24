<template>
  <section class="vw_datahub_list">
    <VWSection title="Data Hub">
      <!-- statistic component -->
      <b-container fluid >
        <!-- campaign header -->
        <b-row class="vw-campaign__header">
          <b-col lg="6" md="6" offset-md="6" offset-lg="6">
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
                :items="dataHubList"
                :fields="fields"
                :per-page="itemsPerPage"
                :current-page="currentPage"
                :busy="isloading"
                :filter="query">
                <TableLoading slot="table-busy" />
                <template slot="id" slot-scope="data">
                  {{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}
                </template>
                <template slot="label" slot-scope="data">
                  <router-link
                    class="vw-table__table-link"
                    :to="{ name: 'data-cate', params: { id: data.item._id, item: data.item, cid: cid } }"
                  >
                    {{ data.item.label }}
                  </router-link>
                </template>
                <template slot="data" slot-scope="data">
                  <span
                    v-for="s in data.item.data.slice(0,3)"
                    :key="s._id">
                     {{s.label}},
                  </span><span>...</span>
                </template>
                <template slot="createdAt" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
                <template slot="actions">
                  <TableActon :buttons="buttons"></TableActon>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
        <!-- campaign body -->
      </b-container>
      <!-- statistic component -->
    </VWSection>
  </section>
</template>

<script>
import { tableItemsPerPage } from '@/variables'
import { mapState, mapActions } from 'vuex'
import localforage from '../../services/storage'

export default {
  name: 'List',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    TableSearch: () => import('@/components/Table/Search'),
    TableLoading: () => import('@/components/Table/Loading'),
    TableActon: () => import('@/components/Elements/ActionListButton')
  },
  data () {
    return {
      items: [],
      fields: [
        { key: 'id', label: '#', class: 'id-column text-center' },
        { key: 'label', label: 'Type', class: 'type-column', tdClass: 'type-column-td', sortable: true },
        { key: 'data', label: 'Preview', class: 'preview-column', tdClass: 'preview-column', sortable: true },
        { key: 'createdAt', label: 'Time Added', class: 'time-added-column', sortable: true },
        { key: 'actions', label: '', class: 'actions-column' }
      ],
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: '',
      query: '',
      cid: '',
      buttons: [{
        title: 'Remove',
        handler: () => {
          console.log('remove')
        }
      }]
    }
  },
  computed: {
    ...mapState({
      dataHubList: state => state.dataHub.dataHubByClient,
      isloading: state => state.dataHub.loading
    })
  },
  methods: {
    ...mapActions({
      // initTypeDetail: 'dataHub/initTypeDetail',
      getDatatypes: 'dataHub/getDataHub'
    }),
    async fetchAllData () {
      this.cid = await localforage.getItem('company-id') || ''
      await this.getDatatypes()
    },
    handleClearSearch () {
      this.query = ''
    }
  },
  mounted () {
    // retrieved data hub
    this.fetchAllData()
  }
}
</script>

<style lang="scss">
.vw-table .table {
  .type-column {
    width: 20rem;
  }
}
</style>
