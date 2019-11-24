<template>
   <div class="vw-report">
    <transition name="fade" mode="out-in">
      <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Report',
  props: {
    reportData: {
      type: Object
    }
  }
}
</script>

<style>

</style>
