<script setup lang="ts">
import PopularMoviesContainer from "../components/PopularMovies/PopularMoviesContainer.vue";

import { useMoviesStore } from "../stores/movies";
import { storeToRefs } from "pinia";

const MoviesStore = useMoviesStore();
const { isLoading } = storeToRefs(MoviesStore);
</script>

<template>
  <div
    class="h-full relative flex flex-col-reverse xl:flex-row justify-around xl:justify-between items-center bg-gradient-to-r from-black"
  >
    <!-- Layer -->
    <div class="absolute h-full w-full top-0 bg-black bg-opacity-40"></div>
    <!---->

    <PopularMoviesContainer />
    <div
      class="lg:flex lg:justify-center items-center xl:w-[40%] xl:h-full text-white xl:text-5xl xl:px-20 text-center font-bold text-2xl md:text-4xl"
    >
      Découvrez <br />
      les films les plus populaires <br />
      et plus !
    </div>
  </div>
  <LoaderLayer v-if="isLoading" />
</template>
