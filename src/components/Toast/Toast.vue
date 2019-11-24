<template>
  <div class="vw-toast"></div>
</template>

<script>
import { mapState } from 'vuex'
import { toastConfig } from '@/variables'

export default {
  name: 'toast',
  computed: {
    ...mapState({
      counter: state => state.toast.counter,
      title: state => state.toast.title,
      variant: state => state.toast.variant
    })
  },
  watch: {
    counter () {
      this.makeToast()
    }
  },
  methods: {
    makeToast () {
      this.$bvToast.toast(' ', {
        ...toastConfig,
        title: this.title,
        variant: this.variant
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
