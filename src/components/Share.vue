<template>
  <div class="Share">
    <!-- 发表分享dialog -->

    <div class="sharetop" @click="dialogVisible = true; show=!show">
      <div class="tx">
        <el-avatar class="el-dropdown-link" ref="popupbutton" :size="40" :src="avatar"></el-avatar>
      </div>
      <div class="share_word" v-show="!show">快来和大家分享你的收获吧~</div>
      <div class="share_word" v-show="show">{{user.name}}</div>
      <div class="share_btn" v-show="!show">
        <el-button type="primary" size="40" icon="el-icon-edit" circle></el-button>
      </div>
    </div>
    <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="collapse" v-show="show">
        <div class="share_dialog" title="分享" :visible.sync="dialogVisible">
          <div class="create">
            <el-form ref="form" :model="form" label-width="100px" class="myform">
              <!-- <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
              </el-form-item>-->

              <el-form-item  class="share_content">
                <el-input type="textarea" v-model="form.desc" placeholder="分享内容"></el-input>
              </el-form-item>
              <div class="myrow_foot">
                <div class="foot_left">
                  <el-upload
                    class="upload-demo"
                    :action="upload_api"
                    multiple
                    :limit="3"
                    :file-list="fileList"
                    list-type="picture"
                  >
                    <el-form-item label="分享图片">
                      <el-button size="small" type="primary" class="mybutton ml35">
                        <i class="el-icon-plus"></i>
                      </el-button>
                    </el-form-item>
                  </el-upload>

                  <el-form-item label="分享视频">
                    <el-button size="small" type="primary" @click="flag1=!flag1" class="mybutton">
                      <i class="el-icon-video-play"></i>
                    </el-button>
                  </el-form-item>
                  <el-collapse-transition>
                    <div v-show="flag1">
                      <el-input v-model="form.video"></el-input>
                    </div>
                  </el-collapse-transition>
                </div>
                <div class="foot_right">
                  <el-button class="footer_btn" @click="dialogVisible = false">取 消</el-button>
                  <el-button class="footer_btn" type="primary" @click.native="submit_task">确 定</el-button>
                </div>
              </div>
            </el-form>
          </div>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click.native="submit_task">确 定</el-button>
          </div>-->
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        title: "",
        date: "",
        intro: "",
        number: "",
        video: "",
        picimg: ""
      },
      user: this.$store.state.user,
      picList: [],
      fileList: [],
      flag1: false,
      show: false,
      upload_api: process.env.VUE_APP_CDN
    };
  },
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
  },
  computed: {
    avatar() {
      return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    }
  },
  mixins: [Address]
};
</script>

<style lang="scss">
.Share {
  .share_dialog {
    .el-dialog__body {
      padding: 0 20px;
    }
    .el-dialog {
      margin-top: 20vh !important;
    }
  }
  //表单
  .el-textarea__inner {
    min-height: 150px !important;
  }
  .el-form-item {
    margin: 0;
  }
  .share_content{
  .el-form-item__content {
    margin:0 16px !important;
  }
  }
}
</style>

<style lang="scss" scoped>
.Share {
  background-color: #fff;
  margin-bottom: 20px;
  // align-items: center;
  // display: flex;
  min-height: 72px;
  padding: 0 8px;
  position: relative;
  z-index: 0;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  border-radius: 8px;
  overflow: hidden;
  // dialog
  .collapse {
    transition: height 0.3s ease-in-out;
    overflow: hidden;
  }
  .create {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    p {
      margin-left: 32px;
      span {
        color: var(--main-color);
        margin-left: 10px;
      }
    }
    // .myform {
    //   margin-top: 25px;
    // }
    .myrow_foot {
      display: flex;
      flex: 0 0 auto;
      // flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      flex-flow: row wrap;
      padding: 8px;
      align-items: center;
      .mybutton {
        width: 45px;
        height: 30px;
        margin-right: 20px;
      }
      .foot_left {
        display: flex;
        flex-grow: 99999;
        flex-shrink: 0;
        flex-direction: row;
        align-items: center;
      }
      .foot_right {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: flex-end;
        flex-shrink: 0;
        padding: 0 16px 16px 16px;
        padding-left: 0;
      }
    }
  }
  .sharetop {
    cursor: pointer;
    display: flex;
    align-items: center;
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
}
</style>