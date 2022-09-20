<script setup lang="ts">
import { useMoviesStore } from "../../stores/movies";
import { storeToRefs } from "pinia";
import MovieCard from "./MovieCard.vue";
import LoaderLayer from "../../components/InterfaceUtils/LoaderLayer.vue";
import Favoris from "../Favoris.vue";

const MoviesStore = useMoviesStore();
const {
  displayMovieList,
  displayChoosenCategorie,
  displayDatasContainer,
  isLoading,
  displayWishList,
} = storeToRefs(MoviesStore);
const { switchChoosenCategorie } = MoviesStore;
</script>

<template>
  <div v-if="displayChoosenCategorie">
    <p
      class="text-center font-bold text-xl md:text-2xl xl:text-4xl underline text-white xl:mt-5"
    >
      {{
        displayChoosenCategorie === "Populaires"
          ? "Les plus populaires"
          : displayChoosenCategorie
      }}
    </p>

    <div
      class="shadow py-5 shadow-black rounded-xl sm:border-none m-5 flex-1 max-h-[80vh] flex flex-col sm:flex-row sm:m-2 sm:justify-center sm:flex-wrap gap-4 grid-cols-4 grid-rows-3 xl:m-10 overflow-scroll"
      v-if="displayChoosenCategorie === 'Favoris'"
    >
      <p v-if="displayWishList.length < 1">
        Aucun film dans votre liste de souhaits
      </p>

      <Favoris
        v-else
        v-for="wish in displayWishList"
        :key="wish.id"
        :movie="wish"
      >
        {{ wish.movie }}
      </Favoris>
    </div>
    <div
      v-else-if="
        displayChoosenCategorie !== 'Favoris' &&
        displayChoosenCategorie !== 'Populaires' &&
        displayMovieList
      "
      class="shadow py-5 shadow-black rounded-xl sm:border-none m-5 flex-1 max-h-[80vh] flex flex-col sm:flex-row sm:m-2 sm:justify-center sm:flex-wrap gap-4 grid-cols-4 grid-rows-3 xl:m-10 overflow-scroll"
    >
      <MovieCard
        v-if="displayMovieList.length > 0"
        v-for="movie in displayMovieList"
        :key="movie.title"
        :movie="movie"
        @click=""
      >
        {{ movie.title }}
      </MovieCard>

      <div
        class="xl:flex xl:justify-center xl:items-center flex-col text-center text-sm text-white font-semibold px-5"
        v-else
      >
        <p>
          Nous n'avons rien à vous proposer pour cette catégorie pour l'instant
          =(
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
    </div>

    <!-- <button class="text-center">Voir plus</button> -->
    <div
      v-else-if="
        displayChoosenCategorie === 'Populaires' || !displayChoosenCategorie
      "
    >
      <div
        class="shadow py-5 shadow-black rounded-xl sm:border-none m-5 flex-1 max-h-[80vh] flex flex-col sm:flex-row sm:m-2 sm:justify-center sm:flex-wrap gap-4 grid-cols-4 grid-rows-3 xl:m-10 overflow-scroll"
      >
        <MovieCard
          v-if="displayDatasContainer.allMovies"
          v-for="movie in displayDatasContainer.allMovies"
          :key="movie.title"
          :movie="movie"
        >
        </MovieCard>
      </div>
    </div>
  </div>
  <LoaderLayer v-if="isLoading && !displayMovieList" />
</template>
