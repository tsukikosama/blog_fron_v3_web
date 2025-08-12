<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="layout-demo">
    <a-layout class="layout">
      <a-layout-header style="position: sticky; top: 0; z-index: 1000; background: white; "><Header /></a-layout-header>
      <a-layout-content class="content" >
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
  flex: 1;
  background: #F5F5FA;
  overflow-y: auto;
  overflow-x: hidden; /* 防止横向滚动 */

}
.layout-demo,
.layout {
  max-width: 100vw;
  overflow-x: hidden;
}
.footer {
  height: 60px;
  background: #000000;
  color: white; /* 白色字体 */
  text-align: center;
  line-height: 60px;
}
*, *::before, *::after {
  box-sizing: border-box;
}
</style>
