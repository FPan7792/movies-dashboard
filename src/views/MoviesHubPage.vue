<script setup lang="ts">
import MovieCategoryContainer from "../components/MovieCategory/MovieCategoryContainer.vue";
import MoviesList from "@/components/Movies/MoviesList.vue";
</script>

<template>
  <div class="relative">
    <div
      class="overflow-hidden blur h-screen min-h-screen bg-main-bg bg-no-repeat bg-cover bg-center"
    ></div>

    <div
      class="sm:flex sm:w-full sm:justify-center sm:items-center absolute top-0 h-full"
    >
      <MovieCategoryContainer />
      <MoviesList />
    </div>
  </div>
</template>
