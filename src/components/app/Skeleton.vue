<template>
  <div>
    <ToolbarElement no-active>
      <v-skeleton-loader type="heading" boilerplate />
    </ToolbarElement>
    <v-skeleton-loader
      type="card-heading, sentences@3, table-cell@8"
      boilerplate
      class="card"
    />
    <v-skeleton-loader
      type="heading, table-thead, table-row, table-row, table-row, table-row"
      boilerplate
      class="mt-4"
    />
  </div>
</template>

<script>
export default {}
</script>
