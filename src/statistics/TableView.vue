<template>
  <div class="mui-row pikaday">
    <div class="mui-col-md-5">
        <div class="period">
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(0)">今天</button>
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(1)">昨天</button>
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(7)">最近7天</button>
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(30)">最近一个月</button>
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(100)">历史总数</button>
        </div>
    </div>
    <div class="mui-col-md-2">
      <div class="" style="min-width:180px;line-height:50px;">
        <div class="mui-radio">
            <input class="radio" type="radio" checked="checked" name="type" value="all" v-model='type' @click="queryType('all')">全部</input>
            <input class="radio" type="radio" name="type" value="video" v-model='type' @click="queryType('video')">视频</input>
            <input class="radio" type="radio" name="type" value="img" v-model='type' @click="queryType('img')">图片</input>
        </div>
      </div>
    </div>

    <div class="mui-col-md-4">
      <div style="min-width:390px">
      <div class="mui-textfield right">
        <label for="end_time">To</label>
        <input type="text" id="end_time" placeholder="End Time" v-pikaday="endTime">
      </div>
      <div class="mui-textfield right">
        <label for="start_time">From</label>
        <input type="text" id="start_time" placeholder="Start Time" v-pikaday="startTime">
      </div>
      </div>
    </div>
    <div class="mui-col-md-1">
      <button @click="queryDate" class="mui-btn mui-btn--raised text-right">查询</button>
    </div>
  </div>
  <mytable :name="name" :data="data"></mytable>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='firstPage'>首页</button>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='prevPage'>上页</button>
  <span class="currentPage">{{ data.current_page }}</span> / <span class="totalPage">{{ data.page_total }}</span>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='nextPage'>下页</button>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='lastPage'>尾页</button>
  <span>跳转到第</span>
  <input id="skip" class="skip" type="text" v-on:keyup.enter="queryPage"></input>
  <span>页</span>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='queryPage'>GO</button>
  <span> 总计 </span><span>{{ data.total }}</span><span> 条</span>
  <input type="hidden" id="total_page" number value="{{ data.page_total }}"></input>
</template>

<script>
import Mytable from './_view/Mytable'
import store from './_store/store'
import { getTableName, getTableData } from './_store/getters'

export default {
  name: 'TableView',

  components: {
    Mytable
  },

  store: store,

  vuex: {
    getters: {
      name: getTableName,
      data: getTableData
    }
  },

  data () {
    return {
      startTime: '',
      endTime: '',
      type: 'all',
      page: 1,
      order: 'time_desc',
      pageSize: 15,
      start: '',
      end: ''
    }
  },

  created () {
    this.startTime = new Date(Date.parse(new Date()) - 6 * 24 * 3600 * 1000).toLocaleDateString()
    this.endTime = new Date().toLocaleDateString()
    this.start = this.startTime
    this.end = this.endTime
    this.type = 'all'
    this.page = 1
    this.order = 'time_desc'
    this.pageSize = 15
  },

  methods: {
    queryDate () {
      this.start = this.startTime
      this.end = this.endTime
      this.page = 1
      this.query()
    },
    queryPeriod (val) {
      const tname = this.$route.params.tname
      const query = {
        new_time: val,
        query_type: this.type,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      if (val === 30 || val === 7) {
        this.startTime = new Date(Date.parse(new Date()) - (val - 1) * 24 * 3600 * 1000).toLocaleDateString()
        this.endTime = new Date().toLocaleDateString()
      } else if (val === 1) {
        this.startTime = new Date(Date.parse(new Date()) - 1 * 24 * 3600 * 1000).toLocaleDateString()
        this.endTime = this.startTime
      } else if (val === 0) {
        this.startTime = new Date(Date.parse(new Date())).toLocaleDateString()
        this.endTime = this.startTime
      } else if (val === 100) {
        this.startTime = '2016-06-01'
        this.endTime = new Date(Date.parse(new Date())).toLocaleDateString()
      }
      this.start = this.startTime
      this.end = this.endTime
      this.page = 1
    },
    queryPage () {
      var element = document.getElementById('skip')
      var total = document.getElementById('total_page').value
      var val = element.value
      var re = /^[0-9]*[1-9][0-9]*$/
      element.value = ''
      if ((!re.test(val)) || parseInt(val, 10) > parseInt(total, 10)) {
        return false
      }
      this.page = val
      this.query()
    },
    firstPage () {
      this.page = 1
      this.query()
    },
    lastPage () {
      var total = document.getElementById('total_page').value
      this.page = parseInt(total, 10)
      this.query()
    },
    nextPage () {
      var total = document.getElementById('total_page').value
      if (this.page >= parseInt(total, 10)) {
        return false
      }
      this.page ++
      this.query()
    },
    prevPage () {
      if (this.page > 1) {
        this.page --
        this.query()
      }
    },
    queryType (val) {
      this.type = val
      this.page = 1
      this.query()
    },
    sort (val) {
      // alert(this.order)
      // this.order = val
      this.page = 1
      this.query()
    },
    query () {
      const tname = this.$route.params.tname
      const query = {
        start_time: this.start,
        end_time: this.end,
        page_number: this.page,
        query_type: this.type,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.keepSame()
    },
    keepSame () {
      this.startTime = this.start
      this.endTime = this.end
    }
  },

  route: {
    data ({ to }) {
      const tname = to.params.tname
      const query = {
        start_time: this.start,
        end_time: this.end,
        page_size: this.pageSize,
        query_order: this.order,
        query_type: this.type,
        page_number: this.page
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.keepSame()
    }
  },

  events: {
    sort (msg) {
      if (msg === 'time') {
        if (this.order === 'time_desc') {
          this.order = 'time_asc'
        }else {
          this.order = 'time_desc'
        }
      }else if (msg === 'view') {
        if (this.order === 'view_desc') {
          this.order = 'view_asc'
        }else {
          this.order = 'view_desc'
        }
      }else if (msg === 'week_prew') {
        if (this.order === 'week_prew_desc') {
          this.order = 'week_prew_asc'
        }else {
          this.order = 'week_prew_desc'
        }
      }
      this.page = 1
      this.query()
    }
  }
}
</script>

<style lang="less">
  @import "../_less/v2/base";
  @import "../_less/component/animation";
  .pikaday {
    overflow: auto;
    padding: 1em;
    .mui-textfield {
      margin-left: 16px;
    }
    .period {
      display:inline;
    }
    .mui-radio {
      display:inline;
      .radio {
        margin-left: 10px;
      }
    }
  }
  .skip {
    width:35px
  }
</style>