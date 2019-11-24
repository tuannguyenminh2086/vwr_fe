<template>
  <div class="vw-headbar">
    <div class="vw-headbar__user">
      <div class="vw-headbar__user-info-wrapper">
        <div class="vw-headbar__user-avatar">
          <img class="vw-headbar__user-image" alt="" :src="avatar"/>
        </div>
        <div class="vw-headbar__user-info">
          <span class="vw-headbar__user-name">{{fullName}}</span>
          <span class="vw-headbar__user-email">{{email}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'headerbar',
  computed: {
    ...mapState({
      email: state => state.user.currentUser.email,
      fullName: state => state.user.currentUser.fullName,
      avatar: state => state.user.currentUser.avatar || ''
    })
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-headbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: $z-index-headbar;
  justify-content: flex-end;
  padding: 0.625rem 3rem 0.625rem 14rem;
  background-color: $color-white;
  box-shadow: 0 0 0.375rem rgba(0, 0, 0, 0.1);
  &__user {
    &-avatar {
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      background-color: #c4c4c4;
      overflow: hidden;
    }
    &-info {
      display: flex;
      flex-direction: column;
      padding-left: 0.5rem;
      &-wrapper {
        display: flex;
        align-items: center;
      }
    }
    &-name {
      font-size: 0.825rem;
      color: $color-black;
    }
    &-email {
      font-size: 0.6875rem;
      color: $color-subtext;
    }
  }
}

.modal-open .vw-headbar {
  right: 1.0625rem;
}
</style>
