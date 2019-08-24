<template>
  <div class="content">
    <el-row>
      <el-col :span="8" v-for="o in 6" :key="o">
        <el-card class="card" shadow="hover">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">老师：</time>
              <time class="time">班级人数：</time>
              <el-button type="text" class="button">加入班级</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>

<style scoped >
.content {
  margin: -50px 20% 0 20%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.card {
  width: 340px;
  margin-left: 10px;
  margin-top: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.block{
    padding-left: 900px;
    margin-top: 20px;
}
</style>

<script>
export default {
  data() {
    return {};
  }
};
</script>