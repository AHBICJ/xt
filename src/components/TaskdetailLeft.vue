<template>
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

    <!-- <div class="homework" v-if="user.role=='student'"> -->
    <div class="homework">
      <el-form ref="form">
        <p>我的作业</p>
        <el-input type="textarea" v-model="homework"></el-input>
      </el-form>
      <p>字数限制:200</p>
    </div>
  </div>
</template>

<script>
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      user: this.$store.state.user
      // taskinfo: {}
    };
  },
  props: ["taskinfo"],
  mixins: [Address]
};
</script>

<style lang="scss" scoped >
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

  // div {
  //   width: 100%;
  //   height: auto;
  //   img {
  //     width: 100%;
  //     height: auto;
  //   }
  // }
}
</style>

