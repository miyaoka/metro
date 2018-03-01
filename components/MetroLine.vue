<template>
  <path
    :d="path"
    :stroke="color"
    fill="none"
    stroke-width="10"
  />
</template>

<script>
export default {
  props: {
    path: { type: String },
    color: { type: String }
  }
}
</script>

<style>

</style>
