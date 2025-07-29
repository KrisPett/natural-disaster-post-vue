<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHomeViewStore } from '@/stores/HomeView'
import { onMounted } from 'vue'

const router = useRouter()
const homeViewStore = useHomeViewStore()

function goToAbout(): void {
  router.push('/about')
}

function goToNews(id: string) {
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
          <div class="flex justify-center"><span>Loading...</span></div>
        </template>
        <template v-else>
          <template v-for="item in homeViewStore.getData?.newsItems || []" :key="item.id">
            <div
              class="cursor-pointer border rounded p-4 flex gap-4 hover:bg-gray-50"
              @click="goToNews(item.id)"
            >
              <img :src="item.imageSrc" alt="" class="w-24 h-24 object-cover rounded" />
              <div>
                <h3 class="font-bold text-lg">{{ item.title }}</h3>
                <p class="text-gray-600">{{ item.description }}</p>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </main>
  <button @click="goToAbout" class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-8">
    Go to About
  </button>
</template>