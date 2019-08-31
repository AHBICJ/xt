<template>
  <div class="taskdetail">
    <!-- 左侧任务详情 -->
    <div class="taskdetailLeft">
      <!-- <taskdetail-left :taskinfo = "taskinfo"/> -->
      <div class="TaskdetailLeft">
        <div class="task_title">
          <h1 class="title_word">{{taskinfo.name}}</h1>
          <div class="title_btn">
            <div class="btnbox">
              <span class="btn">
                <svg viewBox="0 0 24 24" focusable="false" width="24" height="24">
                  <path
                    d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div class="myname">
          <img :src="`/images/` + user.photo" alt />
          <p>{{user.name}}</p>
        </div>
        <div class="task_content">
          <div class="content_intro">
            <div class="intro_left">
              <div class="intro_time">
                <span class="taskdate">{{taskinfo.star_time}}</span>
              </div>
              <div class="intro_word">
                <span>{{taskinfo.desc}}</span>
              </div>
            </div>
            <div class="intro_right" v-if="user.role=='student'">
              <div class="turn">
                <div class="num">0</div>
                <div class="word">已上交</div>
              </div>
            </div>
          </div>
          <!-- 资源 -->
          <div class="content_means">
            <div class="meansBox_out" v-for="item in  taskinfo.image_address" :key="item">
              <div class="meansBox">
                <a href class="means">
                  <div class="means_pic">
                    <img :src="qaq +myimg" alt />
                  </div>
                  <div class="means_title">
                    <div class="means_titleword">百度一下，你就知道</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="homework" v-if="user.role=='student'"> -->
        <div class="homework">
          <el-form ref="form">
            <p>我的作业</p>
            <el-input type="textarea" v-model="homework"></el-input>
          </el-form>
          <p>字数限制:200</p>
        </div>
      </div>
    </div>
    <!-- 右侧提交 -->
    <div class="taskdetailRight">
      <div class="top">
        <div class="myrow">
          <p>你的作业</p>
          <span>未完成</span>
        </div>
        <el-upload
          class="upload-demo"
          action="http://192.168.123.182:5000/upload"
          :on-success="getimg"
        >
          <el-button class="mybuttom">添加附件</el-button>
        </el-upload>

        <el-button type="warning" class="mybuttom" @click="submit_homework">完成作业</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import TaskdetailLeft from "@/components/TaskdetailLeft.vue";
import { task_detail } from "@/api/toGet";
import { submit_home } from "@/api/toPost";
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      homework: "",
      id: 1,
      taskinfo: {},
      picList: [],
      qaq: process.env.VUE_APP_CDN,
      user: this.$store.state.user
    };
  },
  mixins: [Address],
  created() {
    this.id = this.$route.params.taskid || 1;
    this.get_task_detail();
  },
  methods: {
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
    //上面是获取，下面是提交
    getimg(response) {
      this.picList.push(response.data[0]);
    },
    submit_homework() {
      let datas = {
        student_id: this.user.id,
        task_id: this.id,
        content: this.homework,
        image_address: JSON.stringify(this.picList)
      };
      submit_home(datas)
        .then(() => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        })
        .catch(() => {});
    }
  },
  components: {
    // TaskdetailLeft
  }
};
</script>

<style scoped lang="scss">
.taskdetail {
  position: relative;
  margin: 0 auto;
  width: 1120px;
  display: grid;
  grid-template-areas: "left right";
  grid-template-rows: auto auto;
  grid-template-columns: 800px 300px;
  grid-gap: 20px;
  margin-top: 30px;
  .taskdetailLeft {
    grid-area: left;
    .TaskdetailLeft {
      width: 100%;
      height: auto;
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      //
      overflow: hidden;
      padding: 0px 16px 16px 16px;
      box-sizing: border-box;
      .task_title {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: 60px;
        padding-right: 24px;
        position: relative;
        .title_word {
          display: flex;
          flex: 1 1 auto;
          flex-direction: row;
          overflow: hidden;
          font-size: 30px;
          color: var(--main-color);
        }
        .title_btn {
          flex: 0 0 auto;
          margin-left: 8px;
          margin-right: -8px;
          width: 40px;
          .btnbox {
            color: #5f6368;
            fill: #5f6368;
            flex-shrink: 0;
            display: block;
            height: auto;
            line-height: 0;
            width: auto;
            border: 0;
            border-radius: 50%;
            cursor: pointer;
            outline: none;
            overflow: hidden;
            position: relative;
            text-align: center;
            z-index: 0;
            transition: background 0.3s;
            .btn {
              display: flex;
              flex-grow: 1;
              justify-content: center;
              align-items: center;
              text-align: center;
              line-height: 0;
              margin: 8px;
              fill: currentColor;
            }
            &:hover {
              background-color: #f9f3e5;
            }
          }
        }
      }
      .myname {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid var(--main-color);
        // margin-top: 10px;
        line-height: 50px;
        p {
          padding-left: 20px;
        }
        img {
          display: flex;
          justify-content: center; /* 水平居中 */
          align-items: center;
          width: 40px;
          height: 40px;
        }
      }

      .task_content {
        padding: 16px 8px 0 8px;
        width: 100%;
        box-sizing: border-box;
        .content_intro {
          display: flex;
          .intro_left {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            overflow: hidden;
            .intro_word {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-start;
              flex: 1 1 auto;
            }
            .intro_time {
              letter-spacing: 0.3px;
              font-family: Roboto, Arial, sans-serif;
              font-size: 14px;
              line-height: 32px;
              color: #80868b;
            }
          }
          .intro_right {
            display: flex;
            flex: 0 0 auto;
            margin-left: 8px;
            // margin-right: 24px;
            .turn {
              border-left: 1px solid #e0e0e0;
              -webkit-box-sizing: content-box;
              box-sizing: content-box;
              -webkit-flex-shrink: 0;
              flex-shrink: 0;
              min-width: 63px;
              padding: 0 16px;
              text-decoration: none;
              text-align: center;
              color: #3c4043;
              .num {
                font-size: 36px;
                font-weight: 400;
                line-height: 44px;
              }
              .word {
                letter-spacing: 0.3px;
                font-family: Roboto, Arial, sans-serif;
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
                color: #5f6368;
              }
              &:hover {
                .num,
                .word {
                  color: var(--main-color);
                }
              }
            }
          }
        }
        .content_means {
          margin-top: 16px;
          .meansBox_out {
            margin-right: -24px;
            .meansBox {
              display: inline-block;
              position: relative;
              margin-bottom: 12px;
              margin-right: 24px;
              width: calc(50% - 24px);
              .means {
                display: flex;
                flex-direction: row;
                position: relative;
                padding-right: 8px;
                background-color: #fff;
                border: 1px solid #dadce0;
                border-radius: 8px;
                overflow: hidden;
                //
                flex-grow: 1;
                .means_pic {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 16px;
                  height: 100px;
                  overflow: hidden;
                  width: 150px;
                  flex-shrink: 0;
                  position: relative;
                  img {
                    max-height: 100%;
                    max-width: 100%;
                    border: none;
                  }
                }
                .means_title {
                  overflow: hidden;
                  .means_titleword {
                    letter-spacing: 0.1px;
                    font-family: "Google Sans", Roboto, Arial, sans-serif;
                    font-size: 16px;
                    line-height: 40px;
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
      } //.message_content
      //
      .homework {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        border-top: 1px solid #e8eaed;
        margin-top: 20px;
        p {
          margin-bottom: 10px;
          margin-top: 10px;
        }
      }
    }
  }
  .taskdetailRight {
    width: 100%;
    grid-area: right;
    // display: flex;
    // flex-direction: column;
    // flex-wrap: wrap;
    // justify-content: flex-start;
    // width: 300px;
    // margin-left: 20px;
    //
    overflow: hidden;
    margin: -16px;
    padding: 16px;
    .top {
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
        0 2px 6px 2px rgba(60, 64, 67, 0.149);
      border-radius: 9px;
      overflow: hidden;
      padding: 12px 24px;
      background-color: #fff;
      .myrow {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        span {
          margin-left: 132px;
          font-size: 14px;
          color: var(--main-color);
        }
        p {
          font-size: 18px;
        }
      }
      .mybuttom {
        width: 250px;
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 0px;
      }
    }
  }
}
</style>
