<script setup lang="ts">
import { useMoviesStore } from "@/stores/movies";
import { storeToRefs } from "pinia";

const MoviesStore = useMoviesStore();
const { displayChoosenCategorie } = storeToRefs(MoviesStore);

defineProps<{
  categorie: {
    name: string;
    id: number;
  };
}>();
</script>

<template>
  <button
    v-if="displayChoosenCategorie === categorie.name"
    class="bg-amber-300 bg-opacity-80 bg scale-105 text-white sm:w-full py-1 px-4 my-2 sm:mx-5 sm:my-2 rounded-3xl sm:rounded-xl shadow-lg border-white border-2 border-solid sm:mt-4 sm:py-5 sm:px-2 font-bold transition-all duration-500 hover:bg-white hover:bg-opacity-50 text-sm"
  >
    {{ categorie.name }}
  </button>
  <button
    v-else
    class="sm:w-full py-1 px-4 my-2 sm:mx-5 sm:my-2 rounded-3xl sm:rounded-xl shadow-lg border-white border-2 border-solid sm:mt-4 sm:py-5 sm:px-2 font-bold transition-all duration-500 hover:bg-white hover:bg-opacity-50 text-sm"
  >
    {{ categorie.name }}
  </button>
</template>
