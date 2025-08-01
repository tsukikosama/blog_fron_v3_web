// utils/websocket/WebSocketClient.ts

type MessageHandler = (msg: WsMessage) => void

// src/enums/MessageType.ts
export const MessageType = {
    CHAT: 1,
    BULLET_MESSAGE: 2,
    SYSTEM:999,
} as const

export type MessageType = typeof MessageType[keyof typeof MessageType]

// src/enums/MessageScope.ts
export const MessageScope = {
    RADIO: 1,
    GROUP: 2,
    PERSONAL: 3,
    SYSTEM:999,

} as const

export type MessageScope = typeof MessageScope[keyof typeof MessageScope]


export interface WsMessage {
    type: MessageType
    scope: MessageScope
    content: string
    sender?: string
    receiver?: string
}

export class WebSocketClient {
    private ws: WebSocket | null = null
    private url: string
    private key : string
    private heartbeatInterval: number = 30000
    private reconnectDelay: number = 3000
    private heartbeatTimer: number | null = null
    private reconnectTimer: number | null = null
    private handlers: MessageHandler[] = []
    private isManuallyClosed = false

    constructor(url: string,key : string) {
        this.url = `${url}?key=${encodeURIComponent(key)}`
        this.key = key
    }

    connect() {
        console.log("开始连接ws程序")
        if (this.ws) return
        this.ws = new WebSocket(this.url)
        this.ws.onopen = () => {
            console.info('websocket 已连接 连接的连接池为',this.key)
            this.startHeartbeat()
        }

        this.ws.onmessage = (event) => {
            const msg: WsMessage = JSON.parse(event.data);
            if (msg.type === MessageType.SYSTEM && msg.content === 'pong' && msg.scope === MessageScope.SYSTEM) {
                ///这是返回的心跳
                return
            }
            ///正常的消息
            this.handlers.forEach(handler => handler(msg))

        }

        this.ws.onclose = () => {
            console.warn('[WebSocket] Disconnected')
            this.ws = null
            this.stopHeartbeat()
            if (!this.isManuallyClosed) {
                this.reconnectTimer = window.setTimeout(() => this.connect(), this.reconnectDelay)
            }
        }

        this.ws.onerror = (err) => {
            console.error('[WebSocket] Error:', err)
            // this.ws?.close()
        }
    }

    /**
     * 取消连接
     */
    disconnect() {
        this.isManuallyClosed = true
        this.stopHeartbeat()
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer)
        }
    }

    /**
     * 发送消息
     * @param data
     */
    send(data: any) {

        const str = typeof data === 'string' ? data : JSON.stringify(data)
        console.log(data,str)
        this.ws?.send(str)
    }

    /**
     * 添加消息监听器
     * @param handler
     */
    addMessageListener(handler: MessageHandler) {
        this.handlers.push(handler)
    }

    /**
     * 移除
     * @param handler
     */
    removeMessageListener(handler: MessageHandler) {
        this.handlers = this.handlers.filter((h) => h !== handler)
    }

    /**
     * 心跳检测
     * @private
     */
    private startHeartbeat() {
        this.heartbeatTimer = window.setInterval(() => {
            this.send({ type: 999, scope:999, content: 'ping' })
        }, this.heartbeatInterval)
    }

    private stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer)
            this.heartbeatTimer = null
        }
    }
}
