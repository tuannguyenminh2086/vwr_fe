<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Toast />
  </div>
</template>

<script>
import { isMacOS } from '@/helper'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Toast: () => import('@/components/Toast/Toast.vue')
  },
  computed: {
    ...mapState({
      userRole: state => state.user.currentUser.roleName
    })
  },
  watch: {
    userRole: {
      handler: function () {
        this.handleBodyClassState()
      },
      deep: true
    }
  },
  methods: {
    handleBodyClassState () {
      let $body = document.querySelector('body')
      $body.classList.remove('isSAdmin', 'isAdmin', 'isStaff')
      switch (this.userRole) {
        case 'Super Admin':
          $body.classList.add('isSAdmin')
          break
        case 'Admin':
          $body.classList.add('isAdmin')
          break
        case 'Staff':
          $body.classList.add('isStaff')
          break
      }
    }
  },
  created () {
    if (isMacOS()) {
      let $body = document.querySelector('body')
      $body.classList.add('isMacOS')
    }
    this.handleBodyClassState()
  }
}
</script>

<style lang="scss">
</style>
