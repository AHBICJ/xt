<template>
  <el-carousel :interval="100000" height="500px">
    <el-carousel-item v-for="item in images" :key="item.id">
      <div ref="height" class="imgbox" :style="{backgroundImage:'url('+item.photo_address+')'}"></div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.imgbox {
  height: 100%;
  /* width: 100%;  */
  overflow: hidden;
  /* background-size: cover; */
  background-position: center center;
  background: no-repeat;
  background-position:50% 50% ;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  name: "carousels-pic",
  props: {
    images: {
      type: Array
    }
  },
  methods: {},
};
</script>