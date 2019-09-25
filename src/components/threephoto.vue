<template>
  <div class="threephoto">
    <div class="content">
      <div class="left">
        <div>
          <div v-show="flag1">
            <h2>教学的课件</h2>
            <p>在本网站中我还提供了多而精美的课件，供老师自由的挑选和采用，方便老师的教学，减轻老师的教学压力。</p>
          </div>
          <div v-show="flag2">
            <h2>众多的视频</h2>
            <p>为了能让读者更好的了解乡土文化风情，我们提供了种类繁多的欣赏视频供浏览者观看，方便浏览者的学习。</p>
          </div>
          <div v-show="flag3">
            <h2>精美的图集</h2>
            <p>我们同样也为浏览者提供了精美的图集，方便浏览者下载观看，让浏览者领略乡土文化的韵味，感受乡土之美</p>
          </div>
          <ul class="bottom50">
            <li
              class="liMenu"
              :class="idx==index?'hover':''"
              @click="son(item,idx)"
              v-for="(item,idx) in menu"
              :key="idx"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <ppt v-show="flag1" />
        <myvideo v-show="flag2" />
        <atlas v-show="flag3" />
      </div>
    </div>
  </div>
</template>

<script>
import ppt from "@/components/ppt.vue";
import myvideo from "@/components/myvideo.vue";
import atlas from "@/components/atlas.vue";
export default {
  data() {
    return {
      menu: ["课件", "视频", "图集"],
      index: 0,
      flag1: true,
      flag2: false,
      flag3: false
    };
  },
  methods: {
    son(item, idx) {
      this.index = idx;
      if (idx == 0) {
        this.flag1 = true;
        this.flag2 = false;
        this.flag3 = false;
      } else if (idx == 1) {
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = false;
      } else if (idx == 2) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = true;
      }
    }
  },
  components: {
    ppt,
    myvideo,
    atlas
  }
};
</script>

<style lang="scss" scoped>
.threephoto {
  display: flex;
  justify-content: center; //子元素水平居中
  align-items: center; //子元素垂直居中
  height: 100%;
  background-image: url("../assets/images/BG7.jpg");
  background-size: cover;
}
.content {
  width: 1200px;
  height: 775px;
  margin: auto auto;
  display: grid;
  grid-template-columns: 3fr 7fr;
  .left {
    display: flex;
    // flex-direction: column;
    // justify-content: center; //子元素水平居中
    // align-items: center; //子元素垂直居中
    flex-direction: column-reverse;
    text-align: left;
    .bottom50 {
      height: 300px;
      margin-bottom: 50px;
    }
    li {
      float: left;
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 5px;
    }
    h2 {
      font-size: 40px;
      line-height: 48px;
      font-weight: 500;
    }
    p {
      // font-family: RalewayMedium, Helvetica, sans-serif;
      font-size: 16px;
      line-height: 24px;
      padding: 5% 0;
    }
    .liMenu {
      margin-right: 30px;
      cursor: pointer;
    }
    .liMenu.hover {
      color: var(--main-color);
      border-bottom: 2px solid var(--main-color);
    }
  }
  .right {
    display: flex;
    justify-content:flex-end; //子元素水平居中
    align-items: center; //子元素垂直居中
  }
}
// .v-enter,
// .v-leave-to {
//   opacity: 0;
// }
// .v-enter-active {
//   transition: all 1.4s ease;
// }
</style>

