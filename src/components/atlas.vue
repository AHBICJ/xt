<template>
  <div class="atlas">
    <el-carousel :interval="5000" arrow="always" height="500px">
      <el-carousel-item v-for="item in photo" :key="item">
        <!-- <img :src="item" alt /> -->
        <div
          ref="height"
          class="imgbox-city"
          :style="{backgroundImage:'url('+$imgaddress(item)+')'}"
        ></div>
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
        "http://5b0988e595225.cdn.sohucs.com/images/20180925/f0858c6995394f4c9e9e073efb049fdc.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569083204957&di=10a399fdc114d8c75b7d82dcda36904d&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1811%2F27%2Fc25%2F121285181_1543316055481_mthumb.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569083316313&di=fecf68f20a15e13fefa52d486c869936&imgtype=0&src=http%3A%2F%2Fbbs-fd.zol-img.com.cn%2Ft_s1200x5000%2Fg5%2FM00%2F0C%2F0C%2FChMkJleTXx-IKLp-AA6MhGu2TR4AATwUgLil9IADoyc339.jpg"
      ]
    };
  },
  methods: {},
  mixins: [Address]
};
</script>

<style lang="scss" scoped>
.atlas {
  width: 800px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149),0 6px 18px 0 rgba(25, 45, 155, 0.3);
  .imgbox-city {
    height: 100%;
    overflow: hidden;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center center !important;
  }
}
</style>

