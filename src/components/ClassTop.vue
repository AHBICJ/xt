<template>
  <div class="classTop" :style="{backgroundImage:'url('+imgAddress(ClassInfo.classImgSrc)+')'}">
    <div>
      <span class="className">{{ClassInfo.className}}</span>
      <div class="classIntro">{{ClassInfo.classDesc}}</div>
    </div>
  </div>
</template>
<script>
import Address from "@/mixin/Address";
export default {
  data() {
    return {};
  },
  props: {
    ClassInfo: {
      type: Object,
      default: () => ({
          className:"乡土1班",
          classDesc:"欢迎加入乡土1班",
          classImgSrc:"39fa58e4-5336-4b00-bb05-47d745a3029c.jpg"
      })
    }
  },
  mixins: [Address]
};
</script>


<style lang="scss" scoped>
.classTop {
  height: 240px;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 8px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .className {
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    line-height: 44px;
  }
  .classIntro {
    font-size: 18px;
    line-height: 30px;
    color: #fff;
  }
}
</style>