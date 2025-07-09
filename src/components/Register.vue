<script setup lang="ts">

import { ref } from 'vue'

import {registerCustomer, registerReq} from "../api/customer.ts";
import {Message} from "@arco-design/web-vue";
import router from "../router";


const form = ref({
  username: '',
  password: '',
})


const handleSubmit = async () => {
   await registerCustomer(form.value).then(res => {
     if (res.status == 0){
       Message.info("注册成功");
     }else{
       Message.info("注册失败");
     }
   })

}
</script>

<template>
  <div class="login_container">
    <a-form :model="form"  :style="{ width: '600px' }" class="form" @submit="handleSubmit">
      <a-form-item field="name" tooltip="请输入账号" label="账号">
        <a-input
            v-model="form.username"
            placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item field="post" label="密码">
        <a-input v-model="form.password" type="password" placeholder="请输入密码" />
      </a-form-item>

      <a-form-item>
        <a-button html-type="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.login_container {
  padding: 0px !important;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* 让容器填满整个视口 */
  background-size: cover; /* 保证背景图片覆盖整个容器 */
  background-position: center;
  background-attachment: fixed;
  opacity: 0.7;
}
</style>
