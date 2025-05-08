<script setup lang="ts">
import { ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";

const list = ref([
  { src: '/upload/0ae1ba60d134fe5be558318f29e6da15.jpg' },
  { src: '/upload/0c0a96c27134fe5c11b17c10b1b827f8.jpg'},
  { src: '/upload/07e4c3672134fec1ae2e09f0794f5304.jpg' },
  { src: '/upload/0ae1ba60d134fe5be558318f29e6da15.jpg' },
  // { src: 'https://images.pexels.com/photos/2632384/pexels-photo-2632384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=350'},
  // { src: 'https://images.pexels.com/photos/3399350/pexels-photo-3399350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=350'},
  // { src: 'https://images.pexels.com/photos/2632384/pexels-photo-2632384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=350'},
  // { src: 'https://images.pexels.com/photos/3399350/pexels-photo-3399350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=350'},
  // { src: 'https://images.pexels.com/photos/2632384/pexels-photo-2632384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=350'},
  // { src: 'https://images.pexels.com/photos/3399350/pexels-photo-3399350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=350'},
]);

const handleImageError = () => {
  console.error('图片加载失败');
};
const loadProps = {
  ratioCalculator: (width: number, height: number) => {
    const minRatio = 3 / 4;
    const maxRatio = 4 / 3;
    const curRatio = width / height;
    if (curRatio < minRatio) return minRatio;
    if (curRatio > maxRatio) return maxRatio;
    return curRatio;
  }
};
</script>

<template>
  <div class="waterfall-container">
<!--    <Waterfall :list="list">-->
<!--      &lt;!&ndash; v2.6.0之前版本插槽数据获取 &ndash;&gt;-->
<!--      &lt;!&ndash; <template #item="{ item, url, index }"> &ndash;&gt;-->
<!--      &lt;!&ndash; 新版插槽数据获取 &ndash;&gt;-->
<!--      <template #default="{ item, url, index }">-->

<!--          -->

<!--      </template>-->
<!--    </Waterfall>-->
    <div class="img_container">
     <a-space>
       <img v-for="(item,index) in list" :key="index" class="img"   :src="item.src" @error="handleImageError" />
     </a-space>
    </div>
  </div>
</template>

<style scoped>
.waterfall-container {
  width: 80vw;
  margin: 0vw 10vw;
}
.img_container{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
img{
  width: 300px;
}
</style>
