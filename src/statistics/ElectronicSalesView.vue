<template>
  <div>
  <div class="mui-row pikaday">
    <div class="mui-col-md-5">
      <div>
        <a id="0" class="mui-btn mui-btn--primary mui-btn--small period {{ button.button1 }}" @click="queryPeriod(0)">本周</a>
        <a id="1" class="mui-btn mui-btn--primary mui-btn--small period {{ button.button2 }}" @click="queryPeriod(1)">上周</a>
        <a id="30" class="mui-btn mui-btn--primary mui-btn--small period {{ button.button4 }}" @click="queryPeriod(30)">最近30天</a>
        <a id="100" class="mui-btn mui-btn--primary mui-btn--small period {{ button.button5 }}" @click="queryPeriod(100)">全部</a>
      </div>
    </div>
    <div class="mui-col-md-2" style="min-width:160px">
    <div class="mui-select">
    <select v-model="location" @change="queryLocation">
      <option value="all">所有代理</option>
      <option v-for="location in data['locations']" >{{ location }}</option>
    </select>
    <label>选择代理</label>
    </div>
    </div>
    <div class="mui-col-md-4">
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
  </div>
</template>

<script>
import Chart from './_component/Chart'
import Block from './_component/Block'
import store from './_store/store'
import moment from 'moment'
import { getChartName, getChartData, getButtonState } from './_store/getters'

export default {
  name: 'SalesChartView',

  components: {
    Chart,
    Block
  },

  store: store,

  vuex: {
    getters: {
      name: getChartName,
      data: getChartData,
      buttonState: getButtonState
    }
  },

  data () {
    return {
      startTime: '',
      endTime: '',
      start: '',
      end: '',
      is_native: 1,
      location: 'all',
      button: {
        button1: '',
        button2: '',
        button4: 'active',
        button5: ''
      }
    }
  },

  created () {
    this.startTime = moment().subtract(29, 'days').format('YYYY-MM-DD')
    this.endTime = moment().format('YYYY-MM-DD')
    this.start = this.startTime
    this.end = this.endTime
    this.is_native = 1
    this.updateColor()
    this.location = 'all'
    this.button.button1 = ''
    this.button.button2 = ''
    this.button.button4 = 'active'
    this.button.button5 = ''
  },

  methods: {
    queryLocation () {
      this.start = this.startTime
      this.end = this.endTime
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime,
        is_native: this.is_native,
        location: this.location
      }
      store.dispatch('CHART_UPDATE', cname, query)
    },
    queryDate () {
      this.updateColor()
      this.start = this.startTime
      this.end = this.endTime
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime,
        is_native: this.is_native,
        location: this.location
      }
      store.dispatch('CHART_UPDATE', cname, query)
    },
    queryPeriod (val) {
      this.changeColor(val)
      if (val === 30) {
        this.startTime = moment().subtract(29, 'days').format('YYYY-MM-DD')
        this.endTime = moment().format('YYYY-MM-DD')
      } else if (val === 1) {
        this.startTime = moment().startOf('week').subtract(6, 'days').format('YYYY-MM-DD')
        this.endTime = moment().startOf('week').format('YYYY-MM-DD')
      } else if (val === 0) {
        this.startTime = moment().startOf('week').add(1, 'days').format('YYYY-MM-DD')
        this.endTime = moment().endOf('week').add(1, 'days').format('YYYY-MM-DD')
      } else if (val === 100) {
        this.startTime = '2016-06-01'
        this.endTime = moment().format('YYYY-MM-DD')
      }
      this.start = this.startTime
      this.end = this.endTime
      const cname = this.$route.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end,
        is_native: this.is_native,
        location: this.location
      }
      store.dispatch('CHART_UPDATE', cname, query)
    },
    changeColor (val) {
      this.button.button1 = ''
      this.button.button2 = ''
      this.button.button4 = ''
      this.button.button5 = ''
      if (val === 0) {
        this.button.button1 = 'active'
      } else if (val === 1) {
        this.button.button2 = 'active'
      } else if (val === 30) {
        this.button.button4 = 'active'
      } else if (val === 100) {
        this.button.button5 = 'active'
      }
    },
    updateColor () {
      if (this.startTime === moment().subtract(29, 'days').format('YYYY-MM-DD') && moment(this.endTime).isAfter(moment().startOf('week')) && moment(this.endTime).isBefore(moment().endOf('week').add(1, 'days'))) {
        this.changeColor(30)
      } else if (moment(this.startTime).isAfter(moment().startOf('week').subtract(7, 'days')) && moment(this.startTime).isBefore(moment().startOf('week').add(1, 'days')) && moment(this.endTime).isAfter(moment().startOf('week').subtract(7, 'days')) && moment(this.endTime).isBefore(moment().startOf('week').add(1, 'days'))) {
        this.changeColor(1)
      } else if (moment(this.startTime).isAfter(moment().startOf('week')) && moment(this.startTime).isBefore(moment().endOf('week').add(1, 'days')) && moment(this.endTime).isAfter(moment().startOf('week')) && moment(this.endTime).isBefore(moment().endOf('week').add(1, 'days'))) {
        this.changeColor(0)
      } else if (this.startTime === '2016-06-01' && moment(this.endTime).isAfter(moment().startOf('week')) && moment(this.endTime).isBefore(moment().endOf('week').add(1, 'days'))) {
        this.changeColor(100)
      } else {
        this.changeColor(-1)
      }
    }
  },

  route: {
    data ({ to }) {
      this.location = 'all'
      this.is_native = to.params.is_native
      const cname = to.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end,
        is_native: this.is_native,
        location: this.location
      }
      store.dispatch('CHART_UPDATE', cname, query)
      this.updateColor()
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
</style>