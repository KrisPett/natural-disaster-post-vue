<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    :class="[
      'w-full border-b border-gray-300 sticky top-0 z-50 transition-all duration-200 ease-in-out',
      isScrolled ? 'bg-white shadow py-2' : 'bg-white py-6'
    ]"
  >
    <div class="px-4 flex justify-center">
      <a href="/" class="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-unifraktur">
        The Natural Disaster Post
      </a>
    </div>
  </header>
</template>
