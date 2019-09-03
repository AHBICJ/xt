<template>
  <div class="right">
    <el-carousel :interval="5000" arrow="always" height="500px" >
      <el-carousel-item v-for="item in photo" :key="item">
        <img :src="item" alt />
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
        "https://dpic.tiankong.com/ax/3s/QJ7116694466.jpg?x-oss-process=style/794ws",
        "https://dpic.tiankong.com/75/fh/QJ6113497868.jpg?x-oss-process=style/794ws",
        "http://5b0988e595225.cdn.sohucs.com/images/20180925/f0858c6995394f4c9e9e073efb049fdc.jpeg"
      ]
    };
  },
  methods: {},
  mixins: [Address]
};
</script>

<style lang="scss" scoped>
.right {
  padding: 15% 17% 10% 3%;
  margin: 0 auto;
}
</style>

