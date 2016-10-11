<template>
  <div>
  <div class="mui-row pikaday">
    <div class="mui-col-md-5">
      <div>
        <a id="0" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button1 }}" @click="queryPeriod(0)">今天</a>
        <a id="1" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button2 }}" @click="queryPeriod(1)">昨天</a>
        <a id="7" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button3 }}" @click="queryPeriod(7)">最近7天</a>
        <a id="30" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button4 }}" @click="queryPeriod(30)">最近30天</a>
        <a id="100" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button5 }}" @click="queryPeriod(100)">全部</a>
      </div>
    </div>
    <div class="mui-col-md-3">
    <div class="" style="display:block;height:50px;padding-top:10px">
    <div class="mui-radio">
        <label><input type="radio" name="source" value="taobao" v-model='source' checked @click="querySource('taobao')">淘宝销量</label>
    </div>
    <div class="mui-radio">
        <label><input type="radio" name="source" v-model='source' value="jd" @click="querySource('jd')">京东评论</label>
   </div>
   </div>
    </div>
    <div class="mui-col-md-3">
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
<div class="mui-container-fluid">
    <block :items="data"></block>
</div>
  <chart :name="name" :data="data"></chart>
<div class="mui-container-fluid">
<div class="mui-row">
<div class="mui-col-md-2">
    <div class="mui-select">
    <select v-model="commodity">
      <option v-for="commodity in data1['commodities']" value="{{ commodity }}" >{{ commodity }}</option>
    </select>
    <label>选择产品</label>
    </div>
  </div>
  <div class="mui-col-md-2">
      <div class="mui-textfield">
        <label for="date">Date</label>
        <input type="text" id="date" placeholder="Date" v-pikaday="date">
      </div>
  </div>
    <div class="mui-col-md-1">
      <button @click="queryDetail" class="mui-btn mui-btn--raised text-right">查询</button>
    </div>
    <div class="mui-col-md-7"></div>
   </div>
  </div>
    <div id='tableContainer'>
    <table class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th v-for="column in data1['column']">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data1['series']">
          <td>{{ item.shop }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.sales }}</td>
          <td><a target="_blank" href="{{ item.link }}">{{ item.link }}</a></td>
          <td>{{ item.location }}</td>
          <td v-if="item.is_tmall==0">淘宝</td>
          <td v-else>天猫</td>
        </tr>
    </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import Chart from './_component/Chart'
import Block from './_component/Block'
import store from './_store/store'
import moment from 'moment'
import { getChartName, getChartData, getButtonState, getTableName5, getTableData5 } from './_store/getters'

export default {
  name: 'ChartView',

  components: {
    Chart,
    Block
  },

  store: store,

  vuex: {
    getters: {
      name: getChartName,
      data: getChartData,
      buttonState: getButtonState,
      name1: getTableName5,
      data1: getTableData5
    }
  },

  data () {
    return {
      startTime: '',
      endTime: '',
      start: '',
      end: '',
      source: 'taobao',
      commodity: 'insta360 Nano',
      date: ''
    }
  },

  created () {
    this.startTime = store.state.startTime
    this.endTime = store.state.endTime
    this.start = this.startTime
    this.end = this.endTime
    this.updateColor()
    this.source = 'taobao'
    this.commodity = 'insta360 Nano'
    this.date = moment().subtract(1, 'days').format('YYYY-MM-DD')
  },

  methods: {
    queryDate () {
      this.updateColor()
      this.start = this.startTime
      this.end = this.endTime
      store.state.startTime = this.start
      store.state.endTime = this.end
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime,
        source: this.source
      }
      store.dispatch('CHART_UPDATE', cname, query)
    },
    querySource (val) {
      this.source = val
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime,
        source: this.source
      }
      store.dispatch('CHART_UPDATE', cname, query)
    },
    queryPeriod (val) {
      this.changeColor(val)
      if (val === 30 || val === 7) {
        this.startTime = moment().subtract((val - 1), 'days').format('YYYY-MM-DD')
        this.endTime = moment().format('YYYY-MM-DD')
      } else if (val === 1) {
        this.startTime = moment().subtract(1, 'days').format('YYYY-MM-DD')
        // this.endTime = moment().format('YYYY-MM-DD')
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
      store.state.startTime = this.start
      store.state.endTime = this.end
      const cname = this.$route.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end,
        source: this.source
      }
      store.dispatch('CHART_UPDATE', cname, query)
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
    },
    queryDetail () {
      const query = {
        date: this.date,
        commodity: this.commodity
      }
      store.dispatch('TABLE_UPDATE', 'taobao_detail', query)
    }
  },

  route: {
    data ({ to }) {
      this.startTime = store.state.startTime
      this.endTime = store.state.endTime
      this.start = this.startTime
      this.end = this.endTime
      const cname = to.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end,
        source: this.source
      }
      store.dispatch('CHART_UPDATE', cname, query)
      this.updateColor()

      const query1 = {
        date: this.date,
        commodity: this.commodity
      }
      store.dispatch('TABLE_UPDATE', 'taobao_detail', query1)
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
  }
  #tableContainer {
    overflow:auto;
    height: 100%;
    max-height: 600px;
  }
</style>