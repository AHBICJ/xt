<template>
  <div class="grade">
    <div>
      <e-chart :path-option="option" :dataset="[]" v-if="dataisready"></e-chart>
    </div>
    <table>
      <tr>
        <th class="wid200">姓名 \ 测验名称</th>
        <th v-for="(item) in table_head" :key="item.task_name">{{item.task_name}}</th>
      </tr>
      <tr v-for=" item in name" :key="item" :item="item">
        <td>
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
    <div class="charts">
      <e-chart
        :path-option="defaultOption"
        :dataset="datas"
        height="350px"
        width="100%"
        v-if="dataisready"
      ></e-chart>
    </div>
  </div>
</template>

<script>
import { class_grade } from "@/api/toGet";
import EChart from "@/components/chart/echart";
export default {
  name:"Grade",
  data() {
    return {
      taskinfo: [],
      gradeinfo: [],
      name: [],
      dataisready: false,
      datas: [
        {
          name: "视频赏析",
          value: 79
        },
        {
          name: "图集欣赏",
          value: 124
        },
        {
          name: "PPT下载",
          value: 145
        }
      ],
      defaultOption: [
        ["color", ["#E0B969"]],
        ["legend.orient", "horizontal"],
        ["legend.y", "bottom"],
        ["xAxis.show", false],
        ["yAxis.show", false],
        ["series[0].type", "pie"],
        ["series[0].avoidLabelOverlap", true],
        ["series[0].radius", ["50%", "70%"]]
      ],
      option: [
        [
          "title",
          {
            text: "班级成绩统计"
            // subtext: "数据来自网络"
          }
        ],
        [
          "tooltip",
          {
            trigger: "axis"
          }
        ],
        [
          "legend",
          {
            data: ["2011年"]
          }
        ],
        [
          "toolbox",
          {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          }
        ],
        ["calculable", true],
        [
          "xAxis",
          [
            {
              type: "value",
              boundaryGap: [0, 0.01]
            }
          ]
        ],
        [
          "yAxis",
          [
            {
              type: "category",
              data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"]
            }
          ]
        ],
        [
          "series",
          [
            {
              name: "2011年",
              type: "bar",
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
            // {
            //   name: "2012年",
            //   type: "bar",
            //   data: [19325, 23438, 31000, 121594, 134141, 681807]
            // }
          ]
        ]
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
      while (temp.length < 6) {
        temp.push({});
      }
      return temp;
    }
  },
  methods: {
    init_chart_data() {
      this.dataisready = true;
      // this.option[]
      let qaq = this.find_element('yAxis')
      if (qaq){
        qaq[1][0].data = this.name;
      }
      // console.log(qaq);
    },
    find_element(index){
      return this.option.find(item=>item[0] == index)
    },
    get_class_grade(id) {
      class_grade({ room_id: id })
        .then(res => {
          this.gradeinfo = res.data.stus;
          this.taskinfo = res.data.header;
          this.name = Object.keys(this.gradeinfo),
          this.init_chart_data();
        })
        .catch(() => {});
    },
    get_score(index, filed) {
      if (!filed.task_id) {
        return "";
      }
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

