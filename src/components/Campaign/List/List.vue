<template>
  <div class="vw-table">
    <div class="vw-table__control vw-table__control--justify-between">
      <div class="vw-table__control-col">
        <b-button v-if="croleName !=='Staff'" class="vw-button vw-button--primary vw-button--large" :to="{ name: 'campaign-create' }">Add Campaign</b-button>
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
        :items="campaignList"
        :fields="fields"
        :per-page="itemsPerPage"
        :busy="isBusy"
        @sort-changed="handleSortChange">
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="campaignName" slot-scope="data">
          <router-link class="vw-table__table-link" :to="{ name: 'campaign-detail', params: { id: data.item.id } }">{{ data.item.name }}</router-link>
        </template>
        <template slot="brand" slot-scope="data"><span v-if="data.item.brand">{{ data.item.brand.label }}</span></template>
        <template slot="influencer" slot-scope="data">{{ data.item.totalInfluencer | formatNumber }}</template>
        <template slot="timeAdded" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
        <template slot="actions" slot-scope="data">
          <CampaignListItemAction :actionData="data" @onRemoveCampaign="handleRemoveCampaign"/>
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
</template>

<script src="./List.js"></script>

<style lang="scss" scoped>
</style>
