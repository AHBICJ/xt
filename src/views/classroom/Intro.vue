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
    }
  }
}
</style>

