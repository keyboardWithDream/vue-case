import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

//创建事件总线
Vue.prototype.$bus = new Vue();

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
