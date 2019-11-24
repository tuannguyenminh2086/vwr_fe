export const tableItemsPerPage = [
  {
    value: 5,
    text: '5'
  },
  {
    value: 10,
    text: '10'
  },
  {
    value: 20,
    text: '20'
  }
]

export const influencerTableFields = [
  {
    key: 'id',
    label: '#',
    class: 'id-column text-center'
  },
  {
    key: 'fullName',
    label: 'Influencer',
    class: 'influencer-column',
    tdClass: 'influencer-column-td',
    sortable: true
  },
  {
    key: 'totalAudience',
    label: 'Audience',
    class: 'audience-column',
    tdClass: 'audience-column text-right',
    sortable: true
  },
  {
    key: 'socials',
    label: 'Social Platform',
    class: 'platform-column',
    tdClass: 'platform-column-td',
    sortable: true
  },
  {
    key: 'status',
    label: 'Status',
    class: 'status-column',
    sortable: true
  },
  {
    key: 'timeAdded',
    label: 'Time Added',
    class: 'time-added-column',
    sortable: true
  },
  {
    key: 'actions',
    label: '',
    class: 'actions-column'
  }
]

export const campaignListTableFields = [
  {
    key: 'id',
    label: '#',
    class: 'id-column text-center'
  },
  {
    key: 'campaignName',
    label: 'Campaign',
    class: 'campaign-column',
    tdClass: 'campaign-column-td',
    sortable: true
  },
  {
    key: 'brand',
    label: 'Brand',
    class: 'brand-column',
    sortable: true
  },
  {
    key: 'influencer',
    label: 'Influencer',
    class: 'influencer-column influencer-column--small',
    tdClass: 'influencer-column text-right',
    sortable: true
  },
  {
    key: 'timeAdded',
    label: 'Time Added',
    class: 'time-added-column',
    sortable: true
  },
  {
    key: 'actions',
    label: '',
    class: 'actions-column'
  }
]

export const campaignInfluencerTableField = [
  {
    key: 'id',
    label: '#',
    class: 'id-column text-center'
  },
  {
    key: 'influencer.fullName',
    label: 'Influencer',
    class: 'influencer-column',
    tdClass: 'influencer-column-td',
    sortable: true
  },
  {
    key: 'audience',
    label: 'Audience',
    class: 'audience-column',
    tdClass: 'audience-column text-right',
    sortable: true
  },
  {
    key: 'averageEngagement',
    label: 'Avg.Engagement',
    class: 'average-engagement-column',
    tdClass: 'average-engagement-column text-right',
    sortable: true
  },
  {
    key: 'averageView',
    label: 'Avg.View',
    class: 'average-view-column',
    tdClass: 'average-view-column text-right',
    sortable: true
  },
  {
    key: 'localCost',
    label: 'Cost',
    class: 'cost-column',
    tdClass: 'cost-column text-right',
    sortable: true
  },
  {
    key: 'actions',
    label: '',
    class: 'actions-column'
  }
]

export const influencerFilterModalTableFields = [
  {
    key: 'id',
    label: '#',
    class: 'id-column text-center'
  },
  {
    key: 'influencer',
    label: 'Influencer',
    class: 'influencer-column',
    tdClass: 'influencer-column-td',
    sortable: false // server doesn't support sort by influencer.fullName yet
  },
  {
    key: 'actions',
    label: '',
    class: 'actions-column'
  }
]

export const reportListTableFields = [
  {
    key: 'id',
    label: '#',
    class: 'id-column text-center'
  },
  {
    key: 'report',
    label: 'Report',
    class: 'report-column',
    sortable: true
  },
  {
    key: 'post',
    label: 'Post',
    class: 'post-column',
    tdClass: 'text-right',
    sortable: true
  },
  {
    key: 'engagement',
    label: 'Engagement',
    class: 'engagement-column',
    tdClass: 'text-right',
    sortable: true
  },
  {
    key: 'view',
    label: 'View',
    class: 'view-column',
    tdClass: 'text-right',
    sortable: true
  },
  {
    key: 'cost',
    label: 'Cost',
    tdClass: 'text-right',
    class: 'cost-column',
    sortable: true
  },
  {
    key: 'timeAdded',
    label: 'Time Added',
    class: 'time-added-column',
    sortable: true
  },
  {
    key: 'actions',
    label: '',
    class: 'actions-column'
  }
]

export const reportDetailTableFields = [
  {
    key: 'id',
    label: '#',
    class: 'id-column text-center'
  },
  {
    key: 'influencer',
    label: 'Influencer',
    class: 'influencer-column',
    sortable: true
  },
  {
    key: 'engagement',
    label: 'Engagement',
    class: 'engagement-column',
    tdClass: 'text-right',
    sortable: true
  },
  {
    key: 'view',
    label: 'View',
    class: 'view-column',
    tdClass: 'text-right',
    sortable: true
  },
  {
    key: 'actualCost',
    label: 'Actual Cost',
    class: 'actual-cost-column',
    tdClass: 'text-right',
    sortable: true
  },
  {
    key: 'actions',
    label: '',
    class: 'actions-column'
  }
]
