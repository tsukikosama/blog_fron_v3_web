<script setup lang="ts">
import { ref, computed } from 'vue'

interface MessageItem {
  id: number
  text: string
  images: string[]
  sender: 'me' | 'other'
  time: string
}

interface Contact {
  id: number
  name: string
}

const contacts = ref<Contact[]>([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
])

const selectedContactId = ref<number>(1)

const chatMap = ref<Record<number, MessageItem[]>>({})
const messages = computed(() => chatMap.value[selectedContactId.value] || [])

const newMessage = ref('')
const imageList = ref<string[]>([])

const receiveMessage = (text: string) => {
  const list = chatMap.value[selectedContactId.value] || []
  list.push({
    id: Date.now(),
    text,
    images: [],
    sender: 'other',
    time: new Date().toLocaleTimeString(),
  })
  chatMap.value[selectedContactId.value] = list
}

const sendMessage = () => {
  if (!newMessage.value.trim() && imageList.value.length === 0) return
  const list = chatMap.value[selectedContactId.value] || []
  list.push({
    id: Date.now(),
    text: newMessage.value,
    images: [...imageList.value],
    sender: 'me',
    time: new Date().toLocaleTimeString(),
  })
  chatMap.value[selectedContactId.value] = list

  setTimeout(() => {
    receiveMessage('你好，这是自动回复～')
  }, 1000)

  newMessage.value = ''
  imageList.value = []
}

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items || []
  for (const item of items) {
    if (item.type.includes('image')) {
      const file = item.getAsFile()
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          imageList.value.push(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<template>
  <div class="chat-wrapper-outer">
    <div class="chat-wrapper">
      <div class="contact-list">
        <div
            v-for="c in contacts"
            :key="c.id"
            :class="['contact-item', { active: c.id === selectedContactId }]"
            @click="selectedContactId = c.id"
        >
          {{ c.name }}
        </div>
      </div>

      <div class="chat-container">
        <!-- 新增用户名字显示 -->
        <div class="chat-header">
          当前聊天用户：<strong>{{ contacts.find(c => c.id === selectedContactId)?.name }}</strong>
        </div>

        <div class="chat-box">
          <div v-for="msg in messages" :key="msg.id" :class="['chat-message', msg.sender]">
            <div class="content" :class="msg.sender">
              <div class="text">{{ msg.text }}</div>
              <div class="images">
                <img v-for="(img, i) in msg.images" :key="i" :src="img" />
              </div>
              <div class="time">{{ msg.time }}</div>
            </div>
          </div>
        </div>

        <div class="chat-input" @paste="handlePaste">
          <textarea
              v-model="newMessage"
              placeholder="请输入内容..."
              @keydown.enter.prevent="sendMessage"
          />
          <div class="preview" v-if="imageList.length">
            <img v-for="(img, i) in imageList" :key="i" :src="img" />
          </div>
          <button @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-wrapper-outer {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.chat-wrapper {
  display: flex;
  height: 600px;
  width: 800px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.contact-list {
  width: 150px;
  border-right: 1px solid #eee;
  background: #f5f7fa;
  padding: 12px;
  box-sizing: border-box;
}
.contact-item {
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 6px;
  font-size: 14px;
}
.contact-item:hover,
.contact-item.active {
  background-color: #e6f4ff;
  color: #409eff;
}

.chat-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.chat-header {
  padding: 12px;
  background: #409eff;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid #357bd8;
}

.chat-box {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: #f9f9f9;
}

.chat-message {
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
}
.chat-message.me {
  justify-content: flex-end;
}
.chat-message.other {
  justify-content: flex-start;
}

.content {
  max-width: 70%;
  border-radius: 8px;
  padding: 6px 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.content.me {
  background: #e6f4ff;
  color: #003366;
}
.content.other {
  background: #ffffff;
  color: #333;
}

.text {
  margin-bottom: 4px;
  white-space: pre-wrap;
}
.images {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}
.images img {
  max-width: 60px;
  border-radius: 4px;
}
.time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}

.chat-input {
  padding: 10px;
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.chat-input textarea {
  width: 100%;
  min-height: 50px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px;
  resize: none;
  font-size: 14px;
}
.chat-input .preview {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.chat-input .preview img {
  max-width: 50px;
  border-radius: 4px;
}
.chat-input button {
  align-self: flex-end;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
