<template>
  <div>
    <metro-map
      :width="800"
      :height="500"
      class="map"
    />

    <div class="info">
      <section>
        <h2>stations</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <td>x</td>
              <td>y</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="station in stations"
              :key="station.id"
            >
              <th>{{station.id.substring(0, 3)}}</th>
              <td>{{station.x.toFixed(0)}}</td>
              <td>{{station.y.toFixed(0)}}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>lines</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <td>station list</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="line in lines"
              :key="line.id"
            >
              <th>{{line.id.substring(0, 3)}}</th>
              <td>{{line.stations.map(st => st.substring(0, 3)).join(' - ')}}</td>
            </tr>
          </tbody>
        </table>

      </section>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid'
import { mapState, mapGetters } from 'vuex'
import MetroMap from '~/components/MetroMap.vue'

export default {
  components: {
    MetroMap
  },
  data() {
    return {}
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
.info {
  display: grid;
  grid-template-columns: auto auto;
  margin: auto;
  justify-items: center;
  width: 800px;
}
</style>
