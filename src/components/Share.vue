<template>
  <div class="Share">
    <!-- 格子布局 左侧头像 -->
    <div class="shareLeft">
      <el-avatar class="avatar" :size="40" :src="avatar"></el-avatar>
    </div>
    <!-- 分享右侧 -->
    <div class="shareRight">
      <!-- 具体分享 -->
      <div class="shareMainContent">
        <!-- 输入框 -->
        <el-input
          type="textarea"
          autosize
          v-model="form.shareText"
          placeholder="快来和大家分享你的收获吧~"
          @focus="showShareDetail=true"
          :class="[showShareDetail ? 'detailTextarea' : 'noborderTextarea','shareTextarea']"
        />
        <!-- 分享图片 与链接 -->
        <el-collapse-transition>
          <div class="shareMainExtendContent" v-show="showShareDetail">
            <p class="shareTitle">分享影音:</p>
            <el-upload
              :action="upload_api"
              list-type="picture-card"
              :file-list="form.picsToShow"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              class="upload-content"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <p class="shareTitle">分享链接:</p>
            <div class="urls">
              <div class="urlItem" v-for="(url,idx) in form.urls" :key="idx">
                <div class="urlItemLeft">
                  <el-input v-model="form.urls[idx].url"></el-input>
                </div>
                <div class="urlItemRight">
                  <el-button
                    type="danger"
                    icon="el-icon-minus"
                    size="mini"
                    circle
                    @click="removeUrl(idx)"
                  />
                </div>
              </div>
              <div class="urlItem">
                <div class="urlItemLeft">
                  <el-input v-model="form.currentUrl" />
                </div>
                <div class="urlItemRight">
                  <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="addUrl" />
                </div>
              </div>
            </div>

            <div class="footer">
              <el-button @click="showShareDetail = false">取 消</el-button>
              <el-button type="primary" @click.native="submitShare">确 定</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <!-- 未展开之前的图标 -->
      <transition name="el-fade-in">
        <div class="shareMainRight" v-show="!showShareDetail">
          <el-button type="primary" icon="el-icon-edit" circle @click="showShareDetail=true" />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { create_task } from "@/api/toPost.js";
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      showShareDetail: false,
      form: {
        shareText: "",
        currentUrl: "",
        // 真正上传和维护的数据
        pics: [],
        // 需要修改和更新的 在获得数据修改这个 加上cdn前缀 之后不用管
        picsToShow: [],
        urls: []
      },
      upload_api: process.env.VUE_APP_API + "/upload"
    };
  },
  computed: {
    avatar() {
      return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    }
  },
  methods: {
    submitShare() {
      let datas = {
        room_id: this.$route.params.id,
        intro: this.form.shareText,
        picimg: JSON.stringify(this.form.pics),
        link: JSON.stringify(this.form.urls)
      };
      create_task(datas)
        .then(res => {
          this.$emit("shareCreated", res);
          this.showShareDetail = false;
          this.form.shareText = "";
          this.form.currentUrl = "";
          this.form.pics = [];
          this.form.picsToShow = [];
          this.form.urls = [];
        })
        .catch(() => {});
    },
    removeUrl(idx) {
      this.form.urls.splice(idx, 1);
    },
    addUrl() {
      this.form.urls.push({ title: "网页链接", url: this.form.currentUrl });
      this.form.currentUrl = "";
    },
    handleSuccess(res, file) {
      this.form.pics.push({ name: file.name, url: res.data[0] });
    },
    handleRemove(file) {
      this.form.pics.splice(this.form.pics.indexOf(file.name), 1);
    }
  },
  mixins: [Address]
};
</script>

<style lang="scss">
.Share {
  .shareRight {
    .shareMainContent {
      .shareTextarea > textarea {
        resize: none;
        padding: 10px;
        font-size: 16px;
        overflow-y: hidden;
        transition: border ease-in-out 0.3s, padding ease-in-out 0.3s;
      }
      .noborderTextarea > textarea {
        padding: 10px 0px;
        border: 1px solid transparent;
      }
      .detailTextarea > textarea {
        border: 1px solid #dcdfe6;
        &:focus {
          border-color: #e0b969;
        }
      }
      .shareMainExtendContent {
        .upload-content {
          margin-right: -8px;
          ul > li {
            width: 142px;
            height: 142px;
          }
          .el-upload--picture-card {
            width: 142px;
            height: 142px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.Share {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px 20px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 60px auto;
  .shareLeft{
    padding-top: 2px;
  }
  .shareRight {
    display: flex;
    align-items: center;
    .shareMainContent {
      flex: 1 1 auto;
      .shareMainExtendContent {
        .footer {
          margin-top: 20px;
          text-align: right;
        }
        .shareTitle {
          margin: 20px 0 5px;
          color: #666;
          font-size: 15px;
        }
        .urls {
          .urlItem {
            display: grid;
            grid-template-columns: auto 30px;
            grid-column-gap: 10px;
            margin-bottom: 5px;
            .urlItemLeft {
              width: 100%;
              justify-self: start;
              align-self: center;
            }
            .urlItemRight {
              width: 100%;
              justify-self: end;
              align-self: center;
            }
          }
        }
      }
    }
    .shareMainRight {
      flex: 0 0 60px;
      text-align: right;
    }
  }
}
</style>