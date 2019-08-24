<template>
  <div class="right">
    <div class="rtop">
      <p>{{homeworkinfo.content}}</p>
      <div v-for="item in  homeworkinfo.image_address" :key="item">
        <img :src=" qaq + item " alt />
      </div>
    </div>
    <div class="grade">
      <p>
        打分：
        <el-input v-model="grade" placeholder="成绩" style="width:80px;"></el-input>
        <span>/100</span>
      </p>
    </div>
    <div class="remark">
      <p>教师评语</p>
      <el-input type="textarea" v-model="remark"></el-input>
      <el-button type="warning" class="mybutton" @click="get_mark_score()">完成评价</el-button>
    </div>
  </div>
</template>

<script>
import { mark_score } from "@/api/toPost";
export default {
  data() {
    return {
      grade: "",
      remark: "",
      qaq: process.env.VUE_APP_CDN
    };
  },
  props: ["homeworkinfo"],
  methods: {
    get_mark_score() {
      let datas = {
        homework_id: this.homeworkinfo.id,
        grade: this.grade,
        remark: this.remark
      };
      mark_score(datas) 
        .then(() => {
          this.$message("这是一条消息提示");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped >
.right {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 50px;
  width: 700px;
  .rtop {
    text-indent: 2em;
    img {
      width: 400px;
      height: auto;
    }
  }
  .grade {
    margin-top: 100px;
    margin-left: 500px;
    p {
      span {
        color: #1e8e3e;
      }
    }
  }
  .remark {
    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .mybutton {
      margin-top: 30px;
      margin-left: 580px;
    }
  }
}
</style>

