<template>
  <section :class="sectionClass">
    <VWSectionHeading :title="title" :style="sectionHeadingStyle"></VWSectionHeading>
    <div class="vw-section__content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'vw-section',
  props: {
    title: String,
    centered: Boolean,
    noPadding: Boolean,
    headingMargin: String
  },
  components: {
    VWSectionHeading: () => import('./Heading.vue')
  },
  computed: {
    sectionClass () {
      return {
        'vw-section': true,
        'vw-section--centered': this.centered,
        'vw-section--no-padding': this.noPadding
      }
    },
    sectionHeadingStyle () {
      return {
        marginBottom: this.headingMargin
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-section {
  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
  &--centered {
    .vw-section__content {
      text-align: center;
    }
  }
  &--no-padding {
    .vw-section__content {
      padding: 0;
      overflow: visible;
    }
  }
  &__content {
    padding: 2rem 1.5rem;
    border-radius: 0.25rem;
    overflow: hidden;
    background-color: $color-white;
  }
}
</style>
