<template>
  <div style="padding: 5px 24px; max-width: 1200px; margin: auto">
    <a-typography>
      <a-typography-title :heading="2">📁 内容归档</a-typography-title>
      <a-divider />
      <div
          v-for="(section, index) in archiveData"
          :key="index"
          style="margin-bottom: 12px"
      >
        <!-- 年份和收起按钮 -->
        <div
            style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div style="display: flex; align-items: baseline; gap: 8px;">
            <a-typography-title :heading="3">📅 {{ section.year }}</a-typography-title>
            <span style="font-size: 14px; color: var(--color-text-3)">
              （共 {{ section.archiveList.length }} 篇）
            </span>
          </div>

          <a-button type="text" size="small" @click="toggleCollapse(section.year)">
            {{ collapsedYears.has(section.year) ? '展开' : '收起' }}
          </a-button>
        </div>

        <!-- 博客列表 -->
        <div v-show="!collapsedYears.has(section.year)">
          <a
              v-for="item in section.archiveList"
              :key="item.id"
              :href="`/blog/${item.id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="archive-item"
          >
            <span class="archive-title">{{ item.title }}</span>
            <span class="archive-date">{{ item.createTime }}</span>
          </a>
        </div>
      </div>
    </a-typography>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type {ArchiveResp} from "../api/Archive.ts";
import {getArchive} from "../api/Archive.ts";

// 响应式数据：归档内容 + 折叠年份
const archiveData = ref<ArchiveResp[]>([]);
const collapsedYears = ref(new Set<number>());

// 页面加载时获取归档数据
onMounted(async () => {
  const { data } = await getArchive();
  archiveData.value = data;
});

// 切换某个年份是否折叠
function toggleCollapse(year: number) {
  if (collapsedYears.value.has(year)) {
    collapsedYears.value.delete(year);
  } else {
    collapsedYears.value.add(year);
  }
  // 手动触发响应式更新
  collapsedYears.value = new Set(collapsedYears.value);
}
</script>

<style scoped>
.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 3px solid var(--color-primary-light);
  padding: 6px 4px;
  margin-bottom: 5px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.archive-item:hover {
  background-color: var(--color-fill-3);
}

.archive-title {
  font-size: 16px;
}

.archive-date {
  font-size: 14px;
  color: #999;
}
</style>
