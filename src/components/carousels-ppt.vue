<template>
  <el-carousel :interval="100000" type="card" height="300px">
    <el-carousel-item v-for="item in info.items" :key="item.id">
      <div ref="height" class="imgbox" :style="{backgroundImage:'url('+item.imgsrc+')'}"></div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.imgbox {
  height: 100%;
  /* width: 100%; */
  overflow: hidden;
  background-size: cover;
  background-position:  center center;
  background-color: #eee;
}
</style>

<script>
export default {
  data() {
    return {
      // bannerHeight: 1000,
      // screenWidth: 1920
    };
  },
  name: "carouselsppt",
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {}
};
</script>