<template>
  <div slot="table-busy" class="vw-table__table-loading">
    <b-spinner variant="primary" class="vw-table__table-loading-icon"></b-spinner>
    <span class="vw-table__table-loading-label">Loading ...</span>
  </div>
</template>

<script>
export default {
  name: 'vw-table-loading'
}
</script>
