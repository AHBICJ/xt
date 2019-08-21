<template>
  <el-carousel :interval="100000" type="card" height="360px">
    <el-carousel-item v-for="item in items" :key="item">
      <div ref="height" class="imgbox" :style="{backgroundImage:'url('+ imgaddress(item)+')'}"></div>
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
    };
  },
  computed:{
    items(){
      return JSON.parse(this.pptimages)
    }
  },
  name: "carouselsppt",
  props: {
    pptimages: {
      type: String
    }
  },
  methods: {
  imgaddress(image) {
  if (!image) return "null"
  if (image.toString().startsWith("http")) {
    return image
  } else {
    return process.env.VUE_APP_CDN + image
  }
}
  }
};
</script>