import Vue from 'vue'
import App from './app'
import PostsView from './PostsView'
import ChartView from './ChartView'
import SalesChartView from './SalesChartView'
import ActiveMapView from './ActiveMapView'
import MapView from './MapView'
import AreaView from './AreaView'
import TableView from './TableView'
import PostView from './PostView'
import LocationActiveDetail from './LocationActiveDetail'
import RestStatisticsView from './RestStatisticsView'
import CompetitorChartView from './CompetitorChartView'
import KnowmoreView from './KnowmoreView'
import LoginView from './LoginView'
import LinkQueryView from './LinkQueryView'
import Router from 'vue-router'
import echarts from '../_directives/echarts'
import store from './_store/store'
import pikaday from '../_directives/pikaday'
// import store from './_store/store'
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
  },
  '/active_map/:cname': {
    component: ActiveMapView
  },
  '/map/:cname': {
    component: MapView
  },
  '/area/:cname/:startTime/:endTime/:is_native': {
    component: AreaView
  },
  '/table/:tname': {
    component: TableView
  },
  '/location_active_detail/:cname/:city': {
    component: LocationActiveDetail
  },
  '/rest_statistics/:tname': {
    component: RestStatisticsView
  },
  '/knowmore/:tname': {
    component: KnowmoreView
  },
  '/login': {
    component: LoginView
  },
  '/sales_chart/:cname/:is_native': {
    component: SalesChartView
  },
  '/competitor_chart/:cname/:source': {
    component: CompetitorChartView
  },
  '/link_query/:tname': {
    component: LinkQueryView
  }
})

router.beforeEach(function () {
  if (document.cookie.indexOf('isLogin=true') < 0) {
    router.go('/login')
  } else {
    var username = getCookie('username')
    if (username !== '') {
      store.state.userInfo.username = getCookie('username')
    }
    var power = getCookie('power')
    if (power !== '') {
      store.state.userInfo.power = JSON.parse(getCookie('power'))
    }
  }
})

router.redirect({
  '*': '/chart/nano_active'
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
