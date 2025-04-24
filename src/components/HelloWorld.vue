<script setup lang="ts">


import Blog from "./Blog.vue";

defineProps<{ msg: string }>()


</script>

<template>
  <Blog></Blog>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
