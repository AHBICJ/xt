<template>
  <div class="task_all">
    <div class="right">
      <share-card v-for="task in tasks" :share="task" :key="task.id" />
    </div>
    <div class="left">
      <div class="ClassroomLeft">
        <div class="messageBox" v-if="user.role=='admin'||user.role=='teacher'">
          <p class="title" v-if="user.role=='admin'||user.role=='teacher'">添加任务</p>
          <p class="title" v-else>消息提示</p>
          <div class="addtaskBox">
            <el-row>
              <el-button type="warning" class="addtask" @click="dialogVisible = true">
                <i class="el-icon-plus"></i>
                添加新任务
              </el-button>
            </el-row>
          </div>
        </div>
        <div class="messageBox">
          <p class="title">专题任务</p>
          <router-link class="mylink" to>台州美食</router-link>
          <router-link class="mylink" to>台州美食</router-link>
        </div>
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
</template>

<script>
import ShareCard from "@/components/ShareCard.vue";
import { create_task } from "@/api/toPost.js";
import { room_tasks } from "@/api/toGet";
export default {
  data() {
    return {
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
      dialogCreate: false,
      tasks: [],
      user: this.$store.state.user,
      room_id: 1
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
    get_tasks(id) {
      room_tasks({ room_id: id ,type:"task" })
        .then(res => {
          this.tasks = res.data;
          for (var i = 0; i < this.tasks.length; i++) {
            this.tasks[i].photo = JSON.parse(this.tasks[i].photo);
            this.tasks[i].link = JSON.parse(this.tasks[i].link);
          }
        })
        .catch(() => {});
    }
  },
  components: {
    ShareCard
  },
  created() {
    let roomid = this.$route.params.id;
    this.get_tasks(roomid);
  },
  beforeRouteUpdate(to, from, next) {
    let roomid = to.params.id;
    this.get_tasks(roomid);
    next();
  }
};
</script>
<style scoped lang="scss">
.task_all {
  position: relative;
  margin: 0 auto;
  width: 1120px;
  display: grid;
  grid-template-areas: "left right";
  grid-template-rows: auto auto;
  grid-template-columns: 250px 850px;
  grid-gap: 20px;
  .classroomSearchandjoin {
    height: 40px;
    border-bottom: 1px solid var(--main-color);
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 16px;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    .classroomJoin {
      float: right;
      color: var(--main-color);
      .el-button {
        padding: 10px 16px;
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
        // .ml35 {
        //   margin-left: 35px;
        // }
      }
    }
  }
  .left {
    grid-area: left;
    .ClassroomLeft {
      width: 100%;
      .messageBox {
        background-color: #fff;
        padding: 20px;
        border: 1px solid #dadce0;
        border-radius: 8px;
        letter-spacing: 0.25px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #3c4043;
        text-align: left;
        margin-bottom: 20px;
        .title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .addtaskBox {
          text-align: center;
          .addtask {
            i {
              transform: scale(1.4);
              padding-right: 10px;
              margin-left: -10px;
            }
          }
        }
        .mylink {
          display: block;
          font-size: 14px;
          line-height: 26px;
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
          color: rgba(0, 0, 0, 0.6);
          &:hover {
            color: rgba(0, 0, 0, 0.9);
          }
        }
        .checkAll {
          display: block;
          text-align: right;
          color: black;
          font-size: 14px;
          line-height: 26px;
          &:hover {
            color: var(--main-color);
          }
        }
      }
    }
  }
  .right {
    grid-area: right;
    // display: flex;
    // flex-direction: column;
    // flex-wrap: wrap;
    // justify-content: flex-start;
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
