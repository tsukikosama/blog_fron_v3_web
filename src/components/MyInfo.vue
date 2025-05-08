<script setup lang="ts">
  import {useUserStore} from "../store";
  import {onMounted, ref} from "vue";
  import type {mainUserInfo} from "../api/user.ts";
  import {mainPageInfo} from "../api/user.ts";

  const userStore = useUserStore();
  // 获取文章标签分类信息
  const infoDate = ref<mainUserInfo>({} as mainUserInfo)

  const fetchDate = async () => {
    const { data } = await mainPageInfo();
    infoDate.value = data
  }
  onMounted(()=>{
    fetchDate()
  })
</script>

<template>
  <div class="info_container">
    <a-space direction="vertical" :size="14">
      <a-avatar :size="64">
        <img
            alt="avatar"
            :src="userStore.avatar"
        />

      </a-avatar>
      <div style="text-align: center">
        <span>{{userStore.nickname}}</span>
      </div>
      <div>
        <span>文章总数:{{infoDate.blogCount}}</span>
        <a-divider direction="vertical" />
        <span>本周更新:{{infoDate.weekCount}}</span>
        <a-divider direction="vertical" />
        <span>本月更新:{{infoDate.monthCount}}</span>
      </div>
    </a-space>
  </div>
</template>

<style scoped>
  .info_container{
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: white;
    padding: 5px;
    border-radius: 10px;
  }
</style>
