<script setup lang="ts">
import { ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";

const list = ref([
  {
    src: 'http://8.138.16.124:8083/upload/00cc63e61134febde55733ff6f7e978b.jpg'
  },
  {
    src: 'http://8.138.16.124:8083/upload/00cc63e61134febde55733ff6f7e978b.jpg'
  },
  {
    src: 'http://8.138.16.124:8083/upload/00cc63e61134febde55733ff6f7e978b.jpg'
  },
  {
    src: 'http://8.138.16.124:8083/upload/00cc63e61134febde55733ff6f7e978b.jpg'
  }
]);

const handleImageError = () => {
  console.error('图片加载失败');
};
</script>

<template>
  <Waterfall :list="list">
    <template #default="{ item, url, index }">
      <div class="card">
        <LazyImg :url="url" @error="handleImageError" crossOrigin="true" />
        <p class="text">这是具体内容</p>
      </div>
    </template>
  </Waterfall>
</template>

<style scoped>
.card {
  width: 300px;
  height: 400px;
  margin-bottom: 20px;
}

.text {
  text-align: center;
  margin-top: 10px;
}
</style>
