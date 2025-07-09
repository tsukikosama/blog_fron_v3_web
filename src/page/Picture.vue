<script setup lang="ts">
import { ref } from "vue";
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

const list = ref([
  { src: 'https://picsum.photos/300/300' },
  { src: 'https://picsum.photos/300/400' },
  { src: 'https://picsum.photos/300/200' },
  { src: 'https://picsum.photos/300/350' },
  { src: 'https://picsum.photos/300/300' },
  { src: 'https://picsum.photos/300/400' },
  { src: 'https://picsum.photos/300/200' },
  { src: 'https://picsum.photos/300/350' },
  { src: 'https://picsum.photos/300/300' },
  { src: 'https://picsum.photos/300/400' },
  { src: 'https://picsum.photos/300/200' },
  { src: 'https://picsum.photos/300/350' },
  { src: 'https://picsum.photos/300/300' },
  { src: 'https://picsum.photos/300/400' },
  { src: 'https://picsum.photos/300/200' },
  { src: 'https://picsum.photos/300/350' },
  { src: 'https://picsum.photos/300/300' },
  { src: 'https://picsum.photos/300/400' },
  { src: 'https://picsum.photos/300/200' },
  { src: 'https://picsum.photos/300/350' },
]);
</script>

<template>
  <Waterfall :list="list" :gutter="5">
    <!-- v2.6.0之前版本插槽数据获取 -->
    <!-- <template #item="{ item, url, index }"> -->
    <!-- 新版插槽数据获取 -->
    <template #default="{ item, url, index }">
      <div class="card">
        <LazyImg :url="url" />
      </div>
    </template>
  </Waterfall>
</template>

<style scoped>
.card{
  padding: 0px;
  padding-bottom: 10px;
}




</style>
