<template>
  <div class="ClassroomLeft">
    <div class="messageBox">
      <div>
        <p class="title">消息提示</p>
        <template v-if="notices.length>0">
          
          <router-link class="mylink" to v-for="notice in notices" :key="notice.msg" v-text="notice.msg"></router-link>
          <router-link to class="checkAll">查看全部</router-link>
        </template>
        <template v-else>
          <router-link class="mylink" to>当前暂无消息</router-link>
        </template>
      </div>

    </div>
    <div class="messageBox">
      <p class="title">专题任务</p>
      <template v-if="topics.length>0">
      <router-link class="mylink" :to="{name:'task'}" v-for="topic in topics" :key="topic.id" v-text="topic.name"></router-link>
      </template>
      <template v-else>
        <router-link class="mylink" to>当前暂无主题任务</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import {classAd} from '@/api/toGet'
export default {
  data(){
    return {
      room_id:0,
      topics:[],
      notices:[]
    }
  },
  methods:{
    getads(){
      let datas={
        room_id:this.room_id
      }
      classAd(datas)
      .then(res=>{
        this.topics = res.data.topics;
        this.notices = res.data.notice;
      })
    }
  },
  created(){
    this.room_id = this.$route.params.id;
    this.getads();
  }
};
</script>

<style lang="scss" scoped >
.ClassroomLeft {
  width: 100%;
  .messageBox {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #dadce0;
    border-radius: 8px;
    letter-spacing: 0.25px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #3c4043;
    text-align: left;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .mylink {
      display: block;
      font-size: 14px;
      line-height: 26px;
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
      color: rgba(0, 0, 0, 0.6);
      &:hover {
        color: rgba(0, 0, 0, 0.9);
      }
    }
    .checkAll {
      display: block;
      text-align: right;
      color: black;
      font-size: 14px;
      line-height: 26px;
      &:hover {
        color: var(--main-color);
      }
    }
  }
}
</style>

