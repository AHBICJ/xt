<template>
  <div class="classmessage">
    <!-- 标题 -->
    <div class="message_title" @click="show=!show">
      <div class="title_pic">
        <svg viewBox="0 0 24 24" focusable="false" width="24" height="24">
          <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z" />
          <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"
          />
        </svg>
      </div>
      <div class="title_name">{{task.name}}</div>
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
    <!-- 介绍以及资源 -->
    <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="collapse" v-show="show">
        <div class="message_content">
          <div class="content_intro">
            <div class="intro_left">
              <div class="intro_time">
                <span class="taskdate">{{task.star_time}}</span>
              </div>
              <div class="intro_word">
                <span>{{task.desc}}</span>
              </div>
            </div>
            <div class="intro_right">
              <div class="turn">
                <div class="num">0</div>
                <div class="word">已上交</div>
              </div>
            </div>
          </div>
          <!-- 资源 -->
          <div class="content_means">
            <div class="meansBox_out">
              <div class="meansBox">
                <a href class="means">
                  <div class="means_pic">
                    <img
                      src="https://www.google.com/webpagethumbnail?c=66&s=105:70&f=0&d=http://baidu.com&a=AIYkKU9eC8yaoGhLEOqmz9bXNUGtShtQQw"
                      alt
                    />
                  </div>
                  <div class="means_title">
                    <div class="means_titleword">百度一下，你就知道</div>
                  </div>
                </a>
              </div>
              <div class="meansBox">
                <a href class="means">
                  <div class="means_pic">
                    <img
                      src="https://www.google.com/webpagethumbnail?c=66&s=105:70&f=0&d=http://baidu.com&a=AIYkKU9eC8yaoGhLEOqmz9bXNUGtShtQQw"
                      alt
                    />
                  </div>
                  <div class="means_title">
                    <div class="means_titleword">百度一下，你就知道</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      // task:[],
    };
  },
  props: ["task"],
  methods: {
    enter(el) {
      el.style.height = "auto";
      // noinspection JSSuspiciousNameCombination
      let endWidth = window.getComputedStyle(el).height;
      el.style.height = "0px";
      el.offsetHeight; // force repaint
      // noinspection JSSuspiciousNameCombination
      el.style.height = endWidth;
    },
    afterEnter(el) {
      el.style.height = null;
    },
    leave(el) {
      el.style.height = window.getComputedStyle(el).height;
      el.offsetHeight; // force repaint
      el.style.height = "0px";
    },
    afterLeave(el) {
      el.style.height = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.collapse {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}
.classmessage {
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  .message_title {
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    flex-direction: row;
    height: 60px;
    padding: 8px 24px;
    position: relative;
    .title_pic {
      display: flex;
      flex: 0 0 auto;
      height: 36px;
      justify-content: center; //水平居中
      align-items: center; //垂直居中
      text-align: center;
      font-size: 16px;
      line-height: 32px;
      margin-right: 16px;
      width: 36px;
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
          background-color: #eee;
        }
      }
    }
  }
  .message_content {
    padding: 16px 24px;
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
        margin-right: -12px;
        .meansBox {
          display: inline-block;
          position: relative;
          margin-bottom: 12px;
          margin-right: 12px;
          width: calc(50% - 12px);
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
              height: 70px;
              overflow: hidden;
              width: 105px;
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
} //classmessage
</style>
