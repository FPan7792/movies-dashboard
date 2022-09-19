import Movie from '@/types';
<script setup lang="ts">
import type { Movie } from "@/types";

const props = defineProps<{
  movie: Movie;
}>();

const imageLink = `https://image.tmdb.org/t/p/original${props.movie.poster_path}`;
</script>

<template>
  <div
    class="relative xl:shadow-2xl shadow-white xl:bg-white bg-opacity-50 xl:min-h-60 xl:rounded-xl overflow-hidden xl:flex xl:justify-around flex-col w-[150px] items-center"
  >
    <img
      class="object-cover object-center h-full"
      v-bind:src="imageLink"
      alt=""
    />

    <p class="font-bold text-black">
      {{ movie.title }}
    </p>
  </div>
</template>

<style scoped></style>
