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
import Router from 'vue-router'
import echarts from '../_directives/echarts'
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
  }
})

router.beforeEach(function () {
  // window.scrollTo(0, 0)
  // var isLogin = store.state.isLogin
  // if (!isLogin) {
  //   router.go('/login')
  // }
  if (document.cookie.indexOf('isLogin=true') < 0) {
    router.go('/login')
  }
})

router.redirect({
  '*': '/chart/nano_active'
})

router.start(App, '#app')
