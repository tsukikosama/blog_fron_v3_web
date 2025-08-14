<script setup lang="ts">

import BlogDetail from "../components/BlogDetail.vue";
import Review from "../components/Review.vue";
import {onMounted, ref} from "vue";
import {getImgName} from "../api/common.ts";

const imgUrl = ref<string>('')


onMounted( async () => {
  try {
    const res = await getImgName();
    imgUrl.value = `url(${import.meta.env.VITE_IMG_BASE_URL}/${res.data})`;
  } catch (error) {
    console.error('获取图片失败', error);
  }
})

</script>

<template>
  <div id="basic-demo" :style="{ backgroundImage: imgUrl }">
    <BlogDetail></BlogDetail>
    <br>
    <Review></Review>
  </div>
</template>

<style scoped>

#basic-demo {
  background-position: center;
  background-repeat: no-repeat;
}

@media (min-aspect-ratio: 16/9) {
  #basic-demo {
    background-size: contain; /* 宽屏下完整显示 */
  }
}

@media (max-aspect-ratio: 16/9) {
  #basic-demo {
    background-size: cover; /* 窄屏下铺满 */
  }
}
</style>
