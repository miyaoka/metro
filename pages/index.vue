<template>
  <div>
    <metro-map
      width="800"
      height="500"
      class="map"
    />
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
</style>
