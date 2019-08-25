<template>
  <div class="right">
    <div class="message">
      <p class="title">消息</p>
      <p class="text">老师发布了一个新的作业</p>
      <a href @click.stop>
        <p class="r">查看全部</p>
      </a>
    </div>
    <div class="topic">
      <p class="title">话题</p>
      <p class="text">台州美食</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped >
.right {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 210px;
  .message {
    letter-spacing: 0.25px;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #3c4043;
    text-transform: none;
    border: 1px solid #dadce0;
    border-radius: 8px;
    text-align: left;
    padding: 25px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .text {
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      padding: 15px 0;
      color: rgba(0, 0, 0, 0.549);
    }
    .r {
      float: right;
      color: black;
      &:hover {
        color: var(--main-color);
      }
    }
  }
  .topic {
    letter-spacing: 0.25px;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #3c4043;
    text-transform: none;
    border: 1px solid #dadce0;
    border-radius: 8px;
    text-align: left;
    padding: 25px;
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .text {
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
      padding: 10px 0;
      color: rgba(0, 0, 0, 0.549);
      cursor: pointer;
    }
    .text:hover {
      color: var(--main-color);
    }
  }
}
</style>

