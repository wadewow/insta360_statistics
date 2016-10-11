<template>
  <div>
  <div class="mui-row pikaday">
    <div class="mui-col-md-5">
        <div class="period">
        <a id="0" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button1 }}" @click="queryPeriod(0)">今天</a>
        <a id="1" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button2 }}" @click="queryPeriod(1)">昨天</a>
        <a id="7" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button3 }}" @click="queryPeriod(7)">最近7天</a>
        <a id="30" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button4 }}" @click="queryPeriod(30)">最近30天</a>
        <a id="100" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button5 }}" @click="queryPeriod(100)">全部</a>
        </div>
    </div>
    <div class="mui-col-md-2">
    <div class="mui-select">
    <select v-model="location" @change="queryLocation">
      <option value="">全部</option>
      <option v-for="loc in locations" value="{{ loc }}" >{{ loc }}</option>
    </select>
    <label>选择国家</label>
    </div>
    </div>

    <div class="mui-col-md-4" style="min-width:235px">
      <div class="right" style="min-width:235px">
      <div class="mui-textfield right">
        <label for="end_time">To</label>
        <input style="width:100px" type="text" id="end_time" placeholder="End Time" v-pikaday="endTime">
      </div>
      <div class="mui-textfield right">
        <label for="start_time">From</label>
        <input style="width:100px" type="text" id="start_time" placeholder="Start Time" v-pikaday="startTime">
      </div>
      </div>
    </div>
    <div class="mui-col-md-1">
      <button @click="queryDate" class="mui-btn mui-btn--raised text-right">查询</button>
    </div>
  </div>
  <mytable :name="name" :data="data"></mytable>
  <div class="mui-container-fluid page_tool">
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='firstPage'>首页</button>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='prevPage'>上页</button>
  <span class="currentPage">{{ data.current_page }}</span> / <span class="totalPage">{{ data.page_total }}</span>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='nextPage'>下页</button>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='lastPage'>尾页</button>
  <span>跳转到第</span>
  <input id="skip" class="skip" type="text" v-model="skip" v-on:keyup.enter="queryPage"></input>
  <span>页</span>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='queryPage'>GO</button>
  <span> 总计 </span><span>{{ data.total }}</span><span> 条</span>
  <input type="hidden" id="total_page" number value="{{ data.page_total }}"></input>
  </div>
  </div>
</template>

<script>
import Mytable from './_view/Mytable'
import store from './_store/store'
import moment from 'moment'
import { getTableName1, getTableData1, getButtonState, getLocations } from './_store/getters'

export default {
  name: 'TableView',

  components: {
    Mytable
  },

  store: store,

  vuex: {
    getters: {
      name: getTableName1,
      data: getTableData1,
      buttonState: getButtonState,
      locations: getLocations
    }
  },

  data () {
    return {
      startTime: '',
      endTime: '',
      page: 1,
      location: '',
      order: 'time_desc',
      pageSize: 10,
      start: '',
      end: '',
      skip: ''
    }
  },

  created () {
    this.startTime = store.state.startTime
    this.endTime = store.state.endTime
    this.start = this.startTime
    this.end = this.endTime
    this.page = 1
    this.order = 'time_desc'
    this.pageSize = 10
    this.updateColor()
    this.skip = ''
    const query = {
    }
    store.dispatch('LIST_UPDATE', 'share_locations', query)
  },

  methods: {
    queryLocation () {
      this.page = 1
      this.query()
    },
    queryDate () {
      this.updateColor()
      this.start = this.startTime
      this.end = this.endTime
      this.page = 1
      this.keepSame()
      store.state.startTime = this.start
      store.state.endTime = this.end
      this.query()
    },
    queryPeriod (val) {
      this.changeColor(val)
      if (val === 30 || val === 7) {
        this.startTime = moment().subtract((val - 1), 'days').format('YYYY-MM-DD')
        this.endTime = moment().format('YYYY-MM-DD')
      } else if (val === 1) {
        this.startTime = moment().subtract(1, 'days').format('YYYY-MM-DD')
        this.endTime = this.startTime
      } else if (val === 0) {
        this.startTime = moment().format('YYYY-MM-DD')
        this.endTime = this.startTime
      } else if (val === 100) {
        this.startTime = '2016-06-01'
        this.endTime = moment().format('YYYY-MM-DD')
      }
      this.start = this.startTime
      this.end = this.endTime
      this.page = 1
      store.state.startTime = this.start
      store.state.endTime = this.end
      this.query()
    },
    queryPage () {
      var total = document.getElementById('total_page').value
      var val = this.skip
      var re = /^[0-9]*[1-9][0-9]*$/
      this.skip = ''
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
    sort (val) {
      // alert(this.order)
      // this.order = val
      this.page = 1
      this.query()
    },
    query () {
      const tname = this.$route.params.tname
      const query = {
        search_location: this.location,
        start_time: this.start,
        end_time: this.end,
        page_number: this.page,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.keepSame()
    },
    keepSame () {
      this.startTime = this.start
      this.endTime = this.end
    },
    changeColor (val) {
      store.state.button.button1 = ''
      store.state.button.button2 = ''
      store.state.button.button3 = ''
      store.state.button.button4 = ''
      store.state.button.button5 = ''
      if (val === 0) {
        store.state.button.button1 = 'active'
      } else if (val === 1) {
        store.state.button.button2 = 'active'
      } else if (val === 7) {
        store.state.button.button3 = 'active'
      } else if (val === 30) {
        store.state.button.button4 = 'active'
      } else if (val === 100) {
        store.state.button.button5 = 'active'
      }
    },
    updateColor () {
      if (this.startTime === moment().subtract(29, 'days').format('YYYY-MM-DD') && this.endTime === moment().format('YYYY-MM-DD')) {
        this.changeColor(30)
      } else if (this.startTime === moment().subtract(6, 'days').format('YYYY-MM-DD') && this.endTime === moment().format('YYYY-MM-DD')) {
        this.changeColor(7)
      } else if (this.startTime === moment().subtract(1, 'days').format('YYYY-MM-DD') && this.endTime === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
        this.changeColor(1)
      } else if (this.startTime === moment().format('YYYY-MM-DD') && this.endTime === moment().format('YYYY-MM-DD')) {
        this.changeColor(0)
      } else if (this.startTime === '2016-06-01' && this.endTime === moment().format('YYYY-MM-DD')) {
        this.changeColor(100)
      } else {
        this.changeColor(-1)
      }
    }
  },

  route: {
    data ({ to }) {
      this.startTime = store.state.startTime
      this.endTime = store.state.endTime
      this.start = this.startTime
      this.end = this.endTime
      this.pagesize = 10
      this.order = 'time_desc'
      this.page = 1
      const tname = to.params.tname
      const query = {
        search_location: this.location,
        start_time: this.start,
        end_time: this.end,
        page_size: this.pageSize,
        query_order: this.order,
        page_number: this.page
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.keepSame()
      this.updateColor()
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
    /*.period {
      display:inline;
    }*/
    .mui-radio {
      display:inline;
      margin-left:10px;
    }
  }
  .skip {
    width:35px
  }
</style>