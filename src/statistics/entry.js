import Vue from 'vue'
import App from './app'
import PostsView from './PostsView'
import ChartView from './ChartView'
import PostView from './PostView'
import Router from 'vue-router'
import echarts from '../_directives/echarts'
import pikaday from '../_directives/pikaday'

import 'muicss/lib/css/mui.min.css'

// install router
Vue.use(Router)
Vue.directive('echarts', echarts)
Vue.directive('pikaday', pikaday)

// routing
var router = new Router()

router.map({
  '/posts/:current': {
    component: PostsView
  },
  '/post/:pid': {
    component: PostView
  },
  '/chart/:cname': {
    component: ChartView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/posts/1'
})

router.start(App, '#app')
