<template>
  <div class="grade">
    <h2 class="grade-title">我的成绩总览</h2>
    <div class="mycontainer">
      <div style="width:400px;align-self: center;">
        <table>
          <!-- <tr>
          <th>学生姓名</th>
          <td>{{user.name}}</td>
          </tr>-->
          <tr>
            <th>测验名称</th>
            <th>测验成绩</th>
          </tr>
          <tr  v-for="item in taskinfo" :key="item.task_id">
            <th>{{item.task_name}}</th>
            <td>{{get_score(item)}}</td>
          </tr>
          <tr v-if="taskinfo.length==0">
            <th colspan="2">暂无成绩 加油完成作业吧</th>
            
          </tr>
        </table>
      </div>
      <div class="chart">
      <div class="title" style="text-align: center">我的成绩曲线</div>
      <e-chart
        :path-option="chart"
        :dataset="datas"
        v-if="dataisready"
        width="500px"
        height="300px"
      ></e-chart>
    </div>
    </div>
    
  </div>
</template>

<script>
import { class_grade } from "@/api/toGet";
import EChart from "@/components/chart/echart";
export default {
  data() {
    return {
      taskinfo: [],
      gradeinfo: [],
      user: this.$store.state.user,
      dataisready:false,
      chart: [
        ["color", ["#efd055"]],
        ["grid", { left: "3%", right: "4%", bottom: "3%", containLabel: true }],
        ["series", [{ name: "成绩", type: "line", barWidth: "60%", data: [] }]],
        ["yAxis", [{ type: "value" }]],
        [
          "xAxis",
          [{ type: "category", data: [], axisTick: { alignWithLabel: true } }]
        ]

        // ["series",[{name: "完成度",type: "bar",data: [20, 40, 60]}]],
      ],
    };
  },
  components:{
    EChart
  },
  methods: {
    get_class_grade(id) {
      class_grade({ room_id: id })
        .then(res => {
          this.gradeinfo = res.data.stus;
          this.taskinfo = res.data.header;
          this.dataisready=true
        })
        .catch(() => {});
    },
    get_score(filed) {
      if (!filed.task_id) {
        return "";
      }
      // console.log(filed);
      let index = this.user.name;
      let arr = this.gradeinfo[index];
      let emm = arr.find(item => item.task_id == filed.task_id);
      if (!emm) {
        return "未提交";
      } else if (!emm.grade) {
        return "未评分";
      } else {
        return emm.grade;
      }
    },
      find_element(chart, index) {
      return chart.find(item => item[0] == index);
    },
  },
  computed:{
        datas() {
      let qaq = this.find_element(this.chart, "xAxis");
      if (qaq) {
        let qaqs = [];
        this.taskinfo.forEach(item => qaqs.push(item.task_name));
        // qaqs.push("dasdad");
        qaq[1][0].data = qaqs;
      }
      let temp = [];
      this.gradeinfo[this.user.name].forEach(item => {
        temp.push(item.grade);
      });
      let emm = this.find_element(this.chart, "series");
      emm[1][0].data = temp;
      return temp;
    },
  },
  created() {
    let roomid = this.$route.params.id;
    this.get_class_grade(roomid);
  }
};
</script>

<style scoped lang="scss">
.chart-container {
  // display: flex;
  // flex: 1;
  // justify-content: space-around;
  // margin: auto;
  // align-content: flex-end;
  margin-bottom: 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1120px;
  margin: 0 auto;
  margin-top: 50px;
  flex-grow: 1;
  // flex-direction: column;
  border: 1px solid #dadce0;
  border-radius: 8px;
  overflow: auto;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  .chart {
    text-align: center;
    .title {
      margin: 10px 0;
    }
  }
}
.grade {
  width: 1120px;
  margin: 0 auto;
  margin-top: 50px;
  .mycontainer{
    margin-top: 20px;
    display:flex;
    justify-content: space-between;
    background-color: white;
    border: 1px solid #dadce0;
    border-radius: 8px;
    overflow: auto;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .grade-title {
    text-align: center;
    color: var(--main-color);
    font-size: 24px;
  }

  .scroll-table {
    overflow-x: auto;
    margin-top: 40px;
    width: 1120px;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      /*background-color: #ddd;*/
    }

    /*滑道*/
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px #333;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
      border-radius: 10px;
    }
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #f90;
      border-radius: 10px;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }
  }
  table {
    border-collapse: collapse;
    background-color: white;
    width: 400px;
    tr {
      position: relative;
    }
    .fixed {
      position: sticky;
      left: 0;
      background: whie;
      z-index: 9999;
      background: #e4eef5;
    }
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
    padding: 10px;
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
    span {
      float: left;
      margin-top: 10px;
      margin-left: 20px;
    }
  }
  .wid200 {
    width: 200px;
  }
}
</style>
