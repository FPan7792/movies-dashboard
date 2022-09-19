<script setup lang="ts">
defineProps<{
  categorie: {
    name: string;
    id: number;
  };
}>();
</script>

<template>
  <button
    class="xl:rounded-xl shadow-lg border-white border-2 border-solid w-full xl:mt-4 xl:py-5 xl:px-2 font-bold xl:transition-all xl:duration-500 xl:hover:bg-white xl:hover:bg-opacity-50 xl:text-sm"
  >
    {{ categorie.name }}
  </button>
</template>
