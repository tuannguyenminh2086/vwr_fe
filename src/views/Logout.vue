<template>
  <div class="vw-logout">
    <div class="d-flex justify-content-center align-items-center">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
// import router from '@/router'
export default {
  name: 'logout',
  created () {
    // this.logout().then().catch(error => {
    //   // eslist-disable-console
    //   console.log('[Error] Something goes wrong when logout:', error)
    // }).finally(() => {
    //   router.push({
    //     path: '/login'
    //   })
    // })
  },
  methods: {
    // ...mapActions({
    //   logout: 'auth/LOGOUT'
    // })
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/base/variables';
.vw-logout {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: $color-white;
  background-image: url('../assets/images/login_bg.png');
}
</style>
