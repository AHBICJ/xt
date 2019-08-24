<template>
  <div class="city">
    <nav-bar :options="navbarOptions" />
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="14">
        <Carousel :lanterns="lanterns"></Carousel>
      </el-col>
    </el-row>
    <!--  -->
    <div class="city_tab">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="24" :sm="20" :md="16" :lg="14">
          <el-tabs v-model="activeName" :stretch="true">
            <el-tab-pane
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :name="category.name"
            >
              <article-panel :categoryId="category.id" :cityId="cityId" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss">
.el-tabs__item {
  font-size: 15px;
  padding: 0;
}
.city_tab{
  .is-active {
    background: url(../assets/images/tabbg11.jpg);
    background-size: 100% 100%;
  }
}
</style>
<style scoped>
.city {
  width: 100%;
  min-height: 100%;
  /* position: fixed; */
  background: url(../assets/images/BG4.png);
}
.el-col {
  border-radius: 4px;
  background-color: #f9fafc;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.el-tabs__item {
  font-size: 16px;
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
        ishome: false,
        isclassroom: false,
        collapsed: false,
        cityid: -1,
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
      this.navbarOptions.cityid = this.cityId;
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
