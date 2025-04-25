<script setup lang="ts">
import { ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";

const list = ref([
  { src: '../assets/0ae1ba60d134fe5be558318f29e6da15.jpg' },
  { src: '../assets/0c0a96c27134fe5c11b17c10b1b827f8.jpg'},
  { src: '../assets/0b50372e7134fec1ad331b6317269a81.jpg'},
  { src: '../assets/07b1537a-4133-ed4e-f650-62961d3b5334.jpg'},
  {src : '../assets/05abb772-b133-c833-1427-8936948b2922.jpg'},
  {src : '../assets/05abb772-b133-c833-1427-8936948b2922.jpg'}

]);

const handleImageError = () => {
  console.error('图片加载失败');
};
</script>

<template>
  <Waterfall :list="list" :column-width="200" :gap="16" breakpoints="1200:{rowPerView:3},
800:{rowPerView:2},
500:{rowPerView:1}
">
    <template #default="{ item }">
      <div class="card">
        <img class="img" :url="item.src" @error="handleImageError" crossOrigin="true" />
      </div>
    </template>
  </Waterfall>
</template>

<style scoped>
.card {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.img {

  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
