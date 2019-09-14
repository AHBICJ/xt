<template>
  <div class="taskGroup">
    <div class="taskGroupTitle">{{groupName}}</div>
    <el-collapse-transition>
      <div class="taskGroupTasks">
        <share-card v-for="task in tasks" :share="task" :key="task.id" />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import ShareCard from "@/components/ShareCard.vue";
export default {
  data() {},
  props: [groupName, tasks],
  components: {
    ShareCard
  }
};
</script>

<style lang="scss" scoped>
</style>