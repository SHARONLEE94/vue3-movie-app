<template>
  <Headline />
  <Search />
  <MoviesList />
</template>

<script>
import Headline from "../components/Headline.vue";
import Search from "~/components/Search.vue";
import MoviesList from "~/components/MovieList.vue";

export default {
  components: {
    Headline,
    Search,
    MoviesList,
  },
  created(){
    this.$store.commit('movie/resetMovies')
  }
};
</script>

<style lang="scss" scoped></style>
