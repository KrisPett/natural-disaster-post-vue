<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    title: string;
    description: string;
    imageSrc: string;
}>();
const emit = defineEmits(['click']);

const handleClick = () => {
    emit('click');
}
</script>

<template>
    <div @click="handleClick"
        class="flex flex-col md:flex-row justify-between border-b border-gray-300 cursor-pointer transition-transform transform hover:scale-101">
        <div class="flex flex-col gap-4 max-w-sm">
            <h2 class="text-xl font-bold">{{ props.title }}</h2>
            <p class="text-lg text-gray-500">{{ props.description }}</p>
        </div>
        <div class="lg:w-xl mb-4">
            <img :src="props.imageSrc" :alt="props.imageSrc || props.title"
                class="w-full h-auto max-h-96 object-cover rounded" />
        </div>
    </div>
</template>