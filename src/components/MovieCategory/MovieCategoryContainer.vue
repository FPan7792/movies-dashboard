<script setup lang="ts">
import MovieCategorieTab from "./MovieCategorieTab.vue";

import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";

const MoviesStore = useMoviesStore();
const { displaySelectedCategories } = storeToRefs(MoviesStore);
const { switchChoosenCategorie } = MoviesStore;

const populaire = { name: "Populaires", id: 0 };
</script>

<template>
  <div
    class="rounded-2xl px-4 flex flex-wrap sm:flex-nowrap justify-center md:justify-start items-center flex-col sm:mx-2 font-bold xl:ml-10"
  >
    <button @click="switchChoosenCategorie('Favoris')" class="underline">
      Voir mes favoris
    </button>

    <MovieCategorieTab
      :categorie="populaire"
      @click="switchChoosenCategorie('Populaires')"
    />
    <MovieCategorieTab
      v-for="categorie in displaySelectedCategories"
      :key="categorie.name"
      :categorie="categorie"
      @click="switchChoosenCategorie(categorie.name)"
    />
  </div>
</template>
