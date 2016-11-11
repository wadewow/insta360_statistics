import Vue from 'vue'
import App from './app'
import LoginView from './LoginView'
import Router from 'vue-router'
import store from './_store/store'
import pikaday from '../_directives/pikaday'
import DataEntry from './DataEntry'
import 'muicss/lib/css/mui.min.css'

// install router
Vue.use(Router)
Vue.directive('pikaday', pikaday)

// routing
var router = new Router()

router.map({
  '/login': {
    component: LoginView
  },
  '/DataEntry': {
    component: DataEntry
  }
})

router.beforeEach(function () {
  if (document.cookie.indexOf('isLoginBI=true') < 0) {
    router.go('/login')
  } else {
    var username = getCookie('usernameBI')
    if (username !== '') {
      store.state.userInfo.username = username
    }
    var power = getCookie('powerBI')
    if (power !== '') {
      store.state.userInfo.power = JSON.parse(power)
    }
  }
})

router.redirect({
  '*': '/DataEntry'
})

router.start(App, '#app')

function getCookie (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) {
        c_end = document.cookie.length
      }
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
