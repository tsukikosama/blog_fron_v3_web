<script setup lang="ts">
import { ref } from "vue";
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

const list = ref([
  { src: '/upload/0ae1ba60d134fe5be558318f29e6da15.jpg' },
  { src: '/upload/0c0a96c27134fe5c11b17c10b1b827f8.jpg'},
  { src: '/upload/07e4c3672134fec1ae2e09f0794f5304.jpg' },
  { src: '/upload/0ae1ba60d134fe5be558318f29e6da15.jpg' },
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
