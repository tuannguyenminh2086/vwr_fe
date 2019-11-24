<template>
    <div class="vw-datepicker">
      <Datepicker placeholder="Pick date" v-bind:value="value" input-class="vw-datepicker__input-class vw-form__control" @input="updateValue" :format="dataFormat">
      </Datepicker>
      <IconCalendar class="vw-datepicker__icon" />
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker' // https://github.com/charliekassel/vuejs-datepicker
import IconCalendar from '@/components/Icon/Icons/IconCalendar.vue'
export default {
  name: 'vw-datepicker',
  components: {
    Datepicker,
    IconCalendar
  },
  data () {
    return {
      dataFormat: 'yyyy-MM-dd'
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  },
  props: {
    value: String
  }
}
</script>
<style lang="scss" scoped>
@import './../../assets/scss/base/variables';

.vw-datepicker {
  position: relative;
  &__icon {
    position: absolute;
    left: 0.8125rem;
    top: 50%;
    transform: translate(0%, -50%);
  }
  /deep/ .vw-datepicker__input-class {
    padding-left: 2.5rem;
    border-radius: 0.3125rem;
    width: 100%;
    border: 0.0625rem solid $color-border;
  }
}
</style>
