<template>
  <div class="vw-campaign__form" v-if="!isLoading">
    <CampaignDetailFormInfo
      :isCreate="isCreate"
      :isEditable="isEditable"
      :campaignName.sync="campaignData.name"
      :campaignBrand.sync="campaignData.brand"
      :campaignNameState="campaignNameState"
      :campaignNameFeedback="campaignNameFeedback"
      :campaignBrandState="campaignBrandState"
      :campaignBrandFeedback="campaignBrandFeedback"
      @onNameBlur="handleNameBlur"></CampaignDetailFormInfo>
    <VWListStatistic
      title="Statistics"
      :statisticList="statisticList"
      v-if="campaignData.influencerList.length > 0"></VWListStatistic>
    <CampaignInfluencerList
      :isCreate="isCreate"
      :isEditable="isEditable"
      :isTableBusy="isTableBusy"
      :influencerList="campaignData.influencerList"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      :sort="sort"
      :total="totalInfluencer"
      :query.sync="query"
      :campaignInfluencerListState="campaignInfluencerListState"
      :campaignInfluencerListFeedback="campaignInfluencerListFeedback"
      @onClickDownload="handleClickDownload"
      @onToggleEditCost="handleToggleEditCost"
      @onInputCost="handleInputCost"
      @onSaveCost="handleSaveCost"
      @onRemoveInfluencer="handleRemoveInfluencer"></CampaignInfluencerList>
    <CampaignDetailFormFooter
      :isCreate="isCreate"
      :isEditable="isEditable"
      :isSending="isSending"
      @onSubmit="handleSubmit"
      @onCancelCreate="handleCancelCreate"
      @onEnableEdit="handleEnableEdit"
      @onCancelEdit="handleCancelEdit"></CampaignDetailFormFooter>
    <CampaignInfluencerFilterModal @onAdd="handleAddInfluencer"></CampaignInfluencerFilterModal>
  </div>
  <Loading v-else />
</template>

<script>
import { mapActions } from 'vuex'
import {
  GET_CAMPAIGN,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  GET_ALL_CAMPAIGN_INFLUENCERS,
  UPDATE_BREADCRUMB,
  MAKE_TOAST
} from '@/store/action-types'
import CampaignData from './formData/campaignData'
import { campaignStatistic, campaignInfluencerTableField } from '@/variables'
import { roundDecimalNumber } from '@/helper'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export default {
  name: 'campaign-detail-form',
  components: {
    CampaignDetailFormInfo: () => import('./Info.vue'),
    VWListStatistic: () => import('@/components/Elements/ListStatistic.vue'),
    CampaignInfluencerList: () => import('./List.vue'),
    CampaignDetailFormFooter: () => import('./Footer.vue'),
    CampaignInfluencerFilterModal: () => import('./../Modal/InfluencerFilter.vue'),
    Loading: () => import('@/components/Loading/Loading.vue')
  },
  props: {
    campaignType: String
  },
  data () {
    return {
      statisticList: campaignStatistic,
      // Form Data
      campaignData: new CampaignData(),
      // Indicator
      isSending: false,
      isLoading: false,
      isTableBusy: false,
      isEditable: false,
      // Form dirty
      isCampaignNameDirty: false,
      isCampaignBrandDirty: false,
      isCampaignInfluencerListDirty: false,
      // Influencer List
      currentPage: 1,
      itemsPerPage: 10,
      sort: '',
      query: '',
      totalInfluencer: 0
    }
  },
  computed: {
    isCreate () {
      return this.campaignType === 'create'
    },
    campaignNameState () {
      if (this.isCampaignNameDirty) {
        if (!this.campaignData.name) {
          return false
        }
        return true
      }
      return null
    },
    campaignNameFeedback () {
      if (!this.campaignData.name) {
        return 'Please enter campaign name'
      }
      return ''
    },
    campaignBrandState () {
      if (this.isCampaignBrandDirty) {
        if (!this.campaignData.brand) {
          return false
        }
        return true
      }
      return null
    },
    campaignBrandFeedback () {
      if (!this.campaignData.brand) {
        return 'Please select brand'
      }
      return ''
    },
    campaignInfluencerListState () {
      if (this.isCampaignInfluencerListDirty) {
        if (this.campaignData.influencerList.length === 0) {
          return false
        }
        return true
      }
      return null
    },
    campaignInfluencerListFeedback () {
      if (this.campaignData.influencerList.length === 0) {
        return 'Please add influencer'
      }
      return ''
    },
    isFormValid () {
      return this.campaignNameState && this.campaignBrandState && this.campaignInfluencerListState
    }
  },
  methods: {
    ...mapActions({
      _getCampaign: `campaign/${GET_CAMPAIGN}`,
      _createCampaign: `campaign/${CREATE_CAMPAIGN}`,
      _updateCampaign: `campaign/${UPDATE_CAMPAIGN}`,
      _getAllCampaignInfluencers: `campaign/${GET_ALL_CAMPAIGN_INFLUENCERS}`,
      updateBreadcrumb: `breadcrumb/${UPDATE_BREADCRUMB}`,
      makeToast: `toast/${MAKE_TOAST}`
    }),
    handleAddInfluencer (list) {
      // Only add non-existed item
      list.forEach(listItem => {
        let isExist = false
        this.campaignData.influencerList.forEach(item => {
          if (listItem._id === item._id) {
            isExist = true
          }
        })
        // Init Cost
        listItem['localCost'] = 0
        listItem['isEditingCost'] = false
        // Add to campaignData
        !isExist && this.campaignData.influencerList.push(listItem)
      })
      // Update total influencer
      this.totalInfluencer = this.campaignData.influencerList.length
      // Calculate Statistic
      this.calculateStatistic()
    },
    async handleSubmit () {
      this.isCampaignNameDirty = true
      this.isCampaignBrandDirty = true
      this.isCampaignInfluencerListDirty = true
      if (this.isFormValid) {
        try {
          // Active Indicator
          this.isSending = true
          // Post API
          let response = this.isCreate
            ? await this._createCampaign(this.campaignData.getDataToSubmit())
            : await this._updateCampaign({
              campaignId: this.$route.params.id,
              data: this.campaignData.getDataToSubmit()
            })

          if (response.data && response.data.success) {
            // Show message
            this.makeToast({
              title: `${this.campaignData.name} has been ${this.isCreate ? ' created' : 'updated'}`,
              variant: 'success'
            })
            // Go to campaign list
            this.$router.push({ name: 'campaign' })
          }
        } catch (error) {
          // eslint-disable-console
          console.log(`${this.isCreate ? 'Create' : 'Update'} campaign error:`, error)
          // Show error
          this.makeToast({
            title: 'Something went wrong, please try again.',
            variant: 'danger'
          })
        } finally {
          // Deactive Indicator
          this.isSending = false
        }
      }
    },
    handleCancelCreate () {
      this.$router.push({ name: 'campaign' })
    },
    handleEnableEdit () {
      this.isEditable = true
    },
    handleCancelEdit () {
      this.isEditable = false
    },
    handleToggleEditCost (id) {
      this.campaignData.toggleEditCost(id, true)
    },
    handleInputCost (payload) {
      this.campaignData.updateCost(payload)
    },
    handleSaveCost (id) {
      this.campaignData.toggleEditCost(id, false)
      // Calculate Statistic
      this.calculateStatistic()
    },
    handleRemoveInfluencer (id) {
      this.campaignData.removeInfluencer(id)
      // Calculate Statistic
      this.calculateStatistic()
    },
    calculateStatistic () {
      this.statisticList.forEach(x => {
        switch (x.id) {
          case 'audience':
            x.currentNumber = this.campaignData.influencerList.reduce((acc, cur) => acc + cur.audience, 0)
            break
          case 'expectedView':
            x.currentNumber = roundDecimalNumber(this.campaignData.influencerList.reduce((acc, cur) => acc + (cur.averageView ? cur.averageView : 0), 0))
            break
          case 'expectedEngagement':
            x.currentNumber = roundDecimalNumber(this.campaignData.influencerList.reduce((acc, cur) => acc + (cur.averageEngagement ? cur.averageEngagement : 0), 0))
            break
          case 'totalCost':
            x.currentNumber = this.campaignData.influencerList.reduce((acc, cur) => acc + cur.localCost, 0)
            break
          case 'totalInfluencer':
            x.currentNumber = this.campaignData.influencerList.length
            break
          default:
            break
        }
      })
    },
    handleNameBlur () {
      this.isCampaignNameDirty = true
    },
    async getCampaignDetail () {
      try {
        // Active Indicator
        this.isLoading = true
        // Get API
        let response = await this._getCampaign(this.$route.params.id)

        if (response.data && response.data.success) {
          // Update campaign name, brand
          this.campaignData.name = response.data.data.name
          this.campaignData.brand = response.data.data.brand
          // Update statistic
          this.updateStatistic(response.data.data)
          // Update breadcrumb
          this.updateBreadcrumb([
            {
              id: 1,
              label: 'Campaign',
              url: '/campaign'
            },
            {
              id: 2,
              label: this.campaignData.name,
              url: 'javascript:void(0);'
            }
          ])
          // Update section title
          this.$emit('onDetailFormMounted', this.campaignData.name)
          // Get campaign influencer list
          this.getCampaignDetailInfluencers()
        } else {
          // Show error
          this.makeToast({
            title: 'The campaign you request doesn\'t existed.',
            variant: 'danger'
          })
          // Redirect to page not found
          this.$router.push({ name: 'not-found' })
        }
      } catch (error) {
        // eslint-disable-console
        console.log('Get campaign error:', error)
        // Show error
        this.makeToast({
          title: 'Something went wrong, please try again.',
          variant: 'danger'
        })
      } finally {
        // Deactive indicator
        this.isLoading = false
      }
    },
    async getCampaignDetailInfluencers () {
      try {
        // Active Indicator
        this.isTableBusy = true
        // Get API
        let response = await this._getAllCampaignInfluencers(this.$route.params.id)

        if (response.data && response.data.success) {
          // Update influencers list
          this.campaignData.influencerList = response.data.data
          // Add editable cost property
          this.campaignData.influencerList.forEach(item => {
            item['localCost'] = Number(item.cost)
            item['isEditingCost'] = false
          })
          // Update total influencer
          this.totalInfluencer = response.data.data.length
        }
      } catch (error) {
        // eslint-disable-console
        console.log('Get campaign influencer list error:', error)
        // Show error
        this.makeToast({
          title: 'Something went wrong, please try again.',
          variant: 'danger'
        })
      } finally {
        // Deacitve Indicator
        this.isTableBusy = false
      }
    },
    updateStatistic (data) {
      this.statisticList.forEach(x => {
        switch (x.id) {
          case 'audience':
            x.currentNumber = Number(data.totalAudience)
            break
          case 'expectedView':
            x.currentNumber = Number(data.expectedView)
            break
          case 'expectedEngagement':
            x.currentNumber = Number(data.expectedEngagement)
            break
          case 'totalCost':
            x.currentNumber = Number(data.totalCost)
            break
          case 'totalInfluencer':
            x.currentNumber = Number(data.totalInfluencer)
            break
          default:
            break
        }
      })
    },
    handleClickDownload () {
      this.saveAsExcel()
    },
    async saveAsExcel () {
      // Init a new workbook
      const wb = new ExcelJS.Workbook()

      // Add a new Worksheet
      const ws = wb.addWorksheet('Campaign')
      // Add Campaign name and brand
      ws.addRow(['Campaign name', this.campaignData.name])
      ws.addRow(['Brand', this.campaignData.brand.label])

      // Add an empty row
      ws.addRow()
      // Add Statistic data
      const statisticsTitleRow = ws.addRow(['Statistics'])
      statisticsTitleRow.font = { bold: true }
      // Add header of Statistic datatable
      const statisticsHeaderRow = ws.addRow(this.statisticList.map(item => item.label))

      // Style Statistic header datatable
      statisticsHeaderRow.eachCell(function (cell, colNumber) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffefefef' }
        }
      })
      ws.addRow(this.statisticList.map(item => item.currentNumber))

      // Add an empty row
      ws.addRow()

      // Add header of Influencer datatable
      const influencerHeaderRow = ws.addRow(campaignInfluencerTableField
        .filter(filterItem => (filterItem.key !== 'id' && filterItem.key !== 'actions'))
        .map(mapItem => mapItem.label))

      // Style Influencer header datatable
      influencerHeaderRow.eachCell(function (cell, colNumber) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffeaecef' }
        }
      })
      // Add data of Influencer datatable
      this.campaignData.influencerList.forEach((item, index) => {
        ws.addRow([item.influencer.fullName, item.audience, item.averageEngagement || 0, item.averageView || 0, item.cost])
      })

      // Ajust width of columns
      ws.getColumn('A').width = 25
      ws.getColumn('B').width = 25
      ws.getColumn('C').width = 22
      ws.getColumn('D').width = 20
      ws.getColumn('E').width = 15

      // Write file
      const buf = await wb.xlsx.writeBuffer()

      saveAs(new Blob([buf]), 'Campaign_' + new Date().getTime() + '.xlsx')
    }
  },
  mounted () {
    // If detail
    if (this.isCreate) {
      // Update breadcrumb
      this.updateBreadcrumb([
        {
          id: 1,
          label: 'Campaign',
          url: '/campaign'
        },
        {
          id: 2,
          label: 'Create Campaign',
          url: 'javascript:void(0);'
        }
      ])
      // Update section title
      this.$emit('onDetailFormMounted', 'Create Campaign')
    } else {
      this.getCampaignDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
