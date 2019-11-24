<template>
  <div class="app__inner">
    <Headbar/>
    <Sidebar/>
    <main class="vw-main">
      <Breadcrumb/>
      <div class="vw-main__inner">
        <transition :name="transitionName" mode="out-in">
          <router-view :key="$route.fullPath"/>
        </transition>
      </div>
    </main>
    <ModalInvite />
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    Headbar: () => import('@/components/Headbar/Headbar'),
    Sidebar: () => import('@/components/Sidebar/Sidebar.vue'),
    Breadcrumb: () => import('@/components/Breadcrumb/Breadcrumb.vue'),
    ModalInvite: () => import('@/components/ModalInvite/ModalInvite.vue')
  },
  data () {
    return {
      transitionName: 'fade'
    }
  }
}
</script>

<style lang="scss" scoped>
.vw-main {
  max-width: 100%;
  min-height: 100vh;
  padding: 1.5rem;
  margin: 3.75rem 0 0 12.5rem;
  &__inner {
    margin-top: 3rem;
  }
}
</style>
