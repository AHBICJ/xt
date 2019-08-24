<template>
  <div class="content">
    <div class="left">
      <div class="test">
        <p> <span>学校：</span>  阳光希望小学</p>
        <p> <span>班级：</span>3年纪2班</p>
        <p> <span>老师：</span>孔孟荀墨</p>
        <p> <span>创建时间：</span>2019/8/24</p>
        <p> <span>班级人数：</span>30</p>
      </div>
      <img src="@/assets/images/1.png" alt />
    </div>
    <classright />
  </div>
</template>

<script>
export default {
  components: {
    classright
  }
};
import classright from "@/components/classright.vue";
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 20%;
  margin-top: 50px;
  .left {
    flex-grow: 1;
    display: flex;
    margin-right: 20px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 700px;
    height: auto;
    border: 0.0625rem solid #dadce0;
    border-radius: 0.5rem;
    border-radius: 30upx;
    overflow: auto;
    padding: 30px;
    text-align: left;
    p {
      height: 50px;
    }
    .test {
      width: 50%;
      span{
        color: var(--main-color);
        margin-right: 20px;
      }
    }
    img {
      width: 50%;
    }
  }
}
</style>

