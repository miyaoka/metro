<template>
  <circle
    :cx="station.x"
    :cy="station.y"
    fill="hsl(0, 0%, 100%)"
    stroke="hsl(0, 0%, 0%)"
    stroke-width="5"
    r="16"
  />
</template>

<script>
export default {
  props: {
    station: { type: Object }
  }
}
</script>

<style>

</style>
