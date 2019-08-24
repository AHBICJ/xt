<template>
  <div class="content">
    <div class="sign">
      <i class="el-icon-document" style="color:white"></i>
    </div>
    <div class="txt">
      <h1>{{taskinfo.name}}</h1>
      <div class="myrow">
        <img src="@/assets/images/tx4.png" alt="">
        <p>学生名字 截止于 {{taskinfo.star_time}}</p>
      </div>
      <p style="margin-bottom:20px;" >作业内容:{{taskinfo.desc}}</p>
      <div v-for=" myimg  in taskinfo.photo" :key="myimg">
        <img :src="qaq +myimg" alt />
      </div>

      <div class="homework">
        <el-form ref="form">
          <p>我的作业</p>
          <el-input type="textarea" v-model="homework"></el-input>
        </el-form>
        <p>字数限制:200</p>
      </div>
    </div>

    <div class="submit">
      <div class="top">
        <div class="myrow">
          <p>你的作业</p>
          <span>未完成</span>
        </div>

        <el-upload
          class="upload-demo"
          action="http://192.168.123.182:5000/upload"
          :on-success="getimg"
        >
          <el-button class="mybuttom">添加附件</el-button>
        </el-upload>

        <el-button type="warning" class="mybuttom" @click="submit_homework">完成作业</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { task_detail } from "@/api/toGet";
import { submit_home } from "@/api/toPost";
export default {
  data() {
    return {
      homework: "",
      id: 1,
      taskinfo: {},
      qaq: process.env.VUE_APP_CDN,
      picList: []
    };
  },

  created() {
    this.id = this.$route.params.id || 1;
    this.get_task_detail();
  },
  methods: {
    get_task_detail() {
      let datas = { task_id: this.id };

      task_detail(datas)
        .then(res => {
          this.taskinfo = res.data;
          this.taskinfo.photo = JSON.parse(this.taskinfo.photo);
        })
        .catch(() => {
          this.$message({
            message: "请求错误",
            type: "error"
          });
        });
    },
    //上面是获取，下面是提交
    getimg(response) {
      this.picList.push(response.data[0]);
    },
    submit_homework() {
      let datas = {
        student_id: 2,
        task_id: this.id,
        content: this.homework,
        image_address: JSON.stringify(this.picList)
      };
      submit_home(datas)
        .then(() => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        })
        .catch(() => {
        });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
  width: 1150px;
  height: auto;
  margin-top: 50px;
  .sign {
    height: 50px;
    width: 50px;
    background-color: var(--main-color);
    border-radius: 0.5rem;
    border-radius: 50%;
    margin-right: 20px;
    .el-icon-document {
      transform: scale(1.5);
      margin-left: 17px;
      margin-top: 17px;
    }
  }
  .txt {
    width: 760px;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-bottom: 20px;
    h1 {
      color: var(--main-color);
      font-weight: 400;
    }
    .myrow {
      height: auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 760px;
      height: 50px;
      border-bottom: 1px solid var(--main-color);
      margin-top: 10px;
      padding-bottom: 10px;
      margin-bottom: 20px;
      line-height: 50px;
      p {
        padding-left: 20px;
      }
      img{
        width: 50px;
        height: 50px;
      }
    }
    .homework {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
      border-top: 0.125rem solid #e8eaed;
      margin-top: 20px;
      p {
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }
    div {
      width: 100%;
      height: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .submit {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 300px;
    margin-left: 20px;
    .top {
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
        0 2px 6px 2px rgba(60, 64, 67, 0.149);
      border-radius: 0.5rem;
      overflow: hidden;
      padding: 1.5rem;
      .myrow {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        span {
          margin-left: 120px;
          font-size: 14px;
          color: #007fff;
          margin-top: 5px;
        }
        p {
          font-size: 18px;
        }
      }
      .mybuttom {
        width: 250px;
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 0px;
      }
    }
  }
}
</style>
