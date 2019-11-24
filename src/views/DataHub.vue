<template>
  <div class="vw-data__management">
   <transition :name="transitionName" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'datahub',
  data () {
    return {
      transitionName: ''
    }
  }
}
</script>

<style>

</style>
