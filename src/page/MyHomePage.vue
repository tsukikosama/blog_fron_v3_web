<script setup lang="ts">

import Recommend from "../components/Recommend.vue";
import Blog from "../components/Blog.vue";
import ReviewList from "../components/ReviewList.vue";
import MyInfo from "../components/MyInfo.vue";
</script>

<template>
  <div class="my_container">
<!--    左边-->
      <div>
        <Blog></Blog>

      </div>
<!--    右边-->
    <a-space direction="vertical" :size="36">
      <MyInfo/>
      <Recommend />
      <ReviewList />
    </a-space>
  </div>
</template>

<style scoped>
.my_container {
  display: flex;
  justify-content: center; /* 水平居中 */

  padding: 20px;            /* 可选：内边距 */
  gap: 10vw; /* 调大间距，比如 80px */
}
</style>
