<template>
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
    
    <div v-show="flag1" > <ppt/>   </div>
    <div v-show="flag2" > <myvideo/>    </div>
  </div>
</template>

<script>
import ppt from "@/components/ppt.vue";
import myvideo from "@/components/myvideo.vue";
export default {
  data() {
    return {
      menu: ["课件", "视频", "图集"],
      index: 0,
      flag1:false,
      flag2:false
    };
  },
  methods: {
    son(item, idx) {
      this.index = idx;
      if(idx==0) 
      {
        this.flag1=true;
        this.flag2=false;
      }
      else  if(idx==1) 
      {
        this.flag1=false;
        this.flag2=true;
      }
    }
  },
   components: {
    ppt,
    myvideo
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 80%;
  height: 80%;
  margin: auto auto;
  // background-color: beige;
  display: grid;
  grid-template-columns: 4fr 6fr;
  .left {
    display: flex;
    flex-direction: column;
    padding-top: 45%;
    padding-left: 30%;
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
</style>

