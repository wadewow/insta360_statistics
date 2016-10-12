import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Api from './_api'
import ChartSerializer from './_chartSerializer'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
Vue.use(VueResource)
// 创建一个对象来保存应用启动时的初始状态
const state = {
  table: {
    name: 'table',
    data: {
      current_page: 1,
      page_total: 1,
      column: [],
      series: [],
      total: 1
    }
  },
  locations: []
}

// 定义一个方法通过接口处理数据并更新到store
const apiQuery = (path, query) => {
  Vue.http.get(Api[path].url, { params: query }).then((res) => {
    // success callback
    // console.log(res)
    state.locations = ChartSerializer[Api[path].serialize](JSON.parse(res.body))
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

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  TABLE_UPDATE (state, tname, query) {
    state.table.name = tname
    state.table.name = tname
    if (tname === 'share_list' || tname === 'content_filter') {
      apiQueryTable(tname, query)
    }
  },
  LIST_UPDATE (state, cname, query) {
    apiQuery(cname, query)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
