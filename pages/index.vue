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
        :color="i, lines.length | color"
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
import MetroLine from '~/components/MetroLine.vue'
import MetroStation from '~/components/MetroStation.vue'
import { mapState, mapGetters } from 'vuex'

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
    const stations = [...Array(10).keys()].map(i => ({
      idx: i,
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      lines: []
    }))

    const lines = [...Array(3).keys()].map(i => ({
      idx: i,
      stations: arrayPick(stations, randomRange(2, stations.length * 0.3)).map(
        s => s.idx
      )
    }))

    lines.forEach(l => {
      l.stations.forEach(s => stations[s].lines.push(l.idx))
    })

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
