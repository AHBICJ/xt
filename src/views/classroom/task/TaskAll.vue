<template>
  <div class="article_big">
    <div class="content">
      <div class="left">
        <task v-for="task in tasks" :task="task" :key="task.id" :teachername="classinfo.series" />
        <el-row>
          <el-button
            type="warning"
            class="add"
            @click="dialogVisible = true"
            v-show="myrole=='admin'?true:false"
          >
            <i class="el-icon-plus"></i>
            添加新任务
          </el-button>
        </el-row>
      </div>
      <div class="right">
        <div class="message">
          <p>消息</p>
          <p class="text">老师发布了一个的新的作业</p>
          <a href @click.stop>
            <p class="r">查看全部</p>
          </a>
        </div>
        <div class="topic">
          <p>话题</p>
          <p class="text">台州美食</p>
        </div>
      </div>
      <el-dialog title="任务" :visible.sync="dialogVisible">
        <div class="create">
          <p>
            日期 : 2019/8/25
            <span>对象： 所有学生</span>
          </p>
          <el-form ref="form" :model="form" label-width="100px" class="myform">
            <el-form-item label="任务标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="任务介绍">
              <el-input type="textarea" v-model="form.intro"></el-input>
            </el-form-item>

            <div class="myrow">
              <el-form-item label="字数限制">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
              <el-form-item label="截至时间">
                <el-date-picker
                  type="date"
                  placeholder="截至时间"
                  v-model="form.date"
                  style="width: 100%;"
                  value-format="yyyy-M-d h:m:s"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="myrow">
              <el-upload
                class="upload-demo"
                action="http://192.168.123.182:5000/upload"
                multiple
                :limit="3"
                :file-list="fileList"
                :on-success="getimg"
                list-type="picture"
              >
                <el-button size="small" type="primary" class="mybutton ml35">
                  <i class="el-icon-plus"></i>
                </el-button>
              </el-upload>
              <el-button size="small" type="primary" @click="flag1=!flag1" class="mybutton">
                <i class="el-icon-video-play"></i>
              </el-button>
              <el-collapse-transition>
                <div v-show="flag1">
                  <el-input v-model="form.video"></el-input>
                </div>
              </el-collapse-transition>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="submit_task">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import task from "@/components/task.vue";
import { create_task } from "@/api/toPost.js";
import { room_tasks } from "@/api/toGet";
import { get_classroom_info } from "@/api/toGet";
export default {
  data() {
    return {
      navbarOptions: {
        isHome: false,
        isClassroom: true,
        collapsed: true,
        cityId: 12,
        shortTilte: true
      },
      dialogVisible: false,
      form: {
        title: "",
        date: "",
        intro: "",
        number: "",
        video: "",
        picimg: ""
      },
      picList: [],
      fileList: [],
      flag1: false,
      tasks: [],
      room_id: 1,
      classinfo: {},
      myrole: JSON.parse(this.$store.state.user).role
    };
  },
  methods: {
    getimg(response) {
      this.form.picimg = response.data;
      this.picList.push(response.data[0]);
    },
    submit_task() {
      let datas = {
        room_id: 1,
        title: this.form.title,
        date: this.form.date,
        intro: this.form.intro,
        number: this.form.number,
        video: this.form.video,
        picimg: JSON.stringify(this.picList)
      };
      create_task(datas)
        .then(res => {
          res.data.photo = JSON.parse(res.data.photo);
          this.tasks.push(res.data);
        })
        .catch(() => {});
      this.dialogVisible = false;
    },
    //上面是提交，下面是获取
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
  // computed:{
  //   myrole(){
  //     return this.$store.state.user
  //   }
  // },
  components: {
    task,
  },
  created() {
    this.get_tasks();
    this.get_room();
  }
};
</script>
<style scoped lang="scss">
.article_big {
  width: 100%;
  min-height: 100%;
  // background: url(../assets/images/BG5.png);
}
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
  width: 993px;
  margin-top: 50px;
  .left {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    .add {
      margin-left: 630px;
      i {
        transform: scale(1.4);
        padding-right: 10px;
        margin-left: -10px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 210px;
    .message {
      letter-spacing: 0.01785714em;
      font-family: "Google Sans", Roboto, Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
      color: #3c4043;
      text-transform: none;
      border: 0.0625rem solid #dadce0;
      border-radius: 0.5rem;
      text-align: left;
      padding: 25px;
      .text {
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.25rem;
        padding: 15px 0;
        color: rgba(0, 0, 0, 0.549);
      }
      .r {
        float: right;
        color: black;
        &:hover {
          color: var(--main-color);
        }
      }
    }
    .topic {
      letter-spacing: 0.01785714em;
      font-family: "Google Sans", Roboto, Arial, sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
      color: #3c4043;
      text-transform: none;
      border: 0.0625rem solid #dadce0;
      border-radius: 0.5rem;
      text-align: left;
      padding: 25px;
      margin-top: 20px;
      .text {
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.25rem;
        padding: 10px 0;
        color: rgba(0, 0, 0, 0.549);
        cursor: pointer;
      }
      .text:hover {
        color: var(--main-color);
      }
    }
  }

  .create {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    p {
      margin-left: 32px;
      span {
        color: var(--main-color);
        margin-left: 10px;
      }
    }

    .myform {
      margin-top: 25px;
    }
    .myrow {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      .mybutton {
        width: 45px;
        height: 30px;
        margin-right: 20px;
      }
      .ml35 {
        margin-left: 35px;
      }
    }
  }
}
</style>
