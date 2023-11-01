<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute
      />
      <img 
        :src="image" 
        :alt="name"
      />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
import { mapState } from 'vuex'
export default{
  components:{
    Loader
  },
  data(){
    return{
      imageLoading : true
    }
  },
  computed:{
    // mapState의 첫번째 인수로는 '모듈의 이름', 
    // 두번째 인수는 배열 데이터 내부에 상태의 이름을 문자 데이터 형식으로 작성.
    // 전개연산자를 사용하여 객체 데이터 내부에 작성하는 방식으로 사용하는 것이 좋다.
    ...mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
    // ▲ 아래의 코드를 vuex의 mapState 핼퍼로 작성하여 정리
    // image(){
    //   return this.$store.state.about.image
    // },
    // name(){
    //   return this.$store.state.about.name
    // },
    // email(){
    //   return this.$store.state.about.email
    // },
    // blog(){
    //   return this.$store.state.about.blog
    // },
    // phone(){
    //   return this.$store.state.about.phone
    // },
  },
  mounted(){
    // 라이프 사이클에서는 비동기를 사용하면 안됨.
    //그러므로 별도의 메소드를 만들어 비동기로 처리한 것을 라이프 사이클에서 실행만 해주면 됨
    this.init() 
  },
  methods:{
    async init(){
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.about{
  text-align: center;
  .photo{
    width:250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img{
      width:100%;
    }
  }
  .name{
    font-size:40px;
    font-family: "Oswald", sans-serif;
    margin-bottom:20px;
  }
}
</style>