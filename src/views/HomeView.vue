<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHomeViewStore } from '@/stores/HomeView'
import { onMounted, watch } from 'vue'

const router = useRouter()
const homeViewStore = useHomeViewStore()

function goToAbout(): void {
  router.push('/about')
}

onMounted(() => {
  homeViewStore.fetchHomePageData()
})

watch(() => homeViewStore.homePageData, (newData) => {
  console.log(newData);
})

</script>

<template>
  <h2>HomeView</h2>
  <button @click="goToAbout" class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    Go to About
  </button>
</template>