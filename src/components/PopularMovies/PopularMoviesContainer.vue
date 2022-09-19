<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { ref, onMounted, onErrorCaptured } from "vue";
import PopularsMoviesCard from "./PopularsMoviesCard.vue";

const MoviesStore = useMoviesStore();
const { displayDatasContainer, displayPopularMovies } =
  storeToRefs(MoviesStore);
const { fetchAllPopularAndCategories } = MoviesStore;

// IMPL LOADER
onMounted(async () => {
  await fetchAllPopularAndCategories();
  await displayDatasContainer;
});

// onErrorCaptured(() => {
//   const errMessage = "Erreur sorry";
//   alert(errMessage);
// });
</script>

<template>
  <div
    class="xl:flex xl:justify-center xl:items-center xl:flex-col xl:h-full xl:w-[50%] bg-gradient-to-r from-black"
  >
    <p v-if="!displayDatasContainer">Pas de datas</p>

    <div
      class="grid gap-11 grid-cols-2 grid-rows-2"
      v-if="displayPopularMovies && displayDatasContainer"
    >
      <p v-if="!displayDatasContainer">Pas de films en tendances</p>
      <PopularsMoviesCard
        v-else
        v-for="movie in displayPopularMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div class="xl:mt-16">
      <RouterLink to="/movieshub">
        <p class="text-white text-xl font-bold underline">
          Acceder au dashboard
        </p>
      </RouterLink>
    </div>
  </div>
</template>
