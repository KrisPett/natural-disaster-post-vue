<script setup lang="ts">
import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';
</script>

<template>
  <div style="min-height: 100vh" class="flex flex-col border-2 bg-white text-black">
    <Header />
    <main class="flex-1">
      <div class="max-w-screen-xl mx-auto px-4">
        <router-view />
      </div>
    </main>
    <div class="max-w-screen-xl w-full mx-auto px-4">
      <Footer />
    </div>
  </div>
</template>
