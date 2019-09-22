<template>
  <div class="taskdetail">
    <el-dialog title="影音预览" :visible.sync="showPreview" width="80%" top="10vh">
      <el-carousel :autoplay="false" arrow="hover" height="680px" ref="previewCarousel">
        <el-carousel-item v-for="pho in share.photo" :key="pho.name">
          <img :src="imgAddress(pho.url)" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
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
                <div class="word">成绩/状态</div>
                <div class="num">{{status=='已完成'?homework_info.grade:status}}</div>
              </div>
            </div>
          </div>
          <!-- 资源 -->
          <!-- <div class="content_means">
            <div class="meansBox_out" v-for="item in  taskinfo.photo" :key="item">
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
          </div>-->
          <div class="content_means">
            <!-- dialog -->
            <!-- <el-dialog
              title="分享资源"
              :visible.sync="dialogShare"
              width="960px"
              custom-class="dialogShare"
            >
              <carouselsshare :images="share"></carouselsshare>
            </el-dialog>-->
            <!-- means -->
            <div class="meansBox_out">
              <div
                class="meansBox"
                v-for="(pho,idx) in share.photo"
                :key="pho.name"
                @click="handlePreview(idx)"
              >
                <div href class="means">
                  <div class="means_pic" :style="`backgroundImage:url(${imgAddress(pho.url)})`" />
                  <div class="means_title">
                    <div class="means_titleword">{{pho.name}}</div>
                  </div>
                </div>
              </div>
              <!-- link -->
              <div class="meansBox" v-for="url in share.link" :key="url.link">
                <div href class="means">
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
      <share />
      <div class="homework" v-if="user.role=='student'">
        <div class="homework">
          <el-form ref="form">
            <p>我的作业</p>
            <el-input
              type="textarea"
              v-model="homework"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="status=='qqwqw已完成'"
            ></el-input>
          </el-form>
          <!-- <p>字数限制:200</p> -->
        </div>
      </div>
      <div v-if="user.role=='student'">
        <div class="homework">
          <el-form ref="form">
            <p>老师评语</p>
            <el-input v-model="homework_info.comment" disabled></el-input>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 右侧提交 -->
    <div class="taskdetailRight">
      <div class="top">
        <div class="myrow">
          <p>你的作业</p>
          <span>{{status}}</span>
        </div>
        <el-upload
          class="upload-demo"
          :action="uploadAddr"
          :file-list="homework_photo"
          :on-remove="handleRemove"
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
import { task_detail, myTask } from "@/api/toGet";
import { submit_home } from "@/api/toPost";
import Address from "@/mixin/Address";
import Share from "@/components/Share";
export default {
  data() {
    return {
      homework: "",
      id: 1,
      taskinfo: {},
      picList: [],
      qaq: process.env.VUE_APP_CDN,
      status: "",
      showPreview: false,
      homework_info: {},
      homework_photo: [],
      share: {
        link: [],
        photo: []
      },
      user: this.$store.state.user
    };
  },
  mixins: [Address],
  created() {
    this.id = this.$route.params.taskid || 1;
    this.getMyTask();
  },
  methods: {
    handlePreview(idx) {
      this.showPreview = true;
      this.$refs.previewCarousel.setActiveItem(idx);
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
    //上面是获取，下面是提交
    getimg(res, file) {
      this.picList.push({ name: file.name, url: res.data[0] });
    },
    handleRemove(file) {
      this.picList.splice(this.picList.indexOf(file.name), 1);
    },
    submit_homework() {
      let datas = {
        student_id: this.user.id,
        task_id: this.id,
        content: this.homework,
        image_address: JSON.stringify(this.picList)
      };
      submit_home(datas)
        .then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
        })
        .catch(error => {
          this.$message({
            message: error.msg,
            type: "error"
          });
        });
    },
    getMyTask() {
      let datas = {
        task_id: this.id
      };
      myTask(datas).then(res => {
        this.status = res.status;
        this.homework_info = res.data.hw;
        this.taskinfo = res.data.task;
        this.taskinfo.photo = JSON.parse(this.taskinfo.photo);
        this.share.photo =
          this.taskinfo.photo || JSON.parse(this.taskinfo.photo);
        this.homework = res.data.hw.content || "";
        this.share.link = JSON.parse(this.taskinfo.link) || [];
        this.homework_photo =
          JSON.parse(this.homework_info.image_address) || [];
      });
    }
  },
  components: {
    Share
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
                  background-image: url(../../../../assets/images/linkBG.svg);
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
<style lang="scss">
.taskdetail {
  .el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.el-dropdown-menu__item {
  a {
    color: #606266;
  }
  &:hover {
    a {
      color: #e6c787;
    }
  }
}
</style>
