import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Api from './_api'
import moment from 'moment'
// import Serializer from './_Serializer'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
Vue.use(VueResource)
// 创建一个对象来保存应用启动时的初始状态
const state = {
  startTime: moment().subtract(29, 'days').format('YYYY-MM-DD'),
  endTime: moment().format('YYYY-MM-DD'),
  // time: moment().format('YYYY-MM-DD'),
  // week: moment().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
  // power: [true, true, true],
  isLogin: false,
  // username: 'admin',
  userInfo: {
    username: 'insta360_admin',
    power: {
      'native_sales': true,
      'abroad_sales': true,
      'electronic_sales': true
    }
  },
  sales_native: {
    week: '',
    name: 'sales_native',
    items: []
  },
  sales_abroad: {
    week: '',
    name: 'sales_abroad',
    items: []
  },
  electronic_sales: {
    week: '',
    name: 'electronic_sales',
    items: []
  }
}

const apiPOST = (path, query) => {
  Vue.http.post(Api[path].url, query).then((res) => {
    // success callback
  }, (res) => {
    // error callback
    console.log(res)
  })
}

const apiGET = (path, query) => {
  // console.log(path)
  Vue.http.get(Api[path].url, { params: query }).then((res) => {
    if (path === 'native_sales') {
      state.sales_native.items = JSON.parse(res.body)['data']
      state.sales_native.week = JSON.parse(res.body)['week']
    } else if (path === 'abroad_sales') {
      state.sales_abroad.items = JSON.parse(res.body)['data']
      state.sales_abroad.week = JSON.parse(res.body)['week']
    } else if (path === 'electronic_sales') {
      state.electronic_sales.items = JSON.parse(res.body)['data']
      state.electronic_sales.week = JSON.parse(res.body)['week']
    }
    // success callback
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

  POST (state, fname, query) {
    apiPOST(fname, query)
  },
  GET (state, fname, query) {
    apiGET(fname, query)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
