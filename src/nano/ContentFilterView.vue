<template>
  <div>
  <div class="mui-container-fluid">
  <div class="mui-row pikaday">
    <div class="mui-col-md-3" style="min-width:260px;">
        <div class="period">
        <a id="0" class="mui-btn mui-btn--primary mui-btn--small period {{ button1 }}" @click="queryPeriod(0)">今天</a>
        <a id="1" class="mui-btn mui-btn--primary mui-btn--small period {{ button2 }}" @click="queryPeriod(1)">昨天</a>
        <a id="7" class="mui-btn mui-btn--primary mui-btn--small period {{ button3 }}" @click="queryPeriod(7)">最近7天</a>
        <a id="30" class="mui-btn mui-btn--primary mui-btn--small period {{ button4 }}" @click="queryPeriod(30)">最近30天</a>
        <a id="100" class="mui-btn mui-btn--primary mui-btn--small period {{ button5 }}" @click="queryPeriod(100)">全部</a>
        </div>
    </div>
    <div class="mui-col-md-1">
    <div class="mui-select">
    <select v-model="location" @change="queryLocation">
      <option value="">全部</option>
      <option value="海外">海外</option>
      <option v-for="loc in locations" value="{{ loc }}" >{{ loc }}</option>
    </select>
    <label>选择国家</label>
    </div>
    </div>
    <div class="mui-col-md-3" style="min-width:150px;">
      <div class="" style="display:block;height:50px;padding-top:10px">
    <div class="mui-radio">
        <label><input type="radio" name="type" value="all" v-model='type' checked @click="queryType('all')">视频&图片</label>
    </div>
    <div class="mui-radio">
        <label><input type="radio" name="type" v-model='type' value="video" @click="queryType('video')">视频</label>
    </div>
    <div class="mui-radio">
        <label><input type="radio" name="type" v-model='type' value="img" @click="queryType('img')">图片</label>
    </div>
    <div class="mui-radio">
        <label><input type="radio" name="type" v-model='type' value="album" @click="queryType('album')">图集</label>
    </div>
    <div class="mui-checkbox">
      <label>
        <input type="checkbox" v-model='daily' value="false" @click="queryDaily()">
          每日精选
      </label>
    </div>
    </div>
    </div>
    <div class="mui-col-md-2">
      <div class="mui-textfield right">
        <label for="serial_number">序列号</label>
        <input type="text" v-model="serial_number" id="serial_number" v-on:keyup.enter="queryDate" placeholder="">
      </div>
    </div>
    <div class="mui-col-md-2" style="min-width:235px">
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
import { getTableName, getTableData, getLocations } from './_store/getters'

export default {
  name: 'TableView',

  components: {
    Mytable
  },

  store: store,

  vuex: {
    getters: {
      name: getTableName,
      data: getTableData,
      locations: getLocations
    }
  },

  data () {
    return {
      startTime: '',
      endTime: '',
      type: 'all',
      location: '',
      page: 1,
      order: 'time_desc',
      pageSize: 10,
      start: '',
      end: '',
      skip: '',
      button1: '',
      button2: '',
      button3: '',
      button4: '',
      button5: '',
      tname: 'content_filter',
      daily: false,
      serial_number: ''
    }
  },

  created () {
    this.tname = 'content_filter'
    this.startTime = '2016-06-01'
    this.endTime = moment().format('YYYY-MM-DD')
    this.start = this.startTime
    this.end = this.endTime
    this.type = 'all'
    this.page = 1
    this.order = 'time_desc'
    this.pageSize = 10
    this.updateColor()
    this.skip = ''
    this.daily = false
    this.serial_number = ''
    const query = {
    }
    store.dispatch('LIST_UPDATE', 'location_share', query)
  },

  methods: {
    queryLocation () {
      this.page = 1
      this.serial_number = ''
      this.query()
    },
    queryDate () {
      this.updateColor()
      this.start = this.startTime
      this.end = this.endTime
      this.page = 1
      this.keepSame()
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
    queryType (val) {
      this.type = val
      this.page = 1
      this.query()
    },
    queryDaily () {
      this.daily = !this.daily
      this.page = 1
      this.query()
    },
    sort (val) {
      this.page = 1
      this.query()
    },
    query () {
      const query = {
        search_location: this.location,
        start_time: this.start,
        end_time: this.end,
        page_number: this.page,
        query_type: this.type,
        query_order: this.order,
        page_size: this.pageSize,
        daily: this.daily,
        serial_number: this.serial_number
      }
      store.dispatch('TABLE_UPDATE', this.tname, query)
      this.keepSame()
    },
    keepSame () {
      this.startTime = this.start
      this.endTime = this.end
    },
    changeColor (val) {
      this.button1 = ''
      this.button2 = ''
      this.button3 = ''
      this.button4 = ''
      this.button5 = ''
      if (val === 0) {
        this.button1 = 'active'
      } else if (val === 1) {
        this.button2 = 'active'
      } else if (val === 7) {
        this.button3 = 'active'
      } else if (val === 30) {
        this.button4 = 'active'
      } else if (val === 100) {
        this.button5 = 'active'
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
      this.start = this.startTime
      this.end = this.endTime
      this.pagesize = 10
      this.order = 'time_desc'
      this.type = 'all'
      this.page = 1
      this.daily = false
      const query = {
        search_location: this.location,
        start_time: this.start,
        end_time: this.end,
        page_size: this.pageSize,
        query_order: this.order,
        query_type: this.type,
        page_number: this.page,
        daily: this.daily,
        serial_number: this.serial_number
      }
      store.dispatch('TABLE_UPDATE', this.tname, query)
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
    .active {
      background: #EE7700
    }
    .active:hover {
      background: #EE7700
    }
    /*.period {
      display:inline;
    }*/
    .mui-radio {
      display:inline;
      margin-left:10px;
    }
    .mui-checkbox {
      margin-left:10px;
    }
  }
  .skip {
    width:35px
  }
  .page_tool {
    height:60px
  }
</style>