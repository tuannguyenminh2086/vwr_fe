<template>
  <section class="vw_report__list vw-table">
    <div class="vw-table__table">
      <b-table
        id="my-table"
        show-empty
        responsive
        tbody-tr-class="vw-table__table-row"
        :items="postData"
        :fields="fields"
        :per-page="itemsPerPage"
        :current-page="currentPage"
        :busy="isBusy">
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="influencer" slot-scope="data">
          <span class="vw-table__table-influencer">
            <a :href="data.item.postLink" target="_blank" title="" class="vw-table__table-link">{{ data.item.postLink }}</a>
          </span>
        </template>
        <template slot="engagement" slot-scope="data">{{ data.item.postEngagement | formatNumber}}</template>
        <template slot="view" slot-scope="data">{{ data.item.postView | formatNumber }}</template>
        <template slot="actualCost" slot-scope="data">{{ data.item.actualCost | currency('$ ', 0, { decimalSeparator: ',' }) }}</template>
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
          :optionItemsPerPage="optionItemsPerPage"/>
      </div>
      <div class="vw-table__control-col">
        <TablePagination
          :currentPage.sync="currentPage"
          :total="total"
          :itemsPerPage="itemsPerPage"/>
      </div>
    </div>
  </section>
</template>

<script>
import {
  tableItemsPerPage,
  reportDetailTableFields,
  modalConfirmConfig
} from '@/variables'
import { size } from 'lodash'
export default {
  name: 'ReportInfluencerList',
  components: {
    TableCounter: () => import('@/components/Table/Counter'),
    TableItemsPerPage: () => import('@/components/Table/ItemsPerPage'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableActon: () => import('@/components/Elements/ActionListButton'),
    TableLoading: () => import('@/components/Table/Loading')
  },
  props: {
    postData: {
      type: Array
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    total () {
      return size(this.postData)
    }
  },
  data () {
    return {
      fields: reportDetailTableFields,
      postList: [],
      query: '',
      isBusy: false,
      currentPage: 1,
      itemsPerPage: 10,
      optionItemsPerPage: tableItemsPerPage,
      sort: '',
      buttons: [
        {
          title: 'Remove',
          handler: (i, event, payload) => {
            if (this.readonly) return false
            this.$bvModal.msgBoxConfirm('Remove! Are you sure?', modalConfirmConfig)
              .then(value => {
                this.$emit('deletePostHandle', payload)
              })
              .catch(err => {
              // An error occurred
                console.log(err)
              })
          }
        }
      ]
    }
  }
}
</script>

<style>

</style>
