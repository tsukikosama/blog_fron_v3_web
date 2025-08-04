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

  <!-- 功能描述 -->
  <!-- 功能描述 -->
  <div class="desc-section">
    <div class="desc-title">📌 功能介绍</div>
    <div class="desc-item">本模块支持通过 WebSocket 实时发送弹幕消息，消息将在上方区域以滚动形式展示。</div>
    <div class="desc-item">用户可输入任意文本内容点击 “发送弹幕” 或按下 Enter 键实时触发弹幕。</div>

    <div class="desc-title">🧪 技术栈</div>
    <ul class="desc-list">
      <li>Vue 3 + Composition API</li>
      <li>Arco Design UI 组件库</li>
      <li>WebSocket 实时通信（客户端封装 wsClient）</li>
      <li>CSS 动画实现弹幕横向滚动效果</li>
    </ul>

    <div class="desc-title">🚀 可拓展方向</div>
    <ul class="desc-list">
      <li>支持图片/表情弹幕  </li>
      <li>支持自己的弹幕有特殊的显示  </li>
      <li>后端持久化弹幕记录并支持弹幕回放</li>
      <li>增加弹幕开关、透明度、字体大小设置等个性化配置</li>
    </ul>
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

.desc-section {
  margin-top: 16px;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.desc-title {
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 4px;
  color: #222;
}

.desc-item {
  margin-left: 8px;
}

.desc-list {
  list-style-type: disc;
  padding-left: 24px;
  margin: 4px 0 8px 0;
}
</style>
