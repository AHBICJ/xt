<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <nav-bar :options="navbarOptions" />
        <slick :options="slickOptions" />
      </div>
      <div class="section">
        <pic-list />
      </div>
      <div class="section">
        <threephoto />
      </div>
      <div class="section">
        <z-j-map />
      </div>
      <div class="section fp-auto-height">
        <bottombar :options="bottombaroptions" />
      </div>
    </full-page>
  </div>
</template>

<script>
import Vue from "vue";
import VueFullPage from "vue-fullpage.js";
Vue.use(VueFullPage);
import Slick from "@/components/Slick";
import PicList from "@/components/PicList";
import NavBar from "@/components/NavBar";
import ZJMap from "@/components/ZJMap";
import "@/styles/fullpage.css";
import { getLanterns } from "@/api/toGet";
import threephoto from "@/components/threephoto";
import bottombar from "@/components/bottombar";

export default {
  data() {
    return {
      navbarOptions: {
        isHome: true,
        isClassroom: false,
        collapsed: false,
        cityid: 0
      },
      bottombaroptions: {
        isHome: true
      },
      cities: [],
      options: {
        // autoScrolling:false,
        scrollingSpeed: 1000
      },
      slickOptions: {
        items: [],
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 4000,
        pauseOnHover: true
        // fade: true,
      }
    };
  },
  created() {
    this.getSlickItems();
  },
  methods: {
    getSlickItems() {
      getLanterns({ city_id: 14 })
        .then(res => {
          this.slickOptions.items = res.data;
        })
        .catch(error => {
          this.$message({
            message: "获取轮播图异常:" + error.msg,
            type: "error"
          });
        });
    }
  },
  components: {
    Slick,
    PicList,
    NavBar,
    ZJMap,
    threephoto,
    bottombar
  }
};
</script>

<style lang="scss" scoped >
</style>
