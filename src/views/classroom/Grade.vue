<template>
  <div class="grade">
    <table>
      <tr>
        <th class="wid200">姓名   \   测验名称</th>
        <th v-for="(item) in taskinfo" :key="item.task_name">{{item.task_name}}</th>
      </tr>
      <tr v-for=" item in name" :key="item" :item="item">
        <td>
          <div>
            <img src="@/assets/images/tx4.png" alt />
            <span>{{item}}</span>
          </div>
        </td>
        <td
          v-for="myitem  in taskinfo"
          :key="myitem.task_name"
          :myitem="myitem"
          v-text="get_score(item,myitem)"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { class_grade } from "@/api/toGet";
export default {
  data() {
    return {
      taskinfo: [],
      gradeinfo: [],
      name: []
    };
  },
  components: {},
  computed: {},
  methods: {
    get_class_grade(id) {
      class_grade({ room_id: id })
        .then(res => {
          (this.gradeinfo = res.data.stus),
            (this.taskinfo = res.data.header),
            (this.name = Object.keys(this.gradeinfo)),
            (this.gradeinfo = JSON.parse(this.gradeinfo)),
            (this.taskinfo = JSON.parse(this.taskinfo));
        })
        .catch(err => {
          // this.$message({
          //   message: err.message,
          //   type: "error"
          // });
        });
    },
    get_score(index, filed) {
      console.log(index);
      let arr = this.gradeinfo[index];
      let emm = arr.find(item => (item.task_id = filed.task_id));
      if (emm) {
        return emm.grade;
      } else {
        return "未提交";
      }
    }
  },
  created() {
    let roomid = this.$route.params.id;
    this.get_class_grade(roomid);
  }
};
</script>

<style scoped lang="scss">
.grade {
  width: 1120px;
  margin: 0 auto;
  margin-top: 50px;

  table {
    border-collapse: collapse;
    background-color: white;
  }

  table,
  td,
  th {
    border: 1px solid rgb(204, 203, 203);
    color: #333;
    text-align: center;
  }
  th,
  td {
    width: 90px;
    height: 60px;
    padding: 20px;
  }
  th {
    color: var(--main-color);
  }
  td {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      float: left;
      margin-left: 20px;
    }
    span{
     float: left;
     margin-top: 10px;
     margin-left: 20px;
    }
  }
  .wid200{
    width: 200px;
  }
}
</style>

