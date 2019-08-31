<template>
  <div class="ClassroomLeft">
    <div class="messageBox">
      <div>
        <p class="title">消息提示</p>
        <router-link class="mylink" to>老师发布了一个新的作业</router-link>
        <router-link class="mylink" to>有15个学生提交了《乡土》</router-link>
        <router-link to class="checkAll">查看全部</router-link>
      </div>

    </div>
    <div class="messageBox">
      <p class="title">专题任务</p>
      <router-link class="mylink" to>台州美食</router-link>
      <router-link class="mylink" to>台州美食</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped >
.ClassroomLeft {
  width: 100%;
  .messageBox {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #dadce0;
    border-radius: 8px;
    letter-spacing: 0.25px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #3c4043;
    text-align: left;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .mylink {
      display: block;
      font-size: 14px;
      line-height: 26px;
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
      color: rgba(0, 0, 0, 0.6);
      &:hover {
        color: rgba(0, 0, 0, 0.9);
      }
    }
    .checkAll {
      display: block;
      text-align: right;
      color: black;
      font-size: 14px;
      line-height: 26px;
      &:hover {
        color: var(--main-color);
      }
    }
  }
}
</style>

