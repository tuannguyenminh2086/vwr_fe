<template>
  <div class="vw-table vw-campaign__influencer">
    <div class="vw-table__control vw-table__control--justify-between vw-table__control--align-center">
      <div class="vw-table__control-col">
        <b-button :class="addInfluencerButtonClass" @click="handleAddClick">Add Influencer</b-button>
      </div>
      <div class="vw-table__control-col vw-table__control-col--pull-left ml-4" v-if="!isCreate">
        <b-button class="vw-button vw-button--has-icon vw-button--link-primary vw-campaign__influencer-download" @click="handleClickDownload">
          <Icon class="vw-button__icon" name="download"></Icon>
          <span class="vw-button__label">Download *.xsml</span>
        </b-button>
      </div>
      <div class="vw-table__control-col vw-table__control-col--50">
        <TableSearch :query="query" @onInput="handleInputQuery" @onClear="handleClearSearch" />
      </div>
    </div>
    <div :class="tableClass">
      <b-table
        show-empty
        responsive
        tbody-tr-class="vw-table__table-row"
        :items="influencerList"
        :fields="fields"
        :filter="query"
        :filter-function="filterFunction"
        :current-page="currentPage"
        :per-page="itemsPerPage"
        :busy="isTableBusy"
        @filtered="handleFiltered">
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="influencer.fullName" slot-scope="data">
          <span class="vw-table__table-influencer">
            <span class="vw-table__table-influencer-avatar">
              <img :src="data.item.influencer.avatar ? data.item.influencer.avatar.thumbnailUrl : 'https://via.placeholder.com/32/666'" :alt="data.item.influencer.fullName">
            </span>
            <span class="vw-table__table-influencer-name">{{ data.item.influencer.fullName }}</span>
            <span class="vw-table__table-influencer-social" v-if="data.item.platform">
              <Icon :name="`${data.item.platform.toLowerCase()}-circle`"></Icon>
            </span>
          </span>
        </template>
        <template slot="audience" slot-scope="data">{{ data.item.audience | formatNumber }}</template>
        <template slot="averageEngagement" slot-scope="data">{{ data.item.averageEngagement | formatNumber }}</template>
        <template slot="averageView" slot-scope="data">{{ data.item.averageView | formatNumber }}</template>
        <template slot="localCost" slot-scope="data">
          <TableItemCost :itemData="data.item" @onInput="handleInputCost" @onSave="handleSave"></TableItemCost>
        </template>
        <template slot="actions" slot-scope="data">
          <InfluencerListItemAction
            v-show="isCreate || isEditable"
            :itemData="data"
            @onToggleEditCost="handleToggleEditCost"
            @onRemoveInfluencer="handleRemoveInfluencer"></InfluencerListItemAction>
        </template>
      </b-table>
      <div class="vw-table__table-feedback" v-if="campaignInfluencerListState === false">{{ campaignInfluencerListFeedback }}</div>
    </div>
    <div class="vw-table__control vw-table__control--footer vw-table__control--justify-end vw-table__control--align-center" v-if="localTotal > 0">
      <div class="vw-table__control-col vw-table__control-col--pull-left">
        <TableCounter :total="localTotal" />
      </div>
      <div class="vw-table__control-col">
        <TableItemsPerPage
          :itemsPerPage.sync="itemsPerPage"
          :optionItemsPerPage="optionItemsPerPage"/>
      </div>
      <div class="vw-table__control-col">
        <TablePagination
          :currentPage.sync="currentPage"
          :total="localTotal"
          :itemsPerPage="itemsPerPage"/>
      </div>
    </div>
  </div>
</template>

<script src="./List.js"></script>

<style lang="scss" scoped>
.vw-campaign {
  &__influencer {
    min-height: 22rem;
    &-download {
      font-size: 0.8125rem;
    }
  }
}
</style>
