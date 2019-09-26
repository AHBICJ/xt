<template>
  <div class="homepage_slick">
    <div class="slick">
      <div
        v-for="item in options.items"
        :key="item.photo"
        :style="{backgroundImage:'url('+imgAddress(item.photo)+')'}"
        class="item"
        @click="$router.push({path:'/article/'+item.article_id})"
      ></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Address from "@/mixin/Address";

import "slick-carousel";
import "slick-carousel/slick/slick.css";
// import 'slick-carousel/slick/slick-theme.css';

window.$ = window.jQuery = require("jquery");
// require('script!slick-carousel');

if (typeof window !== "undefined") {
  import("slick-carousel");
}
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mixins: [Address],
  mounted: function() {
    this.create();
  },
  beforeUpdate() {
    this.destroy();
  },
  updated() {
    this.$nextTick(()=>this.create());
  },
  destroyed(){
    this.destroy();
  },
  methods: {
    create: function() {
      const $slick = $(".slick");
      $slick.slick(this.options);
    },
    destroy: function() {
      //   const $slick = $('.slick');
      $(".slick").slick("unslick");
    }
  }
};
</script>
<style lang="scss">
.homepage_slick {
  height: 100%;
  width: 100%;
  .slick,
  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-list,
  div {
    height: 100%;
    width: 100%;
  }
  .item {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  .slick-dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
    display: block;
    font-size: 0;
    text-align: center;
    z-index: 2;
  }
  .slick-dots li {
    display: inline-block;
    cursor: pointer;
  }
  .slick-dots li:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .slick-dots li.slick-active,
  .slick-dots li.slick-active:hover {
    opacity: 1;
  }
  .slick-dots button {
    cursor: pointer;
    border: none;
    outline: none;
    margin: 0 10px;
    padding: 0;
    width: 31px;
    height: 31px;
    color: transparent;
    background: url(../assets/images/png2.png) left no-repeat;
  }
  .slick-active button {
    background-position: right;
    background-color: transparent;
  }
}
</style>