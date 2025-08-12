<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {mainPageReply} from "../api/reply.ts";
import {getMainPageReply} from "../api/reply.ts";

const dateReply = ref<mainPageReply[]>([])
const fetchDate = async () => {
  const {data} = await getMainPageReply();
  dateReply.value = data;
}
//调用获取数据
onMounted(() => {
  fetchDate()
})
</script>

<template>
  <div style="background-color: white ; margin-bottom: 20px">
    <a-list>
      <template #header>
        最新评论#
      </template>
      <a-list-item v-for="(item,index) in dateReply" :key="index">
        <div><span>用户:{{ item.nickname }}</span></div>
        <div>评论:{{ item.content }}</div>
        <div>时间:{{ item.createTime }}</div>
      </a-list-item>
    </a-list>
  </div>
</template>

<style scoped>

</style>
