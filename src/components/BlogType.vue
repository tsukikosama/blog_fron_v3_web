<script setup lang="ts">

import {queryTags, tag} from "../api/tag.ts";
import {onMounted, reactive, ref, watch} from "vue";
import {BlogDetail, blogParams, getBlogByTagId, queryBlog} from "../api/blog.ts";


const dateList = ref<tag[]>([])
const fetchDate = async () => {
  const { data } = await queryBlog(params)
  blogList.value = data.records
  page.value = data.total
}
const blogList = ref<BlogDetail[]>([])
//调用获取数据
onMounted(async () => {
  fetchDate()
  const { data } = await queryTags()
  dateList.value = dateList.value = data.map(item => ({
    ...item,
    checked: false
  }));
})
// 被选中的checkList
const checkList = ref<number[]>([])
const check = (item:any) => {
  item.check=!item.check
  if (item.check){
    //true添加进去
    checkList.value.push(item)
  }else{
    checkList.value = checkList.value.filter(i => i.id  !== item.id as number);
  }
}
const params = reactive({
  current: 1,
  pageSize: 9,
  tagId:'',
  key:''
} as blogParams)
const page = ref<number>(1);
watch(checkList, async (newVal, oldVal) => {
  //获取全部的id
  const ids = newVal.map(item => item.id);

  params.tagId = ids.join(',');
  fetchDate();

}, { deep: true });
const handlePageChange = (page) => {
  params.current = page;

  fetchDate(); // 重新请求数据
};
const search = () =>{
  fetchDate()
}
</script>

<template>
  <a-space class="public_container" direction="vertical">
    <!--    标签 -->

    <div class="container">
      <h1>分类</h1>
      <a-space  size="40" >
        <a-tag  size="large" checkable color="blue" @click="check(item)"  :default-checked="item.checked"
               v-for="(item,index) in dateList"
               :key="index">{{item.tagName}}</a-tag>
      </a-space>
    </div>
    <!--    宝藏-->
    <div class="container">
      <div class="search">
        <h1>宝藏区</h1>
        <a-input-search
            placeholder="搜索指定的宝藏"
            button-text="搜索"
            allow-clear
            v-model="params.key"
            @search="search()"
            style="width: 300px"
        />
      </div>
      <a-divider size="1"></a-divider>
      <div class="content" >
        <a-card hoverable :style="{ width: '400px' }" v-for="(item,index) in blogList" :key="index">
          <template #cover>
            <div
                :style="{
          height: '150px',
          overflow: 'hidden',
        }"
            >
              <img
                  :style="{ width: '100%', transform: 'translateY(-20px)' }"
                  alt="dessert"
                  :src="item.picture"
              />
            </div>
          </template>
          <a-card-meta :title="item.title">
            <template #description>
              作者:{{item.nickname}}<br />
              <a-space>
                <span>发布时间:{{item.createDate}}</span>
                <span>点赞数:{{item.likes}}</span>
              </a-space>
            </template>
          </a-card-meta>
        </a-card>
      </div>

      <div style="display: flex;justify-content: center;margin-top: 30px" v-if="page>10">
        <a-pagination
            :total="page"
            :page-size="params.pageSize"
            :current="params.current"
            :show-size-changer="true"
            @change="handlePageChange"
        />
      </div>
      <div v-if="blogList.length == 0">
        <a-empty >
          该分类暂无内容
        </a-empty>
      </div>
    </div>
  </a-space>
</template>

<style scoped>
.public_container{

  display: flex;
  flex-direction: column;
  gap: 24px;
}
.public_container div{
  background-color: white;

}
h1{
  margin: 10px;
}
.container{
  padding: 10px;
}
.search{
  background-color: white;
  display: flex;
  align-items: center;
  padding-bottom: 0px;
  gap: 20px;
}
.content{
  display: flex;
  gap: 2vw;
  flex-wrap:wrap;
  justify-content:center;
}
</style>
