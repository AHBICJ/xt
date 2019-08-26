<template>
  <div class="classroomCard">
    <img src="@/assets/images/tx1.png" alt />
    <div class="classroomTop">
      <div class="className">
        <p>班级名称</p>
      </div>
    </div>
    <div class="classroomMiddle">
      <div class="classIntro">
        <p>这是一个非常美好的大家庭，欢迎你的加入。</p>
      </div>
    </div>
    <div class="classroomBottom">
      <div class="gotoclassroom">
        <span>进入班级</span>
        <i class="el-icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
  &:hover{
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
    .className {
      padding: 16px 16px 12px;
      p {
        font-family: "Courier New", Courier, monospace;
        font-size: 22px;
        font-weight: 400;
        line-height: 28px;
        color: #fff;
      }
    }
  }
  .classroomMiddle {
    width: 100%;
    height: 120px;
    border-bottom: 1px solid #dadce0;
    .classIntro {
      padding: 16px 16px 12px;
      width: 150px;
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
    padding: 10px 12px 10px;
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

