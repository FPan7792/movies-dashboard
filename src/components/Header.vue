<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header
    class="text-black bg-transparent flex flex-col lg:flex-row justify-between items-center px-20 lg:px-10 py-2"
  >
    <RouterLink to="/">
      <img
        class="max-w-[40px]"
        src="../assets/images/logo-n.jpeg"
        alt="logo-MECFLEX"
      />
      <!-- <span class="text-white font-bold underline text-xl">MECFLEX</span> -->
    </RouterLink>
    <RouterLink to="/movieshub">
      <span class="underline">Voir la liste des films</span>
      {{ " " }}
      <font-awesome-icon
        class="animate-bounce"
        icon="fa-solid fa-circle-arrow-down"
      />
    </RouterLink>
  </header>
</template>
