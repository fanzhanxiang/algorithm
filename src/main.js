import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import newRouter from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(VueAxios, axios)
Vue.use(iView)
// 使用axios,通过this访问，比如下面这种用法
// this.axios.get('api/getNewsList').then((response)=>{
//   this.newsList=response.data.data;
// }).catch((response)=>{
//   console.log(response);
// })
Vue.use(ElementUI)
Vue.use(Router)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

const router = new Router(newRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
