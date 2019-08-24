<template>
  <div class="task">
    <div class="top">
      <div class="topone">
        <i class="el-icon-document" style="color:white"></i>
      </div>
      <div class="toptwo">
        <img src="../assets/images/tx3.png" alt />
        <p>孔孟荀墨</p>
        <p class="state">截止{{endtate(task.star_time)}}</p>
        <i class="el-icon-more"></i>
      </div>
    </div>
    <div class="middle">
      <h2>{{task.name}}</h2>
      <router-link :to=" myrole=='admin'?'/tealook/'+ task.id :'/homework/'+ task.id  ">
        <el-button class="color">打开</el-button>
      </router-link>
    </div>
    <div class="buttom">
      <div class="ziyuan"  v-for="item in  task.photo" :key="item">
        <img :src=" qaq + item " alt />
        <p>{{task.desc}}</p>
      </div>
      <p class="state">
        <span>状态</span> ：未完成
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qaq: process.env.VUE_APP_CDN,
      myrole: JSON.parse(this.$store.state.user).role
    };
  },
  props: ["task", "teachername"],
  methods: {
    endtate(endtime) {
      if (!endtime) {
        return "永不过期";
      } else {
        return endtime;
      }
    }
  }
};
</script>

<style lang="scss" scoped >
p {
  padding-top: 11px;
  padding-left: 5px;
  letter-spacing: 0.01785714em;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #3c4043;
}
.task {
  width: 760px;
  height: 290px;
  border: 0.0625rem solid #dadce0;
  border-radius: 0.5rem;
  border-radius: 30upx;
  overflow: auto;
  margin-bottom: 20px;
  .top {
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    border-bottom: 1px solid #e0e0e0;
    .topone {
      background-color: var(--main-color);
      width: 58px;
      /* margin: 1px 0 0 1px; */
      i {
        padding-top: 19px;
        padding-left: 16px;
        transform: scale(1.5);
      }
    }
    .toptwo {
      height: 50px;
      margin-top: 10px;
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      img {
        margin-top: 5px;
        margin-right: 10px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .state {
        margin-left: 330px;
      }
      i {
        padding-top: 14px;
        padding-left: 20px;
        transform: scale(1.6);
      }
    }
  }
  .middle {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    text-align: left;
    padding: 30px;
    h2 {
      font-weight: 400;
      width: 50%;
    }
    .color {
      margin-left: 250px;
      color: var(--main-color);
      &:hover {
        color: var(--main-color-hover);
      }
    }
  }
  .buttom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .ziyuan {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 350px;
      height: 70px;
      border: 1px solid #dadce0;
      border-radius: 0.5rem;
      border-radius: 30upx;
      overflow: auto;
      margin-left: 19px;
      text-align: left;
      img {
        width: 105px;
        height: 100%;
        margin-right: 10px;
      }
    }
    .state {
      margin-left: 620px;
      margin-top: 10px;
      span {
        color: var(--main-color);
      }
    }
  }
}
</style>

