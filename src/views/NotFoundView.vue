<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist or has been moved.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this simple view
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 80px;
}
.not-found h1 {
  font-size: 2.5rem;
  color: #e74c3c;
  margin-bottom: 16px;
}
.not-found p {
  margin-bottom: 24px;
  color: #555;
}
</style>
