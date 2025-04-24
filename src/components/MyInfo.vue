<script setup lang="ts">

</script>

<template>
  <div class="info_container">
    <a-space direction="vertical" :size="14">
      <a-avatar :size="64">
        <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />

      </a-avatar>
      <div style="text-align: center">
        <span>用户名</span>
      </div>
      <div>
        <span>文章数量</span>
        <a-divider direction="vertical" />
        <span>点赞数</span>
        <a-divider direction="vertical" />
        <span>评论数</span>
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
