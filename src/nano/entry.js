import Vue from 'vue'
import App from './app'
import ContentFilterView from './ContentFilterView'
import Router from 'vue-router'
import pikaday from '../_directives/pikaday'
import 'muicss/lib/css/mui.min.css'

// install router
Vue.use(Router)
Vue.directive('pikaday', pikaday)

// routing
var router = new Router()

router.map({
  '/nano_share': {
    component: ContentFilterView
  }
})

router.redirect({
  '*': '/nano_share'
})

router.start(App, '#app')
