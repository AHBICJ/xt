<template>
  <div class="share_card">
    <el-dialog title="影音预览" :visible.sync="showPreview" width="80%" top="10vh">
      <el-carousel :autoplay="false" arrow="hover" height="680px" ref="previewCarousel">
        <el-carousel-item v-for="pho in share_photo" :key="pho.name">
          <img :src="imgAddress(pho.url)" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <!-- 标题 -->
    <div class="card_title" :class="{is_task_title:istask}" @click="title_click">
      <!-- <router-link
        :to="{name:'taskdetail',params:{taskid:share.id}}"
        class="task_title_hidden_a"
        v-if="istask"
      />-->
      <div class="title_pic task_pic_box" v-if="istask">
        <svg viewBox="0 0 24 24" focusable="false" width="24" height="24">
          <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z" />
          <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"
          />
        </svg>
      </div>
      <div class="title_pic shart_pic_box" v-else>
        <img v-bind:src="`/images/`+ share.userphoto" alt="头像" />
      </div>
      <div class="title_info task_info_detail" v-if="istask">{{share.name}}</div>
      <div class="title_info share_info_detail" v-else>
        <span class="share_name">{{share.username}}</span>
        <span class="share_time">{{share.star_time}}</span>
      </div>
      <div class="title_btn" @click.stop v-if="isteacher || ownshare">
        <el-dropdown trigger="click">
          <div class="btnbox">
            <span class="btn">
              <svg viewBox="0 0 24 24" focusable="false" width="24" height="24">
                <path
                  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                />
              </svg>
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="istask" @click.native="$emit('ModTask',share)">修改任务</el-dropdown-item>
            <el-dropdown-item @click.native="RemoveShare">删除{{istask?'任务':'分享'}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 资源 -->
    <div class="share_content">
      <div class="content_intro" v-if="istask">
        <div class="intro_left">
          <div class="intro_time">
            <span class="taskdate">{{share.star_time}} - {{share.end_time}} </span>
          </div>
          <div class="intro_word">
            <span>{{share.desc}}</span>
          </div>
        </div>
        <div class="intro_right" v-if="isteacher">
          <div class="turn">
            <div class="num">{{share.commit_num}}</div>
            <div class="word">已上交</div>
          </div>
        </div>
      </div>

      <div class="content_words" v-else>
        <div class="mywords">{{share.desc}}</div>
      </div>
      <!-- 资源 -->
      <div class="content_means">
        <!-- means -->
        <div class="meansBox_out">
          <div
            class="meansBox"
            v-for="(pho,idx) in share_photo"
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
          <div class="meansBox" v-for="url in share_link" :key="url.link">
            <a :href="$imgaddress(url.url)" target="_blank">
            <div class="means">
              <div class="means_pic linkBG" />
              <div class="means_title">
                <div class="means_titleword">{{url.title}}</div>
                <div class="means_subtitle">{{url.url}}</div>
              </div>
            </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Address from "@/mixin/Address";
import { delete_task } from "@/api/toPost.js";

export default {
  data() {
    return {
      user: this.$store.state.user,
      showPreview: false,
      initialIndex: 0
    };
  },
  computed: {
    istask() {
      return this.share.task_type == "task";
    },
    isteacher() {
      return this.user.role != "student";
    },
    ownshare() {
      return this.share.user_id == this.user.id;
      // return this.share.username==this.user.name;
    },
    share_photo() {
      // console.log(this.share.photo);
      if (typeof this.share.photo === "string") {
        if (!this.share.photo.trim()) return [];
        return JSON.parse(this.share.photo);
      }
      return this.share.photo;
    },
    share_link() {
      // console.log(this.share.link);

      if (typeof this.share.link === "string") {
        if (!this.share.link.trim()) return [];
        return JSON.parse(this.share.link);
      }
      return this.share.link;
    }
  },
  methods: {
    handlePreview(idx) {
      this.showPreview = true;
      this.$refs.previewCarousel.setActiveItem(idx);
    },
    title_click() {
      if (this.share.task_type == "task")
        this.$router.push({
          name: "taskdetail",
          params: { taskid: this.share.id }
        });
      else return;
    },
    RemoveShare() {
      this.$confirm(
        `此操作将永久删除该${this.istask ? "任务" : "分享"}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          delete_task(datas)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              history.go(0);
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      let datas = {
        task_id: this.share.id
      };
    }
  },
  mixins: [Address],
  props: ["share"]
};
</script>
<style lang="scss">
.share_card {
  .el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
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
}
</style>
<style lang="scss" scoped>
.share_card {
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  .is_task_title {
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 20px !important;
    cursor: pointer;
    .task_title_hidden_a {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
    }
    &:hover {
      background-color: #feefe3;
    }
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
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      color: #3c4043;
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
    padding: 15px 20px 0;
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
              background-image: url(../assets/images/linkBG.svg);
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
</style>
