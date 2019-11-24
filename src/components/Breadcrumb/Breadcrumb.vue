<template>
  <div class="vw-breadcrumb">
    <div class="vw-breadcrumb__list">
      <div class="vw-breadcrumb__item">
        <router-link to="/" class="vw-breadcrumb__link vw-breadcrumb__link--home">
          <Icon name="home"/>
        </router-link>
      </div>
      <div class="vw-breadcrumb__item" v-for="item in listBreadcrumb" :key="item.id">
        <router-link :to="item.url" class="vw-breadcrumb__link">
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'breadcrumb',
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      listBreadcrumb: state => state.breadcrumb.listBreadcrumb
    })
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-breadcrumb {
  &__list {
    display: flex;
    align-items: center;
    min-height: 1.375rem;
  }
  &__item {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      &:after {
        position: relative;
        top: 0.125rem;
        content: '>';
        padding: 0 0.375rem;
        color: $color-subtext;
      }
    }
    &:last-child {
      .vw-breadcrumb__link {
        pointer-events: none;
        color: $color-main;
      }
    }
    .vw-breadcrumb__link.vw-breadcrumb__link--home {
      pointer-events: auto;
    }
  }
  &__link {
    font-size: 0.875rem;
    color: $color-text;
    &:hover {
      color: $color-main;
    }
    &--home {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
}
</style>
