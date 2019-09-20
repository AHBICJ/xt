<template>
  <div class="taskGroup">
    <div class="taskGroupTitle" v-if="topic.id!=-1">{{topic.name}}</div>
    <el-collapse-transition>
      <div class="taskGroupTasks">
        <div v-if="topic.tasks.length==0 && topic.id!=-1" class="nothingHere">这个主题下还没有班级任务</div>
        <share-card v-for="task in topic.tasks" :share="task" :key="task.id" />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import ShareCard from "@/components/ShareCard.vue";
export default {
  data() {
    return{
      taskNum:0,
    }
  },
  props: ["topic"],
  components: {
    ShareCard
  }
};
</script>

<style lang="scss" scoped>
.taskGroup{
  .taskGroupTitle{
    color: var(--main-color);
    border-bottom: 2px solid;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 20px;
  }
  .taskGroupTasks{
    .nothingHere {
      height: 200px;
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
}
</style>