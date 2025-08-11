<script setup lang="ts">

import BlogDetail from "../components/BlogDetail.vue";
import Review from "../components/Review.vue";
import {onMounted, ref} from "vue";
import {getImgName} from "../api/common.ts";

const imgUrl = ref<string>('')


onMounted( async () => {
  console.log("mounted 运行了")
  const {data} = await getImgName();
  imgUrl.value = `url(${import.meta.env.VITE_IMG_BASE_URL}/${data})`
  console.log(imgUrl.value)
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
  min-height: 100vh; /* 占满整个屏幕高度 */
  background-size: cover; /* 图片等比例铺满 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat; /* 防止重复平铺 */
}
</style>
