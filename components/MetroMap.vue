<template>
  <svg
    :width="width"
    :height="height"
  >
    <MetroLine
      v-for="line in lines"
      :key="line.idx"
      :color="line.color"
      :line="line"
    />
    <MetroStation
      v-for="station in stations"
      :key="station.idx"
      :station="station"
    />
  </svg>
</template>

<script>
import shortid from 'shortid'
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
  props: {
    width: { type: Number },
    height: { type: Number }
  },
  mounted() {
    const stationCount = 10
    const lineCount = 3

    const stations = [...Array(stationCount).keys()].map(i => ({
      idx: shortid.generate(),
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      lines: []
    }))

    const lines = [...Array(lineCount).keys()].map(i => ({
      idx: shortid.generate(),
      stations: arrayPick(stations, randomRange(2, stations.length * 0.5)).map(
        s => s.idx
      ),
      color: `hsl(${i / lineCount * 360}, 60%, 50%)`
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

</style>
