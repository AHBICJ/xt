<template>
  <el-carousel :interval="5000" height="300px">
    <el-carousel-item v-for="item in lanterns" :key="item.photo">
      <!-- <el-image :src="$imgaddress(item.photo)" :fit="fits[1]"></el-image> -->
      <div ref="height" class="imgbox-city" :style="{backgroundImage:'url('+$imgaddress(item.photo)+')'}"></div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props:['lanterns'],
  data(){
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    }
  }
}
</script>
<style lang="scss">
.imgbox-city{
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background: no-repeat;
  background-position: 50% 50%;
}
</style>
<style lang="scss" scoped>
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

