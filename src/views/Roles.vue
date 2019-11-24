<template>
  <div class="vw-roles__management">
    <transition name="fade" mode="out-in">
      <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'roles'
}
</script>

<style>

</style>
