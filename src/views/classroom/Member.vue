<template>
  <div class="member">
    <div class="text">
      <h2>老师</h2>
    </div>
    <div class="list">
      <img src="@/assets/images/tx1.png" alt />
      <p>{{teacher}}</p>
    </div>
    <div class="text mt50">
      <h2>同学</h2>
    </div>
    <div class="list" v-for="(item,idx) in members" :key="`${idx}${item.photo}`">
      <img :src="`/images/` + item.photo" alt />
      <p>{{item.name}}</p>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="12" :sm="8" :lg="6">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="page"
            :page-size="pagenum"
            :total="total"
            @current-change="getMembers()"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- <classroom-left /> -->
  </div>
</template>

<script>
// import ClassroomLeft from "@/components/ClassroomLeft.vue";
import { get_classroom_members } from "@/api/toGet";
export default {
  data() {
    return {
      members: [],  
      teacher:"",
      page: 1,
      pagenum: 12,
      totalPage: 1,
      upload_api: process.env.VUE_APP_API + "/upload"
    };
  },
  components: {
    // ClassroomLeft
  },
  methods: {
    getMembers() {
      let prams = {
        page: this.page,
        pagenum: this.pagenum,
        room_id:this.$route.params.id
      };
      get_classroom_members(prams).then(res => {
        this.members = res.data.stu_list;
        this.teacher = res.data.teacher;
        // this.totalPage = res.totalpage;
      });
    },
  },
  created() {
    this.getMembers();
  },
  computed: {
    total() {
      return this.pagenum * this.totalPage;
    },
    uploadAddr() {
      return process.env.VUE_APP_API + "/upload";
    }
  }
};
</script>

<style scoped lang="scss">
.member {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1120px;
  margin: 0 auto;
  margin-top: 50px;
  flex-grow: 1;
  flex-direction: column;
  border: 1px solid #dadce0;
  border-radius: 8px;
  overflow: auto;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  .text {
    height: 50px;
    border-bottom: 1px solid var(--main-color);
    color: var(--main-color);
  }
  .list {
    height: 50px;
    border-bottom: 1px solid #c9cece;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    img {
      width: 35px;
      height: 35px;
      margin-left: 20px;
      margin-top: 8px;
      border-radius: 50%;
    }
    p {
      margin-left: 20px;
      margin-top: 14px;
    }
  }
  .mt50 {
    margin-top: 50px;
  }
  .el-pagination {
    margin: 30px 0 10px;
    text-align: center;
  }
}
</style>

