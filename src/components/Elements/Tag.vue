<template>
  <div class="vw-tag">
    <span class="vw-tag__label">{{ label }}</span>
    <Icon class="vw-tag__close" name="close" @click.native="handleClickClose"></Icon>
  </div>
</template>

<script>
export default {
  name: 'tag',
  props: {
    label: String
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  methods: {
    handleClickClose () {
      this.$emit('onRemoveTag')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-tag {
  display: flex;
  align-items: center;
  color: $color-main;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: $color-app-bg;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  &__label {
    padding-right: 0.75rem;
  }
  &__close {
    cursor: pointer;
    user-select: none;
  }
}
</style>
