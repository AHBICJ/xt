<template>
  <div class="index-book-collect">
    <div class="header">
      <div class="title">相关文章</div>
      <!-- <div class="controllers">
                <div class="arrow icon ion-chevron-left"></div>
                <div class="arrow icon ion-chevron-right"></div>
      </div>-->
    </div>
    <div class="slide-book transition--prev">
      <div class="slide-book-list item">
        <!-- -->
        <router-link :to="`/article/`+item.id" class="item" v-for="item in articles" :key="item.id">
          <div class="poster">
            <div class="lazy thumb poster-img">
              <img :src="item.imgSrc" alt />
            </div>
          </div>
          <div class="content-text">
            <div class="title">{{item.title}}</div>
            <div class="price">
              <div class="delete">{{item.city}} | {{item.tag}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getSidebar1 } from "@/api/toGet.js";
export default {
  data() {
    return {
      articles: []
    };
  },
  name: "sidebar1",
  props: {
    sidebar1_info: {
      // type: Object,
      // default: () => ({})
    }
  },
  methods: {
    initSidebar1(id) {
      this.articleId = id || 1;
      getSidebar1({ article_id: this.articleId }).then(
        res => (this.articles = res.data)
      );
    }
  },
  created() {
    this.initSidebar1(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.initSidebar1(to.params.id);
    next();
  }
};
</script>

<style lang="scss" scoped>
h1,
p {
  margin: 0;
}
p {
  text-indent: 2em;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #909090;
}
ul {
  padding: 0;
  margin: 0;
}
img {
  width: auto;
  height: auto;
  border-style: none;
}
.lazy {
  position: relative;
}
.thumb {
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
////
.index-book-collect {
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  .header {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 15px;
    border-bottom: 1px solid #f6f6f6;

    .title {
      flex-grow: 1;
      padding: 0 0 0 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #000;
      border-left: 6px solid #ddd;
    }
    .controllers {
      height: 12px;
      font-size: 12px;
      color: #7d7d7d;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .arrow {
        cursor: pointer;
        line-height: 1;
        width: 5px;
        padding: 0 6px;
      }
    }
  }
  //课件推荐
  .slide-book {
    position: relative;
    // height: 185px;
    // overflow: hidden;
    .item {
      // position: absolute;
      .item {
        padding: 10px 15px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        .poster {
          width: 120px;
          height: 80px;
          flex-shrink: 0;
          .poster-img img {
            height: 80px;
            width: 100%;
            border-radius: 3px;
          }
        }
        .content-text {
          flex-grow: 1;
          margin-left: 10px;
          .title {
            color: #000;
            font-size: 16px;
            line-height: 1.3;
            font-weight: 500;
            &:hover {
              color: var(--main-color);
            }
          }
          .price {
            display: inline-flex;
            margin-top: 6px;
            .delete {
              color: #878c90;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
