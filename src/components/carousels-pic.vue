<template>
  <div v-if="havePic">
    <el-carousel :interval="100000" height="480px">
      <el-carousel-item v-for="item in images" :key="item.id">
        <div ref="height" class="imgbox" :style="{backgroundImage:'url('+item.photo_address+')'}"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="attention" v-else>
    <p>该篇文章尚未添加图集，快去看看别的内容吧~</p>
  </div>
</template>

<style scoped>
.imgbox {
  height: 100%;
  /* width: 100%;  */
  overflow: hidden;
  /* background-size: cover; */
  background-position: center center;
  background: no-repeat;
  background-position: 50% 50%;
}
.attention p {
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  text-align: center;
  color: #ddd;
  margin-bottom: 20px;
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
  computed: {
    havePic() {
      return this.images != null;
    }
  }
};
</script>