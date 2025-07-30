<script setup lang="ts">
import { computed } from 'vue'
import markdownit from 'markdown-it'

const props = defineProps<{ markdown: string }>()

const md = markdownit()
console.log('Markdown input:', props.markdown)


const renderedMarkdown = computed(() => {
    return md.render(props.markdown)
})
</script>

<template>
    <div class="prose lg:prose-xl" v-html="renderedMarkdown">
    </div>
</template>