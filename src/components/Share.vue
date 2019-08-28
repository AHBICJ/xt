<template>
  <div class="Share">
    <!-- 发表分享dialog -->

    <el-dialog class="share_dialog" title="分享" :visible.sync="dialogVisible">
      <div class="create">
        <el-form ref="form" :model="form" label-width="100px" class="myform">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="分享内容">
            <el-input type="textarea" v-model="form.intro"></el-input>
          </el-form-item>
          <div class="myrow">
            <el-upload
              class="upload-demo"
              action="http://192.168.123.182:5000/upload"
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
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="submit_task">确 定</el-button>
      </span>
    </el-dialog>

    <div class="share" @click="dialogVisible = true">
      <div class="tx">
        <el-avatar class="el-dropdown-link" ref="popupbutton" :size="40" :src="avatar"></el-avatar>
      </div>
      <div class="share_word">快来和大家分享你的收获吧~</div>
      <div class="share_btn">
        <el-button type="primary" size="40" icon="el-icon-edit" circle></el-button>
      </div>
    </div>
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
      picList: [],
      fileList: [],
      flag1: false
    };
  },
  computed:{
      avatar(){
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
}
</style>

<style lang="scss" scoped>
.Share {
  // dialog
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
    .myform {
      margin-top: 25px;
    }
    .myrow {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      .mybutton {
        width: 45px;
        height: 30px;
        margin-right: 20px;
      }
    }
  }
  .share {
    background-color: #fff;
    margin-bottom: 20px;
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
    cursor: pointer;
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