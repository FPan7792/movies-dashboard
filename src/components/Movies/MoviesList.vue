<script setup lang="ts">
import { useMoviesStore } from "../../stores/movies";
import { storeToRefs } from "pinia";
import MovieCard from "./MovieCard.vue";
import LoaderLayer from "../../components/InterfaceUtils/LoaderLayer.vue";
import type { Ref } from "vue";

const MoviesStore = useMoviesStore();
const {
  displayMovieList,
  displayChoosenCategorie,
  displayDatasContainer,
  isLoading,
} = storeToRefs(MoviesStore);
const { switchChoosenCategorie } = MoviesStore;
</script>

<template>
  <div v-if="displayChoosenCategorie">
    <p
      class="xl:flex-1 xl:w-full xl:text-center xl:font-bold xl:text-4xl underline text-white xl:mt-5"
    >
      {{ displayChoosenCategorie }}
    </p>
    <div
      v-if="displayMovieList"
      class="xl:flex-1 xl:h-[80vh] xl:flex xl:justify-center xl:flex-wrap grid gap-4 grid-cols-4 grid-rows-3 xl:m-10 overflow-scroll"
    >
      <TransitionGroup name="slide-fade">
        <MovieCard
          v-if="displayMovieList.length > 0"
          v-for="movie in displayMovieList"
          :key="movie.title"
          :movie="movie"
          @click=""
        >
          {{ movie.title }}
        </MovieCard>

        <div class="xl:flex xl:justify-center xl:items-center flex-col" v-else>
          <p>
            Nous n'avons rien à vous proposer pour cette catégorie pour
            l'instant =(
          </p>
          <div>
            <p>
              Pas de panique !
              <span
                class="underline cursor-pointer"
                @click="switchChoosenCategorie('Populaires')"
              >
                Retrouvez les films les plus populaires</span
              >
              !
            </p>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <!-- <button class="text-center">Voir plus</button> -->
  </div>
  <div v-else>
    <p
      class="xl:flex-1 xl:w-full xl:text-center xl:font-bold xl:text-4xl underline text-white"
    >
      Les plus populaires
    </p>
    <div
      class="xl:flex-1 xl:h-[80vh] xl:flex xl:justify-center xl:flex-wrap grid gap-4 grid-cols-4 grid-rows-3 xl:m-10 overflow-scroll"
    >
      <MovieCard
        v-if="displayDatasContainer.allMovies"
        v-for="movie in displayDatasContainer.allMovies"
        :key="movie.title"
        :movie="movie"
      >
        {{ movie.title }}
      </MovieCard>
    </div>
  </div>
  <LoaderLayer v-if="isLoading && !displayMovieList" />
</template>
