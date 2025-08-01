<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Message } from '@arco-design/web-vue'

interface ReplyItem {
  nickname: string
  content: string
  time: string
}

interface MessageItem {
  nickname: string
  content: string
  time: string
  replies: ReplyItem[]
}

const nickname = ref('')
const content = ref('')
const messages = ref<MessageItem[]>([
  {
    nickname: '小明',
    content: '这是第一条留言，欢迎大家留言互动！',
    time: '2025-07-11 10:00:00',
    replies: [

    ],
  },
  {
    nickname: '张三',
    content: '留言板功能做得很棒，加油！',
    time: '2025-07-10 15:30:45',
    replies: [],
  },
  {
    nickname: '李四',
    content: '希望以后能支持回复功能。',
    time: '2025-07-09 20:12:33',
    replies: [],
  },
])

const replyingIndex = ref(-1)
const replyNickname = ref('')
const replyContent = ref('')

onMounted(() => {
  const local = localStorage.getItem('messages')
  if (local) messages.value = JSON.parse(local)
})

const submit = () => {
  if (!nickname.value.trim() || !content.value.trim()) {
    Message.warning('请输入昵称和留言内容')
    return
  }
  const newMessage: MessageItem = {
    nickname: nickname.value.trim(),
    content: content.value.trim(),
    time: new Date().toLocaleString(),
    replies: [],
  }
  messages.value.unshift(newMessage)
  localStorage.setItem('messages', JSON.stringify(messages.value))
  content.value = ''
}

const showReply = (index: number) => {
  if (replyingIndex.value === index) {
    replyingIndex.value = -1
  } else {
    replyingIndex.value = index
    replyNickname.value = ''
    replyContent.value = ''
  }
}

const submitReply = (index: number) => {
  if (!replyNickname.value.trim() || !replyContent.value.trim()) {
    Message.warning('请输入回复昵称和回复内容')
    return
  }
  const newReply: ReplyItem = {
    nickname: replyNickname.value.trim(),
    content: replyContent.value.trim(),
    time: new Date().toLocaleString(),
  }
  messages.value[index].replies.push(newReply)
  localStorage.setItem('messages', JSON.stringify(messages.value))
  replyNickname.value = ''
  replyContent.value = ''
  replyingIndex.value = -1
}
</script>

<template>
  <div class="page">
    <!-- 站点信息 -->
    <div class="board-intro">
      <h2>📬 欢迎来到留言板</h2>
      <p>你可以在这里留下你的想法、建议或鼓励。</p>
      <p>我们非常期待听到你的声音！😊</p>
    </div>

    <div class="main-container">
      <div class="left">
        <a-card title="留言板">
          <a-form layout="vertical">
            <a-form-item label="昵称">
              <a-input v-model="nickname" placeholder="请输入昵称" />
            </a-form-item>
            <a-form-item label="留言内容">
              <a-textarea
                  v-model="content"
                  placeholder="说点什么..."
                  auto-size
                  :max-length="200"
                  show-word-limit
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" long @click="submit">提交留言</a-button>
            </a-form-item>
          </a-form>
        </a-card>

        <a-card title="留言列表" style="margin-top: 20px">
          <div v-if="messages.length === 0">暂无留言，快来抢沙发吧～</div>

          <div
              v-for="(msg, index) in messages"
              :key="index"
              style="margin-bottom: 24px;"
          >
            <a-comment
                :author="msg.nickname"
                :datetime="msg.time"
            >
<!--              <template #content>-->
<!--                <div style="display: flex; align-items: center; gap: 12px;">-->
<!--                  <span style="flex: 1;">{{ msg.content }}</span>-->
<!--                  <a-button size="small" type="text" @click="showReply(index)">-->
<!--                    {{ replyingIndex === index ? '取消回复' : '回复' }}-->
<!--                  </a-button>-->
<!--                </div>-->
<!--              </template>-->
            </a-comment>

            <!-- 自定义回复列表 -->
            <div
                v-if="msg.replies.length"
                style="margin-top: 8px; padding-left: 40px; border-left: 2px solid #f0f0f0;"
            >
              <div
                  v-for="(reply, rIndex) in msg.replies"
                  :key="rIndex"
                  style="margin-bottom: 12px;"
              >
                <div><strong>{{ reply.nickname }}</strong></div>
                <div style="white-space: pre-wrap; padding-left: 16px;">&nbsp;&nbsp;{{ reply.content }}</div>
                <div style="font-size: 12px; color: #999;">{{ reply.time }}</div>
              </div>
            </div>

            <!-- 回复输入框 -->
<!--            <div-->
<!--                v-if="replyingIndex === index"-->
<!--                style="margin-top: 8px; padding-left: 40px;"-->
<!--            >-->
<!--              <a-form layout="vertical">-->
<!--                <a-form-item label="回复昵称">-->
<!--                  <a-input-->
<!--                      v-model="replyNickname"-->
<!--                      placeholder="请输入回复昵称"-->
<!--                  />-->
<!--                </a-form-item>-->
<!--                <a-form-item label="回复内容">-->
<!--                  <a-textarea-->
<!--                      v-model="replyContent"-->
<!--                      placeholder="请输入回复内容"-->
<!--                      auto-size-->
<!--                      :max-length="200"-->
<!--                      show-word-limit-->
<!--                  />-->
<!--                </a-form-item>-->
<!--                <a-form-item>-->
<!--                  <a-button type="primary" @click="submitReply(index)"-->
<!--                  >提交回复</a-button-->
<!--                  >-->
<!--                </a-form-item>-->
<!--              </a-form>-->
<!--            </div>-->
          </div>
        </a-card>

        <div style="margin-top: 16px; text-align: right; color: #999;">
          共 {{ messages.length }} 条留言
        </div>
      </div>

      <div class="right">
        <a-card title="📢 公告">
          <p>欢迎访问本站，留言请文明用语。</p>
        </a-card>

        <a-card title="👤 站点信息" style="margin-top: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img
                src="https://i.imgtg.com/2023/10/01/Z46Sm.jpg"
                alt="avatar"
                style="width: 50px; height: 50px; border-radius: 50%"
            />
            <div>
              <div><strong>咻咻咻</strong></div>
              <div style="font-size: 12px; color: #999;">一个热爱技术的开发者</div>
            </div>
          </div>
          <div style="margin-top: 12px;">
            <p style="margin: 4px 0;"><strong>博客地址：</strong></p>
            <a href="https://example.com" target="_blank">https://example.com</a>
          </div>
        </a-card>

        <a-card title="👨‍💻 关于作者" style="margin-top: 16px;">
          <p>QQ：12345678</p>
          <p>微信：weixin123</p>
          <p>
            GitHub：
            <a href="https://github.com/yourname" target="_blank"
            >github.com/yourname</a
            >
          </p>
          <p>邮箱：liminchuan@example.com</p>
        </a-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  background: #f7f8fa;
  min-height: 100vh;
}

.main-container {
  display: flex;
  gap: 24px;
}

.left {
  flex: 3;
}

.right {
  flex: 1;
}

.board-intro {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  text-align: center;
}
.board-intro h2 {
  margin-bottom: 8px;
}
.board-intro p {
  margin: 4px 0;
  color: #666;
}
</style>
