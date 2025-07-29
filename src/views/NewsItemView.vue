onMounted(() => {

<script setup lang="ts">
import { useNewsItemViewStore } from '@/stores/newsItemView'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const newsItemViewStore = useNewsItemViewStore()
const route = useRoute()

onMounted(() => {
  const id = route.params.id as string
  newsItemViewStore.fetchNewsItem(id)
})
</script>


<template>
  <div>
    <h1>News View</h1>
  </div>
</template>
