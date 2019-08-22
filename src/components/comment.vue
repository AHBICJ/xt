<template>
  <div class="main-area recommended-area shadow">
    <div class="recommended-entry-list-title">评论</div>
    <div class="comment_lists">
      <ul>
        <li v-for="item in comments" :key="item.id">
          <div class="comment_div">
            <!-- 头像 -->
            <div class="comment_img">
              <img v-bind:src="`/images/tx`+ item.photo_id + `.png`" alt="用户头像" />
            </div>
            <!-- 昵称、地点、评论 -->
            <div class="text_box">
              <p class="comment_name">{{item.name}}</p>
              <p class="comment_addr_time">
                浙江省绍兴市
                <span class="time">{{item.time}}</span>
              </p>
              <p class="comment_text">{{item.content}}</p>
            </div>
            <!-- 点赞 -->
            <div class="zan_num">
              <i class="like_icon"></i>
              {{item.likenum}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 评论功能 -->
    <div class="comment-form comment-form focused">
      <div class="avatar-box">
        <div class="lazy avatar avatar loaded"></div>
      </div>
      <div class="form-box">
        <div class="input-box">
          <div class="auth-card">
            <el-input v-model="newcomment"></el-input>
          </div>
          <!---->
        </div>
        <div class="action-box">
          <div class="submit">
            <button class="submit-btn" @click.prevent="addcomment">评论</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postComment } from "@/api/toPost.js";
import { getComment } from "@/api/toGet.js";
export default {
  data() {
    return {
      // labelPosition: "right",
      newcomment: "",
      comments: []
    };
  },
  name: "comment",
  props: {
    comment_info: {
      // type: Object,
      // default: () => ({})
    }
  },
  methods: {
    initComment() {
      this.commentId = this.$route.params.id || 1;
      getComment({ article_id: this.commentId }).then(
        res => (this.comments = res.data)
      );
    },
    addcomment() {
      if (!this.newcomment) {
        this.$message({ message: "评论不能为空", type: "info" });
      } else {
        let datas = {
          article_id: this.commentId,
          content: this.newcomment
          //photo_id:1
        };
        postComment(datas).then(res => {
          if (res.code == 200) {
            this.$message({ message: "评论成功", type: "success" });
            this.comments.push(res.data);
            this.newcomment = "";
          } else {
            this.$message({ message: "评论失败", type: "error" });
          }
        });
      }
    }
  },
  created() {
    this.initComment();
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.initComment(to.params.id);
  //   next();
  // },
  watch: {
    '$route':'initComment'
  }
};
</script>

<style lang="scss" scoped>
div {
  display: block;
}
body {
  font-size: 12px;
  line-height: normal;
  word-break: break-word;
}
html {
  font-size: 12px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica Neue,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  text-rendering: optimizeLegibility;
  color: #333;
  background-color: #f4f5f5;
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
////
.recommended-entry-list-title {
  padding: 1.3rem 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #909090;
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
}
.comment_lists {
  padding: 18px;
  ul li {
    margin-top: 16px;
    overflow: hidden;
    position: relative;
    .comment_div {
      position: relative;
      overflow: hidden;
      .comment_img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        float: left;
        margin-left: 20px;
        background: url(../assets/images/1.png);
        background-size: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          border: none;
        }
      }
      .text_box {
        width: 530px;
        // border-bottom: none;
        // width: 780px;
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
        float: left;
        // margin-left: 15px;
        .comment_name {
          color: #2b72c1;
          font-size: 16px;
        }
        .comment_addr_time {
          color: #999;
          font-size: 12px;
          margin-top: 5px;
          .time {
            padding-left: 10px;
          }
        }
        .comment_text {
          font-size: 16px;
          margin-top: 14px;
        }
      }
      .zan_num {
        width: 100px;
        height: 20px;
        position: absolute;
        right: 10px;
        top: 20px;
        text-align: right;
        color: #999;
        font-size: 14px;
        i {
          margin-right: 5px;
        }
        .like_icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          background: url(../assets/images/zan.png) no-repeat;
          background-size: 100%;
          position: relative;
          top: -2px;
          right: 4px;
          &:hover {
            background: url(../assets/images/zan-hover.png) no-repeat;
          }
        }
      }
    }
  }
}
//评论功能
// .lazy.loaded:before {
//     opacity: 0;
//     pointer-events: none;
// }
.comment-form {
  margin: 1.333rem 0;
  display: flex;
  position: relative;
  padding: 1rem 1.333rem;
  background-color: #fafbfc;
  border-radius: 3px;
  //左
  .avatar-box {
    // flex: 0 0 auto;
    width: 48px;
    height: 48px;
    border-radius: 24px;
    float: left;
    margin-left: 20px;
    background: url(../assets/images/tx1.png);
    background-size: 100%;
    .avatar {
      display: inline-block;
      position: relative;
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #eee;
      // background-image: url(/images/tx1.png);
    }
  }
  //右
  .form-box {
    // flex: 1 1 auto;
    // position: relative;
    width: 530px;
    margin-left: 15px;
    margin-top: 6px;
    float: left;
    .input-box {
      // border-color: #007fff;
      font-size: 0;
      background-color: #fff;
      // border: 1px solid #f1f1f1;
      // border-radius: 3px;
      .auth-card {
        position: relative;
        .rich-input {
          position: relative;
          padding: 0.6rem 1rem;
          font-size: 1.083rem;
          line-height: 1.7;
          color: #17181a;
          outline: none;
          min-height: 1.3em;
        }
      }
    }
    .action-box {
      // display: flex;
      // align-items: center;
      // margin: 0.65rem 0 0;
      width: 100px;
      height: auto;
      position: absolute;
      right: 20px;
      top: 20px;
      text-align: right;
      color: #999;
      font-size: 14px;
      .submit {
        flex: 0 0 auto;
        margin-left: auto;
        .submit-btn {
          flex: 0 0 auto;
          margin-left: auto;
          padding: 0.5rem 1.3rem;
          font-size: 1.25rem;
          color: #fff;
          background-color: var(--main-color);
          border-radius: 2px;
          cursor: pointer;
          &:hover {
            background-color: var(--main-color-hover);
          }
        }
        button {
          -webkit-appearance: none;
          appearance: none;
          background-color: var(--main-color);
          color: #fff;
          border-radius: 2px;
          border: none;
          padding: 0.5rem 1.3rem;
          outline: none;
          transition: background-color 0.3s, color 0.3s;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
