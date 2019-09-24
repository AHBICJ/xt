<template>
  <div class="picList">
    <!-- 这个是只有一张图的 -->
    <!-- <div class="tab-item" :style="{backgroundImage: 'url('+cities[currentTypeId].items[currentId].imgSrc+')'}"></div> -->
    <!-- 打算每张图都有一个div 然后来做transition -->
    <div class="tab-cont">
      <transition-group>
        <div
          class="tab-item"
          v-for="(item,idx) in this.cities[currentTypeId].items"
          :key="`${item.imgSrc}${idx}`"
          v-show="idx==currentId"
          :style="{backgroundImage: 'url('+item.imgSrc+')'}"
        ></div>
      </transition-group>
    </div>
    <div class="tab-bar">
      <div class="title middle">
        <div class="title-txt">
          <div
            class="title-top"
            v-on:click="changetype_top()"
            @__mouseenter="hoverClass()"
            @__mouseleave="removeHoverClasss()"
          ></div>
          <div class="titleword">{{cities[currentTypeId].name}}</div>
          <div
            class="title-bottom"
            v-on:click="changetype_bottom()"
            @__mouseenter="hoverClass()"
            @__mouseleave="removeHoverClasss()"
          ></div>
        </div>
      </div>
      <div class="tab-track justify">
        <div
          class="tab-term"
          v-for="(item,idx) in this.cities[currentTypeId].items"
          :key="`${item.title}${idx}`"
          :class="['t'+(idx+1),{'cur':idx==currentId}]"
          @mouseenter="currentId=idx"
        >
          <div class="txt">
            <a :href="item.link" target="_blank" :title="item.title">{{item.title}}</a>
          </div>
        </div>
      </div>
      <div class="p-more middle">
        <a @click="$router.push({path:'/city/4'})" class="link middle-cont">查看更多</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTypeId: 0,
      currentId: 0,
      // current:
      //   "http://www.ihchina.cn/Uploads/Picture/2019/06/20/s5d0ae2caabc3c.jpg",
      cityLegth: 2,
      cities: [
        {
          typeid: 0,
          name: "风俗民情",
          items: [
            {
              imgSrc: "images/piclistimg/sxms.png",
              title: "绍兴 · 绍兴美食",
              link: "/article/770"
            },
            {
              imgSrc: "images/piclistimg/ssldsh.png",
              title: "杭州 · 河上龙灯盛会",
              link: "article/245"
            },
            {
              imgSrc:
                "images/piclistimg/lz.png",
              title: "宁波 · 宁波梁祝传说",
              link: "article/700"
            },
            {
              imgSrc:
                "images/piclistimg/tsdzmg.png",
              title: "温州 · 泰顺畲族民歌",
              link: "article/464"
            },
            {
              imgSrc:
                "images/piclistimg/wfzzz.png",
              title: "嘉兴 · 五芳斋粽子",
              link: "article/368"
            },
            {
              imgSrc:
                "images/piclistimg/dn.png",
              title: "金华 · 斗牛",
              link: "article/311"
            }
          ]
        },
        {
          typeid: 1,
          name: "古建遗存",
          items: [
            {
              imgSrc: "images/piclistimg/sxj.png",
              title: "台州 · 神仙居",
              link: "article/818"
            },
            {
              imgSrc:
                "images/piclistimg/ylgjz.png",
              title: "舟山 · 园林古建筑",
              link: "article/212"
            },
            {
              imgSrc:
                "images/piclistimg/xkgc.png",
              title: "丽水 · 西坑古村",
              link: "article/180"
            },
            {
              imgSrc:
                "images/piclistimg/nbdgz.png",
              title: "衢州 · 廿八都古镇",
              link: "article/254"
            },
            {
              imgSrc:
                "images/piclistimg/lxgl.png",
              title: "绍兴 · 鲁迅故里",
              link: "article/774"
            },
            {
              imgSrc:
                "images/piclistimg/zgbgc.png",
              title: "金华 · 诸葛八卦村",
              link: "article/720"
            }
          ]
        },
        {
          typeid: 2,
          name: "传统技艺",
          items: [
            {
              imgSrc: "images/piclistimg/casjx.png",
              title: "杭州 · 淳安三脚戏",
              link: "article/294"
            },
            {
              imgSrc:
                "images/piclistimg/nsgdzzjy.png",
              title: "宁波 · 宁式糕点制作技艺",
              link: "article/526"
            },
            {
              imgSrc:
                "images/piclistimg/yj.png",
              title: "绍兴 · 越剧文化",
              link: "article/776"
            },
            {
              imgSrc:
                "images/piclistimg/oxjy.png",
              title: "温州 · 瓯绣技艺",
              link: "article/706"
            },
            {
              imgSrc:
                "images/piclistimg/tzlt.png",
              title: "台州 · 台州乱弹",
              link: "article/807"
            },
            {
              imgSrc:
                "images/piclistimg/dshyszjy.png",
              title: "舟山 · 岱山海盐晒制技艺",
              link: "article/213"
            }
          ]
        },
        {
          typeid: 3,
          name: "乡贤名士",
          items: [
            {
              imgSrc: "images/piclistimg/lx.png",
              title: "绍兴 · 中国的民族魂——鲁迅",
              link: "article/775"
            },
            {
              imgSrc:
                "images/piclistimg/lbw.png",
              title: "温州 · 神机妙算文成公——刘伯温",
              link: "http://www.ihchina.cn/character_detail/18817.html"
            },
            {
              imgSrc:
                "images/piclistimg/ysw.png",
              title: "丽水 · 江湖诗派诗人——叶绍翁",
              link: "article/189"
            },
            {
              imgSrc:
                "images/piclistimg/qjg.png",
              title: "台州 · 抗倭名将——戚继光",
              link: "article/840"
            },
            {
              imgSrc:
                "images/piclistimg/lbw.png",
              title: "金华 · “初唐四杰”——骆宾王",
              link: "article/722"
            },
            {
              imgSrc:
                "images/piclistimg/jjs.png",
              title: "宁波 · 民国政坛——蒋介石",
              link: "article/703"
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
  methods: {
    changetype_top() {
      this.currentTypeId -= 1;
      if (this.currentTypeId < 0) {
        this.currentTypeId = 3;
      }
    },
    changetype_bottom() {
      this.currentTypeId += 1;
      if (this.currentTypeId > 3) {
        this.currentTypeId = 0;
      }
    },
    // hoverClass($event) {
    //   this.currentHoverCity = $event.target.dataset.city;
    // },
    // removeHoverClasss() {
    //   this.currentHoverCity = "";
    // }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}
.picList {
  position: relative;
  height: 100%;
  width: 100%;
  background: url(../assets/images/piclistbg.jpg) center no-repeat;
  background-size: cover;
  .tab-cont {
    transition: visibility 0.3s, opacity 0.3s, right 0.8s;

    .tab-item {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 60%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .tab-bar {
    position: absolute;
    left: 40%;
    top: 0;
    bottom: 0;
    right: 0;
    .title {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 13%;
      .title-txt {
        // writing-mode: vertical-lr;
        position: relative;
        padding: 40px 0px;
        width: 36px;
        text-align: center;
        font-size: 30px;
        font-family: "Courier New", Courier, monospace;
        font-weight: bold;
        // line-height: 1.2;
        letter-spacing: 0;
        .titleword {
          pointer-events: none;
        }
        .title-top {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          background-position: left;
          margin: auto;
          width: 34px;
          height: 24px;
          background: url(../assets/images/png11.png) no-repeat;
          transition: all 0.3s ease-in-out 0s;
          cursor: pointer;
          &:hover {
            height: 50px;
            background: url(../assets/images/png11_hover.png) no-repeat;
            position: absolute;
            top: -10px;
          }
        }
        .title-bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 34px;
          height: 24px;
          background: url(../assets/images/png11.png) no-repeat;
          background-position: right;
          transition: all 0.3s ease-in-out 0s;
          cursor: pointer;
          &:hover {
            height: 50px;
            background: url(../assets/images/png11_hover.png) no-repeat;
            background-position: right;
            position: absolute;
            bottom: -20px;
          }
        }
      }
      // 绍兴 上下两块
      // .title-txt::before,
      // .title-txt::after {
      //   content: "";
      //   position: absolute;
      //   left: 0;
      //   right: 0;
      //   margin: auto;
      //   width: 34px;
      //   height: 24px;
      //   background: url(../assets/images/png11.png) no-repeat;
      // }
      // .title-txt::before {
      //   top: 0;
      //   background-position: left;
      // }
      // .title-txt::after {
      //   bottom: 0;
      //   background-position: right;
      // }
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
        color: var(--main-color);
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
      width: 24px;
      text-align: center;
      .link {
        position: relative;
        padding: 35px 4px;
        background: url(../assets/images/png14.png);
        font-family: "微软雅黑";
        font-size: 16px;
        // writing-mode: vertical-lr;
        line-height: 1;
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        letter-spacing: 0;
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
      a {
        cursor: pointer;
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
