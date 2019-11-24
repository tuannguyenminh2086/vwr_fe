<template>
  <div class="vw-table__table-actions">
    <b-dropdown
      v-if="!isCallingAction"
      class="vw-table__table-actions-toggle"
      @click="handleClickActions">
      <template slot="button-content">
        <Icon name="ellipsis-h" />
      </template>
      <b-dropdown-item v-for="(button, i) in buttons"
        :key="i"
        :value="button.title"
        @click.stop="click(i, $event, item)">
        {{button.title}}
      </b-dropdown-item>
    </b-dropdown>
    <b-spinner variant="primary" small class="vw-table__table-loading-icon" v-else></b-spinner>
  </div>
</template>

<script>
export default {
  name: 'ActionListButton',
  props: {
    item: Object,
    buttons: Array
  },
  components: {
    Icon: () => import('@/components/Icon/Icon.vue')
  },
  data () {
    return {
      isCallingAction: false
    }
  },
  methods: {
    handleClickActions (event) {
      event.stopPropagation()
    },
    click (i, event, payload, source = 'click') {
      const button = this.buttons[i]
      if (button && typeof button.handler === 'function') {
        button.handler(i, event, payload, { source })
      }
    }
  }
}
</script>

<style>

</style>
