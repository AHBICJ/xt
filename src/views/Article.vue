<template>
  <div class="article_big">
    <nav-bar :options="navbarOptions" />
    <!-- dialog -->
    <el-dialog title="文章视频" :visible.sync="dialogVideo" custom-class="dialogvideo" @close="$refs.videoPlayer.player.pause()">
      <div class="look">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          
        ></video-player>
        <!-- <div class="article_attention" v-else>
          <p>666该篇文章尚未添加视频，快去看看别的内容吧~</p>
        </div> -->

        <!-- <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player> -->
       
      </div>
    </el-dialog>

    <el-dialog title="文章图集" :visible.sync="dialogPic" width="960px" custom-class="dialogpic">
      <carouselspic :images="article.images"></carouselspic>
    </el-dialog>

    <el-dialog title="文章课件" :visible.sync="dialogPpt" width="1280px" custom-class="dialogppt">
      <carouselsppt :pptimages="ppt?ppt.short_photos:''"></carouselsppt>
    </el-dialog>

    <!-- 整体 -->
    <div class="container main-container">
      <div class="view column-view">
        <!-- 内容左侧 -->
        <div class="main-area article-area shadow">
          <!-- article -->
          <article class="article">
            <!-- 文章头部 -->
            <h1 class="article-title">{{article.title}}</h1>
            <div class="t_line">
              <div class="bd"></div>
            </div>
            <!-- <div class="author-info-block">作者：{{author}} {{city}}</div> -->
            <!-- 文章正文 -->
            <div class="article-content" v-html="article.content"></div>
          </article>
          <!-- 文章课件 -->
          <!-- 课件标签 -->
          <div class="tag-list-box">
            <div class="tag-list-title">本文课件</div>
            <div class="tag-list">
              <a href class="item">
                <div class="lazy thumb tag-icon loaded"></div>
                <div class="tag-title">{{article.city}} | {{ppt?ppt.tag:''}}</div>
              </a>
            </div>
          </div>
          <!-- 课件内容 -->
          <div>
            <div class="footer-author-block">
              <div class="author">
                <div class="author-info-block">
                  <!-- 课件图片 -->
                  <a href class="avatar-link" @click.prevent="dialogPpt= true">
                    <div
                      class="lazy avatar avatar loaded"
                      :style="{backgroundImage: 'url(' + this.$imgaddress(ppt?ppt.photo:'') + ')' }"
                    ></div>
                  </a>
                  <!-- 课件标题 -->
                  <div class="author-info-box">
                    <div class="profile-box">
                      <a
                        href
                        class="username username ellipsis"
                        @click.prevent="dialogPpt= true"
                      >{{article.ppt?article.ppt.title:""}}</a>
                      <!-- <span class="position ellipsis">绍兴 | 传统技艺</span> -->
                    </div>
                    <div class="meta-box">
                      <a href class="posts">
                        <span
                          class="count post-count"
                          @click.prevent="dialogPpt= true"
                        >{{article.city}} | {{ppt?ppt.tag:''}}</span>
                      </a>
                    </div>
                  </div>
                  <el-button
                    type="button"
                    class="follow-button2 follow"
                    @click.prevent="dialogPpt= true"
                  >预览</el-button>
                  <el-button type="button" class="follow-button follow" @click.prevent="downppt">下载</el-button>
                  <!-- <button ></button> -->
                  <!-- <button class="follow-button follow">下载</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <comment :comment_info="comment_info" />
        <!-- 右侧内容 -->
        <div class="sidebar sidebar">
          <!-- 相关文章 -->
          <sidebar1 />
          <!-- 热门推荐 -->
          <sidebar2 />
        </div>
        <!-- 左侧浮空栏 -->
        <div class="article-suspended-panel article-suspended-panel">
          <div class="panel-btn show1" @click="enabledialogvideo">
            <div class="show">
              <el-button type="text">视</el-button>
            </div>
          </div>

          <div class="panel-btn show2" @click="dialogPic= true">
            <div class="show">
              <el-button type="text">赏</el-button>
            </div>
          </div>
          <div class="panel-btn show3" @click="dialogPpt= true">
            <div class="show">
              <el-button type="text">课</el-button>
            </div>
          </div>

          <div class="share-title">喜欢</div>
          <div class="like-btn panel-btn like-adjust"></div>
          <div class="collect-btn panel-btn collect-adjust"></div>
          <div class="comment-btn panel-btn comment-adjust"></div>
          <!-- <div class="weibo-btn share-btn panel-btn"></div>
          <div class="qq-btn share-btn panel-btn"></div>
          <div class="wechat-btn share-btn panel-btn"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "@/components/comment.vue";
import { getArticle } from "@/api/toGet";
import "video.js/dist/video-js.css";
import "@/styles/custom-theme.css";
import { videoPlayer } from "vue-video-player";
import carouselsppt from "@/components/carousels-ppt.vue";
import carouselspic from "@/components/carousels-pic.vue";
import sidebar1 from "@/components/sidebar1.vue";
import sidebar2 from "@/components/sidebar2.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  data() {
    return {
      navbarOptions: {
        isHome: false,
        isClassroom: false,
        collapsed: true,
        cityId: -1,
        shortTilte: true
      },
      ppt: {},
      info_pic: {
        items: []
      },
      info_ppt: {
        items: []
      },
      // {
      //   articleid: 2,
      //   imgsrc:
      //     "http://www.ihchina.cn/Uploads/Picture/2019/08/08/s5d4b7636a4e84.jpg"
      // }
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              "http://vd3.bdstatic.com/mda-jighn6yafsneejx0/sc/mda-jighn6yafsneejx0.mp4", // 路径
            type: "video/mp4" // 类型
          }
        ],
        poster:
          "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
   
      dialogPic: false,
      dialogPpt: false,
      dialogVideo: false,
      articleId: 1,
      article: {},
      // title: city: author: content: tag: pptTitle: pptImg: pptTag:
      comment_info: {
        items: []
      },
      // { userid: username: userplace: time: comment: userimg: like: }
      slide_info1: {
        items: []
      },
      slide_info2: {
        items: []
      }
      // { title: "鲁迅故居", like: 20, comment: 32 },
    };
  },
  // computed:{
  //   pptimages(){
  //     if (this.article.ppt){
  //       return JSON.parse(this.article.ppt.short_photos)
  //     }

  //     return []
  //   }
  // },
  created() {
    this.initArticle(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.initArticle(to.params.id);
    next();
  },
  methods: {
    enabledialogvideo() {
      this.dialogVideo = true;
    },
    initArticle(id) {
      this.articleId = id || 1;
      getArticle({ aricle_id: this.articleId }).then(res => {
        this.navbarOptions.cityId = res.data.city_id;
        this.article = res.data;
        this.playerOptions.sources[0].src = this.article.viedo;
        this.ppt = res.data.ppt;
      });
    },
    downppt() {
      window.open(this.$imgaddress(this.article.ppt.file), "_blank");
    }
  },
  components: {
    comment,
    videoPlayer,
    carouselsppt,
    carouselspic,
    sidebar1,
    sidebar2,
    NavBar
  },
  computed: {
    haveVideo() {
      return this.article.video != null;
    }
  }
  
};
</script>

<style lang="scss">
.article_big {
  // v-html 样式相冲
  .article-content p {
    text-indent: 2em;
    text-align: justify;
    line-height: inherit;
    margin-bottom: 15px;
  }
  //dialog
  .dialogvideo {
    background-image: url(../assets/images/zmdbg.jpg);
    background-size: 100% 100%;
  }
  .dialogppt {
    background: url(../assets/images/zmdbg.jpg);
    background-size: 100% 100%;
  }
  .dialogpic {
    background: url(../assets/images/zmdbg.jpg);
    background-size: 100% 100%;
  }
  .el-dialog__title {
    line-height: 24px;
    font-size: 20px;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    color: #ddd;
    border-left: 6px solid #ddd;
    padding-left: 10px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ddd;
  }
}
</style>
<style lang="scss" scoped>
//全局
div {
  display: block;
}
h1,
p {
  margin: 0;
}
p {
  text-indent: 2em;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #909090;
}
ul {
  padding: 0;
  margin: 0;
}
img {
  width: auto;
  height: auto;
  border-style: none;
}
.lazy {
  position: relative;
}
.thumb {
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.item {
  display: block;
  padding: 0.8rem 1.3rem;
}
.article_big {
  width: 100%;
  min-height: 100%;
  background: url(../assets/images/BG5.png);
  .article_attention p {
    font-family: "Courier New", Courier, monospace;
    font-size: 16px;
    text-align: center;
    color: #ddd;
    margin-bottom: 20px;
  }
  //大整体
  .container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1100px;
    .column-view {
      padding: 0 0 8rem;
    }
    //整体
    .view {
      // margin-top: 1.767rem;
      //左侧内容
      .main-area {
        position: relative;
        width: 760px;
        max-width: 100%;
        background-color: #fff;
        border-radius: 2px;
        box-sizing: border-box;
      }
      //article
      .article-area {
        margin-bottom: 1.5rem;
        // padding: 0 2rem;
        padding: 0rem 2rem 1rem 2rem;
        .article {
          margin-bottom: 3rem;
          padding: 2rem 0 0;
          //文章头部
          .author-info-block {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }
          //标题
          .article-title {
            // margin: 0.67em 0;
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1.5;
            text-align: center;

            &::before,
            &::after {
              content: "";
              display: inline-block;
              width: 22px;
              height: 44px;
              vertical-align: top;
              position: relative;
              top: 10px;
              background: url(../assets/images/png7.png) no-repeat;
            }
            &::before {
              background-position: left;
              margin-right: 18px;
            }
            &::after {
              background-position: right;
              margin-left: 18px;
            }
          }
          .t_line {
            position: absolute;
            left: 30px;
            right: 30px;
            height: 17px;
            &:before {
              left: 0;
              background-position: left;
            }
            &:before,
            &:after {
              content: "";
              position: absolute;
              top: 0;
              width: 30px;
              height: 17px;
              background: url(../assets/images/png21.png) no-repeat;
            }
            &:after {
              right: 0;
              background-position: right;
            }
            .bd {
              position: absolute;
              left: 30px;
              right: 30px;
              bottom: 5px;
              border-top: 1px solid #d8d8d8;
            }
          }
          .author-info-block {
            color: #999;
            font-size: 16px;
            margin-top: 15px;
          }
          //正文
          .article-content {
            word-break: break-word;
            line-height: 1.75;
            font-weight: 400;
            font-size: 15px;
            overflow-x: hidden;
            margin-top: 30px;
            text-indent: 2em;
          }
        }
        //本文课件
        .tag-list-box {
          // margin-bottom: 2rem;
          .tag-list-title {
            margin-bottom: 2rem;
            padding: 0 0 0 1rem;
            font-size: 1.25rem;
            font-weight: 600;
            color: #000;
            border-left: 6px solid #ddd;
          }
          .tag-list {
            display: flex;
            flex-wrap: wrap;
            .item {
              display: flex;
              align-items: center;
              margin: 0 1.25rem 1rem 0;
              padding: 0.167rem;
              background-color: #fff;
              border: 1px solid #e3e3e3;
              border-radius: 2px;
              .tag-icon {
                width: 1.75rem;
                height: 1.75rem;
                border-radius: 2px;
                background-image: url(../assets/images/1.png);
                background-size: contain;
              }
              .thumb {
                background-position: 50%;
                background-size: cover;
                background-repeat: no-repeat;
              }
              .tag-title {
                padding: 0 0.75rem;
                font-size: 1rem;
                line-height: 1.75rem;
                color: #919191;
              }
            }
          }
        }
        //具体课件图片+标题
        .footer-author-block {
          padding: 15px 17px;
          border-radius: 2px;
          background-color: #f4f5f5;
          margin-bottom: 1rem;
          .author-info-block {
            display: flex;
            align-items: center;
            //图片
            .avatar-link {
              font-size: 0;
              .avatar {
                flex: 0 0 auto;
                margin-right: 1rem;
                width: 12rem;
                height: 8rem;
                border-radius: 3%;
                background-image: url(../assets/images/ppt1.png);
              }
              .avatar {
                display: inline-block;
                position: relative;
                background-position: 50%;
                background-size: cover;
                background-repeat: no-repeat;
                background-color: #eee;
              }
            }
            //标题
            .author-info-box {
              min-width: 0;
              flex-grow: 1;
              height: 7rem;
              margin-left: 10px;
              .profile-box {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                align-items: baseline;
                font-size: 1.1rem;
                color: #909090;
                .username {
                  display: inline-block;
                  max-width: 100%;
                  font-size: 1.3rem;
                  margin-right: 0.5rem;
                  font-weight: 700;
                  color: #333;
                }
                .position {
                  max-width: 400px;
                }
              }
              .meta-box {
                font-size: 1.1rem;
                color: #909090;
                .posts {
                  float: left;
                  line-height: 40px;
                }
              }
            }
            //下载按钮
            .follow-button {
              margin: 0 10px 0 auto;
              padding: 0;
              width: 60px;
              height: 30px;
              font-size: 13px;
              border: 1px solid var(--main-color);
              color: var(--main-color);
              background-color: #fff;
              &:hover {
                border: 1px solid var(--main-color-hover);
                color: var(--main-color-hover);
              }
            }
            .follow-button2 {
              margin: 0 10px 0 auto;
              padding: 0;
              width: 60px;
              height: 30px;
              font-size: 13px;
              border: 1px solid #618f4b;
              color: #618f4b;
              background-color: #fff;
              &:hover {
                border: 1px solid #7dbb61;
                color: #7dbb61;
              }
            }
          }
        }
      }
      //评论(放组件里面了)

      //右侧内容
      .sidebar {
        position: absolute;
        top: 0;
        right: 0;
        width: 20rem;
        height: auto;

        .index-book-collect {
          background-color: #fff;
          border-radius: 2px;
          margin-bottom: 20px;
          overflow: hidden;
          .header {
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-right: 15px;
            border-bottom: 1px solid #f6f6f6;

            .title {
              flex-grow: 1;
              padding: 0 0 0 1rem;
              font-size: 1.25rem;
              font-weight: 600;
              color: #000;
              border-left: 6px solid #ddd;
            }
            .controllers {
              height: 12px;
              font-size: 12px;
              color: #7d7d7d;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .arrow {
                cursor: pointer;
                line-height: 1;
                width: 5px;
                padding: 0 6px;
              }
            }
          }
          //文章推荐

          //热门文章
          .item {
            display: block;
            padding: 0.8rem 1.3rem;
            .entry-title {
              font-size: 1.16rem;
              color: #333;
              &:hover {
                color: var(--main-color);
              }
            }
            .entry-meta-box {
              margin-top: 0.4rem;
              .entry-meta {
                display: inline-block;
                margin-right: 2.5rem;
                font-size: 1rem;
                color: #c2c2c2;
                // .icon {
                //    vertical-align: sub;
                // }
                .count {
                  color: #b2bac2;
                  margin-left: 0.4rem;
                }
              }
            }
          }
        }
      }
      //浮空栏
      .el-button--text {
        font-size: 16px;
        color: #000;
      }
      .article-suspended-panel {
        position: fixed;
        margin-left: -7rem;
        top: 10rem;
        .show {
          position: absolute;
          left: 30%;
          top: 6%;
        }
        .panel-btn {
          position: relative;
          margin-bottom: 0.75rem;
          width: 3rem;
          height: 3rem;
          background-color: #fff;
          background-position: 50%;
          background-repeat: no-repeat;
          border-radius: 50%;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
          cursor: pointer;
        }
        .like-btn.like-adjust {
          background-position: 53% 46%;
        }
        .like-btn {
          background-image: url(../assets/images/zan.png);
        }
        .like-btn:hover {
          background-image: url(../assets/images/zan-hover.png);
        }
        .panel-btn.comment-btn.comment-adjust {
          background-position: 50% 55%;
        }
        .panel-btn.collect-btn {
          background-image: url(../assets/images/collect.png);
        }
        .panel-btn.collect-btn:hover {
          background-image: url(../assets/images/collect-hover.png);
        }
        .panel-btn.comment-btn {
          background-image: url(../assets/images/comment.png);
        }
        .panel-btn.comment-btn:hover {
          background-image: url(../assets/images/comment-hover.png);
        }
        .share-title {
          margin: 2.5rem 0 1rem;
          font-size: 1rem;
          text-align: center;
          color: #c6c6c6;
          user-select: none;
        }
        // .panel-btn.weibo-btn {
        //   background-image: url(../assets/images/weibo.png);
        // }
        // .panel-btn.weibo-btn:hover {
        //   background-image: url(../assets/images/weibo-hover.png);
        // }
        // .panel-btn.qq-btn {
        //   background-image: url(../assets/images/qq.png);
        // }
        // .panel-btn.qq-btn:hover {
        //   background-image: url(../assets/images/qq-hover.png);
        // }
        // .panel-btn.wechat-btn {
        //   background-image: url(../assets/images/wechat.png);
        // }
        // .panel-btn.wechat-btn:hover {
        //   background-image: url(../assets/images/wechat-hover.png);
        // }
        .show1:hover {
          background-image: url(../assets/images/sblue.png);
          background-position: center center;
          background-size: cover;
        }
        .show2:hover {
          background-image: url(../assets/images/syellow.png);
          background-position: center center;
          background-size: cover;
        }
        .show3:hover {
          background-image: url(../assets/images/sred.png);
          background-position: center center;
          background-size: cover;
        }
      }
    }
  }
}
</style>
