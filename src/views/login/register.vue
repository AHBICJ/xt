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
        @keyup.enter.native="handleRegister"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="用户号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <div class="icon">
        <i class="el-icon-lock" />
      </div>
      <el-input
        size="small"
        @keyup.enter.native="handleRegister"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <div class="icon">
        <i class="el-icon-lock" />
      </div>
      <el-input
        size="small"
        @keyup.enter.native="handleRegister"
        v-model="loginForm.repassword"
        auto-complete="off"
        placeholder="请重复密码"
      ></el-input>
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
    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        @click.native.prevent="handleRegister"
        class="login-submit"
        v-loading.fullscreen.lock="fullscreenLoading"
      >注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { checkCode } from "@/api/login";
import { register } from "@/api/login";
import md5 from 'js-md5';
export default {
  name: "register",
  components: {},
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    const validateName = (rule, value, callback) => {
      if (value.length < 3 || value.length > 16) {
        return callback(new Error("用户号长度为3到16位"));
      } else {
        const reg = /^[a-zA-Z0-9_-]{3,16}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("用户号只能含英文字母和数字"));
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6 || value.length > 18) {
        return callback(new Error("密码长度为6到18位"));
      } else {
        const reg = /^[^\u4e00-\u9fa5]{0,}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("密码6到18位 不含中文"));
        }
      }
    };
    const validateRePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      checkCode({ vcode: this.loginForm.code }).then(res =>
        res.data.res ? callback() : callback(new Error("请输入正确的验证码"))
      );
    };
    return {
      fullscreenLoading: false,
      isTeacher: false,
      loginForm: {
        username: "",
        password: "",
        repassword: "",
        phone: "",
        code: ""
      },
      Vcode: {
        code: "",
        src: process.env.VUE_APP_API + "/auth/VerifyCode/"
      },
      loginRules: {
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        repassword: [
          { required: true, validator: validateRePass, trigger: "blur" }
        ],
        code: [{ required: true, trigger: "blur", validator: validateCode }]
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  props: ['vcodeSrc'],
  methods: {
    handleRegister() {
      let datas = {
        account: this.loginForm.username,
        name: this.loginForm.username,
        passwd : md5(this.loginForm.password) ,
        repasswd:md5(this.loginForm.password)
      };
      register(datas) 
        .then(() => {
          this.$message("注册成功！！");
        })
        .catch(() => {});
    

     
      
    }
  }
};
</script>
<style>
</style>
