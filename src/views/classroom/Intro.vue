<template>
  <div class="classintroMain">
    <div class="classintroTop">
      <class-top :classinfo="classinfo" />
    </div>
    <!-- 左边通知栏 -->
    <div class="classintroLeft">
      <classroom-left />
    </div>
    <!-- 右边分享栏 -->
    <div class="classintroRight">
      <!-- 添加分享 -->
      <share @shareCreated="handleShareCreated" />
      <!-- 具体分享栏 -->
      <sharecard v-for="share in shares" :share="share" :key="share.id" />
    </div>
  </div>
</template>

<script>
import ClassTop from "@/components/ClassTop.vue";
import sharecard from "@/components/ShareCard.vue";
import Share from "@/components/Share.vue";
import ClassroomLeft from "@/components/ClassroomLeft.vue";
import { room_tasks, get_classroom_info } from "@/api/toGet";
export default {
  data() {
    return {
      shares: [],
      classinfo: {
        className: "",
        classDesc: "",
        classImgSrc: ""
      }
    };
  },
  methods: {
    get_shares(id) {
      room_tasks({ room_id: id})
        .then(res => {
          this.shares = res.data;
          for (var i = 0; i < this.shares.length; i++)
            this.shares[i].photo = JSON.parse(this.shares[i].photo);
            this.shares[i].link = JSON.parse(this.shares[i].link);
        })
        .catch(() => {});
    },
    get_room(id) {
      get_classroom_info({ room_id: id})
        .then(res => {
          this.classinfo.className = res.data.name;
          this.classinfo.classDesc = res.data.description;
          this.classinfo.classImgSrc = res.data.photo;
        })
        .catch(()=> {});
    },
    handleShareCreated(res){
      this.shares.unshift(res.data);
      this.shares[0].photo = JSON.parse(this.shares[0].photo);
      this.shares[0].link = JSON.parse(this.shares[0].link);
    }
  },
  created() {
    let roomid = this.$route.params.id;
    this.get_shares(roomid);
    this.get_room(roomid);
  },
  beforeRouteUpdate(to, from, next) {
    let roomid = to.params.id;
    this.get_shares(roomid);
    this.get_room(roomid);
    next();
  },
  components: {
    ClassroomLeft,
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

