<script setup lang="ts">

import {queryTags, type tag} from "../api/tag.ts";
import {onMounted, reactive, ref} from "vue";
import {type BlogDetail, type blogParams, queryBlog} from "../api/blog.ts";
import {useRouter} from "vue-router";

const params = reactive({
  page: 1,
  size: 9,
  tagId:'',
  title:''
} as blogParams)
const page = ref<number>(1);

const dateList = ref<tag[]>([])
const fetchDate = async () => {
  const { data } = await queryBlog(params)
  blogList.value = data.list
  page.value = data.total
}
const blogList = ref<BlogDetail[]>([])
//调用获取数据
onMounted(async () => {
  const { data } = await queryTags()
  console.log("当前的data",data)
  dateList.value = data.map(item  => ({
    ...item,
    checked: false
  }));
  fetchDate()
})
// 被选中的checkList

const check = () => {
  fetchDate()
}

const handlePageChange = (page) => {
  params.page = page;

  fetchDate(); // 重新请求数据
};
const search = () =>{
  fetchDate()
}

const router = useRouter();

const toBlogDetail = (id : number) => {
  router.push({ name: '博客详情', params: { id: id } });
}

</script>

<template>
  <a-space class="public_container" direction="vertical">
    <!--    标签 -->

    <div class="container">
      <h1>分类</h1>

      <a-radio-group v-model="params.tagId">
        <a-grid  :colGap="32" :rowGap="32" :cols="10" >
          <a-grid-item @change="check(item)"  v-for="(item,index) in dateList"
                       :key="index">
            <a-radio :value="item.id" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.name}}</a-radio>
          </a-grid-item>
        </a-grid>
      </a-radio-group>
    </div>
    <!--    宝藏-->
    <div class="container">
      <div class="search">
        <h1>宝藏区</h1>
        <a-input-search
            placeholder="搜索指定的宝藏"
            button-text="搜索"
            allow-clear
            v-model="params.title"
            @search="search()"
            style="width: 300px"
        />
      </div>
      <a-divider size="1"></a-divider>
      <div class="content" >
        <a-card hoverable :style="{ width: '400px' }" class="card-item" @click="toBlogDetail(item.id)" v-for="(item,index) in blogList" :key="index">
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
              作者:{{item.username}}<br />
              <a-space>
                <span>发布时间:{{item.createTime}}</span>
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
.card-item:hover{
  cursor: pointer;
}

</style>
