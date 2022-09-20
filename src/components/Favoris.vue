<script setup lang="ts">
const props = defineProps<{
  movie: Movie_LocalStorage;
}>();

const imageLink = `https://image.tmdb.org/t/p/original${props.movie.image}`;
</script>

<template>
  <div
    class="relative bg-black border-2 border-solid border-white xl:w-1/4 xl:rounded-2xl xl:max-h-40 overflow-hidden"
  >
    <img
      class="object-cover object-center w-full"
      v-bind:src="imageLink"
      :alt="movie.movie"
    />
    <div class="absolute bottom-2 left-1 text-white font-bold text-sm">
      <p>{{ movie.movie }}</p>
    </div>
  </div>
</template>
