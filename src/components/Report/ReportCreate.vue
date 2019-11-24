<template>
  <section class="vw_report">
    <VWSection :title="pageTitle">
    <!--- form -->
      <section class="vw_report__form">
        <fieldset :disabled="isDetailMode && !editable">
        <b-row>
          <b-col>
            <b-form-group
              id="label-report_name"
              label="Report Name"
              label-for="report_name"
              label-class="vw-form__label"
              class="vw-form__group"
              :state="!errors.has('name')"
              :invalid-feedback="errors.first('name')"
              :readonly="isDetailMode && !editable"
            >
              <b-form-input
                id="report_name"
                name="name"
                type="text"
                v-model.trim="report.name"
                class="vw-form__control"
                v-validate="'required'"
                placeholder="Enter Report name"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors.first('name') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4" v-for="item in report.kpis" :key="item.id">
            <b-form-group
              :label="item.label"
              :id="'label-' + item.id"
              :label-for="item.id"
              label-class="vw-form__label"
              class="vw-form__group"
              :state="!errors.has(item.name)"
              :invalid-feedback="errors.first(item.name)"
            >
              <b-form-input
                :id="item.id"
                v-model="item.value"
                class="vw-form__control"
                :name="item.name"
                type="number"
                v-validate="'required'"
                :placeholder="item.placeholder"
              ></b-form-input>
               <b-form-invalid-feedback>
                {{ errors.first('name') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols='4'>
            <b-form-group
              id="label-report_cost"
              label="Cost"
              label-for="report_cost"
              label-class="vw-form__label"
              class="vw-form__group"
              :state="!errors.has('cost')"
              :invalid-feedback="errors.first('cost')"
            >
              <b-form-input
                id="report_cost"
                type="number"
                v-model="report.cost"
                class="vw-form__control"
                name="cost"
                v-validate.disable="'required|min:1'"
                placeholder="Enter Quotation"
              ></b-form-input>
               <b-form-invalid-feedback>
                {{ errors.first('cost') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols='4'>
            <b-form-group
              id="label-report_influencers"
              label="Number of Influencer"
              label-for="report_influencer"
              label-class="vw-form__label"
              class="vw-form__group"
              :state="!errors.has('influncer')"
              :invalid-feedback="errors.first('influncer')"
            >
              <b-form-input
                id="report_influencer"
                type="number"
                name="influncer"
                v-model="report.numberofinfluencer"
                class="vw-form__control"
                v-validate.disable="'required'"
                placeholder="Enter number"
              ></b-form-input>
               <b-form-invalid-feedback>
                {{ errors.first('influncer') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
         </fieldset>
      </section>
      <!--- form -->
      <!-- statistic -->
      <section class="mt-4">
        <VWStatisticList v-if="reportPosts.length > 0"
          title="Statistics"
          :statisticList="statisticList">
        </VWStatisticList>
      </section>

      <!-- add link -->
      <section class="mt-4">
        <b-row>
          <b-col cols="6" class="d-flex">
            <b-button class="vw-button vw-button--success vw-button--large" v-b-modal.modalAddlink :disabled="isDetailMode && !editable">Add link</b-button>
            <b-button class="vw-button vw-button--has-icon" variant="link" v-if="isDetailMode && !editable" @click="handleDownload">
              <Icon class="vw-button__icon " name="download"></Icon>
              <span class="vw-button__label">Download *.xsml</span>
            </b-button>
          </b-col>
          <b-col cols="6">
             <TableSearch :query.sync="query" @onInput="handleQueryChange" @onClear="handleClearSearch" v-if="isDetailMode" />
          </b-col>
        </b-row>
      </section>
      <!-- add link -->
      <!-- list -->
      <section class="mt-4">
        <VWInfluencerList :post-data='filteredPost' @deletePostHandle="deletePostHandle" :readonly="isDetailMode && !editable"></VWInfluencerList>
      </section>
      <!-- list -->
      <section class="vw_report-footer">
        <b-row>
          <b-col class="text-right">
            <div class="" v-if="isDetailMode">
              <div  v-if="!editable">
                <b-button class="vw-button vw-button--success vw-button--large" @click="handleEditClick">Edit</b-button>
              </div>
              <div v-else>
                <b-button class="vw-button vw-button--success vw-button--large"  @click="handleUpdateClick">
                  <b-spinner small v-if="loading"></b-spinner>
                  <span v-else>Save</span>
                </b-button>
                 <b-button class="vw-button vw-button--outline-secondary vw-button--large btn-secondary" @click="handleEditClick">Cancel</b-button>
              </div>
            </div>
            <div class="" v-else>
            <b-button class="vw-button vw-button--success vw-button--large"  @click="handleSaveClick">
              <b-spinner small v-if="loading"></b-spinner>
              <span v-else>Create Report</span>
            </b-button>
            <b-button class="vw-button vw-button--outline-secondary vw-button--large btn-secondary" @click="handleCancelClick">Cancel</b-button>
            </div>
          </b-col>
        </b-row>
      </section>
    </VWSection>
    <!--- modal-->
    <VWAddLink @addPostHandle="addPostHandle"></VWAddLink>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { size, findIndex, isNil } from 'lodash'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import {
  MAKE_TOAST,
  ADD_CHILD_BREADCRUMB
} from '@/store/action-types'

export default {
  name: 'Report',
  components: {
    VWSection: () => import('@/components/Section/Section'),
    VWInfluencerList: () => import('./ReportInfluencerList'),
    TableSearch: () => import('@/components/Table/Search'),
    VWAddLink: () => import('./modal/AddLink'),
    Icon: () => import('@/components/Icon/Icon.vue'),
    VWStatisticList: () => import('@/components/Elements/ListStatistic')
  },
  props: {
    reportData: {
      type: Object
    }
  },
  watch: {
    reportData: {
      deep: true,
      handler () {
        this.renderPageTitle()
      }
    },
    reportPosts: {
      deep: true,
      handler () {
        this.report.numberofinfluencer = size(this.reportPosts)
      }
    },
    report: {
      deep: true,
      handler () {
        this.calculateStatistic()
      }
    },
    reportDetail: {
      deep: true,
      handler (val) {
        if (this.isDetailMode) { this.renderReportDetail() }
      }
    },
    // call again the method if the route changes
    '$route': 'renderReportType'
  },
  computed: {
    ...mapState({
      loading: state => state.reports.loading,
      reportDetail: state => state.reports.detail
    }),
    isDetailMode () {
      return this.reportData.type === 'detail' !== false
    },
    filteredPost () {
      let self = this
      if (this.query !== '') {
        return this.reportPosts.filter(post => post.influencer.fullName.toLowerCase().indexOf(self.query.toLowerCase()) >= 0)
      } else {
        return this.reportPosts
      }
    }
  },
  data () {
    return {
      pageTitle: '',
      report: {
        name: '',
        kpis: [
          {
            label: 'KPI: View',
            name: 'view',
            id: 'report_kpi--view',
            placeholder: 'Enter View',
            value: ''
          },
          {
            label: 'KPI: Engagement',
            name: 'engagement',
            id: 'report_kpi--engagement',
            placeholder: 'Enter Engagement',
            value: ''
          },
          {
            label: 'KPI: Buzz',
            name: 'buzz',
            id: 'report_kpi--buzz',
            placeholder: 'Enter Buzz',
            value: ''
          }
        ],
        cost: '',
        numberofinfluencer: ''
      },
      editable: false,
      query: '',
      reportCreate: {
        'name': '',
        'kpiView': 0,
        'kpiEngagement': 0,
        'kpiBuzz': 0,
        'cost': 0,
        'statistic': {
          'view': 0,
          'viewPercent': 0,
          'buzz': 0,
          'buzzPercent': 0,
          'engagement': 0,
          'engagemenPercent': 0,
          'cost': 0,
          'costPercent': 0
        },
        'numberOfInfluencer': 0,
        'posts': {}
      },
      reportPosts: [],
      statisticList: [
        {
          id: 'view',
          label: 'View',
          currentNumber: 0,
          targetNumber: 0,
          color: '#007aff'
        },
        {
          id: 'buzz',
          label: 'Buzz',
          currentNumber: 0,
          targetNumber: 0,
          color: '#007aff'
        },
        {
          id: 'engagement',
          label: 'Engagement',
          currentNumber: 0,
          targetNumber: 0,
          color: '#007aff'
        },
        {
          id: 'cost',
          label: 'Total Cost',
          currentNumber: 0,
          targetNumber: 0,
          prefix: '$',
          color: '#007aff'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      makeToast: `toast/${MAKE_TOAST}`,
      createReport: 'reports/createReport',
      getReportById: 'reports/getReportById',
      updateReportById: 'reports/updateReportById',
      add_child_breadcrumb: `breadcrumb/${ADD_CHILD_BREADCRUMB}`
    }),
    resetErrors () {
      this.error.success = true
      this.error.status = ''
      this.errors.clear()
    },
    handleQueryChange () {},
    handleClearSearch () {
      this.query = ''
    },
    calculateStatistic () {
      this.statisticList.forEach(x => {
        switch (x.id) {
          case 'view':
            x.currentNumber = this.reportPosts.reduce((acc, cur) => acc + cur.postView, 0)
            x.targetNumber = Number(this.report.kpis[0].value) | 0
            break
          case 'engagement':
            x.currentNumber = this.reportPosts.reduce((acc, cur) => acc + cur.postEngagement, 0)
            x.targetNumber = Number(this.report.kpis[1].value) | 0
            break
          case 'buzz':
            x.currentNumber = this.reportPosts.reduce((acc, cur) => {
              return acc + cur.postBuzz
            }, 0)
            x.targetNumber = Number(this.report.kpis[2].value) | 0
            break
          case 'cost':
            x.currentNumber = this.reportPosts.reduce((acc, cur) => acc + Number(cur.actualCost), 0)
            x.targetNumber = Number(this.report.cost) | 0
            break
        }
      })
    },
    addPostHandle ($event) {
      let { reportPosts } = this
      if (size(this.reportPosts) === 0) {
        reportPosts.push($event)
      } else {
        let { postId } = $event
        let idx = findIndex(reportPosts, function (o) { return o.postId === postId })
        if (idx < 0) {
          reportPosts.push($event)
        } else {
          this.makeToast({
            title: 'The item is existed',
            variant: 'danger'
          })
        }
      }
      this.calculateStatistic()
      this.$bvModal.hide('modalAddlink')
    },
    handleCancelClick () {
      this.$router.push({ name: 'reports' })
    },
    async handleSaveClick () {
      if (this.isDetailMode) return false
      const result = await this.$validator.validateAll()
      if (result) {
        let { reportCreate, report } = this
        reportCreate.name = report.name
        reportCreate.kpiView = report.kpis[0].value
        reportCreate.kpiEngagement = report.kpis[1].value
        reportCreate.kpiBuzz = report.kpis[2].value
        reportCreate.cost = report.cost
        reportCreate.numberOfInfluencer = report.numberofinfluencer
        reportCreate.statistic.view = this.reportPosts.reduce((acc, cur) => acc + cur.postView, 0)
        reportCreate.statistic.buzz = this.reportPosts.reduce((acc, cur) => acc + cur.postBuzz, 0)
        reportCreate.statistic.engagement = this.reportPosts.reduce((acc, cur) => acc + cur.postEngagement, 0)
        reportCreate.statistic.cost = this.reportPosts.reduce((acc, cur) => acc + Number(cur.actualCost), 0)
        let posts = this.reportPosts.map(x => ({
          social: {
            _id: x.social._id
          },
          influencer: {
            _id: x.influencer._id
          },
          pageId: x.pageId,
          actualCost: x.actualCost,
          postLink: x.postLink,
          postId: x.postId,
          postEngagement: x.postEngagement,
          postView: x.postView,
          postBuzz: x.postBuzz
        }))
        reportCreate.posts = posts
        const res = await this.createReport(reportCreate)
        if (res) {
          this.makeToast({
            title: 'Creating Report is successful!',
            variant: 'success'
          })
          this.$router.push({ name: 'reports' })
        } else {
          this.makeToast({
            title: 'Creating Report is failed!',
            variant: 'danger'
          })
        }
      }
    },
    deletePostHandle (post) {
      let { postId } = post
      let idx = findIndex(this.reportPosts, function (o) { return o.postId === postId })
      if (idx > -1) {
        this.reportPosts.splice(idx, 1)
        this.calculateStatistic()
      }
    },
    renderReportDetail () {
      let { reportDetail: { item, post } } = this
      this.pageTitle = 'Report: ' + item.name
      this.add_child_breadcrumb({ label: item.name })
      this.report.name = item.name
      this.report.cost = item.cost
      this.report.numberofinfluencer = item.numberOfInfluencer
      this.report.kpis.map(kpi => {
        switch (kpi.name) {
          case 'view':
            kpi.value = item.kpiView
            break
          case 'engagement':
            kpi.value = item.kpiEngagement
            break
          case 'buzz':
            kpi.value = item.kpiBuzz
            break
        }
      })
      this.reportPosts = post
      this.statisticList.forEach(x => {
        switch (x.id) {
          case 'view':
            x.currentNumber = item.statistic.view
            x.targetNumber = item.kpiView
            break
          case 'engagement':
            x.currentNumber = item.statistic.engagement
            x.targetNumber = item.kpiEngagement
            break
          case 'buzz':
            x.currentNumber = item.statistic.buzz
            x.targetNumber = item.kpiBuzz
            break
          case 'cost':
            x.currentNumber = item.statistic.cost
            x.targetNumber = item.cost
            break
        }
      })
    },
    async renderReportType () {
      let { id } = this.$route.params
      if (id) {
        let res = await this.getReportById(id)
        if (!res) {
          this.makeToast({
            title: `The report can't load`,
            variant: 'danger'
          })
        }
      } else {
        this.pageTitle = 'Create Report'
      }
    },
    handleEditClick () {
      this.editable = !this.editable
    },
    async handleUpdateClick () {
      if (!this.isDetailMode) return false
      const result = await this.$validator.validateAll()
      if (result) {
        let { report, reportPosts } = this
        // backup
        // assign
        let data = {
          name: report.name,
          kpiView: report.kpis[0].value,
          kpiEngagement: report.kpis[1].value,
          kpiBuzz: report.kpis[2].value,
          cost: report.cost,
          numberOfInfluencer: report.numberofinfluencer,
          statistic: {
            view: reportPosts.reduce((acc, cur) => acc + cur.postView, 0),
            buzz: reportPosts.reduce((acc, cur) => acc + cur.postBuzz, 0),
            engagement: reportPosts.reduce((acc, cur) => acc + cur.postEngagement, 0),
            cost: reportPosts.reduce((acc, cur) => acc + Number(cur.actualCost), 0)
          },
          posts: {}
        }
        let posts = this.reportPosts.map(x => ({
          social: {
            _id: x.social._id
          },
          influencer: {
            _id: x.influencer._id
          },
          pageId: x.pageId,
          actualCost: x.actualCost,
          postLink: x.postLink,
          postId: x.postId,
          postEngagement: x.postEngagement,
          postView: x.postView,
          postBuzz: x.postBuzz
        }))
        data.posts = posts
        let payload = Object.assign({}, { reportId: this.$route.params.id, data: data })
        const res = await this.updateReportById(payload)
        if (res) {
          this.makeToast({
            title: 'Update successful!',
            variant: 'success'
          })
          this.$router.push({ name: 'reports' })
        } else {
          this.makeToast({
            title: 'Update failed!',
            variant: 'danger'
          })
        }
      }
    },
    async handleDownload () {
      // Get data report
      let { reportDetail } = this
      if (!isNil(reportDetail)) {
        // Init a new workbook
        const wb = new ExcelJS.Workbook()
        // Add a new Worksheet
        const ws = wb.addWorksheet('Report', {
          pageSetup: { paperSize: 9, orientation: 'landscape' },
          properties: { defaultRowHeight: 50 }
        })
        // Add header
        ws.columns = [
          { header: 'No', key: 'id', width: 5, outlineLevel: 1 },
          { header: 'Name', key: 'name', width: 30, outlineLevel: 1 },
          { header: 'Link', key: 'link', width: 80, outlineLevel: 1 },
          { header: 'Social Media', key: 'social', width: 20, outlineLevel: 1 },
          { header: 'Engagment', key: 'engagement', width: 20, outlineLevel: 1, style: { alignment: { horizontal: 'left' } } },
          { header: 'View', key: 'view', width: 20, outlineLevel: 1, style: { alignment: { horizontal: 'left' } } },
          { header: 'Buzz', key: 'buzz', width: 20, outlineLevel: 1, style: { alignment: { horizontal: 'left' } } },
          { header: 'Actual Cost', key: 'actualCost', width: 20, outlineLevel: 1, style: { alignment: { horizontal: 'left' } } }
        ]
        ws.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF3c78d8' }
        }
        ws.getRow(1).font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } }
        ws.getCell('C1').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF0000' }
        }
        // Add data of Influencer datatable
        let totalEngament = 0
        let totalView = 0
        let totalBuzz = 0
        let totalCost = 0
        reportDetail.post.forEach((item, index) => {
          let row = ws.addRow([index, item.influencer.fullName, item.postLink, item.platform, item.postEngagement || 0, item.postView || 0, item.postBuzz || 0, item.actualCost])
          totalEngament += Number(item.postEngagement)
          totalView += Number(item.postView)
          totalBuzz += Number(item.postBuzz)
          totalCost += Number(item.actualCost)
          row.font = { size: 14, bold: false, color: { argb: 'FF000000' } }
        })
        // Add an empty row
        ws.addRow()
        // Add row total
        let total = ['', '', '', 'Total', totalEngament, totalView, totalBuzz, totalCost]
        let totalRow = ws.addRow(total)
        totalRow.font = { size: 14, bold: false, color: { argb: 'FF000000' } }
        // Add an empty row
        ws.addRow()
        // Write file
        const buf = await wb.xlsx.writeBuffer()
        saveAs(new Blob([buf]), 'Report_' + new Date().getTime() + '.xlsx')
      } else {
        this.makeToast({
          title: `The report can't download. Please try again`,
          variant: 'danger'
        })
      }
    }
  },
  mounted () {
    this.renderReportType()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/base/_variables.scss';

.vw_report{
    &-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
      padding: 2rem 0 1.5rem;
      border-top: 0.0625rem solid $color-border;
    }
}
</style>
