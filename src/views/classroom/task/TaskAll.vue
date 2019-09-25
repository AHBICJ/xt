<template>
  <div class="task_all">
    <div class="left">
      <div class="ClassroomLeft">
        <div class="messageBox" v-if="user.role!='student'">
          <div class="addtaskBox">
            <el-button type="primary" class="addtask" @click="showCreateDialog = true">
              <i class="el-icon-plus"></i>
              添加新任务
            </el-button>
          </div>
          <div class="addTopicBox">
            <el-button type="primary" class="addtopic" @click="showCreateTopic = true">
              <i class="el-icon-plus"></i>
              添加新专题
            </el-button>
          </div>
        </div>
        <div class="messageBox">
          <el-collapse-transition>
            <div class="createTopicDialog" v-if="showCreateTopic && user.role!='student'">
              <p class="createTopicTitle">新专题名称：</p>
              <div class="myrow">
                <el-input v-model="newTopicName" placeholder="输入新专题名称" />
                <div class="buttonBox">
                  <el-button
                    type="success"
                    icon="el-icon-check"
                    size="mini"
                    circle
                    @click="addTopic(newTopicName)"
                  />
                </div>
                <div class="buttonBox">
                  <el-button
                    type="danger"
                    icon="el-icon-close"
                    size="mini"
                    circle
                    @click="showCreateTopic=false"
                  />
                </div>
              </div>
            </div>
          </el-collapse-transition>
          <p class="title">专题任务</p>
          <p
            class="mylink"
            :class="{active:currentTopicId==topic.id}"
            v-for="topic in topics"
            :key="topic.name"
            @click="setTopic(topic.id)"
          >{{topic.id==-1?"全部主题":topic.name}}</p>
        </div>
      </div>
    </div>

    <div class="right">
      <el-collapse-transition>
        <!-- 创建任务 -->
        <div class="CreateDialog" v-if="showCreateDialog && user.role!='student'">
          <!-- 输入框 -->
          <div class="formItem">
            <p class="taskTitle nomargintop">任务标题：</p>
            <el-input v-model="form.taskTitle" placeholder="请输入任务标题" />
          </div>
          <div class="formItem">
            <p class="taskTitle">任务说明：</p>
            <el-input type="textarea" :rows="5" placeholder="请输入任务说明" v-model="form.taskDetail" />
          </div>
          <div class="formItem">
            <div class="inlineFormItem marginRight20Item">
              <p class="taskTitle">选择分类：</p>
              <el-select v-model="form.topicId" allow-create placeholder="请选择任务分类">
                <el-option
                  v-for="topic in topics"
                  :key="topic.id"
                  :label="topic.name"
                  :value="topic.id"
                ></el-option>
              </el-select>
            </div>
            <div class="inlineFormItem">
              <p class="taskTitle">起止时间：</p>
              <el-date-picker
                v-model="form.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </div>
          </div>
          <div class="formItem">
            <p class="taskTitle">分享影音：</p>
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
          </div>
          <div class="formItem">
            <p class="taskTitle">分享链接：</p>
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
                <div class="urlItemRight">
                  <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="addUrl" />
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <el-button @click="showCreateDialog = false">取 消</el-button>
            <el-button type="primary" @click.native="submitTask">确 定</el-button>
          </div>
        </div>
      </el-collapse-transition>
      <div
        v-if="taskNum==0 && topics.length==1 && currentTopicId==-1"
        class="nothingHere"
      >使用左侧的按钮创建专题活动吧</div>
      <task-group
        v-for="topic in whatToDisplay"
        @taskDelete="handleDelete"
        :topic="topic"
        :key="`${currentTopicId}${topic.name}${topic.tasks.length}`"
      />
    </div>
  </div>
</template>

<script>
import TaskGroup from "@/components/TaskGroup.vue";
import { create_task, createTopic } from "@/api/toPost";
import { room_tasks,room_tasks_stu } from "@/api/toGet";
export default {
  data() {
    return {
      user: this.$store.state.user,
      currentTopicId: -1,
      topics: [],
      taskNum: 0,
      showCreateDialog: false,
      showCreateTopic: false,
      newTopicName: "",
      form: {
        taskTitle: "",
        taskDetail: "",
        topicId: this.currentTopicId,
        time: [],
        pics: [],
        picsToShow: [],
        urls: []
      },
      upload_api: process.env.VUE_APP_API + "/upload"
    };
  },
  computed: {
    whatToDisplay: function() {
      if (this.currentTopicId == -1) return this.topics;
      var res = [];
      this.topics.forEach(topic => {
        if (topic.id == this.currentTopicId) res.push(topic);
      });
      return res;
    }
  },
  methods: {
    handleDelete(data) {
      this.topics.forEach(topic => {
        if (topic.id == data.topicid) {
          topic.tasks = topic.tasks.filter(x => x.id != data.taskid);
        }
      });
    },
    get_tasks(id) {
      if (this.user.role != "student") {
        room_tasks({ room_id: id, task_type: "task" })
          .then(res => {
            this.taskNum = 0;
            this.topics = [
              {
                id: -1,
                name: "默认主题",
                room_id: id,
                tasks: res.data.default
              },
              ...res.data.topics
            ];

            this.topics.forEach(topic => {
              topic.tasks.forEach(task => {
                this.taskNum++;
                // debugger;
                task.photo = JSON.parse(task.photo);
                task.link = JSON.parse(task.link);
                // console.log('after',task);
              });
            });
          })
          .catch(() => {});
      }
      else{
        room_tasks_stu({ room_id: id, task_type: "task" })
        .then(res => {
          this.taskNum = 0;
          this.topics = [
            {
              id: -1,
              name: "默认主题",
              room_id: id,
              tasks: res.data.default
            },
            ...res.data.topics
          ];
          
          this.topics.forEach(topic => {
            topic.tasks.forEach(task => {
              this.taskNum++;
              // debugger;
              task.photo = JSON.parse(task.photo);
              task.link = JSON.parse(task.link);
              // console.log('after',task);
            });
          });
        })
        .catch(() => {});
      }
    },
    submitTask() {
      let datas = {
        room_id: this.$route.params.id,
        task_type: "task",
        title: this.form.taskTitle,
        intro: this.form.taskDetail,
        picimg: JSON.stringify(this.form.pics),
        link: JSON.stringify(this.form.urls),
        star_time: this.form.time[0],
        end_time: this.form.time[1]
      };
      if (this.form.topicId != -1) datas.topic_id = this.form.topicId;
      create_task(datas)
        .then(res => {
          this.showCreateDialog = false;
          var task = res.data;
          task.photo = JSON.parse(task.photo);
          task.link = JSON.parse(task.link);
          this.pushTask(task);
          this.taskNum++;
          this.form = {
            taskTitle: "",
            taskDetail: "",
            topicId: this.currentTopicId,
            time: [],
            pics: [],
            picsToShow: [],
            urls: []
          };
        })
        .catch(error => {
          this.$message({
            message: error.message + ",请检查表格内容后重试",
            type: "error",
            duration: 2000
          });
        });
    },
    removeUrl(idx) {
      this.form.urls.splice(idx, 1);
    },
    addUrl() {
      this.form.urls.push({ title: "网页链接", url: "https://" });
    },
    handleSuccess(res, file) {
      this.form.pics.push({ name: file.name, url: res.data[0] });
    },
    handleRemove(file) {
      this.form.pics.splice(this.form.pics.indexOf(file.name), 1);
    },
    setTopic(id) {
      this.currentTopicId = id;
      this.form.topicId = id;
    },
    addTopic(topicName) {
      let datas = {
        room_id: this.$route.params.id,
        name: topicName
      };
      createTopic(datas)
        .then(res => {
          this.topics.push(res.data);
          this.showCreateTopic = false;
          this.topicName = "";
          this.currentTopicId = res.data.id;
        })
        .catch(error => {
          this.$message({
            message: error.message + ",请检查表格内容后重试",
            type: "error",
            duration: 2000
          });
        });
    },
    pushTask(task) {
      if (task.topic_id == null) {
        this.topics[0].tasks.unshift(task);
        return;
      }
      this.topics.forEach(topic => {
        if (topic.id == task.topic_id) {
          topic.tasks.unshift(task);
        }
      });
    }
  },
  components: {
    TaskGroup
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
          font-size: 17px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .addtaskBox {
          text-align: center;
          .addtask {
            width: 100%;
            i {
              transform: scale(1.3);
              padding-right: 10px;
              margin-left: -10px;
            }
          }
          margin-bottom: 20px;
        }
        .addTopicBox {
          .addtopic {
            width: 100%;
            i {
              transform: scale(1.3);
              padding-right: 10px;
              margin-left: -10px;
            }
          }
        }
        .mylink {
          display: block;
          font-size: 15px;
          line-height: 26px;
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
          cursor: pointer;
          color: rgba(0, 0, 0, 0.6);
          &:hover {
            color: rgba(0, 0, 0, 0.9);
          }
        }
        .active {
          color: var(--main-color) !important;
          &:hover {
            color: var(--main-color-hover) !important;
          }
        }
        .createTopicDialog {
          margin-bottom: 20px;
          .createTopicTitle {
            margin: 0px 0 5px;
            color: #666;
            font-size: 15px;
          }
          .myrow {
            display: grid;
            grid-template-columns: auto 35px 35px;
            align-items: center;
            justify-items: right;
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
      margin-bottom: 20px;
    }
    .CreateDialog {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 20px;
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
        0 2px 6px 2px rgba(60, 64, 67, 0.149);
      border-radius: 8px;
      overflow: hidden;
      .formItem {
        margin-bottom: 20px;
      }
      .inlineFormItem {
        display: inline-block;
      }
      .marginRight20Item {
        margin-right: 20px;
      }
      .taskTitle {
        margin: 0px 0 5px;
        color: #666;
        font-size: 15px;
      }
      .nomargintop {
        margin-top: 0 !important;
      }
      .urls {
        .urlItem {
          display: grid;
          grid-template-columns: auto 30px;
          grid-column-gap: 10px;
          margin-bottom: 5px;
          .urlItemLeft {
            width: 100%;
            justify-self: start;
            align-self: center;
          }
          .urlItemRight {
            width: 100%;
            justify-self: end;
            align-self: center;
          }
        }
      }
      .footer {
        text-align: right;
      }
    }
  }
}
</style>
