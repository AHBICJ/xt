<template>
  <div class="taskdetail">
    <div class="taskdetailLeft">
      <el-dialog title="影音预览" :visible.sync="showPreview" width="80%" top="10vh">
        <el-carousel :autoplay="false" arrow="hover" height="680px" ref="previewCarousel">
          <el-carousel-item v-for="pho in share.photo" :key="pho.name">
            <img :src="imgAddress(pho.url)" />
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <!-- 左侧任务详情 -->
      <div class="task_card">
        <!-- 标题 -->
        <div class="card_title is_task_title">
          <div class="title_pic task_pic_box">
            <svg viewBox="0 0 24 24" focusable="false" width="24" height="24">
              <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z" />
              <path
                d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"
              />
            </svg>
          </div>
          <div class="title_info task_info_detail">{{share.name}}</div>
        </div>
        <!-- 资源 -->
        <div class="share_content">
          <div class="content_intro">
            <div class="intro_left">
              <div class="intro_time">
                <span class="taskdate">{{share.star_time}} - {{share.end_time}}</span>
              </div>
              <div class="intro_word">
                <span>{{share.desc}}</span>
              </div>
            </div>
          </div>
          <!-- 资源 -->
          <div class="content_means">
            <!-- means -->
            <div class="meansBox_out">
              <div
                class="meansBox"
                v-for="(pho,idx) in share.photo"
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
              <div class="meansBox" v-for="url in share.link" :key="url.link">
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
      <div class="homework">
        <div class="homework_title">
          <div class="home_title_pic">
            <img :src="`/images/` + user.photo" alt />
          </div>
          <div class="home_title_info">{{user.name}}</div>
        </div>
        <div class="homework_content">
          <div class="formItem">
            <p class="taskTitle">添加文字：</p>
            <el-input
              type="textarea"
              v-model="homework"
              :autosize="{ minRows: 3}"
              :disabled="status=='已完成'"
            />
          </div>
          <div class="formItem">
            <p class="taskTitle">添加图片：</p>
            <el-upload :action="upload_api" list-type="picture-card" class="upload-image">
              <i class="el-icon-plus" />
            </el-upload>
          </div>
          <div class="formItem">
            <p class="taskTitle">添加附件：</p>
            <el-upload class="upload-attch" drag action="upload_api" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="feedback">
        <p>老师评语</p>
        <el-input v-model="homework_info.comment" disabled />
      </div>
    </div>
    <!-- 右侧提交 -->
    <div class="taskdetailRight">
      <div class="top">
        <div class="myrow">
          <p>你的作业</p>
        </div>
        <div class="turn">
          <div class="word">成绩/状态</div>
          <div class="num">{{status=='已完成'?homework_info.grade:status}}</div>
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

        <el-button type="primary" class="mybuttom" @click="submit_homework">完成作业</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { /*task_detail,*/ myTask } from "@/api/toGet";
import { submit_home } from "@/api/toPost";
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      id: 1,
      share: {},
      homework_info: {
        status: "",
        id: "",
        attch: [],
        comment: "",
        content: "",
        grade: "",
        image_address: []
      },
      upload_api: process.env.VUE_APP_API + "/upload",
      showPreview: false,
      user: this.$store.state.user
    };
  },
  mixins: [Address],
  created() {
    this.id = this.$route.params.taskid || 1;
    // this.get_task_detail();
    this.getMyTask();
  },
  methods: {
    handlePreview(idx) {
      this.showPreview = true;
      this.$refs.previewCarousel.setActiveItem(idx);
    },
    // get_task_detail() {
    //   let datas = { task_id: this.id };
    //   task_detail(datas)
    //     .then(res => {
    //       this.share = res.data;
    //       this.share.photo = JSON.parse(this.share.photo);
    //       this.share.link = JSON.parse(this.share.link);
    //     })
    //     .catch(() => {
    //       this.$message({
    //         message: "请求错误",
    //         type: "error"
    //       });
    //     });
    // },
    getMyTask() {
      let datas = { task_id: this.id };
      myTask(datas).then(res => {
        this.homework_info.status = res.data.status;
        if (res.status != "未提交") {
          this.homework_info = res.data.hw;
        }
        this.share = res.data.task;
        this.share.photo = JSON.parse(this.share.photo);
        this.share.link = JSON.parse(this.share.link);
        this.homework_info.image_address =
          JSON.parse(this.homework_info.image_address) || [];
        this.homework_info.attch = JSON.parse(this.homework_info.attch) || [];
      });
    },
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
    }
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
  grid-template-columns: 800px 300px;
  grid-gap: 20px;
  .taskdetailLeft {
    grid-area: left;
    .task_card {
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
      .is_task_title {
        border-bottom: 2px solid var(--main-color);
        padding: 10px 20px !important;
      }
      .card_title {
        align-items: center;
        display: flex;
        height: 50px;
        padding: 10px 20px 0px;
        position: relative;
        .title_pic {
          display: flex;
          flex: 0 0 auto;
          height: 36px;
          width: 36px;
          justify-content: center; //水平居中
          align-items: center; //垂直居中
          text-align: center;
          font-size: 16px;
          line-height: 32px;
          margin-right: 16px;
          background-color: #e8710a;
          color: #fff;
          fill: #fff;
          fill: currentColor;
          border-radius: 50%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .title_info {
          display: flex;
          flex: 1 1 auto;
          overflow: hidden;
        }
        .share_info_detail {
          padding-top: 2px;
          flex-direction: column;
          .share_name {
            font-size: 16px;
            line-height: 20px;
            color: #3c4043;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: block;
          }
          .share_time {
            font-size: 14px;
            font-weight: 400;
            line-height: 1rem;
            color: #5f6368;
          }
        }
        .task_info_detail {
          letter-spacing: 0.25px;
          font-size: 20px;
          font-weight: bold;
          line-height: 25px;
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
              background-color: rgba(32, 33, 36, 0.039);
            }
          }
        }
      }

      .share_content {
        padding: 10px 20px 0;
        width: 100%;
        // height: 320px;
        // overflow: auto;
        box-sizing: border-box;
        .content_intro {
          padding-bottom: 15px;
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
      } //.share_content
    } //share_card

    .homework {
      border: 1px solid #dadce0;
      border-radius: 8px;
      overflow: hidden;
      border-top: 1px solid #e8eaed;
      margin-bottom: 20px;
      background-color: #fff;
      .homework_title {
        align-items: center;
        display: flex;
        height: 50px;
        border-bottom: 2px solid var(--main-color);
        padding: 10px 20px !important;
        position: relative;
        .home_title_pic {
          display: flex;
          flex: 0 0 auto;
          height: 36px;
          width: 36px;
          justify-content: center; //水平居中
          align-items: center; //垂直居中
          text-align: center;
          font-size: 16px;
          line-height: 32px;
          margin-right: 16px;
          background-color: #e8710a;
          color: #fff;
          fill: #fff;
          fill: currentColor;
          border-radius: 50%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .home_title_info {
          display: flex;
          flex: 1 1 auto;
          overflow: hidden;
          letter-spacing: 0.25px;
          font-size: 20px;
          font-weight: bold;
          line-height: 25px;
          color: var(--main-color);
        }
      }
      .homework_content {
        padding: 20px 20px 0;
        .formItem {
          .taskTitle {
            margin: 0px 0 5px;
            color: #666;
            font-size: 15px;
          }
          margin-bottom: 20px;
        }
      }
    }

    .feedback {
      padding: 20px;
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 8px;
      overflow: hidden;
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
  .homework_content {
    textarea {
      resize: none;
      padding: 10px;
      font-size: 16px;
      overflow-y: hidden;
      transition: border ease-in-out 0.3s, padding ease-in-out 0.3s;
    }
    .upload-image {
      margin-right: -8px;
      ul > li {
        width: 142px;
        height: 142px;
      }
      .el-upload--picture-card {
        width: 142px;
        height: 142px;
      }
    }
    .upload-attch {
      width: 100%;
      .el-upload {
        width: 100%;
        height: 100px;
      }
      .el-upload-dragger {
        width: 100%;
        height: 100px;
      }
      .el-upload-dragger .el-icon-upload {
        font-size: 60px;
        color: #c0c4cc;
        margin: 10px 0 5px;
        line-height: 50px;
      }
    }
  }
}
</style>
