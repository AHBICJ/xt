<template>
  <div>
    <div class="bigcontent" v-if=" options.isHome">
      <div class="content">
        <div class="mycolor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 5 5"
            class="nav-logo"
          >
            <path
              d="M2.77 1.478h.555v-.193h-.361V.933h-.569v.193h.375v.352zM2.396 1.93h.194v-.569h-.353V1h-.193v.555h.352v.375zM3.164 2.205h.194v-.36h.352v-.569h-.194v.375h-.352v.554z"
              class="logo_basic"
            />
            <path
              d="M2.763 2.059h-.35l-.01.439.194.004.006-.249h.354v-.569h-.194v.375zM4.067 2.395h-.193v.375h-.352v.555h.193v-.361h.352v-.569z"
              class="logo_basic"
            />
            <path
              d="M3.513 2.396H3.07v.194h.637v-.353H4v-.193h-.487v.352zM3.724 3.71v-.194h-.375v-.433h-.554v.194h.36v.433h.569z"
              class="logo_basic"
            />
            <path
              d="M2.747 2.503v.439h.569v-.194h-.375v-.245h-.194zM2.605 4.067v-.193H2.23v-.352h-.555v.193h.361v.352h.569zM2.956 4v-.555h-.352V3.07H2.41v.569h.353V4h.193zM1.484 3.349h.352v-.554h-.194v.36H1.29v.569h.194v-.375z"
              class="logo_basic"
            />
            <path
              d="M2.043 3.316h.194v-.44H2.6v-.194h-.557v.634zM1.126 2.23h.371v-.555h-.193v.361H.933v.569h.193V2.23z"
              class="logo_basic"
            />
            <path
              d="M1.304 2.763H1v.193h.497v-.352h.433V2.41h-.626v.353zM1.651 1.909h.554v-.193h-.36V1.29h-.569v.194h.375v.425zM1.684 2.237h.375v.255h.194v-.449h-.569v.194z"
              class="logo_basic"
            />
          </svg>
          <h1>浙里文化</h1>
        </div>
        <div
          class="mytxt"
        >  <p>浙江，简称“浙”，是中华人民共和国省级行政区。省会杭州，位于中国东南沿海，东临东海，南接福建，西与安徽、江西相连，北与上海、江苏接壤，境内最大的河流钱塘江，因江流曲折，称之江，又称浙江，省以江名，简称"浙"。浙江省总面积10.55万平方千米。浙江地势由西南向东北倾斜，地形复杂。山脉自西南向东北成大致平行的三支。</p> 
        
         <p class="mypadding" >乡土文化无论是物质的、非物质的都是不可替代的无价之宝！对乡土文化的保护和延承也必须覆盖物质的、非物质的各个领域，而且保护始终是第一位的。</p>
         </div>
        <div class="mybottom">
          <div>杭州 | 宁波 | 温州 | 绍兴 | 湖州 | 嘉兴 | 金华 | 衢州 |台州 | 丽水 | 舟山</div>
          <div>浙里文化</div>
        </div>
      </div>
    </div>
    <div class="othermybottom" v-if=" !options.isHome">
      <div class="myborder">杭州 | 宁波 | 温州 | 绍兴 | 湖州 | 嘉兴 | 金华 | 衢州 |台州 | 丽水 | 舟山</div>
      <div>浙里文化</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  props: {
    options: {
      type: Object,
      default() {
        return {
          isHome: false
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.othermybottom {
  height: 100px;
  width: 60%;
  margin:  0 20%;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 30px;
  .myborder{
      padding-top: 20px;
     width: 100%;
     border-top: 2px solid var(--main-color); 
  }
  div{
      margin-bottom:5px;
  }
}
.bigcontent {
  height: 430px;
  width: 100%;
  background-image: url("../assets/images/BG7.jpg");
  display: flex;
  justify-content: center; //子元素水平居中
  align-items: center; //子元素垂直居中
  .content {
    width: 1100px;
    height: 300px;
    div {
      display: flex;
      flex-direction: row;
      align-items: center; //子元素垂直居中
    }
    .mycolor {
      color: var(--main-color);
    }
    .nav-logo {
      display: inline-block;
      height: 60px;
      width: 60px;
      fill: var(--main-color);
    }
    .mytxt {
      margin-bottom: 30px;
      margin-top: 30px;
      line-height: 30px;
      width: 100%;
      padding-left: 5px;
      text-indent: 2em;
      display: grid;
      grid-template-columns: 6fr  4fr;
      .mypadding
      
      {
        padding-left: 70px;
      }
    }
    .mybottom {
      border-top: 2px solid var(--main-color);
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      div {
        // width: 100%;
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
      }
    }
  }
}
</style>

