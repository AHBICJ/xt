<template>
  <div class="grade">
    <h3 class="grade-title">班级信息统计</h3>
    <div class="chart-container">
      <div class="chart">
        <div class="title">学生测验曲线</div>
        <el-select v-model="select_stu" placeholder="请选择" style="text-aligin:center;">
          <el-option v-for="item in name" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <e-chart
          :path-option="chart3"
          :dataset="datas3"
          v-if="dataisready"
          width="500px"
          height="300px"
        ></e-chart>
      </div>
      <div class="chart">
        <div class="title">测验成绩分布</div>
        <el-select v-model="select_task" placeholder="请选择">
          <el-option
            v-for="item in taskinfo"
            :key="item.task_id"
            :label="item.task_name"
            :value="item.task_id"
          ></el-option>
        </el-select>
        <e-chart
          :path-option="chart4"
          :dataset="datas4"
          height="350px"
          width="470px"
          v-if="dataisready"
        ></e-chart>
      </div>
    </div>
    <div class="scroll-table">
      <table :style="{width:table_width+'px'}" style="min-width:">
        <tr>
          <th class="wid200 fixed">姓名 \ 测验名称</th>
          <th v-for="(item) in table_head" :key="item.task_name">{{item.task_name}}</th>
        </tr>
        <tr v-for=" item in name" :key="item" :item="item">
          <td class="fixed">
            <div>
              <img src="@/assets/images/tx4.png" alt />
              <span>{{item}}</span>
            </div>
          </td>
          <td
            v-for="myitem  in table_head"
            :key="myitem.task_name"
            :myitem="myitem"
            v-text="get_score(item,myitem)"
          ></td>
        </tr>
      </table>
    </div>
    
    <div class="chart-container">
      <div class="chart">
        <div class="title">作业完成度</div>
        <e-chart
          :path-option="chart1"
          v-if="dataisready"
          width="500px"
          height="300px"
          :dataset="[]"
        ></e-chart>
      </div>
      <div class="chart">
        <div class="title">学生作业完成度</div>
        <e-chart :path-option="chart2" height="350px" width="470px" v-if="dataisready"></e-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { class_grade } from "@/api/toGet";
import EChart from "@/components/chart/echart";
export default {
  name: "Grade",
  data() {
    return {
      taskinfo: [],
      gradeinfo: [],
      name: [],
      dataisready: false,
      select_task: "",
      select_stu: "",
      min_th: 8,
      table_width: 1120,
      chart1: [
        ["color", ["#E0B969", "orange"]],
        [
          "angleAxis",
          { type: "category", z: 10, data: ["233", "qwer", "emm"] }
        ],
        ["radiusAxis", {}],
        ["polar", {}],
        ["xAxis.show", false],
        ["yAxis.show", false],
        [
          "series",
          [
            {
              type: "bar",
              data: [60, 100, 50],
              coordinateSystem: "polar",
              name: "完成比",
              stack: "a"
            }
          ]
        ]
      ],
      chart2: [
        ["grid.bottom", "10%"],
        ["grid.top", "10%"],
        ["color", ["#E0B969"]],

        ["tooltip", { trigger: "axis" }],
        ["legend", { data: ["2011年"] }],
        // [
        //   "toolbox",
        //   {
        //     show: true,
        //     feature: {
        //       mark: { show: true },
        //       dataView: { show: true, readOnly: false },
        //       magicType: { show: true, type: ["line", "bar"] },
        //       restore: { show: true },
        //       saveAsImage: { show: true }
        //     }
        //   }
        // ],
        ["calculable", true],
        ["xAxis", [{ type: "value", boundaryGap: [0, 0.1] }]],
        ["yAxis", [{ type: "category" }]],
        [
          "series",
          [{ name: "完成度", type: "bar", data: [20, 40, 60] }],
          ["series[0].barWidth", "25%"],
          ["series[1].barWidth", "25%"]
        ]
      ],
      chart3: [
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
      chart4: [
        ["color", ["#E0B969", "orange"]],
        ["legend.orient", "horizontal"],
        ["legend.y", "bottom"],
        ["xAxis.show", false],
        ["yAxis.show", false],
        ["series[0].name", "数量"],
        ["series[0].type", "pie"],
        ["series[0].avoidLabelOverlap", true],
        ["series[0].radius", ["50%", "70%"]]
      ]
    };
  },
  components: {
    EChart
  },
  computed: {
    table_head() {
      let temp = [];
      for (let qaq of this.taskinfo) {
        temp.push(qaq);
      }
      while (temp.length < this.min_th) {
        temp.push({});
      }
      this.table_width = 222 + 112 * temp.length;
      return temp;
    },
    datas3() {
      if (!this.select_stu) {
        return [];
      }
      let qaq = this.find_element(this.chart3, "xAxis");
      if (qaq) {
        let qaqs = [];
        this.gradeinfo[this.select_stu].forEach(item => qaqs.push(item.task));
        // qaqs.push("dasdad");
        qaq[1][0].data = qaqs;
      }
      let temp = [];
      this.gradeinfo[this.select_stu].forEach(item => {
        if (item.grade) temp.push(item.grade)
        else temp.push(0);
      });
      let emm = this.find_element(this.chart3, "series");
      emm[1][0].data = temp;
      return temp;
    },
    datas4() {
      let nograde = { name: "暂无成绩", value: 0 };
      let bujige = { name: "不及格", value: 0 }; //<60
      let jige = { name: "及格", value: 0 }; //<=60&&>80
      let youxiu = { name: "优秀", value: 0 }; //>=80
      let nosubmit = { name: "未提交", value: 0 };
      let res = [nograde, bujige, jige, youxiu, nosubmit];
      let task_id = this.select_task;
      this.name.forEach(v => {
        let qaq = this.get_score(v, { task_id });
        // console.log(v,this.select_task,qaq)
        if (qaq == "未提交") {
          nosubmit.value++;
        } else if (qaq == "未评分") {
          nograde.value++;
        } else if (qaq < 60) {
          bujige.value++;
        } else if (qaq < 80) {
          jige.value++;
        } else {
          youxiu.value++;
        }
      });
      return res;
    }
  },
  methods: {
    init_chart1_data() {
      let qaq = this.find_element(this.chart1, "angleAxis");
      let temp = [];
      this.taskinfo.forEach(item => temp.push(item.task_name));
      
      qaq[1].data = temp;
      qaq = this.find_element(this.chart1, "series");
      let datass = [];
      this.taskinfo.forEach(item => {
        let cnt = 0;
        let num = 0;
        
        this.name.forEach(filed => {
          let qwer = this.get_score(filed, item);
          // console.log(qwer);
          if (qwer == "未提交") {
            cnt++;
          } else {
            num++;
            cnt++;
          }
        });
        if (num!=0)datass.push((100 * num) / cnt)
        else datass.push(0);
      });
      // console.log('qaq');
      qaq[1][0].data = datass;
    },
    init_chart2_data() {
      
      // this.option[]
      let qaq = this.find_element(this.chart2, "yAxis");
      if (qaq) {
        qaq[1][0].data = this.name;
      }
      let emm = this.find_element(this.chart2, "series");
      let temp = [];
      this.name.forEach(item => {
        let num = 0;
        let cnt = 0;
        this.taskinfo.forEach(filed => {
          let qwer = this.get_score(item, filed);
          if (qwer == "未提交") {
            cnt++;
          } else {
            num++;
            cnt++;
          }
        });
        if (num!=0)temp.push((100 * num) / cnt)
        else temp.push(0);
      });

      emm[1][0].data = temp;
    },
    find_element(chart, index) {
      return chart.find(item => item[0] == index);
    },
    get_class_grade(id) {
      class_grade({ room_id: id })
        .then(res => {
          this.gradeinfo = res.data.stus;
          this.taskinfo = res.data.header;
          this.name = Object.keys(this.gradeinfo);
          this.init_chart1_data();
          this.init_chart2_data();
          this.dataisready = true;
        })
        .catch(() => {});
    },
    get_score(index, filed) {
      if (!filed.task_id) {
        return "";
      }
      // console.log(filed);
      let arr = this.gradeinfo[index];
      let emm = arr.find(item => item.task_id == filed.task_id);
      if (!emm) {
        return "未提交";
      } else if (!emm.grade) {
        return "未评分";
      } else {
        return emm.grade;
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
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3);;
      background-color: #F5F5F5;
      border-radius: 10px;
    }
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color:#F90;
      border-radius: 10px;
      background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent)
    }
  }
  table {
    border-collapse: collapse;
    background-color: white;
    min-width: 1120px;
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

