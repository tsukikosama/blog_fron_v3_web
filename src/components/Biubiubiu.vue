<template>
  <div class="danmaku-page">


    <!-- 弹幕区域 -->
    <div ref="container" class="danmaku-container">
      <div
          v-for="item in danmakus"
          :key="item.id"
          class="danmaku-item"
          :style="getStyle(item)"
      >
        {{ item.content }}
      </div>
    </div>

    <!-- 弹幕输入 -->
    <div class="input-area">
      <a-input
          v-model="messageRecord.content"
          placeholder="请输入弹幕内容"
          @keyup.enter="sendMsg"
          style="width: 300px; margin-right: 10px"
      />
      <a-button type="primary" @click="sendMsg">发送弹幕</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {MessageScope, MessageType, WebSocketClient, type WsMessage} from "../utils/wsClient.js";
import type {bulletRecord} from "../api/bullet.ts";


const container = ref<HTMLElement | null>(null)

// 定义弹幕列表，初始为空
const danmakus = ref<bulletRecord[]>([] as bulletRecord[])

// 随机颜色生成函数
const  getRandomColor = () =>{
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}
// 弹幕样式生成（位置+颜色+动画时长）
const getStyle = (item: bulletRecord) => {
  return {
    top: `${item.top}px`,
    color: item.color,
    animation: `danmaku-move ${item.duration}s linear forwards`,
  }
}

/**
 * 向本地弹幕列表添加一条弹幕
 * @param text 弹幕文本内容
 */
function addLocalBullet(text: string) {
  if (!text.trim()) return
  danmakus.value.push({
    id: (Date.now() + Math.random()).toString(),
    content:text,
    top: Math.random() * 200,
    color: getRandomColor(),
    duration: 8 + Math.random() * 5,
  } as bulletRecord)
}

const messageRecord = ref<WsMessage>({
  type:MessageType.BULLET_MESSAGE,
  scope:MessageScope.RADIO,
  content:'',
})

const sendMsg = () => {
  if (!messageRecord.value.content.trim()) return
  wsClient.send(messageRecord.value)
  addLocalBullet(messageRecord.value.content)
  messageRecord.value.content = ''
}


const wsClient = new WebSocketClient("ws://localhost:8088/ws/demo","bullet")
// 初始测试用弹幕
onMounted(() => {
  wsClient.connect()
  wsClient.addMessageListener((message) => {
    if (message.type === MessageType.BULLET_MESSAGE ) {
          addLocalBullet(message.content)
    }
  })
})




</script>


<style>
  @keyframes danmaku-move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-150vw);
    }
  }
</style>

<style scoped>
.danmaku-page {
  padding: 20px;
}

.input-area {
  margin-bottom: 20px;
}

.danmaku-container {
  position: relative;
  width: 100%;
  height: 240px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 8px;
}

.danmaku-item {
  position: absolute;
  left: 100%;
  white-space: nowrap;
  font-size: 16px;
  padding: 2px 8px;
  text-shadow: 1px 1px 2px #000;
}
</style>
