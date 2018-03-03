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

const sign = (num) => (num === 0 ? 0 : num > 0 ? 1 : -1)
const lineOffset = 5

export const state = () => ({
  stations: {},
  lines: {}
})

export const getters = {
  getStation: (state) => (id) => state.stations[id],
  getLine: (state) => (id) => state.lines[id],
  getLineNodeList: (state, getters) => (lineId) => {
    let stList = getters.getLine(lineId).stations.map((stId) => {
      const st = getters.getStation(stId)
      const offset = 0
      //          st.lines.findIndex(val => val === this.line.id) * lineOffset
      return new Point(st.x + offset, st.y + offset)
    })

    let nodeList = []

    stList.slice(0, -1).forEach((currSt, i) => {
      const nextSt = stList[i + 1]
      const diff = nextSt.subtract(currSt)
      const diffMin = Math.min(Math.abs(diff.x), Math.abs(diff.y))
      nodeList.push(
        diffMin === 0
          ? [currSt, nextSt]
          : [
              currSt,
              currSt.add(
                new Point(diffMin * sign(diff.x), diffMin * sign(diff.y))
              ),
              nextSt
            ]
      )
    })
    return nodeList
  }
}

export const mutations = {
  setStations(state, stations) {
    state.stations = stations.reduce(
      (prev, curr) => ({ ...prev, [curr.id]: curr }),
      {}
    )
  },
  setLines(state, lines) {
    state.lines = lines.reduce(
      (prev, curr) => ({ ...prev, [curr.id]: curr }),
      {}
    )
  },
  setStation(state, station) {
    state.stations[station.id] = station
  },
  setLine(state, line) {
    state.lines[line.id] = line
  }
}

export const actions = {
  nuxtServerInit({ commit }, { app }) {}
}
