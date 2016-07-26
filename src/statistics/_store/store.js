import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Api from './_api'
import ChartList from './_chartList'
import ChartData from './_chartData'
import ChartSerializer from './_chartSerializer'

// 告诉 vue “使用” vuex
Vue.use(Vuex)
Vue.use(VueResource)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  posts: {
    page: 1,
    list: [
      { 'id': 1, 'title': 'cjb', 'content': 'first' },
      { 'id': 2, 'title': 'sb', 'content': 'second' },
      { 'id': 3, 'title': 'sb pm', 'content': 'third' }
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
      page_total: 0,
      column: [],
      series: []
    }
  }
}

// 定义一个方法通过接口处理数据并更新到store
const apiQuery = (path, query) => {
  Vue.http.get(Api[path].url, { params: query }).then((res) => {
    // success callback
    state.chart.data = ChartSerializer[Api[path].serialize](JSON.parse(res.body))
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
    if (cname === 'nano_active' || cname === 'nano_active_map' || cname === 'location_active_detail') {
      apiQuery(cname, query)
    } else {
      state.chart.data = ChartData[cname]
    }
  },
  TABLE_UPDATE (state, tname, query) {
    state.table.name = tname
    if (tname === 'share_list') {
      apiQueryTable(tname, query)
    } else {
      state.table.data = ChartData[tname]
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
