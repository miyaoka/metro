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

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `${this.x},${this.y}`
  }
  add(point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
  subtract(point) {
    return new Point(this.x - point.x, this.y - point.y)
  }
}

const sign = num => (num === 0 ? 0 : num > 0 ? 1 : -1)
const lineOffset = 5

export default {
  props: {
    line: { type: Object },
    color: { type: String }
  },
  computed: {
    ...mapGetters(['getStation']),

    pathList() {
      let stList = this.line.stations.map(idx => {
        const st = this.getStation(idx)
        const offset = 0
        //          st.lines.findIndex(val => val === this.line.idx) * lineOffset
        return new Point(st.x + offset, st.y + offset)
      })

      let pathNodeList = []

      stList.slice(0, -1).forEach((currSt, i) => {
        const nextSt = stList[i + 1]
        const diff = nextSt.subtract(currSt)
        const min = Math.min(Math.abs(diff.x), Math.abs(diff.y))
        pathNodeList.push([
          currSt,
          currSt.add(new Point(min * sign(diff.x), min * sign(diff.y))),
          nextSt
        ])
      })

      return pathNodeList.map(nodes => {
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
