<template>
  <section class="vw_display_info">
    <label>{{label}}</label>
    <div class="text" :class="{'is-pwd': type == 'password'}" v-html="contentRender"></div>
    <a
      v-if="owner && action"
      href="#"
      :title="action.desc"
      class="action_link text-primary"
      @click.stop="clickHandle(action,$event)"
    >
      {{ action.title }}
    </a>
  </section>
</template>

<script>
export default {
  name: 'DisplayInfo',
  props: {
    label: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    action: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    owner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentRender () {
      if (this.type === 'password') {
        let render = ''
        for (let i of this.text) {
          render += '<span>' + i + '</span>'
        }
        return render
      } else {
        return this.text
      }
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

<style lang="scss">
.vw_display_info {
  font-size: 0.8125rem;
  line-height: 1.25rem;
  margin-bottom: 2rem;
  label {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.5rem;
  }
  .action_link{
    font-size: 0.8125rem;
    margin-top: 0.5rem;
    display: inline-block;
  }
  .is-pwd {
    span {
      background: #2C2F37;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 2px;
      text-indent: -9999;
      font-size: 0;
    }
  }

  &.is-readonly {
    label { color: #C7C9D0; }
  }
}
</style>
