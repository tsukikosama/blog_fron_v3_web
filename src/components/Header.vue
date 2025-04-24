<script setup lang="ts">
  import {useRouter} from "vue-router";

  const router = useRouter()
  const handleMenuClick = (key: string) => {
    router.push(key)
  }
</script>

<template>
  <div class="my-container">
    <div class="header-wrapper">
      <!-- 左边菜单 -->
      <a-menu mode="horizontal" :default-selected-keys="['1']" @menu-item-click="handleMenuClick">
        <a-menu-item key="0" disabled style="cursor: text">
          这是一个大大的名字啊
        </a-menu-item>
        <a-menu-item key="1">分类</a-menu-item>
        <a-menu-item key="2">时间线</a-menu-item>
        <a-menu-item key="3">留言板</a-menu-item>
        <a-menu-item key="4">友链</a-menu-item>
        <a-menu-item key="/treasure">挖宝</a-menu-item>
        <a-menu-item key="/picture">美图</a-menu-item>
        <a-menu-item key="7">AI</a-menu-item>
        <a-menu-item ></a-menu-item>
        <a-menu-item ></a-menu-item>
        <a-menu-item ></a-menu-item>
        <a-input-search
            placeholder="让我康康"
            button-text="搜索"
            allow-clear
            style="width: 300px"
        />
      </a-menu>
      <!-- 右边登录按钮 -->
      <div class="right-actions">
        <a-link href="link" class="text" :hoverable="false">登录</a-link>
        <a-link href="link" class="text" :hoverable="false">注册</a-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.my-container {
  width: 100vw;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;

  border-bottom: 1px solid var(--color-border);
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.right-actions .text {
  width: 48px;
}
</style>
