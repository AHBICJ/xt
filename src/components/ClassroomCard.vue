<template>
  <router-link :to="'/classroom/'+id">
    <div class="classroomCard">
      <img src="@/assets/images/tx1.png" alt />
      <div class="classroomTop" :style="{backgroundImage:'url('+imgaddress(photo)+')'}"></div>
      <div class="classroomMiddle">
        <div class="className">
          <p>{{title}}</p>
        </div>
        <div class="classIntro">
          <p>{{desc}}</p>
        </div>
      </div>
      <div class="classroomBottom">
        <div class="gotoclassroom">
          <span>进入班级</span>
          <i class="el-icon-right"></i>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      id: this.classrooms.id || 0,
      title: this.classrooms.name || "",
      desc: this.classrooms.description || "",
      photo: this.classrooms.photo
    };
  },
  methods: {
    imgaddress(image) {
      if (!image) return "null";
      if (image.toString().startsWith("http")) {
        return image;
      } else {
        return process.env.VUE_APP_CDN + image;
      }
    }
  },
  props: {
    classrooms: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped lang="scss">
.classroomCard {
  width: 260px;
  height: 260px;
  cursor: pointer;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #dadce0;
  position: relative;
  overflow: hidden;
  background-color: white;
  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 2px 6px 2px rgba(60, 64, 67, 0.149);
  }
  img {
    width: 75px;
    height: 75p;
    position: absolute;
    right: 20px;
    top: 65px;
  }
  .classroomTop {
    width: 100%;
    height: 100px;
    background-color: #daac4d;
    background-size: cover;
    background-position: center center;
  }
  .classroomMiddle {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #dadce0;
    .className {
      padding: 16px 16px 12px;
      p {
        font-size: 22px;
        font-weight: 400;
        line-height: 28px;
        color: var(--main-color);
      }
    }
    .classIntro {
      padding: 0px 16px;
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
      }
    }
  }
  .classroomBottom {
    width: 80px;
    float: right;
    padding: 19px 15px 20px;
    span {
      font-size: 14px;
      margin-right: 3px;
    }
    i {
      transition: padding ease-in-out 0.3s;
    }
    &:hover {
      color: #daac4d;
      i {
        padding-left: 5px;
      }
    }
  }
}
</style>

