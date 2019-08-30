<template>
  <div class="taskdetail">
    <div class="taskdetailLeft">
      <div class="stu_title">学生名单</div>
      <div class="stu" @click="get_homework_detail()">
        <img src="@/assets/images/tx4.png" alt />
        <p>林津民</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx4.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx4.png" alt />
        <p>学生名字</p>
      </div>
      <div class="stu">
        <img src="@/assets/images/tx5.png" alt />
        <p>学生名字</p>
      </div>
    </div>
    <div class="taskdetailRight">
      <remark :homeworkinfo="homeworkinfo" />
    </div>
  </div>
</template>

<script>
import remark from "@/components/remark.vue";
import { get_homework } from "@/api/toGet";
export default {
  data() {
    return {
      grade: "",
      remark: "",
      task_id: 1,
      homeworkinfo: []
    };
  },
  created() {
    this.task_id = this.$route.params.id || 1;
  },
  methods: {
    get_homework_detail() {
      let datas = {
        task_id: this.task_id,
        student_id: 2
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
  display: grid;
  grid-template-areas: "left right";
  grid-template-rows: auto auto;
  grid-template-columns: 300px 800px;
  grid-gap: 20px;
  overflow: hidden;
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
    width: 100%;
    grid-area: right;
    overflow: hidden;
    padding: 16px;
    background-color: #fff;
    border: 1px solid #dadce0;
    border-radius: 8px;
    box-sizing: border-box;
  }
}
</style>
