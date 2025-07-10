<script setup lang="ts">
  import {useUserStore} from "../store";

  const userStore = useUserStore();

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
        <span>文章总数:{{userStore.blogCount}}</span>
        <a-divider direction="vertical" />
        <span>本周更新:{{userStore.weekCount}}</span>
        <a-divider direction="vertical" />
        <span>本月更新:{{userStore.monthCount}}</span>
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
