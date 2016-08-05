<template>
  <div>
  <div class="mui-row pikaday">
    <div class="mui-col-md-7">
      <div>
        <button class="mui-btn mui-btn--primary mui-btn--small" @click="queryPeriod(0)">今天</button>
        <button class="mui-btn mui-btn--primary mui-btn--small" @click="queryPeriod(1)">昨天</button>
        <button class="mui-btn mui-btn--primary mui-btn--small" @click="queryPeriod(7)">最近7天</button>
        <button class="mui-btn mui-btn--primary mui-btn--small" @click="queryPeriod(30)">最近30天</button>
        <button class="mui-btn mui-btn--primary mui-btn--small" @click="queryPeriod(100)">历史总数</button>
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
    <div class="mui-col-md-2">
      <div class="" style="min-width:180px">
      <button @click="queryDate" class="mui-btn mui-btn--raised text-right">查询</button>
      <a :href="back('0')" class="mui-btn mui-btn--raised">返回</a>
      </div>
    </div>
  </div>
  <block :items="data"></block>
  <chart :name="name" :data="data"></chart>
  <input type='hidden' id="chartType" value="{{ data['series'][0]['type'] }}"/>
  </div>
</template>

<script>
import Chart from './_component/Chart'
import Block from './_component/Block'
import store from './_store/store'
import moment from 'moment'
import { getChartName, getChartData } from './_store/getters'

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
      data: getChartData
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
    // this.startTime = new Date(Date.parse(new Date()) - 6 * 24 * 3600 * 1000).toLocaleDateString().replace(/[年月]/g, '-').replace(/[日]/g, '').replace(/[\u200e]/g, '')
    // this.endTime = new Date().toLocaleDateString().replace(/[年月]/g, '-').replace(/[日]/g, '').replace(/[\u200e]/g, '')
    // this.start = this.startTime
    // this.end = this.endTime
    // this.is_native = 0
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
      }
      return '#!/' + s
    },
    queryDate () {
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime,
        is_native: this.is_native
      }
      store.dispatch('CHART_UPDATE', cname, query)
      this.start = this.startTime
      this.end = this.endTime
    },
    queryPeriod (val) {
      if (val === 30 || val === 7) {
        this.startTime = moment().subtract((val - 1), 'days').format('YYYY-MM-DD')
        this.endTime = moment().format('YYYY-MM-DD')
      } else if (val === 1) {
        this.startTime = moment().subtract(1, 'days').format('YYYY-MM-DD')
        var chartType = document.getElementById('chartType').value
        if (chartType === 'line') {
          this.endTime = moment().format('YYYY-MM-DD')
        }else {
          this.endTime = this.startTime
        }
      } else if (val === 0) {
        this.startTime = moment().format('YYYY-MM-DD')
        this.endTime = this.startTime
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
        is_native: this.is_native
      }
      store.dispatch('CHART_UPDATE', cname, query)
    }
  },

  route: {
    data ({ to }) {
      this.startTime = to.params.startTime || moment().subtract(6, 'days').format('YYYY-MM-DD')
      this.endTime = to.params.endTime || moment().format('YYYY-MM-DD')
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