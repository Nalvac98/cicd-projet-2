<script setup lang="ts">
import { useUser } from '@/shared/stores';

const userStore = useUser();
</script>

<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
    <div class="card">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ userStore.currentUser?.name }}</h2>
      <p class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ userStore.currentUser?.email }}</p>
      <p class="text-sm font-normal text-gray-500 dark:text-gray-400">ID: {{ userStore.currentUser?._id }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 300px;
}
</style>
