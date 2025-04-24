<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

</script>

<template>
  <div class="layout-demo ">
    <a-layout  class="layout">
      <a-layout-header><Header></Header></a-layout-header>
      <a-layout-content class="content">  <router-view></router-view></a-layout-content>
      <a-layout-footer class="footer"><Footer></Footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>


.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 保证至少占满屏幕高度 */
}

.content {
  flex: 1; /* 自动撑开剩余空间，推动 footer 向下 */
  padding: 16px;
  background: #F5F5FA;
}
.footer {
  height: 60px;
  background: #000000;
  text-align: center;
  line-height: 60px;
}
</style>
