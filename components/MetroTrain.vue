<template>
  <g :style="pos">
    <rect
      x="0"
      y="0"
      :width="width"
      :height="height"
      :fill="color"
      :style="rot"
    />
  </g>
</template>

<script>
import { mapGetters } from 'vuex'
let timer

export default {
  data() {
    return {
      currentSectionIdx: 0,
      currentNodeIdx: 0,
      progress: 0,
      dir: 1,
      width: 50,
      height: 25
    }
  },
  props: {
    lineId: { type: String },
    color: { type: String }
  },
  mounted() {
    timer = setInterval(this.update, 20)
  },
  computed: {
    ...mapGetters(['getStation', 'getLineNodeList']),
    nextNodeIdx() {
      return this.currentNodeIdx + this.dir
    },
    sectionList() {
      return this.getLineNodeList(this.lineId)
    },
    nodeList() {
      return this.sectionList[this.currentSectionIdx]
    },
    nodeDiff() {
      return this.nodeList[this.nextNodeIdx].subtract(
        this.nodeList[this.currentNodeIdx]
      )
    },
    nodeDistance() {
      return Math.hypot(this.nodeDiff.x, this.nodeDiff.y)
    },
    pos() {
      const progress = this.progress / this.nodeDistance

      const node = this.nodeList[this.currentNodeIdx]
      return {
        transform: `translate(${node.x -
          this.width / 2 +
          this.nodeDiff.x * progress}px, ${node.y -
          this.height / 2 +
          this.nodeDiff.y * progress}px)`
      }
    },
    rot() {
      const rad = Math.atan2(this.nodeDiff.y, this.nodeDiff.x)
      return {
        transform: `rotate(${rad * 180 / Math.PI}deg)`,
        transformOrigin: `${this.width / 2}px ${this.height / 2}px`
      }
    }
  },
  methods: {
    update() {
      this.progress += 5
      if (this.progress < this.nodeDistance) return

      this.progress -= this.nodeDistance
      const nextNodeIdx = this.currentNodeIdx + this.dir

      if (0 < nextNodeIdx && this.nodeList.length - 1 > nextNodeIdx) {
        this.currentNodeIdx = nextNodeIdx
        return
      }

      const nextSectionnIdx = this.currentSectionIdx + this.dir
      if (0 <= nextSectionnIdx && this.sectionList.length > nextSectionnIdx) {
        this.currentSectionIdx = nextSectionnIdx
      } else {
        this.dir *= -1
      }

      this.currentNodeIdx = this.dir === 1 ? 0 : this.nodeList.length - 1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
