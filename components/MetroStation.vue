<template>
  <circle
    :cx="station.x"
    :cy="station.y"
    fill="hsl(0, 0%, 100%)"
    stroke="hsl(0, 0%, 0%)"
    stroke-width="5"
    r="16"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  />
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    station: { type: Object }
  },
  methods: {
    ...mapMutations(['setStation']),
    updatePos(x, y) {
      this.setStation({
          ...this.station,
          x,
          y
      })
    },
    onMouseDown(e) {
      document.addEventListener('mousemove', this.onMouseMove)
      this.updatePos(e.offsetX, e.offsetY)
    },
    onMouseMove(e) {
      this.updatePos(e.offsetX, e.offsetY)
    },
    onMouseUp(e) {
      document.removeEventListener('mousemove', this.onMouseMove)
    }
  }
}
</script>

<style>

</style>
