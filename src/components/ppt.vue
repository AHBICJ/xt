<template>
  <div class="right">
    <div class="mt150">
      <div v-for="item in photo " :key="item">
        <img :src="item" alt />
      </div>
    </div>
    <div class="mt50">
      <img src="@/assets/images/BG3.png" alt />
      <img src="@/assets/images/BG3.png" alt />
      <img src="@/assets/images/BG3.png" alt />
    </div>
  </div>
</template>

<script>

import Address from "@/mixin/Address";

export default {
    
  data() {
    return {
      photo: [
        // imgAddress('2022bd81-0b77-4255-9270-c045a13ded6a.jpg'),
        // imgAddress('2022bd81-0b77-4255-9270-c045a13ded6a.jpg'),
        // imgAddress('2022bd81-0b77-4255-9270-c045a13ded6a.jpg')
        require("@/assets/images/BG3.png"),
        require("@/assets/images/BG2.png"),
        require("@/assets/images/BG1.png")
      ],
    };
  },
  methods: {},
  mixins: [Address]
};
</script>

<style lang="scss" scoped>
.right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-right: 20%;
  .mt150 {
    padding-top: 35%;
    text-align: center;
  }
  .mt50 {
    padding-top: 15%;
    text-align: left;
  }
  img {
    width: 300px;
    height: 160px;
    margin-bottom: 10%;
    box-shadow: 0 6px 18px 0 rgba(25, 45, 155, 0.3);
  }
}
</style>

