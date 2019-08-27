import Vue from 'vue'
import Vuex from 'vuex'
import md5 from 'js-md5'
import { login, logout } from '@/api/login'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') || {},
  },
  getters: {
    islogin(state) {
      return JSON.stringify(state.user) != "{}"
    }
  },
  mutations: {
    LOGIN(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user))
    },
    LOGOUT(state) {
      state.user = {};
      localStorage.removeItem('user');
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      let data = {
        account: userInfo.username.trim(),
        passwd: md5(userInfo.password),
        code_text: userInfo.code
      }
      
      // function getUserInfo() {
      //   return new Promise((resolve, reject) => {
      //     // request中写了拦截器 只有200的能到这里 错误或者其他code 都被拒绝
      //     userinfo({}).then(res => {
      //       commit('LOGIN', res.data);
      //       resolve();
      //     }).catch(err => reject(err));
      //   })
      // }

      // return new Promise((resolve, reject) => {
      //   login(data).then(() => {
      //     getUserInfo().then(resolve())
      //       .catch(err => reject(err))
      //   }).catch(err => reject(err));
      // })
      
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          commit('LOGIN', res.data);
          resolve();
        }
        ).catch(err => reject(err));
      })
      
    },
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('LOGOUT');
          resolve();
        }).catch(err => reject(err));
      })
    }
  }
})
