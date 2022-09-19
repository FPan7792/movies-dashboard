<script setup lang="ts">
import MovieCategoryContainer from "../components/MovieCategory/MovieCategoryContainer.vue";
import MoviesList from "@/components/Movies/MoviesList.vue";

import { useMoviesStore } from "@/stores/movies";

import { onMounted } from "vue";

const MoviesStore = useMoviesStore();
// const {
//   displaySelectedCategories,
//   displaySimilarMoviesListContainer,
//   displayMovieList,
//   displayChoosenCategorie,
// } = storeToRefs(MoviesStore);
const { switchChoosenCategorie } = MoviesStore;

onMounted(() => {
  // switchChoosenCategorie("Action");
});
</script>

<template>
  <div class="relative">
    <div
      class="overflow-hidden blur h-screen min-h-screen bg-main-bg bg-no-repeat bg-cover bg-center"
    ></div>

    <div
      class="xl:flex xl:w-full xl:justify-center xl:items-center absolute top-0"
    >
      <MovieCategoryContainer />
      <MoviesList />
    </div>
  </div>
</template>
