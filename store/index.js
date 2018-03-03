export const state = () => ({
  stations: {},
  lines: {}
})

export const getters = {
  getStation: state => id => state.stations[id],
  getLine: state => id => state.lines[id]
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
