export const state = () => ({
  stations: [],
  lines: []
})

export const getters = {
  getStation: state => idx => state.stations[idx],
  getLine: state => idx => state.lines[idx]
}

export const mutations = {
  setStations(state, stations) {
    state.stations = stations
  },
  setLines(state, lines) {
    state.lines = lines
  }
}

export const actions = {
  nuxtServerInit({ commit }, { app }) {}
}
