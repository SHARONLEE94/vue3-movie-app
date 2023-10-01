import axios from "axios";
import _uniqBy from "lodash/uniqBy";

export default {
  namespaced: true,
  state: () => ({ movies: [] }),
  getters: {},
  mutations: {
    // mutations : 변이 메서드를 작서하는 곳
    // state에서 상태를 실질적으로 데이터를 변경하게 할 수 있는 옵션은
    // 오직 mutations 뿐이다.
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach((key) => {
        //state.movies = payload.movives
        // => state['movies'] = payload['movies']
        //state.message = payload.message
        // => state['message'] = payload['message']
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  actions: {
    // Store의 Mutations를 실행할 때는 .commit()메소드를,
    // Actions를 실행할 때는 .dispatch(스토어 index.js에 연결된 모듈/액션(메소드)) 메소드를 사용
    async searchMovies({ state, commit }, payload) {
      const { title, type, number, year } = payload;
      const OMDB_API_KEY = "7035c60c";
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      );
      const { Search, totalResults } = res.data;
      commit("updateState", {
        movies: _uniqBy(Search, "imdbID"),
        //message: "Hello world",
        //loading: true,
      });
      console.log(totalResults);
      console.log(typeof totalResults);

      const total = parseInt(totalResults, 10);
      const pageLenght = Math.ceil(total / 10);

      // 추가요청
      if (pageLenght > 1) {
        for (let page = 2; page <= pageLenght; page += 1) {
          if (page > number / 10) break;
          const res = await axios.get(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
          );
          const { Search } = res.data;
          commit("updateState", {
            movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
          });
        }
      }
    },
  },
};
