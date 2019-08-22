<template>
  <div class="content">
    <div class="left">
      <div class="top">
        <img src="" alt />
        <div class="txt">
          <h2>林津民</h2>
          <p>
            <i class="el-icon-plus"></i> 疯狂读书?
          </p>
          <p>
            <i class="el-icon-plus"></i> 从未迟到?
          </p>
        </div>
        <div class="txt mr50">
          <p>班级：三年级二班</p>
          <p>入学时间：2019年9月</p>
        </div>
      </div>
      <div class="buttom">
        <el-tabs v-model="activeName">
          <el-tab-pane label="个人信息" name="first">
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
                  <input type="text" placeholder="请填写你的用户名称" />
                  <a href @.stop>修改</a>
                </li>
                <li>
                  <span>个人介绍</span>
                  <input type="text" placeholder="填写兴趣爱好、擅长的事情、喜欢的事情等" />
                  <a href @.stop>修改</a>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="second">
            <ul>
              <li>
                <span>旧密码</span>
                <input type="text" class="ml78" placeholder="请输入原密码（初次设置时可留空）" />
              </li>
              <li>
                <span>新密码</span>
                <input type="text" class="ml78" placeholder="请输入新密码）" />
              </li>
              <li>
                <span>确认新密码</span>
                <input type="text" placeholder="确认新密码" />
              </li>
            </ul>
            <el-button class="ml400" type="primary">确认修改</el-button>
          </el-tab-pane>
          <el-tab-pane label="点赞" name="third">
            <div class="zan">
              <p>
                <span>专栏</span> · 文章 / 2天前
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
          <el-tab-pane label="收藏" name="four">
            <div class="zan">
              <p>
                <span>专栏</span> · 文章 / 2天前
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
          <el-tab-pane label="历史浏览记录" name="five">
            <div class="zan">
              <p>
                <span>专栏</span> · 文章 / 2天前
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
        </el-tabs>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="txt">
          <p>被表扬</p>
          <span>123</span>
        </div>
        <div class="txt">
          <p>被点赞</p>
          <span>109</span>
        </div>
      </div>
      <div class="buttom">
        <ul>
          <li>
            观看文章
            <span>23</span>
          </li>
          <li>
            完成任务
            <span>49</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      activeName: "first"
    };
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
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #f4f5f5;
  height: 97%;
  padding-top: 20px;
  .left {
    width: 708px;
    height: 160px;
    margin-left: 475px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: white;
    .top {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      background-color: white;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-left: 50px;
        margin-top: 30px;
      }
      .txt {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-left: 30px;
        h2 {
          margin-top: 40px;
        }
        p {
          color: #4a68ad;
          margin-top: 8px;
          margin-left: 5px;
        }
      }
      .mr50 {
        margin-left: 200px;
        margin-top: 50px;
      }
    }
    .buttom {
      margin-top: 50px;
      background-color: white;
      width: 100%;
      height: auto;
      padding: 30px;
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
            margin-left: 80px;
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
        ul {
          display: block;
          list-style-type: disc;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 40px;
          li {
            display: flex;
            align-items: center;
            padding: 2rem 0;
            border-bottom: 1px solid #f1f1f1;
            list-style: none;
            input {
              display: inline-block;
              border: none;
              outline: none;
              color: #a1a1a1;
              font-size: 16px;
              width: 410px;
              margin-left: 50px;
            }
            a {
              color: var(--main-color);
              font-size: 16px;
              text-decoration: none;
            }
          }
        }
      }
      .ml78 {
        margin-left: 78px;
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
    .ml400 {
      margin-left: 520px;
    }
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
      li {
        display: flex;
        align-items: center;
        padding: 2rem 0;
        border-bottom: 1px solid #f1f1f1;
        list-style: none;
        input {
          display: inline-block;
          border: none;
          outline: none;
          color: #a1a1a1;
          font-size: 16px;
          width: 410px;
          margin-left: 50px;
        }
        a {
          color: #007fff;
          font-size: 16px;
          text-decoration: none;
        }
      }
    }
  }
  .right {
    width: 240px;
    height: 160px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 20px;
    width: 220px;
    .top {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      background-color: white;
      height: 115px;
      width: 220px;
      .txt {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 50%;
        p {
          font-size: 16px;
          font-weight: 300;
          margin-left: 30px;
          margin-top: 30px;
        }
        span {
          margin-top: 0.5rem;
          font-size: 1.25rem;
          font-weight: 400;
          margin-left: 35px;
          margin-top: 5px;
        }
      }
    }
    .buttom {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
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
          border-bottom: 1px solid rgba(230, 230, 231, 0.5);
          height: 50px;
          line-height: 50px;
          span {
            margin-left: 70px;
          }
        }
      }
    }
  }
}
</style>
