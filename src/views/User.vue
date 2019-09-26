<template>
  <div class="User">
    <nav-bar :options="navbarOptions" />
    <div class="UserContent">
      <div class="left">
        <div class="top">
          <div class="User_tx">
            <img :src="`/images/` + user.photo" alt />
          </div>
          <div class="User_txt">
            <h1>{{user.name}}</h1>
            <div class="User_tag">
              <i class="el-icon-plus"></i> 热爱学习
            </div>
            <div class="User_tag">
              <i class="el-icon-plus"></i> 从未迟到
            </div>
          </div>
          <!-- <div class="User_classroom">
            <div class="class">班级：越剧文化01班</div>
            <div class="class">入学时间：2019年9月</div>
          </div> -->
        </div>
        <div class="buttom">
          <el-tabs v-model="activeName">
            <el-tab-pane label="我的收藏" name="first">
              <div class="zan">
                <p>
                  <span>绍兴</span> · 名人贤士
                </p>
                <a href @.stop>绍兴名人——感受古味道绍兴</a>
                <div class="zanimg">
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan-active.930baa2.svg" alt />
                  <p>234</p>
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt />
                  <p>54</p>
                </div>
              </div>
              <div class="zan">
                <p>
                  <span>绍兴</span> · 风俗民情
                </p>
                <a href @.stop>越剧文化</a>
                <div class="zanimg">
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan-active.930baa2.svg" alt />
                  <p>134</p>
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt />
                  <p>21</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的点赞" name="second">
              <div class="zan">
                <p>
                  <span>绍兴</span> · 名人贤士
                </p>
                <a href @.stop>绍兴名人——感受古味道绍兴</a>
                <div class="zanimg">
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan-active.930baa2.svg" alt />
                  <p>234</p>
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt />
                  <p>54</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="浏览历史" name="third">
              <div class="zan">
                <p>
                  <span>绍兴</span> · 名人贤士
                </p>
                <a href @.stop>绍兴名人——感受古味道绍兴</a>
                <div class="zanimg">
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan-active.930baa2.svg" alt />
                  <p>234</p>
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt />
                  <p>54</p>
                </div>
              </div>
              <div class="zan">
                <p>
                  <span>绍兴</span> · 风俗民情
                </p>
                <a href @.stop>越剧文化</a>
                <div class="zanimg">
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan-active.930baa2.svg" alt />
                  <p>134</p>
                  <img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" alt />
                  <p>21</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="个人信息" name="four">
              <div class="message">
                <ul>
                  <li>
                    <div class="photo">
                      <span>头像</span>
                      <div class="upphoto">
                        <el-upload
                          class="avatar-uploader"
                          action="http://192.168.123.182:5000/upload"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                      <el-button type="primary" class="mybuttom">点击上传</el-button>
                    </div>
                  </li>
                  <li>
                    <span>用户名称</span>
                    <div class="input_box">
                      <input type="text" placeholder="请填写你的用户名称" />
                      <div class="input_a">
                        <i class="el-icon-edit"></i>&nbsp;修改
                      </div>
                    </div>
                  </li>
                  <li>
                    <span>个人介绍</span>
                    <div class="input_box">
                      <input type="text" placeholder="填写兴趣爱好、擅长的事情、喜欢的事情等" />
                      <div class="input_a">
                        <i class="el-icon-edit"></i> &nbsp;修改
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="five">
              <ul>
                <li>
                  <div class="input_box">
                    <span class="label">旧密码</span>
                    <input type="text" placeholder="请输入原密码（初次设置时可留空）" />
                  </div>
                </li>
                <li>
                  <div class="input_box">
                    <span class="label">新密码</span>
                    <input type="text" placeholder="请输入新密码" />
                  </div>
                </li>
                <li>
                  <div class="input_box">
                    <span class="label">确认新密码</span>
                    <input type="text" placeholder="确认新密码" />
                  </div>
                </li>
              </ul>
              <div class="submit_btn">
                <el-button class="ml400" type="primary">确认修改</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="right">
        <div class="right_top">
          <div class="txt">
            <p>完成任务</p>
            <span>8</span>
          </div>
          <div class="txt">
            <p>任务总数</p>
            <span>12</span>
          </div>
          <!-- :after -->
        </div>
        <div class="right_buttom">
          <ul>
            <li>
              观看文章
              <span>23</span>
            </li>
            <li>
              评论总数
              <span>12</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { get_aboutme } from "@/api/toGet";
export default {
  data() {
    return {
      navbarOptions: {
        isHome: false,
        isClassroom: false,
        collapsed: false,
        cityId: 12,
        shortTilte: false
        // user: this.$store.state.user
      },
      imageUrl: "",
      activeName: "first",
      user: this.$store.state.user,
      my:{}
    };
  },
  created() {
    this.getUser(this.$route.params.id);
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getUser() {
      get_aboutme({user_id: this.user.id}).then(res => {
        this.my = res.data;
        // this.teacher = res.data.teacher;
        // this.totalPage = res.totalpage;
      });
    },
  },
  components: {
    NavBar
  }
};
</script>

<style scoped lang="scss">
.User {
  width: 100%;
  min-height: 100%;
  background: url(../assets/images/BG6.jpg);
  // background-color: #a1a1a1;
  background-attachment: fixed;
  .UserContent {
    position: relative;
    margin: 0 auto;
    width: 1120px;
    display: grid;
    grid-template-areas: "left right";
    grid-template-rows: auto;
    grid-template-columns: 800px 300px;
    grid-gap: 20px;
    // background-color: #a1a1a1;
    .left {
      grid-area: left;
      .top {
        display: flex;
        padding: 30px 50px;
        background-color: white;
        .User_tx {
          flex: 0 0 auto;
          margin-right: 30px;
          width: 90px;
          height: 90px;
          background-color: #f9f9f9;
          border-radius: 50%;
          background-image: url(../assets/images/tx3.png);
          background-size: 100% 100%;
          img {
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center;
            width: 90px;
            height: 90px;
          }
        }
        .User_txt {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1 1 auto;
          margin-right: 24px;
          .User_tag {
            color: var(--main-color);
            margin-top: 5px;
            margin-left: 5px;
            cursor: pointer;
            &:hover {
              color: var(--main-color-hover);
            }
          }
        }
        .User_classroom {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          align-items: center;
          .class {
            margin: 12px 0 0;
            padding: 0;
            height: 25px;
            font-size: 16px;
            line-height: 30px;
          }
        }
      }
      .buttom {
        margin-top: 20px;
        background-color: white;
        height: auto;
        padding: 20px;
        ul {
          display: block;
          list-style-type: none;
          li {
            display: flex;
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid #f1f1f1;
            list-style: none;
            span {
              font-size: 16px;
              color: #333;
              width: 120px;
            }
            .input_box {
              display: flex;
              justify-content: flex-end;
              flex: 1;
              input {
                flex: 1;
                font-size: 14px !important;
                display: inline-block;
                border: none;
                outline: none;
                // color: #ccc;
                font-size: 16px;
                margin: initial;
              }
              .input_a {
                margin-left: 12px;
                color: var(--main-color);
                font-size: 16px;
                cursor: pointer;
                &:hover {
                  color: var(--main-color-hover);
                }
              }
            }
          }
        }
        .submit_btn {
          margin-top: 10px;
          margin-right: 20px;
          display: flex;
          justify-content: flex-end;
          flex: 1;
        }
        .message {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: flex-start;
          .photo {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            span {
              margin-top: 40px;
            }
            .upphoto {
              background-color: #eee;
              .avatar-uploader .el-upload {
                border: 1px dashed #110808;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
              }
              .avatar-uploader .el-upload:hover {
                border-color: #409eff;
              }
              .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 100px;
                height: 100px;
                line-height: 100px;
                text-align: center;
              }
              .avatar {
                width: 100px;
                height: 100px;
                display: block;
              }
            }
            .mybuttom {
              width: 100px;
              height: 40px;
              margin-top: 30px;
              margin-left: 30px;
            }
          }
        }
        .zan {
          width: 100%;
          height: 90px;
          padding-top: 10px;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: flex-start;
          border-bottom: 1px solid #f1f1f1;
          p {
            font-size: 14px;
            color: #b2bac2;
            span {
              color: #b71ed7;
            }
          }
          a {
            text-decoration: none;
            font-size: 18px;
            font-weight: 600;
            line-height: 1.2;
            color: #2e3135;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          a:hover {
            text-decoration: underline;
          }
          .zanimg {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            img {
              width: 18px;
              height: 18px;
            }
            p {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .right {
      grid-area: right;
      .right_top {
        display: flex;
        position: relative;
        margin-bottom: 12px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        ::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 70%;
          background-color: #f3f3f4;
          transform: translate(-50%, -50%);
        }
        .txt {
          flex: 1 1 auto;
          padding: 16px 0;
          text-align: center;
          color: #31445b;
          cursor: pointer;
          p {
            font-size: 18px;
            margin-bottom: 10px;
          }
          span {
            font-size: 16px;
          }
          &:hover {
            color: var(--main-color);
          }
        }
      }
      .right_buttom {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        ul {
          display: block;
          list-style-type: none;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          margin-left: 20px;
          li {
            display: flex;
            align-items: center;
            padding: 0 20px;
            border-bottom: 1px solid rgba(230, 230, 231, 0.5);
            height: 50px;
            line-height: 50px;
            span {
              display: flex;
              justify-content: flex-end;
              flex: 1;
              margin-right: 20px;
            }
            &:hover {
              color: var(--main-color-hover);
            }
          }
        }
      }
    }
  }
}
</style>
