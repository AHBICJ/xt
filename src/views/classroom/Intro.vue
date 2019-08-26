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
      <div class="classintroLeft">
        <classright />
      </div>
      <div class="classintroRight">
        <div class="share">
          <div class="tx">
            <el-avatar class="el-dropdown-link" ref="popupbutton" :size="40" :src="avatar"></el-avatar>
          </div>
          <div class="share_word">快来和大家分享你的收获吧~</div>
          <div class="share_btn">
            <el-button type="primary" size="40" icon="el-icon-edit" circle></el-button>
          </div>
        </div>
        <div class="classmessage">
          <div class="message_title">
            <div class="pic"></div>
            <div class="title">哈哈哈老狗比我是任务哦</div>
          </div>
          <div class="message_content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    classright
  }
};
import classright from "@/components/classright.vue";
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 20%;
  margin-top: 50px;
  .left {
    flex-grow: 1;
    display: flex;
    margin-right: 20px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 700px;
    height: auto;
    border: 0.0625rem solid #dadce0;
    border-radius: 0.5rem;
    border-radius: 30upx;
    overflow: auto;
    padding: 30px;
    text-align: left;
    p {
      height: 50px;
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
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #dadce0;
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
          box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
            0 2px 6px 2px rgba(60, 64, 67, 0.149);
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
          .pic {
            display: flex;
            flex: 0 0 auto;
            height: 36px;
            justify-content: center;
            text-align: center;
            font-size: 16px;
            line-height: 32px;
            margin-right: 16px;
            width: 36px;
          }
          .title {
            display: flex;
            flex: 1 1 auto;
            flex-direction: row;
            overflow: hidden;
            //
            letter-spacing: 0.25px;
            font-family: "Google Sans", Roboto, Arial, sans-serif;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: #3c4043;
          }
        }
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
          position:absolute;
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
  }
}
</style>

