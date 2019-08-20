<template>
  <div class="city">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="14">
        <Carousel></Carousel>
      </el-col>
    </el-row>
    <!--  -->
    
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="14">
        <el-tabs v-model="activeName" :stretch="true">          
          <el-tab-pane
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :name="category.name"
          >
            <article-panel  :categoryId="category.id" :cityId="cityId" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
   
  </div>
</template>

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
</style>

<script>
import Carousel from "@/components/MyCarousel.vue";
import ArticlePanel from "@/components/ArticlePanel.vue";
import {getCategories} from "@/api/toGet";
export default {
  name: "tabs",
  components: {
    ArticlePanel,
    Carousel
  },
  data() {
    return {
      activeName: "风俗民情",
      cityId :1,
      categories: [],
    }
  },
  methods: {

  },
  created(){
    this.cityId= this.$route.params.id || 1
    if (this.cityId<=0 || this.cityId>11){
      this.$router.replace('/404');
    }
    getCategories({city_id:this.cityId}).then(res=>this.categories=res.data);
  }
};
</script>
