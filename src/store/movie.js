export default {
  // module
  namespaced: true,
  // data
  state: () => ({ movies: [] }),
  //computed
  getters: {
    movieIds(state) {
      return state.movies.map((m) => m.imdbID);
    },
  },
  //methods
  //변이
  mutations: {
    resetMovies(state) {
      state.movies = [];
    },
  },
  //비동기로 처리됨
  actions: {
    searchMovies() {},
  },
};
