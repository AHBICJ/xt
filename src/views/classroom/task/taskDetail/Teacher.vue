<template>
  <div class="taskdetail">
    <div class="taskdetailLeft">
      <div class="stu_title">学生名单</div>
      <!-- <div class="stu" @click="get_homework_detail()"> -->
        <div class="stu" v-for="a in studentlist" :key="a" @click="get_homework_detail(a.student_id)"> 
        <img src="@/assets/images/tx4.png" alt />
        <p>{{a.student}}</p>
      </div>
    </div>
    <div class="taskdetailRight">
      <remark :taskinfo="taskinfo" :homeworkinfo="homeworkinfo" />
    </div>
  </div>
</template>

<script>
import remark from "@/components/remark.vue";
import { task_detail } from "@/api/toGet";
import { get_homework,get_homeworklist } from "@/api/toGet";
export default {
  data() {
    return {
      id: 1,
      taskinfo: {},
      grade: "",
      remark: "",
      studentlist:[],
      // task_id: 1,
      homeworkinfo: []
    };
  },
  created() {
    this.id = this.$route.params.taskid || 1;
    this.get_task_detail();
    // this.task_id = this.$route.params.id || 1;
    this.get_studentlist();
    // this.get_homework_detail(this.a[0].student_id)
  },
  methods: {
    get_task_detail() {
      let datas = { task_id: this.id };

      task_detail(datas)
        .then(res => {
          this.taskinfo = res.data;
          this.taskinfo.photo = JSON.parse(this.taskinfo.photo);
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    },
    get_homework_detail(student_id) {
      let datas = {
        task_id: this.id,
        student_id: student_id
      };
      get_homework(datas)
        .then(res => {
          this.homeworkinfo = res.data;
          this.homeworkinfo.image_address = JSON.parse(
            this.homeworkinfo.image_address
          );
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    },
        get_studentlist() {
      let datas = {
        task_id: this.id,
      };
      get_homeworklist(datas)
        .then(res => {
          this.studentlist = res.data;
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    }
  },
  components: {
    remark
  }
};
</script>

<style  scoped lang="scss">
.taskdetail {
  width: 1120px;
  height: 760px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-areas: "left right";
  grid-template-rows: auto auto;
  grid-template-columns: 300px 800px;
  grid-gap: 20px;
  box-sizing: border-box;
  .taskdetailLeft {
    position: relative;
    grid-area: left;
    overflow: auto;
    background-color: #fff;
    border: 1px solid #dadce0;
    border-radius: 8px;
    box-sizing: border-box;
    .stu_title {
      width: 100%;
      // position: absolute;
      // top: 0;
      // left: 0;
      background-color: #fff;
      box-sizing: border-box;
      font-size: 20px;
      color: var(--main-color);
      font-weight: bold;
      font-family: "Courier New", Courier, monospace;
      padding: 20px;
      border-bottom: 1px solid var(--main-color);
      // border-left: 6px solid var(--main-color);
    }
    .stu {
      width: 100%;
      // height: 70px;
      border-bottom: 1px solid #ccc;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      cursor: pointer;
      p {
        padding-top: 7px;
        padding-left: 20px;
        font-size: 14px;
      }
      img {
        width: 35px;
        height: 35px;
      }
    }
    .stu:hover {
      background-color: var(--main-color-hover);
    }
  }
  .taskdetailRight {
    // width: 100%;
    grid-area: right;
    // overflow: hidden;
    // padding: 16px;
    // background-color: #fff;
    // border: 1px solid #dadce0;
    // border-radius: 8px;
    // box-sizing: border-box;
  }
}
</style>
