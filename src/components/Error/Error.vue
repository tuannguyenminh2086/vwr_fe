<template>
  <div class="error">{{ text }}</div>
</template>

<script>
export default {
  name: 'error',
  props: {
    text: {
      type: String,
      default: 'Unable to load component'
    }
  }
}
</script>
