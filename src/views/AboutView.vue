<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHome(): void {
  router.push('/')
}

</script>

<template>
  <h2>AboutView</h2>
  <button @click="goToHome" class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    Go to Home
  </button>
</template>