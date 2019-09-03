<template>
  <div class="Remark">
    <div class="rtop">
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
        <!-- 学生名字 -->
        <div class="myname" v-if="homeworkinfo.student">
          <!-- <img :src="`/images/` + user.photo" alt /> -->
          <img src="@/assets/images/tx4.png" />
          <p>{{homeworkinfo.student}}</p>
        </div>
        <!-- 未点击名单，显示任务详情 -->
        <div class="task_content" v-else>
          <div class="content_intro">
            <div class="intro_left">
              <div class="intro_time">
                <span class="taskdate">{{taskinfo.star_time}}</span>
              </div>
              <div class="intro_word">
                <span>{{taskinfo.desc}}</span>
              </div>
            </div>
            <div class="intro_right">
              <div class="turn">
                <div class="num">{{taskinfo.commit_num}}</div>
                <div class="word">已上交</div>
              </div>
            </div>
          </div>
          <!-- 资源 -->
          <div class="content_means">
            <div class="meansBox_out">
              <div class="meansBox" v-for="item in  taskinfo.photo" :key="item">
                <a href class="means">
                  <div class="means_pic">
                    <img :src=" qaq + item " alt />
                  </div>
                  <!-- <div class="means_title">
                    <div class="means_titleword">百度一下，你就知道</div>
                  </div>-->
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- 显示学生作业详情 -->
        <div class="homework_content" v-if="homeworkinfo.student">
          <div class="content_intro">
            <div class="intro_left">
              <!-- <div class="intro_time">
                <span class="taskdate">{{taskinfo.star_time}}</span>
              </div>-->
              <div class="intro_word">
                <span>{{homeworkinfo.content}}</span>
              </div>
            </div>
            <div class="intro_right">
              <div class="turn">
                <div class="num">{{taskinfo.commit_num}}</div>
                <div class="word">已上交</div>
              </div>
            </div>
          </div>
          <!-- 资源 -->
          <div class="content_means">
            <div class="meansBox_out">
              <div class="meansBox" v-for="item in  homeworkinfo.photo" :key="item">
                <a href class="means">
                  <div class="means_pic">
                    <img :src=" qaq + item " alt />
                  </div>
                  <!-- <div class="means_title">
                    <div class="means_titleword">百度一下，你就知道</div>
                  </div>-->
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grade">
      <p>
        打分：

        <el-input v-model="grade" :placeholder="homeworkinfo.grade" style="width:80px;margin-right: 5px;"  v-if="homeworkinfo.grade"></el-input>
                <el-input v-model="grade" placeholder="成绩" style="width:80px;margin-right: 5px;" v-else></el-input>
        <span>/100</span>
      </p>
    </div>
    <div class="remark_content">
      <p>教师评语</p>
      <el-input type="textarea" v-model="remark" :placeholder="homeworkinfo.comment" v-if="homeworkinfo.comment"></el-input>
      <el-input type="textarea" v-model="remark" placeholder="请输入评语" v-else></el-input>
      <el-button type="warning" class="mybutton" @click="get_mark_score()">完成评价</el-button>
    </div>
  </div>
</template>

<script>
import { mark_score } from "@/api/toPost";
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      grade: "",
      remark: "",
      qaq: process.env.VUE_APP_CDN,
      user: this.$store.state.user
    };
  },
  props: ["homeworkinfo", "taskinfo"],
  mixins: [Address],
  methods: {
    get_mark_score() {
      let datas = {
        homework_id: this.homeworkinfo.id,
        grade: this.grade,
        remark: this.remark
      };
      mark_score(datas)
        .then(() => {
          this.$message("评价成功");
        })
        .catch(() => {});
    }
  },
  computed: {
    // haveHomeork() {
    //   return this.homeworkinfo.student == "";
    // }
  }
};
</script>

<style lang="scss" scoped >
.Remark {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 16px 16px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  .rtop {
    min-height: 480px;
    .TaskdetailLeft {
      width: 100%;
      height: auto;
      background-color: #fff;
      //
      overflow: hidden;
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
.task_content{
  border-top:1px solid var(--main-color);
}
      .homework_content,.task_content {
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
                // border: 1px solid #dadce0;
                // border-radius: 8px;
                overflow: hidden;
                //
                flex-grow: 1;
                .means_pic {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 16px;
                  height: 200px;
                  overflow: hidden;
                  // width: 150px;
                  width: 100%;
                  flex-shrink: 0;
                  position: relative;
                  img {
                    max-height: 100%;
                    max-width: 100%;
                    border: none;
                    border: 1px solid #dadce0;
                    border-radius: 8px;
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
    // img {
    //   width: 400px;
    //   height: auto;
    // }
  }
  .grade {
    // margin-top: 100px;
    // margin-left: 600px;
    flex: 1;
    text-align: right;
    p {
      span {
        color: #1e8e3e;
      }
    }
  }
  .remark_content {
    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .mybutton {
      display: flex;
      margin-top: 30px;
      margin-left: 670px;
      //       flex: 1;
      // text-align: right;
    }
  }
}
</style>

