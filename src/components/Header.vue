<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header
    class="text-black bg-transparent flex justify-between xl:px-10 xl:py-5"
  >
    <RouterLink to="/">
      <span class="text-white font-bold underline text-xl">MECFLEX</span>
    </RouterLink>
    <RouterLink to="/movieshub">
      <span class="underline">Voir la liste des films</span>
      {{ " " }}
      <font-awesome-icon icon="fa-solid fa-circle-arrow-down" />
    </RouterLink>
  </header>
</template>
