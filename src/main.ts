import { createApp } from 'vue'
import './style.css'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router";
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ArcoVue)
app.use(ArcoVueIcon);
app.mount('#app')
