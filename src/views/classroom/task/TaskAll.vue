<template>
  <div class="task_all">
    <div class="left">
      <div class="ClassroomLeft">
        <div class="messageBox" v-if="user.role!='student'">
          <div class="addtaskBox">
            <el-button type="warning" class="addtask" @click="showCreateDialog = true">
              <i class="el-icon-plus"></i>
              添加新任务
            </el-button>
          </div>
        </div>
        <div class="messageBox">
          <p class="title">专题任务</p>
          <router-link class="mylink" to>台州美食</router-link>
          <router-link class="mylink" to>台州美食</router-link>
        </div>
      </div>
    </div>

    <div class="right">
      <el-collapse-transition>
        <!-- 创建任务 -->
        <div class="CreateDialog" v-if="showCreateDialog">
          <!-- 输入框 -->
          <p class="taskTitle">任务标题:</p>
          <el-input v-model="form.taskTilte" placeholder="请输入任务标题" />
          <p class="taskTitle">任务说明:</p>
          <el-input type="textarea" :rows="5" placeholder="请输入任务说明" v-model="form.taskDetail" />
          <p class="taskTitle">分享影音:</p>
          <el-upload
            :action="upload_api"
            list-type="picture-card"
            :file-list="form.picsToShow"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            class="upload-content"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <p class="taskTitle">分享链接:</p>
          <div class="urls">
            <div class="urlItem" v-for="(url,idx) in form.urls" :key="idx">
              <div class="urlItemLeft">
                <el-input v-model="form.urls[idx].url"></el-input>
              </div>
              <div class="urlItemRight">
                <el-button
                  type="danger"
                  icon="el-icon-minus"
                  size="mini"
                  circle
                  @click="removeUrl(idx)"
                />
              </div>
            </div>
            <div class="urlItem">
              <div class="urlItemLeft">
                <el-input v-model="form.currentUrl" />
              </div>
              <div class="urlItemRight">
                <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="addUrl" />
              </div>
            </div>

            <div class="footer">
              <el-button @click="showCreateDialog = false">取 消</el-button>
              <el-button type="primary" @click.native="submitTask">确 定</el-button>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <div v-if="tasks.length==0" class="nothingHere">这里还没有班级任务</div>
      <share-card v-for="task in tasks" :share="task" :key="task.id" v-else />
    </div>
  </div>
</template>

<script>
import ShareCard from "@/components/ShareCard.vue";
import { create_task } from "@/api/toPost";
import { room_tasks } from "@/api/toGet";
export default {
  data() {
    return {
      user: this.$store.state.user,
      room_id: 1,
      tasks: [],
      taskOnRight: [],
      showCreateDialog: false,
      form: {
        taskTitle: ""
      }
    };
  },
  methods: {
    get_tasks(id) {
      room_tasks({ room_id: id, task_type: "task" })
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
    .nothingHere {
      height: 680px;
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .CreateDialog {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 20px;
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
        0 2px 6px 2px rgba(60, 64, 67, 0.149);
      border-radius: 8px;
      overflow: hidden;
      .taskTitle {
        margin: 0 0 5px;
        color: #666;
        font-size: 15px;
      }
    }
  }
}
</style>
