<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToAbout(): void {
  router.push('/about')
}
</script>

<template>
  <h2>HomeView</h2>
  <button @click="goToAbout" class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    Go to About
  </button>
</template>