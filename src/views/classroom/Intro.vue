<template>
  <div class="content">
    <div class="classintroTop">
      <div class="classintroTop_content">
        <div>
          <span class="className">越剧文化03班</span>
          <div class="classIntro">这是一个非常美好的大家庭，欢迎你的加入。</div>
        </div>
      </div>
    </div>
    <div class="classintroMain">
      <!-- 左边通知栏 -->
      <div class="classintroLeft">
        <classright />
      </div>
      <!-- 右边具体任务栏 -->
      <div class="classintroRight">
        <!-- 第一行分享栏 -->
        <div class="share">
          <div class="tx">
            <el-avatar class="el-dropdown-link" ref="popupbutton" :size="40" :src="avatar"></el-avatar>
          </div>
          <div class="share_word">快来和大家分享你的收获吧~</div>
          <div class="share_btn">
            <el-button type="primary" :size="40" icon="el-icon-edit" circle></el-button>
          </div>
        </div>
        <!-- 具体任务栏 -->
        <taskcard />
      </div>
    </div>
  </div>
</template>

<script>
import taskcard from "@/components/TaskCard.vue";
export default {
  data() {
    return {};
  },
  computed: {
    avatar() {
      return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      // return '/images/'+this.user.photo;
    }
  },
  components: {
    classright,
    taskcard
  }
};
import classright from "@/components/classright.vue";
</script>

<style scoped lang="scss">
.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  .classintroTop {
    border-radius: 8px;
    overflow: hidden;
    height: 240px;
    position: relative;
    width: 100%;
    .classintroTop_content {
      background-image: url(../../assets/images/WorldStudies.jpg);
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      padding: 24px;
      box-sizing: border-box;
      .className {
        color: #fff;
        font-size: 36px;
        font-weight: bold;
        line-height: 44px;
      }
      .classIntro {
        font-family: "Google Sans", Roboto, Arial, sans-serif;
        font-size: 18px;
        line-height: 30px;
        color: #fff;
      }
    }
  }
  .classintroMain {
    margin-top: 24px;
    .classintroLeft {
      float: left;
      width: 210px;
    }
    .classintroRight {
      float: right;
      width: 886px;
      overflow: hidden;
      margin: -16px;
      padding: 16px;
      .share {
        margin-bottom: 24px;
        align-items: center;
        display: flex;
        min-height: 72px;
        padding: 0 8px;
        position: relative;
        z-index: 0;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
          0 2px 6px 2px rgba(60, 64, 67, 0.149);
        border-radius: 8px;
        overflow: hidden;
        .tx {
          padding: 12px;
        }
        .share_word {
          color: #ccc;
          line-height: 40px;
          transition: color ease-in-out 0.2s;
        }
        .share_btn {
          position: absolute;
          right: 8px;
          padding: 12px;
        }
        &:hover {
          .share_word {
            color: var(--main-color);
          }
        }
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
                .num {
                  font-size: 36px;
                  font-weight: 400;
                  line-height: 44px;
                  color: #3c4043;
                }
                .word {
                  letter-spacing: 0.3px;
                  font-family: Roboto, Arial, sans-serif;
                  font-size: 12px;
                  font-weight: 400;
                  line-height: 16px;
                  color: #5f6368;
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
                }
              }
            }
          } //content_means
        } //.message_content
      } //classmessage
    }
  }
}
</style>

