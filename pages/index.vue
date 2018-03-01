<template>
  <div>
    <svg
      :width="width"
      :height="height"
      class="map"
    >
      <MetroLine
        v-for="(line, i) in lines"
        :color="i, lines.length | color"
        :key="line.idx"
        :line="line"
      />
      <MetroStation
        v-for="station in stations"
        :key="station.idx"
        :station="station"
      />
    </svg>
  </div>
</template>

<script>
import uuid from 'uuid'
import { mapState, mapGetters } from 'vuex'
import MetroLine from '~/components/MetroLine.vue'
import MetroStation from '~/components/MetroStation.vue'

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
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
      width: 800,
      height: 600
    }
  },
  created() {
    const stationCount = 10
    const lineCount = 3

    const stations = [...Array(stationCount).keys()].map(i => ({
      idx: uuid(),
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      lines: []
    }))

    const lines = [...Array(lineCount).keys()].map(i => ({
      idx: uuid(),
      stations: arrayPick(stations, randomRange(2, stations.length * 0.5)).map(
        s => s.idx
      )
    }))

    this.$store.commit('setStations', stations)
    this.$store.commit('setLines', lines)
  },
  computed: {
    ...mapState(['stations', 'lines'])
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
