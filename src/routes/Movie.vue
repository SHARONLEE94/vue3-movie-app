<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <!-- Boolean데이터는 fixed라는 속성의 표기 유무만을 가지고도 true(표기한 경우)와 false를 지정할 수 있다.  -->
      <Loader
        :size="3"
        :z-index="9"
        fixed
      />
    </template>
    <div
      v-else
      class="movie-details"
    >
      <div
        :style="{backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster"
      >
        <Loader
          v-if="imageLoading"
          absolute
        />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating"
            >
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name"
              />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>{{ theMovie.Actors }}</h3>
        </div>
        <div>
          <h3>{{ theMovie.Director }}</h3>
        </div>
        <div>
          <h3>{{ theMovie.Production }}</h3>
        </div>
        <div>
          <h3>{{ theMovie.Genre }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions } from 'vuex'; // mapActions는 경로가 명시적이지 않다는 불편함 때문에 사용되는 빈도가 낮다
import { mapState } from 'vuex';
import Loader from "~/components/Loader";

export default {
  components: {
    Loader,
  },
  data(){
    return{
      imageLoading :true
    }
  },
  computed: {
    ...mapState('movie',[
      'theMovie',
      'loading'
    ])
    // theMovie() {
    //   return this.$store.state.movie.theMovie;
    // },
    // loading() {
    //   return this.$store.state.movie.loading;
    // },
  },
  created() {
    // console.log("this.$route :::", this.$route);
    this.$store.dispatch("movie/searchMovieWithId", {   
    // this.searchMovieWithId({  // vuex의 mapActions을 사용한 경우
      id: this.$route.params.id,
    });
  },
  methods: {
    // 경로가 명시적이지 않기 때문에 mapActions는 많이 쓰이지 않는다
    // ...mapActions('movie', [
    //   'searchMovieWithId'
    // ]),
    requestDiffSizeImage(url, size = 700) {
      // 포스터 이미지가 없는 경우 예외처리
      if(!url || url === 'N/A'){
        this.imageLoading = false
        return '' // return만 사용하면 undefined가 반환 되기 때문에 '' 빈 공백을 반환 시킴
      }
      const src = url.replace("SX300", `SX${size}`)
      this.$loadImage(src)
        .then(()=>{
          this.imageLoading = false
        })
      return src // $loadImage와는 별개로 requestDiffSizeImage가 동작 하면 src를 return 시켜준다
    },
  },
};
</script>

<style lang="scss" scoped>

.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0; // 크기 감소 x
    width: 500px;
    height: 500px * 3 /2;
    margin-right: 70px;
  }
  .specs {
    flex-grow: 1; // 증가 비율 최대
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position:relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl){
    .poster{
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg){
    display: block;
    .poster{
      margin-bottom:40px;
    }
  }
  @include media-breakpoint-down(md){
    .specs{
      .title{
        font-size:50px;
      }
      .ratings{
        .rating-wrap{
          display: block;
          .rating{
            margin-top:10px;
          }
        }
      }
    }
  }
}
</style>
