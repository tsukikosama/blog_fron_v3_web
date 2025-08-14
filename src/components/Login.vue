<script setup lang="ts">
import {reactive} from "vue";
import {info, login} from "../api/customer.ts";
import request from "../utils/request.ts";
import {useUserStore} from "../store";
import router from "../router";


const form = reactive({
  username:localStorage.getItem("user_name")?localStorage.getItem("user_name"):'',
  password:localStorage.getItem("user_psd")?localStorage.getItem("user_psd"):'',
  isRemember:false,
  clientId:import.meta.env.VITE_CLIENT_ID,
  authType:import.meta.env.VITE_CLIENT_AUTH_TYPE
})
const userStore = useUserStore();
const handleSubmit = async () => {
  const date  = await login(form)
  if (date?.code == 0){
    //登录成功
    request.defaults.headers.common['Authorization'] = date.data
    localStorage.setItem("token",date.data);
    //如果登录成功去获取一次用户信息
    const res = await info();
    // 将密码存入localstorage
    // 将获取到的内容存入pinia中
    userStore.setUserInfo(res.data)
    localStorage.setItem("user_info",res.data);
    localStorage.setItem("user_name",form.username as string)
    if (form.isRemember){
      //将当前的用户名和密码存入
      localStorage.setItem("user_psd",form.password as string)
    }
    //跳转到主页
    router.push("/")
  }else{
    return
  }



}
</script>

<template>
  <div class="login_container">
    <a-form :model="form" :style="{ width: '600px' }" class="form" @submit="handleSubmit">
      <a-form-item field="name" tooltip="Please enter username" label="账号">
        <a-input
            v-model="form.username"
            placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item field="post" label="密码">
        <a-input v-model="form.password" type="password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRemember">记住密码</a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">登录</a-button>
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
.form{

}
</style>
