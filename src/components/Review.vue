<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {
  IconHeart,
  IconMessage,
  IconStar,
  IconStarFill,
  IconHeartFill,
} from '@arco-design/web-vue/es/icon';
import {useRoute} from "vue-router";
import type {queryParam, replyRecord, replyRequest} from "../api/reply.ts";
import {getReplyByBlogId, reply} from "../api/reply.ts";
import {Message} from "@arco-design/web-vue";

const route = useRoute();


const from = reactive<replyRequest>({
  blogId: undefined,
  content: undefined,
  replyId: undefined,
  reviewType: undefined,
})

const submitReply = async () => {

  const {data} = await reply(from)
  fetchDate()
}
const params = reactive({
  page: 1,
  size: 10
} as queryParam)

const dateList = ref<replyRecord[]>([] as replyRecord[])
//初始化页面数据
const fetchDate = async () => {
  params.blogId = Number(route.params.id)
  from.blogId = Number(route.params.id)
  const {data} = await getReplyByBlogId(params);
  dateList.value = data.list
  dateList.value.forEach((item: replyRecord) => {
    item.replyStatus = false
  });
}
onMounted(() => {
  fetchDate()
})
const handleReplyClick = (targetItem: replyRecord) => {
  // 先关闭所有回复框
  dateList.value.forEach(item => {
    item.replyStatus = false
  });

  // 开启当前点击项的回复框
  targetItem.replyStatus = true;

  // 设置当前回复目标 ID
  from.replyId = targetItem.id;
};
const replyShow = ref(false);
</script>

<template>
  <div id="custom-demo" class="wrapper">
    <a-divider orientation="center">评论区</a-divider>
    <div v-for="(item,index) in dateList" class="content" :key="index">
      <a-comment
          :author="item.nickname"
          :content="item.content"
          :datetime="item.createTime"
      >
        <template #actions>
      <span class="action" key="heart" @click="onLikeChange">
        <span v-if="like">
          <IconHeartFill :style="{ color: '#f53f3f' }"/>
        </span>
        <span v-else>
          <IconHeart/>
        </span>
        {{ 83 + (like ? 1 : 0) }}
      </span>
          <span class="action" key="star" @click="onStarChange">
        <span v-if="star">
          <IconStarFill style="{ color: '#ffb400' }"/>
        </span>
        <span v-else>
          <IconStar/>
        </span>
        {{ 3 + (star ? 1 : 0) }}
      </span>
          <span class="action" key="reply" @click="handleReplyClick(item)">
        <IconMessage/> 回复
      </span>
        </template>
        <template #avatar>
          <a-avatar>
            <img
                alt="avatar"
                :src="item.userAvatar"
            />
          </a-avatar>
        </template>
        <div v-for="(childItem,index2) in item.children">
          <a-comment
              :key="index2"
              :author="childItem.nickname"
              :avatar="childItem.userAvatar"
              :content="childItem.content"
              :datetime="childItem.createTime"
          >
            <template #actions>
             <span class="action" key="heart" @click="onLikeChange">
        <span v-if="like">
          <IconHeartFill :style="{ color: '#f53f3f' }"/>
        </span>
        <span v-else>
          <IconHeart/>
        </span>
        {{ 83 + (like ? 1 : 0) }}
      </span>
              <span class="action" key="star" @click="onStarChange">
        <span v-if="star">
          <IconStarFill style="{ color: '#ffb400' }"/>
        </span>
        <span v-else>
          <IconStar/>
        </span>
        {{ 3 + (star ? 1 : 0) }}
      </span>
              <span class="action" key="reply" @click="handleReplyClick(item)">
        <IconMessage/> 回复
      </span>
            </template>
          </a-comment>
        </div>
        <div v-if="item.replyStatus" class="comment-box">
          <a-textarea v-model="from.content" placeholder="请输入回复内容..." auto-size class="comment-input"/>
          <a-button type="primary" @click="submitReply" class="submit-btn">提交</a-button>
        </div>
      </a-comment>

    </div>
    <div v-if="dateList.length == 0">
      <a-empty>
        暂无评论,快来评论一下吧
      </a-empty>
    </div>
    <div v-show="replyShow" style="margin: 20px;">
      <div class="comment-box">
        <a-textarea v-model="from.content" placeholder="请输入回复内容..." auto-size class="comment-input"/>
        <a-button type="primary" @click="submitReply" class="submit-btn">提交</a-button>
      </div>
    </div>
    <a-affix :offset-bottom="100" :style="{ right: '40px', position: 'fixed' }">
      <!--     回到顶部  -->
      <a-button shape="circle" size="large" type="primary">up</a-button>
    </a-affix>

    <a-affix :offset-bottom="60" :style="{ right: '40px', position: 'fixed' }">
      <a-button shape="circle" size="large" type="primary" @click="() => {
         replyShow = true
       }">评论
      </a-button>
    </a-affix>

  </div>
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

.wrapper {
  display: flex;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.5); /* 白色半透明 */
  /*backdrop-filter: blur(3px); /* 模糊后面的背景图 */
}

.content {
  margin: 20px 20px 0px 20px;
}

.comment-box {
  display: flex;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  align-items: flex-end;
  margin-top: 10px;

  /* 控制整体宽度较短，不居中 */
  width: 500px;
  max-width: 100%;
}

.comment-input {
  flex: 1;
  min-height: 60px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: #fff;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.5;
}

.submit-btn {
  height: 34px;
  border-radius: 6px;
  padding: 0 16px;
}

.reply-child-comment + .reply-child-comment {
  margin-top: 16px; /* 或者 20px，根据你实际需求调整 */
}

:deep(.arco-comment) {
  align-items: flex-start !important; /* 或 center，如果你希望居中 */
}

/* 统一头像大小 */
:deep(.arco-avatar) {
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
}
</style>
