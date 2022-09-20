<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
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
</script>

<template>
  <div
    class="xl:flex xl:justify-center xl:items-center xl:flex-col xl:h-full xl:w-[50%]"
  >
    <p v-if="!displayDatasContainer">Aucune donnée</p>

    <div
      class="xl:grid gap-11 grid-cols-2 grid-rows-2 flex justify-center items-center mx-10"
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
        <p
          class="text-white text-xl font-bold underline text-center mt-10 xl:mt-0"
        >
          Acceder au dashboard
        </p>
      </RouterLink>
    </div>
  </div>
</template>
