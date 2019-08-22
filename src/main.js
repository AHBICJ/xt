import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './styles/main.css'

Vue.config.productionTip = false;
function imgaddress(image) {
  if (!image) return "null"
  if (image.toString().startsWith("http")) {
    return image
  } else {
    return process.env.VUE_APP_CDN + image
  }
}
Vue.prototype.$imgaddress= imgaddress
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
