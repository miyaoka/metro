export const state = () => ({
  stations: {},
  lines: {}
})

export const getters = {
  getStation: state => idx => state.stations[idx],
  getLine: state => idx => state.lines[idx]
}

export const mutations = {
  setStations(state, stations) {
    state.stations = stations.reduce(
      (prev, curr) => ({ ...prev, [curr.idx]: curr }),
      {}
    )
  },
  setLines(state, lines) {
    state.lines = lines.reduce(
      (prev, curr) => ({ ...prev, [curr.idx]: curr }),
      {}
    )
  },
  setStation(state, { idx, station }) {
    state.stations[idx] = station
  },
  setLine(state, { idx, line }) {
    state.lines[idx] = line
  }
}

export const actions = {
  nuxtServerInit({ commit }, { app }) {}
}
