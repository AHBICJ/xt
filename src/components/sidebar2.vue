<template>
  <div class="index-book-collect">
    <div class="header">
      <div class="title">热门推荐</div>
    </div>
    <div class="block-body">
      <div class="entry-list">
        <router-link :to="`/article/`+item.id" class="item" v-for="item in articles" :key="item.id">
          <!-- 文章推荐—标题 -->
          <div class="entry-title">{{item.title}}</div>
          <!-- 文章推荐—收藏量 -->
          <div class="entry-meta-box">
            <div class="entry-meta">
              <img src="../assets/images/like.png" alt class="icon" />
              <span class="count">{{item.likeNum}}</span>
            </div>
            <div class="entry-meta">
              <img src="../assets/images/comment.png" alt class="icon" />
              <span class="count">{{item.commentnum}}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getSidebar2 } from "@/api/toGet.js";
export default {
  data() {
    return {
      articles: []
    };
  },
  name: "sidebar2",
  props: {
    sidebar2_info: {
      // type: Object,
      // default: () => ({})
    }
  },
  methods: {
    initSidebar2(id) {
      this.articleId = id || 1;
      getSidebar2({ article_id: this.articleId }).then(
        res => (this.articles = res.data)
      );
    }
  },
  created() {
    this.initSidebar2(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.initSidebar2(to.params.id);
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
//
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
  //文章推荐

  //热门文章
  .item {
    display: block;
    padding: 0.8rem 1.3rem;
    .entry-title {
      font-size: 1.16rem;
      color: #333;
      &:hover {
        color: var(--main-color);
      }
    }
    .entry-meta-box {
      margin-top: 0.4rem;
      .entry-meta {
        display: inline-block;
        margin-right: 2.5rem;
        font-size: 1rem;
        color: #c2c2c2;
        // .icon {
        //    vertical-align: sub;
        // }
        .count {
          color: #b2bac2;
          margin-left: 0.4rem;
        }
      }
    }
  }
}
</style>
