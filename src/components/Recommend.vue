<script setup lang="ts">

import {onMounted, ref} from "vue";
  import type {recentBlog} from "../api/blog.ts";
import {getRecentBlog} from "../api/blog.ts";
import {useRouter} from "vue-router";

  const dateList = ref<recentBlog[]>([])
  const fetchDate = async () => {
    const { data } = await getRecentBlog();
    dateList.value = data
  }
  onMounted(()=>{
    fetchDate()
  })
  const router = useRouter();
  const toBlog = (id:number) => {
    router.push(`/blogDetail/${id}`)
  }
</script>

<template>
  <div style="background-color: white">
    <a-list>
      <template #header>
        最新发布
      </template>
      <a-list-item @click="toBlog(item.id)" v-for="(item,index) in dateList" :key="index">
        <div style="display: flex;justify-content: space-between;">
          <span>{{item.title}}</span>
          <span>{{item.createTime}}</span>
        </div>
        <div style="display: flex;justify-content: flex-end;">
          <a-space>
            <a-avatar trigger-type="mask" :size="20" >
              <img
                  alt="avatar"
                  :src="item.avatar"
              />
            </a-avatar>
            <span style="">{{item.nickname}}</span>
          </a-space>
        </div>
      </a-list-item>

    </a-list>
  </div>
</template>

<style scoped>

</style>
