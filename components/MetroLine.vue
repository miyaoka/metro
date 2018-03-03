<template>
  <g
    :stroke="color"
    fill="none"
    stroke-width="10"
  >
    <path
      v-for="(path, i) in pathList"
      :key="i"
      :d="path"
    />
  </g>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    line: { type: Object },
    color: { type: String }
  },
  computed: {
    ...mapGetters(['getStation', 'getLineNodeList']),

    pathList() {
      return this.getLineNodeList(this.line.id).map((nodes) => {
        const moveto = nodes.shift().toString()
        const lineto = nodes.reduce(
          (prev, curr) => `${prev} ${curr.toString()}`
        )
        return `M${moveto} L${lineto}`
      })
    }
  }
}
</script>

<style>

</style>
