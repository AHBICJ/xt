<template>
  <div class="content">
    <div class="left">
      <div class="stu" @click="get_homework_detail()">
        <img src="@/assets/images/tx4.png" alt />
        <p>林津民</p>
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
    <right :homeworkinfo="homeworkinfo" />
  </div>
</template>

<script>
import right from "@/components/remark.vue";
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
    right
  }
};
</script>

<style  scoped lang="scss">
.content {
  width: 1100px;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid rgb(233, 230, 230);
  margin: 0 auto;
  margin-top: 20px;
  .left {
    width: 299px;
    height: auto;
    border-right: 1px solid rgb(233, 230, 230);
    .stu {
      width: 260px;
      height: 30px;
      border-top: 1px solid rgb(233, 230, 230);
      border-bottom: 1px solid rgb(233, 230, 230);
      padding: 20px;
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
}
</style>
