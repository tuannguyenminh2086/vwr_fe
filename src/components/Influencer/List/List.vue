<template>
  <div class="vw-table">
    <div class="vw-table__control vw-table__control--justify-end">
      <div class="vw-table__control-col vw-table__control-col--50">
        <TableSearch :query.sync="query" @onInput="handleQueryChange" @onClear="handleClearSearch"/>
      </div>
    </div>
    <div class="vw-table__table">
      <b-table
        show-empty
        responsive
        tbody-tr-class="vw-table__table-row"
        :items="influencerList"
        :fields="fields"
        :per-page="itemsPerPage"
        :busy="isBusy"
        @sort-changed="handleSortChange">
        <TableLoading slot="table-busy" />
        <template slot="id" slot-scope="data">{{ ((currentPage - 1) * itemsPerPage + data.index) | adjustIndex }}</template>
        <template slot="fullName" slot-scope="data">
          <span class="vw-table__table-influencer">
            <span class="vw-table__table-influencer-avatar">
              <img :src="data.item.avatar ? data.item.avatar.thumbnailUrl : 'https://via.placeholder.com/32/666'" :alt="data.item.fullName">
            </span>
            <router-link class="vw-table__table-link vw-table__table-influencer-name" :to="{ name: 'influencer-detail', params: { id: data.item.id } }">{{ data.item.fullName }}</router-link>
          </span>
        </template>
        <template slot="totalAudience" slot-scope="data">{{ data.item.totalAudience | formatNumber }}</template>
        <template slot="socials" slot-scope="data">
          <span class="vw-table__table-platforms">
            <span
              :class="`vw-table__table-platform vw-table__table-platform--${s.platform.toLowerCase()}`"
              v-for="s in data.item.socials"
              :key="s.platform">
              <Icon :name="`${s.platform.toLowerCase()}-circle`" />
            </span>
          </span>
        </template>
        <template slot="status" slot-scope="data">
          <span class="vw-table__table-status" :status="data.item.status | convertInfluencerStatus">
            {{ data.item.status | convertInfluencerStatus }}
          </span>
        </template>
        <template slot="timeAdded" slot-scope="data">{{ data.item.createdAt | convertDate }}</template>
        <template slot="actions" slot-scope="data">
          <InfluencerListItemAction :actionData="data" @onRemoveInfluencer="handleRemoveInfluencer"/>
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
