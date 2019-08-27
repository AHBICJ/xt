<template>
  <div class="content">
    <!-- 发表分享dialog -->
    <div class="share_dialog">
    <el-dialog title="分享" :visible.sync="dialogVisible">
      <div class="create">
        <!-- <p>日期 : 2019/8/25</p> -->
        <el-form ref="form" :model="form" label-width="100px" class="myform">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="分享内容">
            <el-input type="textarea" v-model="form.intro"></el-input>
          </el-form-item>
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
              <el-form-item label="分享图片">
                <el-button size="small" type="primary" class="mybutton ml35">
                  <i class="el-icon-plus"></i>
                </el-button>
              </el-form-item>
            </el-upload>

            <el-form-item label="分享视频">
              <el-button size="small" type="primary" @click="flag1=!flag1" class="mybutton">
                <i class="el-icon-video-play"></i>
              </el-button>
            </el-form-item>
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
    <!-- 正式开始 -->
    <div class="classintroTop">
      <div class="classintroTop_content">
        <div>
          <span class="className">越剧文化03班</span>
          <div class="classIntro">这是一个非常美好的大家庭，欢迎你的加入。</div>
        </div>
      </div>
    </div>
    <div class="classintroMain">
      <!-- 左边通知栏 -->
      <div class="classintroLeft">
        <classright />
      </div>
      <!-- 右边具体任务栏 -->
      <div class="classintroRight">
        <!-- 第一行分享栏 -->
        <div class="share" @click="dialogVisible = true">
          <div class="tx">
            <el-avatar class="el-dropdown-link" ref="popupbutton" :size="40" :src="avatar"></el-avatar>
          </div>
          <div class="share_word">快来和大家分享你的收获吧~</div>
          <div class="share_btn">
            <el-button type="primary" :size="40" icon="el-icon-edit" circle></el-button>
          </div>
        </div>
        <!-- 具体任务栏 -->
        <taskcard v-for="task in tasks" :task="task" :key="task.id" />
      </div>
    </div>
  </div>
</template>

<script>
import taskcard from "@/components/TaskCard.vue";
import { room_tasks, get_classroom_info } from "@/api/toGet";
export default {
  data() {
    return {
      tasks: [],
      room_id: 1,
      classinfo: {},
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
      flag1: false
    };
  },
  computed: {
    avatar() {
      return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      // return '/images/'+this.user.photo;
    }
  },
  methods: {
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
  created() {
    this.get_tasks();
    this.get_room();
  },
  components: {
    classright,
    taskcard
  }
};
import classright from "@/components/classright.vue";
</script>

<style lang="scss">
.content {
  .share_dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
    .el-dialog {
      margin-top: 20vh !important;
    }
  }
}
</style>
<style scoped lang="scss">
.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  .classintroTop {
    border-radius: 8px;
    overflow: hidden;
    height: 240px;
    position: relative;
    width: 100%;
    .classintroTop_content {
      background-image: url(../../assets/images/WorldStudies.jpg);
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      padding: 24px;
      box-sizing: border-box;
      .className {
        color: #fff;
        font-size: 36px;
        font-weight: bold;
        line-height: 44px;
      }
      .classIntro {
        font-family: "Google Sans", Roboto, Arial, sans-serif;
        font-size: 18px;
        line-height: 30px;
        color: #fff;
      }
    }
  }
  .classintroMain {
    margin-top: 24px;
    .classintroLeft {
      float: left;
      width: 210px;
    }
    .classintroRight {
      float: right;
      width: 886px;
      overflow: hidden;
      margin: -16px;
      padding: 16px;
      .share {
        margin-bottom: 24px;
        align-items: center;
        display: flex;
        min-height: 72px;
        padding: 0 8px;
        position: relative;
        z-index: 0;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
          0 2px 6px 2px rgba(60, 64, 67, 0.149);
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        .tx {
          padding: 12px;
        }
        .share_word {
          color: #ccc;
          line-height: 40px;
          transition: color ease-in-out 0.2s;
        }
        .share_btn {
          position: absolute;
          right: 8px;
          padding: 12px;
        }
        &:hover {
          .share_word {
            color: var(--main-color);
          }
        }
      }
    }
  }
  // dialog
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
</style>

