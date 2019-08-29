<template>
  <div class="classintroMain">
    <div class="classintroTop">
      <class-top :classinfo="classinfo" />
    </div>
    <!-- 左边通知栏 -->
    <div class="classintroLeft">
      <classroom-left />
    </div>
    <!-- 右边具体任务栏 -->
    <div class="classintroRight">
      <!-- 第一行分享栏 -->
      <share  />
      <!-- 具体任务栏 -->
      <!-- <taskcard v-for="task in tasks" :task="task" :key="task.id" /> -->
      <sharecard v-for="share in shares" :share="share" :key="share.id"/>
    </div>
  </div>
</template>

<script>
import ClassTop from "@/components/ClassTop.vue";
// import taskcard from "@/components/TaskCard.vue";
import sharecard from "@/components/ShareCard.vue";
import Share from "@/components/Share.vue";
import ClassroomLeft from "@/components/ClassroomLeft.vue";
import { room_tasks, get_classroom_info } from "@/api/toGet";
export default {
  data() {
    return {
      // tasks: [],
      shares: [],
      classinfo: {
        className: "",
        classDesc: "",
        classImgSrc: ""
      }
    };
  },
  methods: {
    // get_tasks(id) {
    //   room_tasks({ room_id: id })
    //     .then(res => {
    //       this.tasks = res.data;
    //       for (var i = 0; i < this.tasks.length; i++)
    //         this.tasks[i].photo = JSON.parse(this.tasks[i].photo);
    //     })
    //     .catch(err => {
    //       this.$message({
    //         message: err.message,
    //         type: "error"
    //       });
    //     });
    // },
    get_shares(id) {
      room_tasks({ room_id: id })
        .then(res => {
          this.shares = res.data;
          for (var i = 0; i < this.shares.length; i++)
            this.shares[i].photo = JSON.parse(this.shares[i].photo);
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    get_room(id) {
      get_classroom_info({ room_id: id })
        .then(res => {
          this.classinfo.className = res.data.name;
          this.classinfo.classDesc = res.data.description;
          this.classinfo.classImgSrc = res.data.photo;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    }
  },
  created() {
    let roomid = this.$route.params.id;
    // this.get_tasks(roomid);
    this.get_shares(roomid);
    this.get_room(roomid);
  },
  beforeRouteUpdate(to, from, next) {
    let roomid = to.params.id;
    // this.get_tasks(roomid);
    this.get_shares(roomid);
    this.get_room(roomid);
    next();
  },
  components: {
    ClassroomLeft,
    // taskcard,
    sharecard,
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
  .classintroTop,
  .classintroLeft,
  .classintroRight {
    overflow: hidden;
    margin: -16px;
    padding: 16px;
  }
}
</style>

