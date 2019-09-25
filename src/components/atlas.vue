<template>
  <div class="atlas">
    <el-carousel :interval="5000" arrow="always" height="500px">
      <el-carousel-item v-for="item in photo" :key="item">
        <!-- <img :src="item" alt /> -->
        <div ref="height" class="imgbox-city" :style="{backgroundImage:`url(${item})`}"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      photo: [
        "images/atlas/001.jpg",
        "images/atlas/002.jpg",
        "images/atlas/003.jpg",
        "images/atlas/004.jpg",
        "images/atlas/005.jpg"
      ]
    };
  },
  methods: {},
  mixins: [Address]
};
</script>

<style lang="scss">
.atlas{
  .el-carousel__item{
    background-color: rgb(253,252,250);
  }
}
</style>
<style lang="scss" scoped>
.atlas {
  width: 800px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149), 0 6px 18px 0 rgba(25, 45, 155, 0.3);
  .imgbox-city {
    height: 100%;
    overflow: hidden;
    background-color: #fdfcfa;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center center !important;
  }
}
</style>

