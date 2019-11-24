<template>
  <div class="vw-clients__management">
    <transition name="fade" mode="out-in">
      <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'clients'
}
</script>

<style>

</style>
