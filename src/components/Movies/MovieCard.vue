<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useMoviesStore } from "../../stores/movies";
import { storeToRefs } from "pinia";

const props = defineProps<{
  movie: Movie;
}>();

const MoviesStore = useMoviesStore();
const { displayWishList } = storeToRefs(MoviesStore);
const { manageWishList, toastNotifications } = MoviesStore;

onMounted(() => {
  checkIsMovieFavorite(displayWishList.value, props.movie);
});

// FUNCS
function checkIsMovieFavorite(list: Movie_LocalStorage[], movie: Movie) {
  const find = list.find(
    (elem) => elem.id === movie.id && elem.movie === movie.title
  );
  if (find) {
    isFavorite.value = true;
  }
}

// Local states
const imageLink = `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`;
const isFavorite = ref(false);
const displayIsFavorite = computed(() => isFavorite.value);

function switchIsFavorite() {
  manageWishList(props.movie);

  if (isFavorite.value) {
    isFavorite.value = false;
    toastNotifications(
      `${props.movie.title} a été retiré des favoris`,
      false,
      5000
    );
  } else {
    isFavorite.value = true;
    toastNotifications(
      `${props.movie.title} est maintenant dans vos favoris !`,
      false,
      5000
    );
  }
}
</script>

<template>
  <div
    class="relative bg-black border-2 border-solid border-white my-0 mx-auto sm:m-0 w-3/4 sm:w-1/4 min-h-[200px] min-w-[200px] md:min-w-[300px] rounded-2xl overflow-hidden max-h-40 sm:h-40"
  >
    <img
      class="object-cover object-center w-full h-full"
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
