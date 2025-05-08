<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="layout-demo">
    <a-layout class="layout">
      <a-layout-header style="position: sticky; top: 0; z-index: 1000; background: white; "><Header /></a-layout-header>
      <a-layout-content class="content" id="basic-demo">
        <router-view></router-view>
         </a-layout-content>
      <a-layout-footer class="footer"><Footer /></a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 保证页面占满至少一个屏幕 */
}

.content {
  flex: 1; /* 自动撑开剩余空间 */
  padding: 16px;
  background: #F5F5FA;
  overflow-y: auto; /* 内容溢出时显示滚动条 */
}

.footer {
  height: 60px;
  background: #000000;
  color: white; /* 白色字体 */
  text-align: center;
  line-height: 60px;
}
</style>
