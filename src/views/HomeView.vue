<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHomeViewStore } from '@/stores/HomeView'
import { onMounted } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import NewsCard from '@/components/home-page/NewsCard.vue'

const router = useRouter()
const homeViewStore = useHomeViewStore()

const goToNews = (id: string) => {
  router.push(`/news/${id}`)
}

onMounted(() => {
  homeViewStore.fetchHomePageData()
})
</script>

<template>
  <main class="flex">
    <div class="w-full">
      <div class="flex flex-col gap-4 max-w-screen-xl mt-10">
        <template v-if="homeViewStore.isLoading">
          <div class="flex justify-center">
            <LoadingSpinner />
          </div>
        </template>
        <template v-else>
          <template v-for="item in homeViewStore.getNewsItems" :key="item.id">
            <NewsCard :title="item.title" :description="item.description" :imageSrc="item.imageSrc"
              @click="() => goToNews(item.id)" />
          </template>
        </template>
      </div>
    </div>
  </main>
</template>