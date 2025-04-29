<script setup lang="ts">
import { ref } from 'vue';
import {
  IconHeart,
  IconMessage,
  IconStar,
  IconStarFill,
  IconHeartFill,
} from '@arco-design/web-vue/es/icon';
import {useRoute, useRouter} from "vue-router";

const showReplyInput = ref(false);
const replyText = ref('')

const route = useRoute();
const submitReply = () => {
  console.log("回复",route.params.id)
}
</script>

<template>
  <a-comment
      author="Socrates"
      content="Comment body content."
      datetime="1 hour"
  >
    <template #actions>
      <span class="action" key="heart" @click="onLikeChange">
        <span v-if="like">
          <IconHeartFill :style="{ color: '#f53f3f' }" />
        </span>
        <span v-else>
          <IconHeart />
        </span>
        {{ 83 + (like ? 1 : 0) }}
      </span>
      <span class="action" key="star" @click="onStarChange">
        <span v-if="star">
          <IconStarFill style="{ color: '#ffb400' }" />
        </span>
        <span v-else>
          <IconStar />
        </span>
        {{ 3 + (star ? 1 : 0) }}
      </span>
      <span class="action" key="reply" @click="() => {
        showReplyInput = true
      }">
        <IconMessage /> Reply
      </span>
    </template>
    <template #avatar>
      <a-avatar>
        <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </a-avatar>
    </template>
    <div v-if="showReplyInput" style="margin-top: 10px;">
      <a-textarea v-model="replyText" placeholder="请输入回复内容..." auto-size />
      <div style="margin-top: 8px; text-align: right;">
        <a-button type="primary" size="small" @click="submitReply">发送</a-button>
      </div>
    </div>
  </a-comment>
</template>

<style scoped>
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
