<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username">
      <div class="icon">
        <i class="el-icon-user" />
      </div>
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="用户号/手机号"
      />
    </el-form-item>
    <el-form-item prop="password">
      <div class="icon">
        <i class="el-icon-lock" />
      </div>
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="密码"
      >
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" class="item-vcode">
      <el-input
        class="input-vcode"
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.code"
        auto-complete="off"
        placeholder="验证码"
      ></el-input>
      <img :src="vcodeSrc" @click="$emit('update:vcodeSrc',vcodeSrc+'?')" alt="未取到验证码" title="看不清？" />
    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        @click.native.prevent="handleLogin"
        class="login-submit"
        v-loading.fullscreen.lock="fullscreenLoading"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { checkCode } from "@/api/login";

export default {
  name: "userlogin",
  components: {},
  data() {
    const validateCode = (rule, value, callback) => {
      checkCode({ vcode: this.loginForm.code }).then(res =>
        res.data.res ? callback() : callback(new Error("请输入正确的验证码"))
      );
    };
    return {
      fullscreenLoading: false,
      loginForm: {
        username: "",
        password: "",
        code: ""
      },
      checked: false,
      loginRules: {
        username: [
          { required: true, message: "请输入用户号/手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        code: [{ required: true, trigger: "blur", validator: validateCode }]
      },
      passwordType: "password"
    };
  },
  created() {},
  mounted() {},
  computed: {},
  props: ["vcodeSrc"],
  methods: {
    showPassword() {
      this.passwordType === "text"
        ? (this.passwordType = "password")
        : (this.passwordType = "text");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.fullscreenLoading = false;
              this.$router.replace({ path: "/" });
            })
            .catch(() => {
              this.fullscreenLoading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.item-vcode {
  .el-input__inner {
    border-radius: 3px !important;
  }
  img {
    position: absolute;
    right: 1px;
    height: 90%;
    top: 5%;
    cursor: pointer;
    width: 40%;
    font-size: 9px;
    color: #666;
  }
}
</style>
