<template>
  <div class="login-container">
    <div class="login-info">
      <div class="logo">
        <router-link to="/home/index"></router-link>
      </div>
    </div>
    <div class="login-border">
      <h4 class="login-title">登录浙里文化</h4>
      <el-tabs v-model="activeName" class="is_stretch">
        <el-tab-pane label="用户登录" name="login">
          <userLogin :vcodeSrc.sync="vcodeSrc" />
        </el-tab-pane>
        <el-tab-pane label="立即注册" name="register">
          <register :vcodeSrc.sync="vcodeSrc" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import userLogin from "./login";
import register from "./register";
export default {
  name: "login",
  components: {
    userLogin,
    register
  },
  data() {
    return {
      activeName: "login",
      vcodeSrc: process.env.VUE_APP_API + "/auth/VerifyCode/"
    };
  },
  created() {},
  mounted() {},
  props: [],
  methods: {}
};
</script>

<style lang="scss" >
/*
.login-container {  
  .login-info {   // 左侧登录信息
    .logo {       // 左侧logo
      .a { }      // 路由渲染后的链接
    }
  }
  .login-border { // 登录面板
    h4 { }        // h4 登录浙里文化
    .eltab { }
  }
}
*/
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: 100%;
  .login-info {
    // 左侧登录信息
    .logo {
      // 左侧logo
      .a {
      } // 路由渲染后的链接
    }
  }
  .login-border {
    // 登录面板
    padding: 30px 50px 25px 50px;
    width: 270px;
    border-radius: 6px;
    border: 1px solid gainsboro;
    background-color: #fff;
    .login-title {
      margin: 0 0 20px;
      text-align: center;
      color: var(--main-color);
      letter-spacing: 1px;
      font-size: 18px;
    }
    .is_stretch .el-tabs__nav {
      min-width: 100%;
      display: flex;
    }
    .is_stretch .el-tabs__nav > * {
      flex: 1;
      text-align: center;
    }

    .el-tabs__active-bar {
      height: 3px;
    }
    .el-tabs {
      .login-form {
        margin: 10px 0;
      }
      .el-checkbox {
        margin-bottom: 22px;
      }
      .icon {
        color: #fff;
        background: var(--main-color);
        height: 40px;
        width: 50px;
        text-align: center;
        border-radius: 3px 0 0 3px;
        line-height: 40px;
        font-size: 18px;
        display: inline-block;
      }
      .el-form-item__content {
        width: 100%;
        display: flex;
      }
      .login-submit {
        width: 100%;
      }
      .el-input__inner {
        border-radius: 0 3px 3px 0;
        padding-left: 10px;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/BG3.png);
  background-size: cover;
}
</style>
