<template>
  <!-- <div class="classTop" :style="{backgroundImage:`url(${imgAddress(classinfo.classImgSrc)})`}" :key="classinfo.classImgSrc">
    <div>
      <span class="className">{{classinfo.className}}</span>
      <div class="classIntro">{{classinfo.classDesc}}</div>
    </div>
  </div>-->
  <div class="classTop" style="backgroundImage:url(/images/crbg10.jpg)">
    <div>
      <span class="className">{{classinfo.className}}</span>
      <div class="classIntro">{{classinfo.classDesc}}</div>
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
    classinfo: {
      type: Object
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
    position: relative;
    top:10px;
    left:20px;
    font-size: 36px;
    font-weight: bold;
    line-height: 44px;
  }
  .classIntro {
    position: relative;
    top:20px;
    left:20px;
    font-size: 18px;
    line-height: 30px;
    color: #fff;
  }
}
</style>