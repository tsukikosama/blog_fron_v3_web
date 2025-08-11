<script setup lang="ts">
import { useRoute } from "vue-router";
import { type BlogDetail, getBlogDetailById } from "../api/blog.ts";
import {computed, onMounted, ref} from "vue";
import {getImgName, queryBlog} from "../api/common.ts";
const route = useRoute();
const blog = ref<BlogDetail>({} as BlogDetail)

const fetchDate = async () => {
  const id = route.params.id;
  const { data } = await getBlogDetailById(id as string); // 注意这里也要Number
  blog.value = data
}
onMounted(async () => {
  await fetchDate();
})

const metaList = computed(() => [
  { label: '流量次数', value: blog.value.visit},
  { label: '作者', value: blog.value.username },
  { label: '发布时间', value: blog.value.createTime },
  { label: '点赞数量', value: ` ${blog.value.likes}` },
  { label: '博客标签', value: blog.value.tagId, isTag: true }
])



</script>

<template>
  <div class="blog_details" >
    <h1>{{blog.title}}</h1>
    <div class="content" v-html="blog.content"></div>
    <!-- ✅ 用 v-md-preview -->
    <v-md-preview :text="blog.content"></v-md-preview>
    <a-divider>博客详情信息</a-divider>
    <div class="meta-section">
      <div
          class="meta-item"
          v-for="(item, index) in metaList"
          :key="index"
          :class="{ tags: item.isTag }"
      >
        <template v-if="!item.isTag">
          <span class="meta-label">{{ item.label }}:</span>
          <span class="meta-value">{{ item.value }}</span>
        </template>
        <template v-else>
          <span class="meta-label">{{ item.label }}:</span>
          <div class="tags">
            <a-tag v-for="tag in item.value" :key="tag" color="purple">#{{ tag }}</a-tag>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog_details {
  padding: 20px;
  min-height: 300px;
  background-color: rgba(255, 255, 255, 0.5); /* 白色半透明 */
  /*backdrop-filter: blur(3px); /* 模糊后面的背景图 */
}
.blog-detail {
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}
.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}
/* 信息区整体背景和样式 */
.meta-section {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 32px;
  margin-bottom: 24px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 16px 24px;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.05);
  border: 1px solid #e1e6eb;
}
.meta-item {
  flex: 1 1 calc(33.333% - 32px);
  min-width: 180px;
  display: flex;
  align-items: center;
  gap: 4px;          /* 缩小间隔 */
}
.meta-label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  min-width: 20px;   /* 调小最小宽度 */
}
.meta-value {
  font-size: 16px;
  color: #333;
}
.meta-item.tags {
  flex: 1 1 100%;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
}
.tags {
  margin-top: 0;
}
.content {
  line-height: 1.8;
  font-size: 16px;
  color: #333;
}

</style>
