<template>
  <div class="app__inner">
    <Headbar/>
    <Sidebar/>
    <main class="vw-main">
      <Breadcrumb/>
      <div class="vw-main__inner">
        <router-view/>
      </div>
    </main>
    <ModalInvite />
    <Toast />
  </div>
</template>

<script>
import Headbar from '@/components/Headbar/Headbar.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue'
import { mapActions } from 'vuex'
import { GET_DATA_HUB } from '@/store/action-types.js'
import ModalInvite from '@/components/ModalInvite/ModalInvite.vue'
import Toast from '@/components/Toast/Toast.vue'

export default {
  name: 'home',
  components: {
    Headbar,
    Sidebar,
    Breadcrumb,
    ModalInvite,
    Toast
  },
  created () {
    // Get DataHub - used for select components
    this.getDataHub()
  },
  methods: {
    ...mapActions({
      getDataHub: `dataHub/${GET_DATA_HUB}`
    })
  }
}
</script>

<style lang="scss" scoped>
.vw-main {
  max-width: 100%;
  min-height: 100vh;
  margin: 3.75rem 0 0 12.5rem;
  padding: 1.5rem;
  &__inner {
    margin-top: 3rem;
  }
}
</style>
