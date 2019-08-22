<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover" class="articleCard">
    <router-link :to="'/article/'+id">
      <div class="imgBox" :style="{backgroundImage:'url('+imgaddress(imgSrc)+')'}"></div>
      <div style="padding: 14px;">
        <span>{{title}}</span>
        <el-tag type="warning" v-if="havePpt">课件</el-tag>
        <el-tag type="danger" v-if="havePic">图集</el-tag>
        <el-tag type="success" v-if="haveVideo">视频</el-tag>
        <div class="bottom clearfix">
          <span class="article_date">2018-02-31</span>
          <el-button type="text" class="button">查看详情</el-button>
        </div>
      </div>
    </router-link>
  </el-card>
</template>

<style lang="scss">
a {
  text-decoration: none;
  color: black;
}
</style>
<style lang="scss" scoped>
.el-tag {
  background-color: #fcf8f0;
  border-color: #f9f1e1;
  color: #e0b969;
  display: inline-block;
  height: 25px;
  padding: 0 5px;
  margin: 0 5px;
  line-height: 24px;
  font-size: 12px;
  color: #e0b969;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.imgBox {
  max-width: 100%;
  height: 0;
  padding-bottom: 66.66%;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  // background-repeat: no-repeat;
  background-color: #eee;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-card {
  margin-bottom: 15px;
}
.article_date {
  float: left;
  color: #999;
  font-size: 14px;
}
</style>

<script>
export default {
  name: "ArticleCard",
  data() {
    return {
      id: this.ArticleInfo.id || 0,
      likeNum: this.ArticleInfo.likeNum || 0,
      title: this.ArticleInfo.title || "",
      imgSrc: this.ArticleInfo.imgSrc,
      date: this.ArticleInfo.date,
      havePpt: true
    };
  },
  methods:{
    imgaddress(image) {
      if (!image) return "null"
      if (image.toString().startsWith("http")) {
        return image
      } else {
        return process.env.VUE_APP_CDN + image
      }
    }
  },
  computed: {
    havePic() {
      return this.ArticleInfo.images != null;
    },
    haveVideo() {
      return this.ArticleInfo.viedo != null;
    }
  },
  props: {
    ArticleInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>