import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

// markdown 编辑器相关
//@ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
//@ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import hljs from 'highlight.js';

// 使用 GitHub 主题
VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);
app.use(VMdPreview);
app.use(router);
app.use(ArcoVue);
app.use(pinia)
app.use(ArcoVueIcon);

app.mount('#app');
