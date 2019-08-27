<template>
  <div class="city">
    <nav-bar :options="navbarOptions" />
    <div class="city-mid-con">
      <Carousel :lanterns="lanterns"></Carousel>
      <el-tabs v-model="activeName" :stretch="true" class="city-con">
        <el-tab-pane
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          :name="category.name"
        >
          <article-panel :categoryId="category.id" :cityId="cityId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="scss">
.city .city-mid-con {
  .el-tabs__item {
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    padding: 0;
    transition: letter-spacing ease-in-out 0.1s;
  }
  .el-tabs__item.is-active{
    letter-spacing: 0.5em;
    margin-right: -0.5em;
  }
  .el-tabs__active-bar {
    height: 3px;
  }
}
</style>
<style lang="scss" scoped>
.city {
  width: 100%;
  min-height: 100%;
  background: url(../assets/images/BG4.png);
  background-attachment: fixed;
}
.city-mid-con {
  width: 1120px;
  margin: 0 auto;
  .city-con {
    background-color: #f9fafc;
  }
}
</style>

<script>
import Carousel from "@/components/MyCarousel.vue";
import ArticlePanel from "@/components/ArticlePanel.vue";
import { getCategories, getLanterns } from "@/api/toGet";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "tabs",
  components: {
    ArticlePanel,
    Carousel,
    NavBar
  },
  data() {
    return {
      navbarOptions: {
        isHome: false,
        isClassroom: false,
        collapsed: false,
        cityId: -1,
        shortTilte: true
      },
      activeName: "风俗民情",
      cityId: 1,
      categories: [],
      lanterns: []
    };
  },
  methods: {
    initCity(id) {
      this.cityId = id || 1;
      if (this.cityId <= 0 || this.cityId > 11) {
        this.$router.replace("/404");
      }
      this.navbarOptions.cityId = this.cityId;
      getCategories({ city_id: this.cityId }).then(
        res => (this.categories = res.data)
      );
      getLanterns({ city_id: this.cityId })
        .then(res => {
          this.lanterns = res.data;
        })
        .catch(error => {
          this.$message({
            message: "获取轮播图异常" + error,
            type: "error"
          });
        });
    }
  },
  created() {
    this.initCity(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.initCity(to.params.id);
    next();
  }
};
</script>
