<template>
  <div class="share_card">
    <!-- 标题 -->
    <router-link
      :to="`/classroom/${$route.params.id}/task/${share.id}`"
      class="task_title"
      v-if="istask"
    >
      <div class="title_pic">
        <svg viewBox="0 0 24 24" focusable="false" width="24" height="24">
          <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z" />
          <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"
          />
        </svg>
      </div>
      <div class="title_name">{{share.name}}</div>
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
    </router-link>
    <div class="share_title" v-else>
      <div class="title_pic">
        <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" v-if="istask">
          <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z" />
          <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"
          />
        </svg>
        <img v-bind:src="`/images/`+ share.userphoto" alt="头像" v-else />
      </div>
      <div class="share_info">
        <span class="share_name">{{share.username}}</span>
        <span class="share_time">{{share.star_time}}</span>
      </div>
      <div class="title_btn">
        <span class="btn">
          <svg viewBox="0 0 24 24" focusable="false" width="24" height="24">
            <path
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
        </span>
      </div>
    </div>

    <el-dialog title="影音预览" :visible.sync="showPreview" width="80%" top="10vh">
      <el-carousel :autoplay="false" arrow="hover" height="680px" ref="previewCarousel">
        <el-carousel-item v-for="pho in share.photo" :key="pho.name">
          <img :src="imgAddress(pho.url)"/>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

    <!-- 资源 -->
    <div class="share_content">
      <div class="content_intro" v-if="istask">
        <div class="intro_left">
          <div class="intro_time">
            <span class="taskdate">{{share.star_time}}</span>
          </div>
          <div class="intro_word">
            <span>{{share.desc}}</span>
          </div>
        </div>
        <div class="intro_right">
          <div class="turn">
            <div class="num">0</div>
            <div class="word">已上交</div>
          </div>
        </div>
      </div>

      <div class="content_words" v-else>
        <div class="mywords">{{share.desc}}</div>
      </div>
      <!-- 资源 -->
      <div class="content_means">
        <!-- dialog -->
        <el-dialog
          title="分享资源"
          :visible.sync="dialogShare"
          width="960px"
          custom-class="dialogShare"
        >
          <carouselsshare :images="share"></carouselsshare>
        </el-dialog>
        <!-- means -->
        <div class="meansBox_out">
          <div class="meansBox" v-for="(pho,idx) in share.photo" :key="pho.name" @click="handlePreview(idx)">
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
</template>
<script>
import Address from "@/mixin/Address";
import carouselsshare from "@/components/carousels-share.vue";
export default {
  data() {
    return {
      showPreview: false,
      initialIndex:0,
    };
  },
  computed: {
    istask() {
      return this.share.task_type == "task";
    }
  },
  methods:{
    handlePreview(idx){
      this.showPreview=true;
      this.$refs.previewCarousel.setActiveItem(idx);
    }
  },
  mixins: [Address],
  props: ["share"],
  components: {
    carouselsshare
  },
};
</script>

<style lang="scss">
.share_card{
   .el-carousel__item{
     display: flex;
     justify-content: center;
     align-items: center;
     img{
       max-width: 100%;
       max-height: 100%;
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
  .task_title {
    border-bottom: 1px solid #e0e0e0;
    align-items: center;
    display: flex;
    height: 50px;
    padding: 10px 20px;
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
    }
    .title_name {
      display: flex;
      flex: 1 1 auto;
      flex-direction: row;
      overflow: hidden;
      //
      letter-spacing: 0.25px;
      font-family: "Google Sans", Roboto, Arial, sans-serif;
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
          background-color: #f9e5bb;
        }
      }
    }
    &:hover {
      background-color: #f9f3e5;
    }
  }
  .share_title {
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
      line-height: 32px;
      margin-right: 16px;
      background-color: #e8710a;
      color: #fff;
      fill: #fff;
      fill: currentColor;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .share_info {
      overflow: hidden;
      padding-top: 5px;
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
    .title_btn {
      margin-left: auto;
      color: #5f6368;
      fill: #5f6368;
      flex-shrink: 0;
      display: block;
      height: auto;
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
        background-color: #eee;
      }
    }
  }
  .share_content {
    padding: 15px 20px 0;
    width: 100%;
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
