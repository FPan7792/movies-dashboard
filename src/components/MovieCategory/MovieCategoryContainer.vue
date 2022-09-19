<script setup lang="ts">
import MovieCategorieTab from "./MovieCategorieTab.vue";

import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { ref, onMounted, onErrorCaptured, onUpdated } from "vue";

const MoviesStore = useMoviesStore();
const { displaySelectedCategories, displaySimilarMoviesListContainer } =
  storeToRefs(MoviesStore);
const { switchChoosenCategorie } = MoviesStore;

const populaire = { name: "Populaires", id: 0 };
</script>

<template>
  <!-- <div v-if="!displaySimilarMoviesListContainer">
    <p>Erreur de requete. Pas de Catégorie</p>
  </div> -->
  <div class="xl:flex xl:justify-start xl:flex-col xl:mx-2">
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
