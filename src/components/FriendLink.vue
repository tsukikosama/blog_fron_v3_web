<template>
  <div class="friend-page">
    <a-typography>
      <a-typography-title :heading="2">🤝 博客友链</a-typography-title>
      <a-typography-paragraph>
        欢迎交换友链，请在您的网站添加本站信息后留言申请。
      </a-typography-paragraph>
    </a-typography>

    <!-- 站点信息区域 -->
    <div class="site-info">
      <img class="site-avatar" :src="siteInfo.avatar" alt="作者头像" />
      <div class="site-text">
        <div class="site-author">作者：{{ siteInfo.author }}</div>
        <div class="site-url">
          网址：
          <a :href="siteInfo.url" target="_blank" rel="noopener noreferrer">
            {{ siteInfo.url }}
          </a>
        </div>
        <div class="site-desc">描述：{{ siteInfo.description }}</div>
      </div>
    </div>

    <a-divider />

    <!-- 悬浮申请友链按钮 -->
    <a-button
        type="primary"
        style="
    position: fixed;
    bottom: 80px;
    right: 24px;
    z-index: 1000;
    padding: 12px 20px;
    font-size: 18px;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  "
        @click="showModal = true"
        title="申请友链"
    >
      申请友链
    </a-button>

    <div class="friend-grid">
      <div v-for="link in friendLinks" :key="link.name" class="friend-card">
        <div class="friend-banner-image" v-if="link.bannerImage">
          <img :src="link.bannerImage" alt="展示图片" />
        </div>

        <a :href="link.url" target="_blank" rel="noopener noreferrer" class="friend-link-content">
          <img :src="link.avatar" alt="头像" class="friend-avatar" />

          <div class="friend-info">
            <div class="friend-name">{{ link.name }}</div>
            <div class="friend-desc">{{ link.description }}</div>
          </div>
        </a>
      </div>
    </div>

    <!-- 申请友链表单弹窗 -->
    <a-modal
        v-model:visible="showModal"
        title="申请友链"
        :ok-disabled="!formValid"
        @ok="handleSubmit"
        @cancel="handleCancel"
        destroy-on-close
    >
      <a-form
          :model="form"
          :rules="rules"
          ref="formRef"
          label-col="{ span: 6 }"
          wrapper-col="{ span: 16 }"
      >
        <a-form-item label="网站名称" field="name" :rules="rules.name">
          <a-input v-model:value="form.name" placeholder="请输入网站名称" />
        </a-form-item>

        <a-form-item label="网站链接" field="url" :rules="rules.url">
          <a-input v-model:value="form.url" placeholder="请输入网站链接" />
        </a-form-item>

        <a-form-item label="网站描述" field="description" :rules="rules.description">
          <a-input v-model:value="form.description" placeholder="请输入网站描述" />
        </a-form-item>

        <a-form-item label="头像URL" field="avatar" :rules="rules.avatar">
          <a-input v-model:value="form.avatar" placeholder="请输入头像图片地址" />
        </a-form-item>

        <a-form-item label="展示图URL" field="bannerImage" :rules="rules.bannerImage">
          <a-input v-model:value="form.bannerImage" placeholder="请输入展示图片地址" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Message } from "@arco-design/web-vue";

interface FriendLink {
  name: string;
  url: string;
  description: string;
  avatar: string;
  bannerImage: string;
}

const siteInfo = ref({
  author: "啊啊啊啊啊",
  avatar: "https://i.pravatar.cc/100?img=12",
  url: "https://myblog.com",
  description: "一个记录技术与生活的博客，分享前端、后端和架构知识。",
});

const friendLinks = ref<FriendLink[]>([
  {
    name: "Vue.js 官方",
    url: "https://vuejs.org/",
    description: "渐进式 JavaScript 框架",
    avatar: "https://vuejs.org/images/logo.png",
    bannerImage: "http://8.138.16.124:8881/img/top.13b90592.jpg",
  },
  {
    name: "Vite",
    url: "https://vitejs.dev/",
    description: "下一代前端工具链",
    avatar: "https://vitejs.dev/logo.svg",
    bannerImage: "http://8.138.16.124:8881/img/top.13b90592.jpg",
  },
  {
    name: "Arco Design",
    url: "https://arco.design/",
    description: "字节跳动出品的设计系统",
    avatar: "https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico",
    bannerImage: "http://8.138.16.124:8881/img/top.13b90592.jpg",
  },
]);

const showModal = ref(false);

const formRef = ref();

const form = reactive<FriendLink>({
  name: "",
  url: "",
  description: "",
  avatar: "",
  bannerImage: "",
});

const rules = {
  name: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
  url: [
    { required: true, message: "请输入网站链接", trigger: "blur" },
    { type: "url", message: "请输入有效的URL", trigger: "blur" },
  ],
  description: [{ required: true, message: "请输入网站描述", trigger: "blur" }],
  avatar: [
    { required: true, message: "请输入头像图片地址", trigger: "blur" },
    { type: "url", message: "请输入有效的URL", trigger: "blur" },
  ],
  bannerImage: [
    { required: true, message: "请输入展示图片地址", trigger: "blur" },
    { type: "url", message: "请输入有效的URL", trigger: "blur" },
  ],
};

const formValid = computed(() => {
  // 简单验证：所有必填字段都不为空，且链接格式正确
  const urlRegex = /^https?:\/\/.+/;
  return (
      form.name.trim() !== "" &&
      urlRegex.test(form.url) &&
      form.description.trim() !== "" &&
      urlRegex.test(form.avatar) &&
      urlRegex.test(form.bannerImage)
  );
});

function handleSubmit() {
  // 简单表单校验后，加入友链列表
  if (!formValid.value) {
    Message.error("请完整且正确填写表单");
    return;
  }
  // 判断重名（简单示例）
  if (friendLinks.value.some((link) => link.name === form.name)) {
    Message.error("已有相同名称的友链");
    return;
  }
  friendLinks.value.push({ ...form });
  Message.success("友链申请成功，已加入列表！");
  resetForm();
  showModal.value = false;
}

function handleCancel() {
  resetForm();
  showModal.value = false;
}

function resetForm() {
  form.name = "";
  form.url = "";
  form.description = "";
  form.avatar = "";
  form.bannerImage = "";
  formRef.value?.resetFields();
}
</script>

<style scoped>
.friend-page {
  margin: auto;

}

/* 站点信息 */
.site-info {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-bg-2);
  margin-bottom: 32px;
}

.site-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.site-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 16px;
  color: var(--color-text);
}

.site-author {
  font-weight: 700;
  font-size: 1.25rem;
}

.site-url a {
  color: var(--color-primary);
  text-decoration: none;
}

.site-url a:hover {
  text-decoration: underline;
}

.friend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 24px;
}

.friend-card {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-bg-2);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.friend-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.friend-banner-image img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
}

.friend-link-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
}

.friend-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.friend-info {
  flex-grow: 1;
}

.friend-name {
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 4px;
}

.friend-desc {
  font-size: 14px;
  color: var(--color-text-3);
}
</style>
