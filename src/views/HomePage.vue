<script setup lang="ts">
import PopularMoviesContainer from "../components/PopularMovies/PopularMoviesContainer.vue";
</script>

<template>
  <div
    class="h-full relative xl:flex xl:justify-between xl:items-center bg-gradient-to-r from-black"
  >
    <!-- Layer -->
    <div class="absolute h-full w-full top-0 bg-black bg-opacity-40"></div>
    <!---->

    <PopularMoviesContainer />
    <div
      class="xl:flex xl:justify-center items-center xl:w-[40%] xl:h-full text-white text-5xl xl:px-20 text-center font-bold"
    >
      Découvrez <br />
      les films les plus populaires <br />
      et plus !
    </div>
  </div>
</template>
