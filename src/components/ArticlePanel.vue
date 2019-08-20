<template>
  <div>
    <el-row :gutter="10" style="padding:0 10px;">
      <el-col v-for="a in articles" :key="a.id" :xs="12" :sm="8" :lg="6">
        <router-link :to="`/article/`+ a.id">
        <article-card class="myCard" :article-info="a"></article-card>
        </router-link>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="12" :sm="8" :lg="6">
        <el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="pagenum" :total="total" @current-change="getAricle()"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import { getArticleList } from "@/api/toGet.js";
export default {
  data() {
    return {
      page: 1,
      pagenum: 8,
      totalPage: 1,
      articles: []
    };
  },
  created() {
    this.getAricle();
  },
  methods: {
    getAricle() {
      let prams = {
        city_id: this.cityId,
        type: this.categoryId,
        page: this.page,
        pagenum: this.pagenum
      };
      getArticleList(prams).then(res => {
        this.articles = res.data;
        this.totalPage = res.totalpage;
      });
    }
  },
  computed: {
    total() {
      return this.pagenum * this.totalPage;
    }
  },
  props: ["cityId", "categoryId"],
  components: {
    ArticleCard
  }
};
</script>
<style lang="scss" scoped>
/* 分页 */
.el-pagination {
  margin: 30px 0 30px;
  text-align: center;
}
.el-tabs__header{
    position: relative;
    margin: 0 0 15px;
    padding: 0 10px;
    background-color: white;
}
</style>