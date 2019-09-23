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
              v-model="homework_info.content"
              :autosize="{ minRows: 3}"
              :disabled="homework_info.status=='已完成'"
            />
          </div>
          <div class="formItem">
            <p class="taskTitle">添加图片：</p>
            <el-upload
              ref="image_upload"
              :action="upload_api"
              list-type="picture-card"
              class="upload-image"
              :file-list="preload.imageList"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :disabled="homework_info.status=='已完成'"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </div>
          <div class="formItem">
            <p class="taskTitle">添加附件：</p>
            <el-upload
              ref="attch_upload"
              class="upload-attach"
              drag
              :action="upload_api"
              multiple
              :file-list="preload.attachList"
              :on-success="handleAttachSuccess"
              :on-remove="handleAttachRemove"
              :disabled="homework_info.status=='已完成'"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧提交 -->
    <div class="taskdetailRight">
      <div class="task_detail">
        <div class="myhomework_title">
          <p>我的任务</p>
        </div>
        <div class="finished" v-if="homework_info.status=='已完成'">
          <p class="word">成绩：</p>
          <p class="grade">{{homework_info.grade}}</p>
          <p class="word">教师反馈：</p>
          <p
            class="comment"
          >{{(homework_info.comment==null || homework_infor.comment=="")?"教师还没有评价哦~":homework_info.comment}}</p>
        </div>
        <div class="assigned" v-else>
          <p class="word">状态:</p>
          <p class="status">{{homework_info.status}}</p>
          <el-button
            type="primary"
            class="mybuttom"
            @click="submit_homework"
          >{{homework_info.status=='已提交'?'重新提交':'提交任务'}}</el-button>
          <p class="info">提交任务后记得来看反馈哦~</p>
        </div>
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
        attach: [],
        comment: "",
        content: "",
        grade: "",
        image_address: []
      },
      preload: {
        imageList: [],
        attachList: []
      },
      upload_api: process.env.VUE_APP_API + "/upload",
      showPreview: false,
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
    getMyTask() {
      let datas = { task_id: this.id };
      myTask(datas).then(res => {
        this.homework_info.status = res.status;
        if (res.status != "未提交") {
          this.homework_info = res.data.hw;
          this.homework_info.status = res.status;
          try {            
            this.preload.imageList =JSON.parse(
              this.homework_info.image_address
            );
            this.homework_info.image_address = JSON.parse(
              this.homework_info.image_address
            );
          } catch {
            this.homework_info.image_address = [];
            this.preload.imageList =[];
          }
          try {
            this.preload.attachList = JSON.parse(this.homework_info.attach);
            this.homework_info.attach = JSON.parse(this.homework_info.attach);
          } catch {
            this.homework_info.attach = [];
            this.preload.attachList=[];
          }
        }
        this.preload.imageList.forEach(item => {
          item.url = process.env.VUE_APP_CDN + item.url;
        });
        this.preload.attachList.forEach(item => {
          item.url = process.env.VUE_APP_CDN + item.url;
        });
        this.share = res.data.task;
        this.share.photo = JSON.parse(this.share.photo);
        this.share.link = JSON.parse(this.share.link);
      });
    },
    handleSuccess(res, file) {
      this.homework_info.image_address.push({
        name: file.name,
        url: res.data[0]
      });
    },
    handleRemove(file) {
      this.homework_info.image_address.splice(
        this.homework_info.image_address.indexOf(file.name),
        1
      );
    },
    handleAttachSuccess(res, file) {
      this.homework_info.attach.push({ name: file.name, url: res.data[0] });
    },
    handleAttachRemove(file) {
      this.homework_info.attach.splice(
        this.homework_info.attach.indexOf(file.name),
        1
      );
    },
    submit_homework() {
      let datas = {
        student_id: this.user.id,
        task_id: this.id,
        content: this.homework_info.content,
        image_address: JSON.stringify(this.homework_info.image_address),
        attach: JSON.stringify(this.homework_info.attach)
      };

      submit_home(datas)
        .then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.homework_info.status = "已提交";
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
    overflow: hidden;
    margin: -16px;
    padding: 16px;
    .task_detail {
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
        0 2px 6px 2px rgba(60, 64, 67, 0.149);
      border-radius: 8px;
      overflow: hidden;
      padding: 20px;
      background-color: #fff;
      .myhomework_title {
        letter-spacing: 0.25px;
        font-size: 20px;
        font-weight: bold;
        line-height: 25px;
        color: var(--main-color);
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 2px solid var(--main-color);
      }
      .finished {
        .word {
          color: #666;
          font-size: 15px;
        }
        .grade {
          color: var(--main-color);
          font-size: 40px;
          text-align: center;
          line-height: 60px;
        }
        .comment {
          margin-top: 10px;
          text-indent: 2em;
        }
      }
      .assigned {
        .word {
          color: #666;
          font-size: 15px;
        }
        .status {
          color: var(--main-color);
          font-size: 26px;
          text-align: center;
          line-height: 46px;
        }
        .info {
          color: #888;
          font-size: 14px;
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
    .upload-attach {
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
