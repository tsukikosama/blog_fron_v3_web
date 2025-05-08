<script setup lang="ts">

</script>

<template>
  <a-space class="public_container" direction="vertical">
<!--    标签 -->

    <div class="container">
      <h1>分类</h1>
      <a-space  size="36">
        <a-tag color="blue" >啊啊啊啊</a-tag>
        <a-tag color="blue" >啊啊啊啊</a-tag>
        <a-tag color="blue" >啊啊啊啊</a-tag><a-tag color="blue" >啊啊啊啊</a-tag>
        <a-tag color="blue" >啊啊啊啊</a-tag>
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
            style="width: 300px"
        />
      </div>
      <a-divider size="1"></a-divider>
      <div class="content">
        <a-card hoverable :style="{ width: '400px' }">
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
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
              />
            </div>
          </template>
          <a-card-meta title="标题">
            <template #description>
              作者 <br />
              <a-space>
                <span>发布时间</span>
                <span>点赞数</span>
              </a-space>
            </template>
          </a-card-meta>
        </a-card>
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
