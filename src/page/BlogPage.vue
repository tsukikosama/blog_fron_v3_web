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
  background-attachment: fixed; /* 关键 */
  background-size: cover;       /* 让背景填满容器 */
}

</style>
