<template>
  <div class="content">
    <div class="left">
      <div class="text">
        <h2>老师</h2>
      </div>
      <div class="list">
        <img src="@/assets/images/tx1.png" alt />
        <p>孔孟荀墨</p>
      </div>
      <div class="text mt50">
        <h2>同学们</h2>
      </div>
      <div class="list"  v-for="item in stu" :key="item">
        <img src="@/assets/images/tx4.png" alt />
        <p>{{item}}</p>
      </div>
      <el-pagination
        class="fenye"
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="100"
      ></el-pagination>
    </div>
    <classroom-left />
  </div>
</template>

<script>
import ClassroomLeft from "@/components/ClassroomLeft.vue";
export default {
  data(){
    return {
      stu:  ["颜回", "闵子骞" ,"冉耕","仲弓"]
    }
  },
  components: {
    ClassroomLeft
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 20%;
  margin-top: 50px;
  .left {
    flex-grow: 1;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 700px;
    height: auto;
    border: 0.0625rem solid #dadce0;
    border-radius: 0.5rem;
    border-radius: 30upx;
    overflow: auto;
    padding: 30px;
    text-align: left;
    .text {
      height: 50px;
      border-bottom: 1px solid var(--main-color);
      color: var(--main-color);
    }
    .list {
      height: 50px;
      border-bottom: 1px solid #c9cece;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      img {
        width: 35px;
        height: 35px;
        margin-left: 20px;
        margin-top: 8px;
        border-radius: 50%;
      }
      p {
        margin-left: 20px;
        margin-top: 14px;
      }
    }
    .mt50 {
      margin-top: 50px;
    }
    .fenye {
      margin-left: 500px;
      margin-top: 30px;
    }
  }
}
</style>

