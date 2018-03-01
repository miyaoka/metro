<template>
  <circle
    :cx="x"
    :cy="y"
    fill="hsl(0, 0%, 100%)"
    stroke="hsl(0, 0%, 0%)"
    stroke-width="5"
    r="16"
  />
</template>

<script>
export default {
  props: {
    x: { type: Number },
    y: { type: Number }
  }
}
</script>

<style>

</style>
