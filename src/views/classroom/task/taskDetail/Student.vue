<template>
  <div class="taskdetail">
    <!-- 左侧任务详情 -->
    <div class="taskdetailLeft">
      <taskdetail-left :taskinfo = "taskinfo"/>
    </div>
    <!-- 右侧提交 -->
    <div class="taskdetailRight">
      <div class="top">
        <div class="myrow">
          <p>你的作业</p>
          <span>未完成</span>
        </div>
        <el-upload
          class="upload-demo"
          action="http://192.168.123.182:5000/upload"
          :on-success="getimg"
        >
          <el-button class="mybuttom">添加附件</el-button>
        </el-upload>

        <el-button type="warning" class="mybuttom" @click="submit_homework">完成作业</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskdetailLeft from "@/components/TaskdetailLeft.vue";
import { task_detail } from "@/api/toGet";
import { submit_home } from "@/api/toPost";
export default {
  data() {
    return {
      homework: "",
      id: 1,
      taskinfo: {},
      picList: []
    };
  },
  created() {
    this.id = this.$route.params.taskid || 1;
    this.get_task_detail();
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
    //上面是获取，下面是提交
    getimg(response) {
      this.picList.push(response.data[0]);
    },
    submit_homework() {
      let datas = {
        student_id: 2,
        task_id: this.id,
        content: this.homework,
        image_address: JSON.stringify(this.picList)
      };
      submit_home(datas)
        .then(() => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        })
        .catch(() => {});
    }
  },
  components: {
    TaskdetailLeft
  }
};
</script>

<style scoped lang="scss">
.taskdetail {
  position: relative;
  margin: 0 auto;
  width: 1120px;
  display: grid;
  grid-template-areas: "left right";
  grid-template-rows: auto auto;
  grid-template-columns: 800px 300px;
  grid-gap: 20px;
  margin-top: 30px;
  .taskdetailLeft {
    grid-area: left;
  }
  .taskdetailRight {
    width: 100%;
    grid-area: right;
    // display: flex;
    // flex-direction: column;
    // flex-wrap: wrap;
    // justify-content: flex-start;
    // width: 300px;
    // margin-left: 20px;
    //
    overflow: hidden;
    margin: -16px;
    padding: 16px;
    .top {
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
        0 2px 6px 2px rgba(60, 64, 67, 0.149);
      border-radius: 9px;
      overflow: hidden;
      padding:12px 24px;
      background-color: #fff;
      .myrow {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        span {
          margin-left: 132px;
          font-size: 14px;
          color: var(--main-color);
        }
        p {
          font-size: 18px;
        }
      }
      .mybuttom {
        width: 250px;
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 0px;
      }
    }
  }
}
</style>
