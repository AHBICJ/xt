<template>
  <div class="taskdetail">
    <taskdetail-left :taskinfo = "taskinfo"/>
  </div>
</template>

<script>
import TaskdetailLeft from "@/components/TaskdetailLeft.vue";
import { task_detail } from "@/api/toGet";
import { get_homework } from "@/api/toGet";
export default {
  data() {
    return {
      id: 1,
      taskinfo: {},
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
    }
  },
  components: {
    TaskdetailLeft
  }
};
</script>

<style  scoped lang="scss">
.taskdetail {
  position: relative;
  margin: 0 auto;
  width: 1120px;
  display: grid;
  grid-template-areas: "left";
  grid-template-rows: auto auto;
  // grid-template-columns: 800px 300px;
  grid-gap: 20px;
  margin-top: 50px;
  .taskdetailLeft {
    grid-area: left;
  }
}
</style>
