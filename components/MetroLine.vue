<template>
  <path
    :d="path"
    :stroke="color"
    fill="none"
    stroke-width="10"
  />
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

    path() {
      let stList = this.line.stations.map(idx => {
        const st = this.getStation(idx)
        const offset = 0
        //          st.lines.findIndex(val => val === this.line.idx) * lineOffset
        return new Point(st.x + offset, st.y + offset)
      })

      let lineList = []
      stList.forEach((pos, i) => {
        lineList.push(pos)
        if (i >= stList.length - 1) return

        const diff = stList[i + 1].subtract(pos)
        const min = Math.min(Math.abs(diff.x), Math.abs(diff.y))
        lineList.push(
          pos.add(new Point(min * sign(diff.x), min * sign(diff.y)))
        )
      })

      const start = lineList.shift()
      const listString = lineList.reduce(
        (prev, curr) => `${prev} ${curr.toString()}`,
        ''
      )
      return `M ${start.toString()} L ${listString}`
    }
  }
}
</script>

<style>

</style>
