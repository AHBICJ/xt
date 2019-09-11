<template>
  <div class="bigcontent">
    <div class="content">
      <div class="left">
        <h2>强大的展示功能</h2>
        <p>借助设计器模板，数以百万计的可重复使用的演示文稿以及PowerPoint-to-Prezi转换器，除非您愿意，否则无需从头开始。</p>
        <ul>
          <li
            class="liMenu"
            :class="idx==index?'hover':''"
            @click="son(item,idx)"
            v-for="(item,idx) in menu"
            :key="idx"
          >{{item}}</li>
        </ul>
      </div>
      <transition>
        <div v-show="flag1">
          <ppt />
        </div>
      </transition>
      <transition>
        <div v-show="flag2">
          <myvideo />
        </div>
      </transition>
      <transition>
        <div v-show="flag3">
          <atlas />
        </div>
      </transition>
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
.bigcontent {
  height: 100%;
  width: 100%;
  background-image: url("../assets/images/BG7.jpg");
  background-size: cover;
}
.content {
  width: 1200px;
  height: 80%;
  margin: auto auto;
  display: grid;
  grid-template-columns: 3fr 7fr;
  .left {
    display: flex;
    flex-direction: column;
    padding-top: 80%;
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
      font-family: RalewayMedium, Helvetica, sans-serif;
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
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active {
  transition: all 1.4s ease;
}
</style>

