onMounted(() => {

<script setup lang="ts">
import { useNewsItemViewStore } from '@/stores/newsItemView'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownComp from '@/components/news-item-view/MarkdownComp.vue'

const newsItemViewStore = useNewsItemViewStore()
const route = useRoute()

onMounted(() => {
  const id = route.params.id as string
  newsItemViewStore.fetchNewsItem(id)
})
</script>

<template>
  <div>
    <main class="container mx-auto py-6 max-w-4xl">
      <div v-if="newsItemViewStore.isLoading" class="flex justify-center">
        <LoadingSpinner class="w-10" />
      </div>
      <template v-else>
        <article>
          <div class="pt-6">
            <h2 class="text-3xl font-bold font-serif mb-4">{{ newsItemViewStore.currentNewsItem?.title }}</h2>
            <p class="text-gray-700 text-lg mb-4 font-medium">{{ newsItemViewStore.currentNewsItem?.description }}</p>
            <p class="text-gray-500 text-sm mb-6">{{ newsItemViewStore.currentNewsItem?.date }}</p>
          </div>
          <div class="mb-6">
            <img :src="newsItemViewStore.currentNewsItem?.imageSrc" alt="Hurricane Ian aftermath" class="w-full h-auto" />
          </div>
          <div>
            <MarkdownComp :markdown="newsItemViewStore.currentNewsItem?.content || ''" />
          </div>
        </article>
      </template>
    </main>
  </div>
</template>
