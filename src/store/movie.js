import axios from "axios";
import _uniqBy from "lodash/uniqBy";

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: "Search for the movie title!",
    loading: false,
  }),
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
      // 동작이 끝나기 전에 함수가 다시 실행되는 걸 방지하기 위한 코드
      if (state.loading) return;

      commit("updateState", {
        message: "",
        loading: true,
      });
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
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
            if (page > payload.number / 10) break;
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
      } catch (message) {
        commit("updateState", {
          // 초기화를 위한 배열
          movies: [],
          message,
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

// 검색 코드 리팩토링
// _ : 현재 페이지 내에서만 사용됨을 의미
function _fetchMovie(payload) {
  const { title, type, year, page } = payload;
  const OMDB_API_KEY = "7035c60c";
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  // 오류상황에 대응하기 위해 test할 코드
  //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        console.log("res : ", res);
        // 예외처리
        if (res.data.Error) {
          reject(res.data.Error);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
