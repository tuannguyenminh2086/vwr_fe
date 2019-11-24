<template>
  <section class="vw_display_info" :class="{'is-readonly': readonly}">
    <label>{{label}}</label>
    <div class="text d-flex flex-wrap">
      <span class="tag" v-for="(item, index) in permissions" :key="index">{{item}}</span>
    </div>
    <a href="#" :title="action.desc" class="action_link text-primary" @click.stop="clickHandle(action,$event)" v-if="owner">
      {{ action.title }}
    </a>
  </section>
</template>

<script>
export default {
  name: 'Permissions',
  props: {
    label: {
      type: String,
      required: true
    },
    permissions: {
      type: Array,
      default: () => []
    },
    action: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: true
    },
    owner: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickHandle (action, event, source = 'click') {
      if (action && typeof action.handler === 'function') {
        action.handler(action, event, { source })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tag{
  background: #EAEBEF;
  border-radius: 4px;
  color: #787D8E;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.25rem;
  padding: 0.125rem 0.5rem;
  margin: 0 0.5rem 0.5rem 0;
}
</style>
