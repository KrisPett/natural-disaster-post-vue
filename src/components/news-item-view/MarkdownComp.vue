
<script setup lang="ts">
import { computed } from 'vue'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'

const props = defineProps<{ 
  markdown: string 
}>()

// Setup markdown-it with highlight.js
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {
        // Fall through to default handling
      }
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

const renderedMarkdown = computed(() => {
  if (!props.markdown) return '<p>No content</p>'
  try {
    return md.render(props.markdown)
  } catch (error) {
    console.error('Markdown rendering error:', error)
    return `<p>Error rendering markdown: ${error}</p>`
  }
})
</script>

<template>
  <div 
    class="w-full h-auto text-gray-900 bg-white p-4"
    v-html="renderedMarkdown"
  />
</template>