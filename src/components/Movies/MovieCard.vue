<script setup lang="ts">
// import Movie from '@/types';
import { ref, onMounted, type Ref, onUpdated, computed } from "vue";

import { useMoviesStore } from "../../stores/movies";
import { storeToRefs } from "pinia";

const props = defineProps<{
  movie: Movie;
}>();

// const emit = defineEmits<{
//   (e: 'checkIsMovieFavorite',): void
//   // (e: 'update', value: string): void
// }>()

const MoviesStore = useMoviesStore();

const { displayWishList } = storeToRefs(MoviesStore);
const { manageWishList } = MoviesStore;

onMounted(() => {
  checkIsMovieFavorite(displayWishList.value, props.movie);
});
function checkIsMovieFavorite(list: Movie_LocalStorage[], movie: Movie) {
  const find = list.find(
    (elem) => elem.id === movie.id && elem.movie === movie.title
  );
  if (find) {
    isFavorite.value = true;
  }
}

const imageLink = `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`;
const isFavorite = ref(false);
const displayIsFavorite = computed(() => isFavorite.value);

function switchIsFavorite() {
  manageWishList(props.movie);

  if (isFavorite.value) {
    isFavorite.value = false;
  } else {
    isFavorite.value = true;
  }
}
</script>

<template>
  <div
    class="relative bg-black border-2 border-solid border-white xl:w-1/4 xl:rounded-2xl overflow-hidden"
  >
    <img
      class="object-cover object-center w-full"
      v-bind:src="imageLink"
      alt=""
    />
    <div class="absolute bottom-2 left-1 text-white font-bold text-sm">
      <p>{{ movie.title }}</p>
    </div>
    <button @click="switchIsFavorite" class="absolute top-2 right-2">
      <font-awesome-icon icon="fa-solid fa-circle-plus" color="white" />
    </button>

    <div v-if="displayIsFavorite" class="absolute bottom-2 right-2">
      <font-awesome-icon icon="fa-solid fa-heart-pulse" color="red" />
    </div>
  </div>
</template>
