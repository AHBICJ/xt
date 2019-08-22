<template>
  <div class="picList">
    <!-- 这个是只有一张图的 -->
    <!-- <div class="tab-item" :style="{backgroundImage: 'url('+cities[currentCityId].items[currentId].imgSrc+')'}"></div> -->
    <!-- 打算每张图都有一个div 然后来做transition -->
    <div class="tab-cont">
      <transition-group>
        <div
          class="tab-item"
          v-for="(item,idx) in this.cities[currentCityId].items"
          :key="item.imgSrc"
          v-show="idx==currentId"
          :style="{backgroundImage: 'url('+item.imgSrc+')'}"
        ></div>
      </transition-group>
    </div>
    <div class="tab-bar">
      <div class="title middle">
        <div class="title-txt">
          <div>{{cities[currentCityId].name}}</div>
        </div>
      </div>
      <div class="tab-track justify">
        <div
          class="tab-term"
          v-for="(item,idx) in this.cities[currentCityId].items"
          :key="idx"
          :class="['t'+(idx+1),{'cur':idx==currentId}]"
          @mouseenter="currentId=idx"
        >
          <div class="txt">
            <a :href="item.link" target="_blank" :title="item.title">{{item.title}}</a>
          </div>
        </div>
      </div>
      <div class="p-more middle">
        <a href="/character.html" class="link middle-cont">查看更多</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCityId: 0,
      currentId: 0,
      // current:
      //   "http://www.ihchina.cn/Uploads/Picture/2019/06/20/s5d0ae2caabc3c.jpg",
      cityLegth: 2,
      cities: [
        {
          cityidx: 0,
          name: "绍兴",
          items: [
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/06/20/s5d0ae2caabc3c.jpg",
              title: "刘兰芳：从艺60周年回眸",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/06/19/s5d09de0f0e2c1.jpg",
              title: "刘魁立：行走田野 问俗追风",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/03/15/s5c8b0c06cdd1d.jpg",
              title: "张树萍：初心不改，戏大于天",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/03/15/s5c8b0c84ddbdd.jpg",
              title: "姚惠芬：走进威尼斯双年展的中国苏绣大师",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/02/20/s5c6d05d8e0d67.jpg",
              title: "尚长荣：“老戏骨”的创新之路",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/02/20/s5c6d05e3cab99.jpg",
              title: "刘锡诚：心无旁骛的民间文学守望者",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            }
          ]
        },
        {
          cityid: 1,
          name: "台州",
          items: [
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/06/20/s5d0ae2caabc3c.jpg",
              title: "刘兰芳：从艺60周年回眸",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/06/19/s5d09de0f0e2c1.jpg",
              title: "刘魁立：行走田野 问俗追风",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/03/15/s5c8b0c06cdd1d.jpg",
              title: "刘兰芳：从艺60周年回眸",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/03/15/s5c8b0c84ddbdd.jpg",
              title: "刘兰芳：从艺60周年回眸",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/02/20/s5c6d05d8e0d67.jpg",
              title: "刘兰芳：从艺60周年回眸",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "http://www.ihchina.cn/Uploads/Picture/2019/02/20/s5c6d05e3cab99.jpg",
              title: "刘兰芳：从艺60周年回眸",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            }
          ]
        }
      ]
    };
  },
  // props: {
  //   cities: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
  methods: {}
};
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
.picList {
  position: relative;
  height: 100%;
  width: 100%;
  background: url(http://www.ihchina.cn/Public/static/themes/image/temp/img8.jpg)
    center no-repeat;
  background-size: cover;
  .tab-cont {
    transition: visibility 0.3s, opacity 0.3s, right 0.8s;

    .tab-item {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 50%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .tab-bar {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    right: 0;
    .title {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 13%;
      .title-txt {
        writing-mode: vertical-lr;
        position: relative;
        padding: 45px 0px;
        width: 1em;
        font-size: 30px;
        line-height: 1;
      }
      // 绍兴 上下两块
      .title-txt::before,
      .title-txt::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 34px;
        height: 24px;
        background: url(../assets/images/png11.png) no-repeat;
      }
      .title-txt::before {
        top: 0;
        background-position: left;
      }
      .title-txt::after {
        bottom: 0;
        background-position: right;
      }
    }
    // ‘绍兴’ 垂直居中
    .middle {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    // 链接水平 空格分布
    .justify {
      display: flex;
      justify-content: space-between;
    }
    .tab-track {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 26%;
      width: 42%;
      .tab-term {
        position: relative;
        display: inline-block;
        width: 22px;
        height: 100%;
        vertical-align: top;
        cursor: pointer;
        .txt {
          position: relative;
          padding: 25px 0 30px;
          background: url(../assets/images/png14.png);
          font-family: "微软雅黑";
          font-size: 16px;
          line-height: 1.375;
          white-space: nowrap;
          a {
            writing-mode: vertical-lr;
          }
        }
        .txt::before {
          top: 0;
          background-position: left top;
        }
        .txt::before,
        .txt::after {
          content: "";
          position: absolute;
          left: 0;
          width: 22px;
          height: 12px;
          background: url(../assets/images/png12.png) no-repeat;
        }
        .txt::after {
          bottom: 0;
          background-position: right top;
        }
      }
      .tab-term::before {
        content: "";
        position: absolute;
        right: 50%;
        top: 0;
        bottom: 0;
        border-left: 1px solid #ccc;
      }
      .cur {
        color:var(--main-color);
        // color: #9a2929;
      }
      .cur::before {
        // border-left: 1px solid #9a2929;
        border-left: 1px solid var(--main-color);
      }
      .cur .txt::before {
        background-position: left bottom;
      }
      .cur .txt::after {
        background-position: right bottom;
      }

      .t1 .txt {
        top: 40%;
      }
      .t2 .txt {
        top: 27%;
      }
      .t3 .txt {
        top: 42%;
      }
      .t4 .txt {
        top: 36%;
      }
      .t5 .txt {
        top: 48%;
      }
      .t6 .txt {
        top: 34%;
      }
    }
    // 更多
    .p-more {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 75%;
      width: 1em;
      .link {
        position: relative;
        padding: 35px 4px;
        background: url(../assets/images/png14.png);
        font-family: "微软雅黑";
        font-size: 16px;
        writing-mode: vertical-lr;
        line-height: 1;
      }
      // 更多的上下两块背景
      .link::before {
        left: 0;
        top: 0;
        background-position: left;
      }
      .link::before,
      .link::after {
        position: absolute;
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        background: url(../assets/images/png13.png) no-repeat;
      }
      .link::after {
        right: 0;
        bottom: 0;
        background-position: right;
      }
    }
    // 更多的竖线
    .p-more::before {
      content: "";
      position: absolute;
      right: 50%;
      display: block;
      height: 100%;
      border-left: 1px solid #ccc;
    }
  }
  // 左侧大图动画
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity ease 0.3s;
  }
}
</style>
