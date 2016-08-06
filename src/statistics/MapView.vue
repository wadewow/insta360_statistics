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
  <div style="display:block;height:100px">
    <block :items="data"></block>
  </div>
  <div class="mui-col-md-8">
  <chart class="chart" :name="name" :data="data"></chart>
  </div>
  <div class="mui-col-md-4">
  <div class="right" style="min-width:390px">
    <table class="mui-table mui-table--bordered table">
      <thead>
        <tr>
            <th>全国</th>
            <th>数量</th>
            <th>占比</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['top']['native']">
            <td>{{ item.name }}</td>
            <td class="mui--text-center">{{ item.value }}</td>
            <td class="mui--text-center">{{ item.percent }}%</td>
        </tr>
        <tr><td colspan="2"><a :href="href('1')" class="mui-btn mui-btn--primary mui-btn--small">区域对比</a></td></tr>
      </tbody>
    </table>
    <table class="mui-table mui-table--bordered table">
      <thead>
        <tr>
            <th>世界</th>
            <th>数量</th>
            <th>占比</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['top']['abroad']">
            <td>{{ item.name }}</td>
            <td class="mui--text-center">{{ item.value }}</td>
            <td class="mui--text-center">{{ item.percent }}%</td>
        </tr>
        <tr><td colspan="2"><a :href="href('0')" class="mui-btn mui-btn--primary mui-btn--small">区域对比</a></td></tr>
      </tbody>
    </table>
    </div>
  </div>
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
      end: ''
    }
  },

  created () {
    this.startTime = moment().subtract(29, 'days').format('YYYY-MM-DD')
    this.endTime = moment().format('YYYY-MM-DD')
    this.start = this.startTime
    this.end = this.endTime
  },

  methods: {
    href (v) {
      var start = this.start.replace(/\//g, '-')
      var end = this.end.replace(/\//g, '-')
      var cname = this.$route.params.cname
      var s = 'share_area'
      if (cname === 'location_share') {
        s = 'share_area'
      } else if (cname === 'share_visitor') {
        s = 'visit_area'
      }
      return '#!/area/' + s + '/' + start + '/' + end + '/' + v
    },
    queryDate () {
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime
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
      const cname = this.$route.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end
      }
      store.dispatch('CHART_UPDATE', cname, query)
    }
  },

  route: {
    data ({ to }) {
      const cname = to.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end
      }
      store.dispatch('CHART_UPDATE', cname, query)
      this.startTime = this.start
      this.endTime = this.end
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
  .chart {
    width: 100%;
  }
  .table {
    margin-left: 10px;
    margin-top: -20px;
  }
</style>