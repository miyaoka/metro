<template>
  <div>
    <svg
      :width="width"
      :height="height"
      class="map"
    >
      <MetroLine
        v-for="(line, i) in lines"
        :key="`l${line.idx}`"
        :path="getPath(line, i)"
        :color="i, lines.length | color"
      />
      <MetroStation
        v-for="station in stations"
        :key="station.idx"
        :x="station.x"
        :y="station.y"
      />
    </svg>
  </div>
</template>

<script>
import MetroLine from '~/components/MetroLine.vue'
import MetroStation from '~/components/MetroStation.vue'

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
const randomColor = () => `hsl(${Math.random() * 360}, 60%, 50%)`
const arrayPick = (array, num) => {
  let picked = []
  let ret = []
  let len = array.length
  let n = num < len ? num : len
  while (n-- > 0) {
    const i = Math.floor(Math.random() * len)
    ret[n] = picked[i] || array[i]
    len--
    picked[i] = picked[len] || array[len]
  }
  return ret
}

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
  components: {
    MetroLine,
    MetroStation
  },
  filters: {
    color(i, length) {
      return `hsl(${i / length * 360}, 60%, 50%)`
    }
  },
  data() {
    return {
      stations: [],
      lines: [],
      width: 800,
      height: 600
    }
  },
  created() {
    this.stations = [...Array(10).keys()].map(i => ({
      idx: i,
      color: randomColor(),
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      lines: []
    }))

    this.lines = [...Array(3).keys()].map(i => ({
      idx: i,
      color: randomColor(),
      stations: arrayPick(
        this.stations,
        randomRange(2, this.stations.length * 0.3)
      ).map(s => s.idx)
    }))

    this.lines.forEach(l => {
      l.stations.forEach(s => this.stations[s].lines.push(l.idx))
    })
  },
  methods: {
    getPath(line, i) {
      let stList = line.stations.map(idx => {
        const st = this.stations[idx]
        const offset = st.lines.findIndex(val => val === i) * lineOffset
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

<style lang="scss" scoped>
.map {
  background: #ffffee;
  margin: auto;
  display: block;
}
</style>
