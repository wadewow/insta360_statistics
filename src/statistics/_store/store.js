import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Api from './_api'
import ChartList from './_chartList'
import ChartData from './_chartData'
import ChartSerializer from './_chartSerializer'
import moment from 'moment'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
Vue.use(VueResource)
// 创建一个对象来保存应用启动时的初始状态
const state = {
  startTime: moment().subtract(29, 'days').format('YYYY-MM-DD'),
  endTime: moment().format('YYYY-MM-DD'),
  button: {
    button1: 'active',
    button2: '',
    button3: '',
    button4: '',
    button5: ''
  },
  isLogin: false,
  posts: {
    page: 1,
    list: [
      { 'id': 1, 'title': 'cjb', 'content': 'first' },
      { 'id': 2, 'title': 'sb', 'content': 'second' },
      { 'id': 3, 'title': 'ch', 'content': 'third' }
    ],
    post: {},
    data: null
  },
  chart: {
    list: ChartList,
    name: 'pie',
    data: {
      tooltip: {},
      xAxis: {
      },
      yAxis: {},
      series: []
    }
  },
  table: {
    name: 'table',
    data: {
      current_page: 1,
      page_total: 1,
      column: [],
      series: []
    }
  },
  table1: {
    name: 'table',
    data: {
      current_page: 1,
      page_total: 1,
      column: [],
      series: []
    }
  },
  table2: {
    name: 'table',
    data: {
      current_page: 1,
      page_total: 1,
      column: [],
      series: []
    }
  }
}

// 定义一个方法通过接口处理数据并更新到store
const apiQuery = (path, query) => {
  Vue.http.get(Api[path].url, { params: query }).then((res) => {
    // success callback
    state.chart.data = ChartSerializer[Api[path].serialize](JSON.parse(res.body), query.location)
    // console.log(state.chart.data)
  }, (res) => {
    // error callback
    console.log(res)
  })
}

const apiQueryTable = (path, query) => {
  Vue.http.get(Api[path].url, { params: query }).then((res) => {
    // success callback
    state.table.data = ChartSerializer[Api[path].serialize](JSON.parse(res.body))
  }, (res) => {
    // error callback
    console.log(res)
  })
}

const apiQueryTable1 = (path, query) => {
  Vue.http.get(Api[path].url, { params: query }).then((res) => {
    // success callback
    state.table1.data = ChartSerializer[Api[path].serialize](JSON.parse(res.body))
  }, (res) => {
    // error callback
    console.log(res)
  })
}

const apiQueryTable2 = (path, query) => {
  Vue.http.get(Api[path].url, { params: query }).then((res) => {
    // success callback
    state.table2.data = ChartSerializer[Api[path].serialize](JSON.parse(res.body))
  }, (res) => {
    // error callback
    console.log(res)
  })
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  POSTS_NEXT (state, offset) {
    state.posts.page = state.posts.page + offset
  },
  POSTS_PREV (state, offset) {
    state.posts.page = state.posts.page - offset
  },
  POST_UPDATE (state, pid) {
    for (const index in state.posts.list) {
      if (state.posts.list[index].id === parseInt(pid, 0)) {
        state.posts.post = state.posts.list[index]
        return
      }
    }
  },
  CHART_UPDATE (state, cname, query) {
    state.chart.name = cname
    if (cname === 'nano_active' || cname === 'nano_active_map' || cname === 'location_active_detail' || cname === 'month_share_trends' || cname === 'nano_store' || cname === 'click_buylink' || cname === 'location_share' || cname === 'share_visitor' || cname === 'share_visitor_trend' || cname === 'nano_active_area' || cname === 'share_area' || cname === 'visit_area' || cname === 'buylink_store_trends') {
      apiQuery(cname, query)
    } else {
      state.chart.data = ChartData[cname]
    }
  },
  TABLE_UPDATE (state, tname, query) {
    state.table.name = tname
    state.chart.name = tname
    if (tname === 'share_list') {
      apiQueryTable1(tname, query)
    } else if (tname === 'rest_statistics') {
      apiQueryTable(tname, query)
    } else if (tname === 'knowmore') {
      apiQueryTable2(tname, query)
    }else {
      state.table.data = ChartData[tname]
    }
  },
  VALIDATE (state, username, password) {
    if (username === 'insta360_admin' && password === '50lan123') {
      state.isLogin = true
    } else {
      state.isLogin = false
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
