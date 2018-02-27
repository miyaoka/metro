<template>
  <div>
    <svg
      :width="width"
      :height="height"
      class="map"
    >
      <path
        v-for="(line, i) in lines"
        :key="`l${line.idx}`"
        :d="getPath(line, i)"
        fill="none"
        :stroke="line.color"
        stroke-width="5"
      />
      <circle
        v-for="station in stations"
        :key="station.idx"
        :cx="station.x * width"
        :cy="station.y * height"
        :fill="station.color"
        r="16"
      />
    </svg>
  </div>
</template>

<script>
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

export default {
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
      x: Math.random(),
      y: Math.random()
    }))

    this.lines = [...Array(5).keys()].map(i => ({
      idx: i,
      color: randomColor(),
      stations: arrayPick(
        this.stations,
        randomRange(2, this.stations.length * 0.5)
      ).map(s => s.idx)
    }))
  },
  methods: {
    getPos(pt, diff) {
      return `${pt.x * this.width},${pt.y * this.height + diff * 2}`
    },
    getPath(line, i) {
      let posList = line.stations.map(idx => this.stations[idx])
      const start = posList.shift()
      const list = posList.reduce(
        (prev, curr) => `${prev} ${this.getPos(curr, i)}`,
        ''
      )
      return `M ${this.getPos(start, i)} L ${list}`
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
