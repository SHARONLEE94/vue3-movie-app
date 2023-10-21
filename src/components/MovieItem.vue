<template>
  <div
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie"
  >
    <Loader 
      v-if="imageLoading"
      :size="1.5"
      absolute
    />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components:{
    Loader
  },
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
  data(){
    return{
      imageLoading : true
    }
  },
  mounted(){ // mounted : html과 연결된 직후. 일반적인 경우에는 create사용 하지만, html요소를 다룰 경우에는 mounted 사용을 권장
    this.init() 
  },
  methods:{
    // 데이터 초기화를 위한 메서드
    /*
    * init(){
        const img = document.createElement('img')
        img.src = this.movie.Poster
        img.addEventListener('load', () => {
          this.imageLoading = false
        })
      }
    *
     */
    async init(){
     await this.$loadImage(this.movie.Poster) // 이미지 로드가 완료가 되면
     this.imageLoading = false  // imageLoading 데이터 값을 false로 변경
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.movie {
  $width: 168px;
  width: $width;
  height: $width * 3/2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-image: cover;
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, 0.3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
