<script setup lang="ts">
import { useRoute } from "vue-router";
import { BlogDetail, getBlogDetailById } from "../api/blog.ts";
import { onMounted, ref } from "vue";

const route = useRoute();
const blog = ref<BlogDetail>({} as BlogDetail)

const fetchDate = async () => {
  const id = route.params.id;
  const { data } = await getBlogDetailById(id); // 注意这里也要Number
  blog.value = data
}
onMounted(async () => {
  await fetchDate();
})
</script>

<template>
  <div class="blog_details">
    <h1>{{blog.title}}</h1>
    <!-- ✅ 用 v-md-preview -->
    <v-md-preview :text="blog.content"></v-md-preview>
  </div>
</template>

<style scoped>
.blog_details {
  padding: 20px;
  background: white;
  min-height: 300px;
}
</style>
