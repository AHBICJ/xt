<template>
  <div class="classintroMain">
    <div class="classintroTop">
      <class-top/>
    </div>
    <!-- 左边通知栏 -->
    <div class="classintroLeft">
      <classroom-left />
    </div>
    <!-- 右边具体任务栏 -->
    <div class="classintroRight">
      <!-- 第一行分享栏 -->
      <share/>
      <!-- 具体任务栏 -->
      <taskcard v-for="task in tasks" :task="task" :key="task.id" />
    </div>
  </div>
</template>

<script>
import ClassTop from "@/components/ClassTop.vue"
import taskcard from "@/components/TaskCard.vue";
import Share from "@/components/Share.vue";
import ClassroomLeft from "@/components/ClassroomLeft.vue";
import { room_tasks, get_classroom_info } from "@/api/toGet";
export default {
  data() {
    return {
      tasks: [],
      room_id: 1,
      classinfo: {}
    };
  },
  methods: {
    get_tasks() {
      let datas = { room_id: this.room_id };
      room_tasks(datas)
        .then(res => {
          this.tasks = res.data;
          for (var i = 0; i < this.tasks.length; i++)
            this.tasks[i].photo = JSON.parse(this.tasks[i].photo);
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    },
    get_room() {
      get_classroom_info({ room_id: this.room_id })
        .then(res => {
          this.classinfo = res.data;
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    }
  },
  created() {
    this.get_tasks();
    this.get_room();
  },
  components: {
    ClassroomLeft,
    taskcard,
    ClassTop,
    Share
  }
};
</script>

<style scoped lang="scss">
.classintroMain {
  position: relative;
  margin: 0 auto;
  width: 1120px;
  display: grid;
  grid-template-areas:
    "top top"
    "left right";
  grid-template-rows: auto auto;
  grid-template-columns: 250px 850px;
  grid-gap: 20px;
  .classintroTop {
    grid-area: top;
  }
  .classintroLeft {
    grid-area: left;
  }
  .classintroRight {
    grid-area: right;
  }
  .classintroTop,.classintroLeft,.classintroRight{

    overflow: hidden;
    margin: -16px;
    padding: 16px;
  }
}
</style>

