<template>
  <div class="vw-table vw-campaign__influencer-list">
    <div class="vw-table__table" id="campaign-filter-influencer-list">
      <b-table
        show-empty
        responsive
        tbody-tr-class="vw-table__table-row"
        :items="filterResult.list"
        :fields="fields"
        :per-page="itemsPerPage"
        :busy="isBusy"
        @sort-changed="handleSortChange">
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="influencer" slot-scope="data">
          <span class="vw-table__table-influencer">
            <span class="vw-table__table-influencer-avatar">
              <img :src="data.item.influencer.avatar ? data.item.influencer.avatar.thumbnailUrl : 'https://via.placeholder.com/32/666'" :alt="data.item.influencer.fullName">
            </span>
            <a class="vw-table__table-link vw-table__table-influencer-name" :href="`/network/${data.item.influencer._id}`" target="_blank" rel="noopener">{{ data.item.influencer.fullName }}</a>
            <span class="vw-table__table-influencer-social" v-if="data.item.platform">
              <Icon :name="`${data.item.platform.toLowerCase()}-circle`"></Icon>
            </span>
          </span>
        </template>
        <template slot="actions" slot-scope="data">
          <b-form-checkbox class="vw-table__table-checkbox" :checked="data.item.checked" @change="handleChecked(data.item)"></b-form-checkbox>
        </template>
      </b-table>
    </div>
    <div class="vw-table__control vw-table__control--footer vw-table__control--justify-end vw-table__control--align-center" v-if="!isBusy && filterResult.total > 0">
      <div class="vw-table__control-col vw-table__control-col--pull-left">
        <TableCounter :total="filterResult.total" />
      </div>
      <div class="vw-table__control-col">
        <TablePagination
          :currentPage.sync="localCurrentPage"
          :total="filterResult.total"
          :itemsPerPage="itemsPerPage"
          @onChange="handlePaginationChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import { isMacOS } from '@/helper'
import { debounce } from 'lodash'
import {
  influencerFilterModalTableFields
} from '@/variables'
import {
  UPDATE_CAMPAIGN_RESULT_PAGINATION,
  UPDATE_CAMPAIGN_RESULT_SORT,
  UPDATE_CAMPAIGN_RESULT_CHECKED
} from '@/eventBus-types'

export default {
  name: 'campaign-modal-influencer-filter-influencer-list',
  components: {
    TableCounter: () => import('@/components/Table/Counter'),
    TablePagination: () => import('@/components/Table/Pagination'),
    TableLoading: () => import('@/components/Table/Loading'),
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  props: {
    itemsPerPage: Number,
    currentPage: Number,
    filterResult: Object,
    isBusy: Boolean
  },
  data () {
    return {
      fields: influencerFilterModalTableFields,
      localCurrentPage: this.currentPage
    }
  },
  watch: {
    currentPage (value) {
      this.localCurrentPage = value
    }
  },
  methods: {
    initVuebar: debounce(function () {
      if (!isMacOS()) {
        let $el = document.getElementById('campaign-filter-influencer-list')
        this.$vuebar.initScrollbar($el, { preventParentScroll: true, scrollThrottle: 30 })
      }
    }, 300),
    handlePaginationChange () {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_RESULT_PAGINATION,
        value: this.localCurrentPage
      })
    },
    handleSortChange (ctx) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_RESULT_SORT,
        value: `${ctx.sortDesc ? '-' : ''}${ctx.sortBy}`
      })
    },
    handleChecked (data) {
      this.$geb.emit({
        id: UPDATE_CAMPAIGN_RESULT_CHECKED,
        value: data
      })
    }
  },
  mounted () {
    this.initVuebar()
  }
}
</script>

<style lang="scss" scoped>

.vw-campaign {
  &__influencer-list {
    .vw-table__table .table-responsive {
      max-height: 22rem;
      padding-right: 0.5rem;
    }
  }
}
</style>
