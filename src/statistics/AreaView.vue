<template>
  <div>
  <div class="mui-row pikaday">
    <div class="mui-col-md-7">
      <div>
        <a id="0" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button1 }}" @click="queryPeriod(0)">今天</a>
        <a id="1" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button2 }}" @click="queryPeriod(1)">昨天</a>
        <a id="7" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button3 }}" @click="queryPeriod(7)">最近7天</a>
        <a id="30" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button4 }}" @click="queryPeriod(30)">最近30天</a>
        <a id="100" class="mui-btn mui-btn--primary mui-btn--small period {{ buttonState.button5 }}" @click="queryPeriod(100)">全部</a>
      </div>
    </div>
    <div class="mui-col-md-3" style="min-width:235px">
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
    <div class="mui-col-md-2" style="min-width:180px">
      <div class="" style="min-width:180px">
      <button @click="queryDate" class="mui-btn mui-btn--raised text-right">查询</button>
      <a :href="back('0')" class="mui-btn mui-btn--raised">返回</a>
      </div>
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
      buttonState: getButtonState
    }
  },

  data () {
    return {
      startTime: '',
      endTime: '',
      start: '',
      end: '',
      is_native: 0
    }
  },

  created () {
    this.startTime = store.state.startTime
    this.endTime = store.state.endTime
    this.start = this.startTime
    this.end = this.endTime
    this.updateColor()
  },

  methods: {
    back (v) {
      const cname = this.$route.params.cname
      var s = 'active_map/nano_active_map'
      if (cname === 'nano_active_area') {
        s = 'active_map/nano_active_map'
      } else if (cname === 'share_area') {
        s = 'map/location_share'
      } else if (cname === 'visit_area') {
        s = 'map/share_visitor'
      } else if (cname === 'user_area') {
        s = 'map/user_distribution'
      }
      return '#!/' + s
    },
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
        is_native: this.is_native
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
        is_native: this.is_native
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
    }
  },

  route: {
    data ({ to }) {
      this.startTime = store.state.startTime
      this.endTime = store.state.endTime
      this.start = this.startTime
      this.end = this.endTime
      this.is_native = to.params.is_native
      const cname = to.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end,
        is_native: this.is_native
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
  }
</style>