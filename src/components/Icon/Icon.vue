<template>
  <span class="vw-icon">
    <IconNetwork v-if="name === 'network'" />
    <IconCampaign v-else-if="name === 'campaign'" />
    <IconReport v-else-if="name === 'report'" />
    <IconDataHub v-else-if="name === 'data-hub'" />
    <IconAccount v-else-if="name === 'account'" />
    <IconAccounts v-else-if="name === 'accounts'" />
    <IconLogout v-else-if="name === 'logout'" />
    <IconHome v-else-if="name === 'home'" />
    <IconSearch v-else-if="name === 'search'" />
    <IconFacebookCircle v-else-if="name === 'facebook-circle'" />
    <IconFacebookCircleDisable v-else-if="name === 'facebook-circle-disable'" />
    <IconYoutubeCircle v-else-if="name === 'youtube-circle'" />
    <IconYoutubeCircleDisable v-else-if="name === 'youtube-circle-disable'" />
    <IconInstagramCircle v-else-if="name === 'instagram-circle'" />
    <IconInstagramCircleDisable v-else-if="name === 'instagram-circle-disable'" />
    <IconEllipsisH v-else-if="name === 'ellipsis-h'" />
    <IconAngleLeft v-else-if="name === 'angle-left'" />
    <IconAngleRight v-else-if="name === 'angle-right'" />
    <IconAngleDoubleLeft v-else-if="name === 'angle-double-left'" />
    <IconAngleDoubleRight v-else-if="name === 'angle-double-right'" />
    <IconThumbsUp v-else-if="name === 'thumbs-up'" />
    <IconComment v-else-if="name === 'comment'" />
    <IconShare v-else-if="name === 'share'" />
    <IconEye v-else-if="name === 'eye'" />
    <IconReset v-else-if="name === 'reset'" />
    <IconRoles v-else-if="name === 'roles'" />
    <IconCalendar v-else-if="name === 'calendar'" />
    <IconClose v-else-if="name === 'close'" />
    <IconArrowUp v-else-if="name === 'arrow-up'" />
    <IconArrowDown v-else-if="name === 'arrow-down'" />
    <IconDownload v-else-if="name === 'download'" />
    <IconUpload v-else-if="name === 'upload'" />
    <IconDefault v-else />
  </span>
</template>

<script>
const lazyLoadIcon = component => () => import(`@/components/Icon/Icons/Icon${component}.vue`)

export default {
  name: 'Icon',
  props: {
    name: String
  },
  components: {
    IconDefault: lazyLoadIcon('Default'),
    IconNetwork: lazyLoadIcon('Network'),
    IconCampaign: lazyLoadIcon('Campaign'),
    IconReport: lazyLoadIcon('Report'),
    IconDataHub: lazyLoadIcon('DataHub'),
    IconAccount: lazyLoadIcon('Account'),
    IconAccounts: lazyLoadIcon('Accounts'),
    IconLogout: lazyLoadIcon('Logout'),
    IconHome: lazyLoadIcon('Home'),
    IconSearch: lazyLoadIcon('Search'),
    IconFacebookCircle: lazyLoadIcon('FacebookCircle'),
    IconFacebookCircleDisable: lazyLoadIcon('FacebookCircleDisable'),
    IconYoutubeCircle: lazyLoadIcon('YoutubeCircle'),
    IconYoutubeCircleDisable: lazyLoadIcon('YoutubeCircleDisable'),
    IconInstagramCircle: lazyLoadIcon('InstagramCircle'),
    IconInstagramCircleDisable: lazyLoadIcon('InstagramCircleDisable'),
    IconEllipsisH: lazyLoadIcon('EllipsisH'),
    IconAngleLeft: lazyLoadIcon('AngleLeft'),
    IconAngleRight: lazyLoadIcon('AngleRight'),
    IconAngleDoubleLeft: lazyLoadIcon('AngleDoubleLeft'),
    IconAngleDoubleRight: lazyLoadIcon('AngleDoubleRight'),
    IconThumbsUp: lazyLoadIcon('ThumbsUp'),
    IconComment: lazyLoadIcon('Comment'),
    IconShare: lazyLoadIcon('Share'),
    IconEye: lazyLoadIcon('Eye'),
    IconReset: lazyLoadIcon('Reset'),
    IconRoles: lazyLoadIcon('Roles'),
    IconCalendar: lazyLoadIcon('Calendar'),
    IconClose: lazyLoadIcon('Close'),
    IconArrowUp: lazyLoadIcon('ArrowUp'),
    IconArrowDown: lazyLoadIcon('ArrowDown'),
    IconDownload: lazyLoadIcon('Download'),
    IconUpload: lazyLoadIcon('Upload')
  }
}
</script>

<style lang="scss" scoped>
.vw-icon {
  display: flex;
}
</style>
