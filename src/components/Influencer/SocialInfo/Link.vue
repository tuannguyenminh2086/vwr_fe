<template>
  <a class="vw-social__link" :href="link" target="_blank">
    <Icon :name="`${platform}-circle`"/>
    <span class="vw-social__link-label">{{ label }}</span>
  </a>
</template>

<script>
export default {
  name: 'social-link',
  props: {
    platform: String,
    label: String,
    link: String
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  }
}
</script>

<style lang="scss" scoped>
.vw-social {
  &__link {
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 0.8125rem;
    &-label {
      padding-left: 0.5rem;
      text-transform: capitalize;
      text-decoration: underline;
    }
  }
}
</style>
