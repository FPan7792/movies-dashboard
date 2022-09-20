<script setup lang="ts">
import { useMoviesStore } from "../../stores/movies";
import { storeToRefs } from "pinia";

const MoviesStore = useMoviesStore();
const { isNotif } = storeToRefs(MoviesStore);
const { toastNotifications } = MoviesStore;
</script>

<template>
  <Transition name="toast">
    <div
      v-if="isNotif.active && isNotif.message"
      class="fixed xl:bottom-8 xl:right-5 xl:p-5 text-center font-semibold bg-indigo-200 border-2 border-solid border-white xl:min-h-[70px] xl:w-[300px] z-50 text-black flex justify-center items-center rounded-xl"
    >
      <p>{{ isNotif.message }}</p>
    </div>
  </Transition>
  <!-- Errors handlers  -->
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
}
</style>
