<script setup lang="ts">
import {type BlogDetail, type blogParams, queryBlog} from "../api/blog.ts";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import type {tag} from "../api/tag.ts";
import {queryTags} from "../api/tag.ts";
import {like} from "../api/blogLike.ts";
import {Message} from "@arco-design/web-vue";

    const dateList = ref<BlogDetail[]>([])

    const params = reactive({
      current: 1,
      pageSize: 10
    } as blogParams)
    const tagList = ref<tag[]>([]);
    const page = ref<number>(1);
    const fetchDate = async () => {
      const { data }  = await queryBlog(params);
      dateList.value = data.records
      page.value = data.total
    }

    const getTagList = async () => {
      const { data } = await queryTags();
      tagList.value = data
    }
    // 页面挂载时先请求标签，再请求博客数据
    onMounted(async () => {
      await fetchDate();   // 再加载博客数据
      await getTagList();  // 等标签请求完成
    });
    const router = useRouter();
    const detail = (id : number) => {
      router.push({ name: '博客详情', params: { id: id } });
    }
    const getTagName = (id:string) => {
      const ids = id ? id.split(',') : [];  // 防止 id 是空的
      console.log(tagList.value , ids.length)
      if (!tagList?.value || !ids.length) return []; // 如果tagList或ids是空的直接返回
      const t =  tagList.value
          .filter(tag => ids.includes(String(tag.id)))  // 把tag.id转成字符串来比
          .map(tag => tag.tagName);
      console.log(t)
      return t;
    }
    const formatDate = (dateStr:string) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 补0
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    const clickList = async (item : BlogDetail) => {
      await like(item.id);
      if (item.isLike === 1) {
        item.likes-=1;
        item.isLike = 0;
        Message.info("取消点赞");
      } else {
        item.likes += 1;
        item.isLike = 1;
        Message.info("点赞成功");
      }



    }
</script>

<template>
  <div class="blog_container">
    <div class="blog" v-for="(item,index) in dateList" :key="index" @click="detail(item.id)">
      <h1>{{ item.title }}</h1>
      <h2>{{ item.content.slice(0, 20) }}</h2>
      <a-space >
        <a-tag
            v-for="(tag,index) in getTagName(item.tagId)"
            :key="index"
            color="#168cff">
          {{ tag }}
        </a-tag>
      </a-space>
      <!--  博客底部   -->
      <div class="blog_foot"  >
        <!-- 左边 -->
        <a-space >
          <a-space>
            <icon-calendar/>
            {{ formatDate(item.createDate) }}
              <icon-star-fill v-if="item.isLike == 1" @click.stop="clickList(item)" style="color: gold;"/>
              <icon-star v-else @click.stop="clickList(item)" style="color: gold;"/>{{item.likes}}
            流量次数:{{ item.visit }}
          </a-space>
        </a-space>

        <!-- 右边 -->
        <a-space>
          <!--          头像-->
          <a-avatar :size="24">
            <img
                alt="avatar"
                :src="item.avatar"
            />
          </a-avatar>
          <span>{{item.nickname}}</span>
        </a-space>
      </div>
    </div>
    <div class="page">
      <a-pagination :total="page"/>
    </div>
  </div>
</template>

<style scoped>
.blog_container {
  min-height: 200px;
  width: 50vw;


}

.blog_container :hover {
  cursor: pointer;
}

.blog_foot {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.page {
  justify-content: center;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
}
.blog{
  margin-bottom : 20px ;
  padding: 10px;
  border-radius: 24px;
  background-color: white;
}
</style>
