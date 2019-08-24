<template>
  <div class="nav" :class="['nav',{'collapsed':options.collapsed},{'nothome':!options.isHome}]">
    <div class="nav-title-bigcon">
      <div class="nav-title-container">
        <div class="logoandtitle">
          <router-link class="mainlogoandtitle" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 5 5"
              class="nav-logo"
            >
              <path
                d="M2.77 1.478h.555v-.193h-.361V.933h-.569v.193h.375v.352zM2.396 1.93h.194v-.569h-.353V1h-.193v.555h.352v.375zM3.164 2.205h.194v-.36h.352v-.569h-.194v.375h-.352v.554z"
                class="logo_basic"
              />
              <path
                d="M2.763 2.059h-.35l-.01.439.194.004.006-.249h.354v-.569h-.194v.375zM4.067 2.395h-.193v.375h-.352v.555h.193v-.361h.352v-.569z"
                class="logo_basic"
              />
              <path
                d="M3.513 2.396H3.07v.194h.637v-.353H4v-.193h-.487v.352zM3.724 3.71v-.194h-.375v-.433h-.554v.194h.36v.433h.569z"
                class="logo_basic"
              />
              <path
                d="M2.747 2.503v.439h.569v-.194h-.375v-.245h-.194zM2.605 4.067v-.193H2.23v-.352h-.555v.193h.361v.352h.569zM2.956 4v-.555h-.352V3.07H2.41v.569h.353V4h.193zM1.484 3.349h.352v-.554h-.194v.36H1.29v.569h.194v-.375z"
                class="logo_basic"
              />
              <path
                d="M2.043 3.316h.194v-.44H2.6v-.194h-.557v.634zM1.126 2.23h.371v-.555h-.193v.361H.933v.569h.193V2.23z"
                class="logo_basic"
              />
              <path
                d="M1.304 2.763H1v.193h.497v-.352h.433V2.41h-.626v.353zM1.651 1.909h.554v-.193h-.36V1.29h-.569v.194h.375v.425zM1.684 2.237h.375v.255h.194v-.449h-.569v.194z"
                class="logo_basic"
              />
            </svg>
            <h1 class="nav-title">{{nav_title}}</h1>
          </router-link>
          <router-link
            class="extendtitle"
            v-if="!options.isHome"
            :to="cities[options.cityId-1]?cities[options.cityId-1].path:''"
          >
            <h1>&nbsp;|&nbsp;{{cities[options.cityId-1]?cities[options.cityId-1].name:''}}</h1>
          </router-link>
        </div>
        <div class="otherAndUser">
          <el-input size="small" class="my-nav-search" placeholder="请输入搜索内容" v-model="navinput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <i class="el-icon-message-solid my-nav-message"></i>
          <div class="loginGroup" v-if="!login">
            <router-link to="/login" class="btnLogin">登&nbsp;&nbsp;录</router-link>
            <router-link to="/register" class="btnRegister">注&nbsp;&nbsp;册</router-link>
          </div>
          <div class="loginedGroup" v-else>
            <el-dropdown trigger="click">
              <el-avatar class="el-dropdown-link" ref="popupbutton" :size="38" :src="avatar"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/user">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="handleLogout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-item" v-if="!options.collapsed">
      <div class="cities">
        <router-link :to="city.path" v-for="city in cities" :key="city.path">{{city.name}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { userinfo } from "@/api/login";

export default {
  data() {
    return {
      login: false,
      user: null,
      navinput: "",
      cities: [
        { name: "杭州", path: "/city/1" },
        { name: "宁波", path: "/city/2" },
        { name: "温州", path: "/city/3" },
        { name: "绍兴", path: "/city/4" },
        { name: "湖州", path: "/city/5" },
        { name: "嘉兴", path: "/city/6" },
        { name: "金华", path: "/city/7" },
        { name: "衢州", path: "/city/8" },
        { name: "台州", path: "/city/9" },
        { name: "丽水", path: "/city/10" },
        { name: "舟山", path: "/city/11" },
        { name: "学堂", path: "/classroom" }
      ]
    };
  },
  props: {
    options: {
      type: Object,
      default() {
        return {
          isHome: true,
          isClassroom: false,
          collapsed: false,
          cityId: 12,
          shortTilte: false
        };
      }
    }
  },
  computed: {
    nav_title() {
      return this.options.shortTilte ? "浙里" : "浙里文化";
    },
    avatar() {
      return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      // return '/images/'+this.user.photo;
    }
  },
  methods: {
    checkAndSetLoginState() {
      userinfo({})
        .then(() => {
          this.login = true;
          this.user = this.$store.state.user;
        })
        .catch(() => {
          localStorage.removeItem("user");
          this.login = false;
          this.user = null;
        });
    },
    handleLogout() {
      this.$store
        .dispatch("Logout")
        .then(() => {
          this.login = false;
          this.user = null;
        })
        .catch(() => {});
    }
  },
  created() {
    this.checkAndSetLoginState();
  },
  watch: {
    $route: "checkAndSetLoginState"
  }
};
</script>
<style lang="scss">
.my-nav-search .el-input__inner {
  background-color: transparent;
}
.my-nav-search .el-input__inner:hover {
  border-color: var(--main-color-hover);
}
</style>
<style lang="scss" scoped>
.nav {
  // position: fixed;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.4);
  height: 115px;
  width: 100%;
  .nav-title-bigcon {
    height: 64px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    .nav-title-container {
      position: relative;
      margin: auto;
      width: 1120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      .logoandtitle {
        display: flex;
        align-items: center;
        height: 64px;
        .extendtitle {
          display: flex;
          align-items: center;
          height: 64px;
          cursor: pointer;
          h1 {
            font-family: "FZQK";
            color: white;
            font-size: 26px;
          }
        }
        .extendtitle:hover {
          h1 {
            color: var(--main-color);
          }
        }
        .mainlogoandtitle {
          display: flex;
          align-items: center;
          height: 64px;
          cursor: pointer;
          .nav-logo {
            display: inline-block;
            height: 60px;
            width: 60px;
            .logo_basic {
              transition: fill 0.2s;
              fill: #ffffff;
            }
          }
          h1 {
            margin-left: 10px;
            display: inline-block;
            font-family: "FZQK";
            color: white;
            font-size: 26px;
            transition: color 0.2s;
          }
        }
        .mainlogoandtitle:hover {
          .logo_basic {
            fill: var(--main-color);
          }
          h1 {
            color: var(--main-color);
          }
        }
      }
      .otherAndUser {
        display: flex;
        align-items: center;
        height: 64px;
        .my-nav-search {
          width: 180px;
          margin-right: 20px;
          .el-input__inner {
            background-color: transparent;
          }
        }
        .my-nav-message {
          height: 25px;
          width: 25px;
          color: #c0c4cc;
          font-size: 22px;
          margin-right: 18px;
          line-height: 25px;
          cursor: pointer;
        }
        .my-nav-message:hover {
          color: var(--main-color-hover);
        }
        .loginGroup {
          display: inline-block;
          .btnLogin {
            display: inline-block;
            font-family: "FZQK";
            color: white;
            height: 37px;
            line-height: 37px;
            transition: color 0.2s;
          }

          .btnRegister {
            display: inline-block;
            font-family: "FZQK";
            color: white;
            height: 35px;
            line-height: 35px;
            padding: 0 16px;
            border: 1px solid white;
            border-radius: 4px;
            margin-left: 20px;
            margin-right: 10px;
            transition: color 0.2s, border 0.2s;
          }
          .btnLogin:hover {
            color: var(--main-color);
          }
          .btnRegister:hover {
            color: var(--main-color);
            border-color: var(--main-color);
          }
        }
        .loginedGroup {
          display: flex;
          align-items: center;
          margin-right: 14px;
          .el-avatar {
            cursor: pointer;
          }
        }
      }
    }
  }

  .nav-item {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    .cities {
      margin: auto;
      width: 1120px;
      display: flex;
      justify-content: space-between;
      a {
        font-size: 20px;
        padding: 12px;
        font-family: "FZQK";
        cursor: pointer;
        color: white;
        transition: border-bottom-color 0.2s, color 0.2s;
        border-bottom: 4px solid transparent;
      }

      a:hover {
        color: var(--main-color);
        border-bottom: 4px solid var(--main-color);
      }
    }
  }
}

.nothome {
  margin-bottom: 20px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  .nav-title-bigcon {
    border-bottom: 1px solid #f1f1f1;
    .nav-title-container {
      .logoandtitle {
        .extendtitle h1 {
          color: var(--main-color);
        }
        .extendtitle:hover h1 {
          color: var(--main-color-hover);
        }
        .mainlogoandtitle {
          .nav-logo .logo_basic {
            fill: var(--main-color);
          }
          h1 {
            color: var(--main-color);
          }
        }
        .mainlogoandtitle:hover {
          .logo_basic {
            fill: var(--main-color-hover);
          }
          h1 {
            color: var(--main-color-hover);
          }
        }
      }
      .otherAndUser {
        .loginGroup {
          .btnLogin {
            color: var(--main-color);
          }

          .btnRegister {
            color: var(--main-color);
            border: 1px solid var(--main-color);
          }
          .btnLogin:hover {
            color: var(--main-color-hover);
          }
          .btnRegister:hover {
            color: var(--main-color-hover);
            border-color: var(--main-color-hover);
          }
        }
      }
    }
  }
  .nav-item {
    .cities {
      a {
        color: var(--main-color);
      }
      a:hover {
        color: var(--main-color-hover);
        border-bottom: 4px solid var(--main-color-hover);
      }
    }
  }
}

.collapsed {
  height: 65px;
  .nav-title-bigcon {
    border-bottom: none;
  }
}
</style>