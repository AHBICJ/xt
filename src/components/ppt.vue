<template>
  <div class="ppt">
    <div class="mt150">
      <div v-for="item in photo " :key="item">
        <router-link :to="'/article/774 '">
          <img :src="item" alt />
        </router-link>
      </div>
    </div>
    <div class="mt50">
      <div v-for="item in photo2 " :key="item">
        <img :src="item" alt />
      </div>
    </div>
  </div>
</template>

<script>
import Address from "@/mixin/Address";

export default {
  data() {
    return {
      photo: [
        // this.imgAddress("2022bd81-0b77-4255-9270-c045a13ded6a.jpg"),
        // this.imgAddress("d7c25b27-3d06-4dd9-b253-29ab01943f7e.jpg"),
        // this.imgAddress("e966813e-30d6-4c8c-8fa2-f846ab20498f.jpg")
        "images/ppt/001.jpg",
        "images/ppt/002.jpg",
        "images/ppt/003.jpg",
      ],
      photo2: [
        // this.imgAddress("0fe21c13-f679-4521-954c-77c25bb5b751.jpg"),
        // this.imgAddress("48e05203-bbb6-4a97-8b9a-693f50aa7f5f.jpg"),
        // this.imgAddress("6cd3070d-6f53-45c6-9c7d-4ac525a29784.jpg")
         "images/ppt/004.jpg",
        "images/ppt/005.jpg",
        "images/ppt/006.jpg",
      ]
    };
  },
  methods: {},
  mixins: [Address]
};
</script>

<style lang="scss" scoped>
.ppt {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 740px;

  .mt150 {
    padding-top: 20%;
    text-align: center;
  }
  .mt50 {
    text-align: center;
  }
  img {
    width: 320px;
    height: 180px;
    margin-bottom: 40px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 6px 18px 0 rgba(25, 45, 155, 0.3);
    cursor: pointer;
  }
}
</style>

