<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import { setupWishList } from "./utils/functions";
import Header from "./components/Header.vue";
import { useMoviesStore } from "@/stores/movies";
import { ref, onMounted, onErrorCaptured } from "vue";
import ToastNotifications from "./components/InterfaceUtils/ToastNotifications.vue";

const MoviesStore = useMoviesStore();

const {
  fetchAllCategories,
  getSimilarMoviesLists,
  fetchAllPopularAndCategories,
  setupWishList,
} = MoviesStore;

// Create LocalStorage items
setupWishList();

onMounted(async () => {
  await fetchAllPopularAndCategories();
  await fetchAllCategories();
  await getSimilarMoviesLists();
});
</script>

<template>
  <div
    class="bg-white h-screen min-h-screen bg-main-bg bg-no-repeat bg-cover bg-center max-w-[1440px] mx-0 my-auto"
  >
    <Header />
    <RouterView />
    <ToastNotifications />
  </div>
</template>

<!-- ANIMATIONS -->
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
