<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <nav-bar :options="navbarOptions"/>
        <slick :options="slickOptions" />
      </div>
      <div class="section">
        <pic-list />
      </div>
      <div class="section"><div>123</div></div>
      <div class="section"><z-j-map/></div>
      <div class="section fp-auto-height"><div style="height:600px;">789</div></div>
    </full-page>
  </div>
</template>

<script>
import Vue from 'vue'
import VueFullPage from 'vue-fullpage.js';
Vue.use(VueFullPage);
import { getCities } from "@/api/toGet";
import Slick from "@/components/Slick";
import PicList from "@/components/PicList";
import NavBar from "@/components/NavBar";
import ZJMap from "@/components/ZJMap";
import "@/styles/fullpage.css";
export default {
  data() {
    return {
      navbarOptions:{
        isHome: true,
        isClassroom: false,
        collapsed: false,
        cityid: 0
      },
      cities: [],
      options: {},
      slickOptions: {
        items: [
          {
            imgSrc:
              "http://www.ihchina.cn/Uploads/Picture/2019/08/08/s5d4b7636a4e84.jpg",
            path:"/article/15"
          },
          {
            imgSrc:
              "http://www.ihchina.cn/Uploads/Picture/2019/08/06/s5d493cf91fd64.jpg",
              path:"/city/4"
          },
          {
            imgSrc:
              "http://www.ihchina.cn/Uploads/Picture/2019/08/12/s5d50bd51f129e.jpg",
              path:"/article/15"
          }
        ],
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
  methods: {
    get_city() {
      getCities().then(res => (this.cities = [...res.data]));
    }
  },
  created() {
    // this.get_city();
  },
  components: {
    Slick,
    PicList,
    NavBar,
    ZJMap
  }
};
</script>

<style lang="scss" scoped >
</style>
