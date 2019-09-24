<template>
  <div class="taskdetail">
    <div class="taskdetailLeft">
      <div class="stu_title">学生名单</div>
      <!-- <div class="stu" @click="get_homework_detail()"> -->
      <div class="students">
        <div v-if="studentlist.length==0" class="stu">
          <p>快让学生加入班级吧~</p>
        </div>
        <div
          v-else
          class="stu"
          v-for="(stu,idx) in studentlist"
          :key="`${stu.id}${idx}`"
          @click="changeStu(stu.student_id,idx)"
          :class="{ active: stu.student_id == currentStuId }"
        >
          <img :src="`/images/`+ stu.student_photo" alt />
          <p class="student_name">{{stu.student_name}}</p>
          <p class="status">{{stu.status}}</p>
        </div>
      </div>
    </div>
    <div class="taskdetailRight">
      <!-- <remark :taskinfo="taskinfo" :homeworkinfo="homeworkinfo" /> -->
      <div class="remark empty" v-if="studentlist.length==0">
        <p>快让学生加入班级吧~<br>之后你可以在这里看到学生的任务<br>并对其进行评价和反馈</p>
      </div>
      <div class="remark" v-else>
        <div class="mark_title">学生作业</div>
        <div class="mark_body mark_body_empty" v-if="studentlist[currentStuIdx].status=='未提交'">
          <p>该同学尚未提交作业</p>
          <p></p>
        </div>
        <div class="mark_body" v-else>
          <div class="content_words">
            <div class="mywords">{{currentHomework.content}}</div>
          </div>
          <!-- 资源 -->
          <div class="content_means">
            <!-- means -->
            <div class="meansBox_out">
              <div
                class="meansBox"
                v-for="(pho,idx) in currentHomework.image_address"
                :key="pho.name"
                @click="handlePreview(idx)"
              >
                <div class="means">
                  <div class="means_pic" :style="`backgroundImage:url(${imgAddress(pho.url)})`" />
                  <div class="means_title">
                    <div class="means_titleword">{{pho.name}}</div>
                  </div>
                </div>
              </div>
              <!-- link -->
              <div class="meansBox" v-for="url in currentHomework.attach" :key="url.link">
                <div class="means">
                  <div class="means_pic linkBG" />
                  <div class="means_title">
                    <div class="means_titleword">{{url.title}}</div>
                    <div class="means_subtitle">{{url.url}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="feedback" v-if="studentlist.length!=0">
        <div class="feedback_title">教师评价</div>
        <div class="feedback_body" v-if="studentlist[currentStuIdx].status!='未提交'">
          <p class="fb_title" style="display:inline-block;">评分：</p>
          <p class="fb_score" style="display:inline-block;">
            <el-input v-model="studentlist[currentStuIdx].hw.grade" />
            <span style=" line-height: 40px; font-size: 18px; ">/100</span>
          </p>
          <p class="fb_title" style="margin-top:5px;">反馈：</p>
          <el-input
            type="textarea"
            v-model="studentlist[currentStuIdx].hw.comment"
            placeholder="输入一些反馈吧~"
            :autosize="{ minRows: 5}"
          />
        </div>
        <div class="feedback_bodyandfooter" v-else>
          <p>学生还没有提交作业，之后再来评价吧~</p>
        </div>
        <div class="feedback_footer" v-if="studentlist[currentStuIdx].status!='未提交'">
          <el-button
            type="primary"
            class="mybutton"
            @click="set_score()"
          >{{studentlist[currentStuIdx].status=='已完成'?'重新评价':'提交评价'}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import remark from "@/components/remark.vue";
import { mark_score } from "@/api/toPost";
import Address from "@/mixin/Address";
import { task_detail } from "@/api/toGet";
import { get_homework, get_homeworklist } from "@/api/toGet";
export default {
  data() {
    return {
      id: 1,
      taskinfo: {},
      grade: "",
      remark: "",
      studentlist: [],
      // task_id: 1,
      homeworkinfo: [],
      currentStuId: "",
      currentStuIdx: 0
    };
  },
  mixins: [Address],
  created() {
    this.id = this.$route.params.taskid || 1;
    // this.get_task_detail();
    // this.task_id = this.$route.params.id || 1;
    this.get_studentlist();
    // this.get_homework_detail(this.a[0].student_id)
  },
  computed: {
    currentHomework() {
      return this.studentlist[this.currentStuIdx].hw;
    }
  },
  methods: {
    set_score() {
      let datas = {
        homework_id: this.studentlist[this.currentStuIdx].hw.id,
        grade: this.studentlist[this.currentStuIdx].hw.grade,
        comment: this.studentlist[this.currentStuIdx].hw.comment,
      };
      mark_score(datas)
        .then(() => {
          this.$message("评价成功");
          this.studentlist[this.currentStuIdx].status='已完成';
        })
        .catch(() => {});
    },
    changeStu(student_id, idx) {
      this.currentStuId = student_id;
      this.currentStuIdx = idx;
    },
    get_task_detail() {
      let datas = { task_id: this.id };
      task_detail(datas)
        .then(res => {
          this.taskinfo = res.data;
          this.taskinfo.photo = JSON.parse(this.taskinfo.photo);
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    },
    get_homework_detail(student) {
      let datas = {
        task_id: this.id,
        student_id: student.student_id
      };
      this.currentStuId = student.student_id;
      get_homework(datas)
        .then(res => {
          this.homeworkinfo = res.data;
          this.homeworkinfo.image_address = JSON.parse(
            this.homeworkinfo.image_address
          );
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    },
    get_studentlist() {
      let datas = {
        task_id: this.id
      };
      get_homeworklist(datas)
        .then(res => {
          this.studentlist = [...res.data];
          for (var i = 0; i < this.studentlist.length; i++) {
            if (this.studentlist[i].hw == null) continue;
            // console.log(this.studentlist[i].hw);
            try {
              this.studentlist[i].hw.attach = JSON.parse(
                this.studentlist[i].hw.attach
              );
            } catch {
              this.studentlist[i].hw.attach = [];
            }
            try {
              this.studentlist[i].hw.image_address = JSON.parse(
                this.studentlist[i].hw.image_address
              );
            } catch {
              this.studentlist[i].hw.image_address = [];
            }
            // this.studentlist[i].hw.status = this.studentlist[i].status;
          }
          if (res.data.length != 0) {
            this.currentStuId = res.data[0].student_id;
            this.currentStuIdx = 0;
          }
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    }
  }
  // components: {
  //   remark
  // }
};
</script>

<style lang="scss">
.taskdetail {
  .taskdetailRight {
    .feedback_body {
      .el-input {
        width: 100px;
        margin-right: 3px;
      }
      textarea {
        resize: none;
        overflow-y: hidden;
      }
    }
  }
}
</style>
<style  scoped lang="scss">
.taskdetail {
  width: 1120px;
  height: 760px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-areas: "left right";
  grid-template-columns: 300px 800px;
  grid-template-rows: 760px;
  grid-gap: 20px;
  box-sizing: border-box;
  .taskdetailLeft {
    position: relative;
    grid-area: left;
    background-color: #fff;
    border: 1px solid #dadce0;
    border-radius: 8px;
    box-sizing: border-box;
    .stu_title {
      width: 100%;
      // position: absolute;
      // top: 0;
      // left: 0;
      background-color: #fff;
      box-sizing: border-box;
      font-size: 20px;
      color: var(--main-color);
      font-weight: bold;
      font-family: "Courier New", Courier, monospace;
      padding: 20px;
      border-bottom: 1px solid var(--main-color);
      // border-left: 6px solid var(--main-color);
    }

    .students {
      height: 688px;
      overflow: auto;
      .active {
        background-color: #ffedc5d4 !important;
      }
      .stu {
        width: 100%;
        // height: 70px;
        border-bottom: 1px solid #ccc;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        cursor: pointer;
        p {
          padding-left: 20px;
          font-size: 14px;
          line-height: 35px;
        }
        .status {
          margin-left: auto;
        }
        img {
          width: 35px;
          height: 35px;
        }
        &:hover {
          background-color: #f9e8c3;
        }
      }
    }
  }
  .taskdetailRight {
    grid-area: right;
    height: 760px;
    overflow: hidden;
    width: 100%;
    .feedback {
      width: 100%;
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      box-sizing: border-box;
      .feedback_body {
        height: 223px;
        box-sizing: border-box;
        padding: 10px 20px;
        overflow: auto;
        .fb_title {
          color: #666;
          line-height: 30px;
          font-size: 15px;
        }
      }
      .feedback_footer {
        text-align: right;
        margin-right: 20px;
        height: 45px;
      }
      .feedback_bodyandfooter {
        height: 268px;
        p {
          color: #999;
          font-size: 16px;
          text-align: center;
          padding: 50px;
        }
      }
    }
    .remark {
      width: 100%;
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 760px;
      margin-bottom: none!important;
      p {
        color: #666;
        text-align: center;
        font-size: 15px;
      }
    }
    .mark_title,
    .feedback_title {
      color: var(--main-color);
      line-height: 49px;
      font-size: 20px;
      border-bottom: 1px solid;
      box-sizing: border-box;
      padding-left: 20px;
      font-weight: 600;
      letter-spacing: 0.15em;
    }
    .mark_body_empty {
      p {
        color: #999;
        font-size: 16px;
        text-align: center;
        padding: 20px;
      }
    }
    .mark_body {
      padding: 20px 20px 0;
      box-sizing: border-box;
      height: 368px;
      overflow: auto;
      .content_words {
        flex-shrink: 12345;
        overflow: hidden;
        margin-bottom: 15px;
        .mywords {
          display: block;
          overflow: hidden;
          overflow-wrap: break-word;
        }
      }
      .content_means {
        padding-bottom: 3px;
        .meansBox_out {
          margin-right: -12px;
          .meansBox {
            display: inline-block;
            position: relative;
            margin-bottom: 12px;
            margin-right: 12px;
            width: calc(50% - 12px);
            .means {
              display: flex;
              position: relative;
              padding-right: 8px;
              background-color: #fff;
              border: 1px solid #dadce0;
              border-radius: 8px;
              overflow: hidden;
              flex-grow: 1;
              .linkBG {
                background-image: url(../../../../assets/images/docBG.svg);
              }
              .means_pic {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 16px;
                height: 70px;
                overflow: hidden;
                width: 105px;
                flex-shrink: 0;
                position: relative;
                background-position: center center;
                background-size: cover;
              }
              .means_title {
                overflow: hidden;
                .means_titleword {
                  letter-spacing: 0.1px;
                  font-size: 16px;
                  line-height: 40px;
                  color: #3c4043;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
                .means_subtitle {
                  font-size: 16px;
                  color: #3c4043;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }
              &:hover {
                .means_titleword {
                  color: var(--main-color);
                }
              }
            }
          }
        }
      } //content_means
    }
  }
}
</style>
