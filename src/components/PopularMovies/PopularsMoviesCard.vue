import Movie from '@/types';
<script setup lang="ts">
const props = defineProps<{
  movie: Movie;
}>();

const imageLink = `https://image.tmdb.org/t/p/original${props.movie.poster_path}`;
</script>

<template>
  <div
    class="relative xl:shadow-2xl shadow-white xl:bg-white lg:min-h-60 rounded-xl overflow-hidden xl:flex xl:justify-around flex-col lg:w-[150px] items-center border-white md:border-none border-2 border-solid"
  >
    <img
      class="object-cover object-center h-full min-h-[230px] max-h-[300px]"
      v-bind:src="imageLink"
      alt=""
    />

    <p class="font-bold text-black">
      {{ movie.title }}
    </p>
  </div>
</template>

<style scoped></style>
