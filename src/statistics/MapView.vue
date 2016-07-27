<template>
  <div class="mui-row pikaday">
    <div class="mui-col-md-8">
      <div>
        <button class="mui-btn mui-btn--primary" @click="queryPeriod(0)">今天</button>
        <button class="mui-btn mui-btn--primary" @click="queryPeriod(1)">昨天</button>
        <button class="mui-btn mui-btn--primary" @click="queryPeriod(7)">最近7天</button>
        <button class="mui-btn mui-btn--primary" @click="queryPeriod(30)">最近一个月</button>
      </div>
    </div>
    <div class="mui-col-md-3">
      <div class="mui-textfield right">
        <label for="end_time">To</label>
        <input type="text" id="end_time" placeholder="End Time" v-pikaday="endTime">
      </div>
      <div class="mui-textfield right">
        <label for="start_time">From</label>
        <input type="text" id="start_time" placeholder="Start Time" v-pikaday="startTime">
      </div>
    </div>
    <div class="mui-col-md-1">
      <button @click="queryDate" class="mui-btn mui-btn--raised text-right">Submit</button>
    </div>
  </div>
  <block :items="data"></block>
  <chart class="chart" :name="name" :data="data"></chart>
    <table class="mui-table mui-table--bordered table">
      <thead>
        <tr>
            <th>激活所在地</th>
            <th>激活数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['top']">
            <td><a href="#!/location_active_detail/location_active_detail/{{ item.name }}">{{ item.name }}</a></td>
            <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import Chart from './_component/Chart'
import Block from './_component/Block'
import store from './_store/store'
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
    this.startTime = new Date(Date.parse(new Date()) - 7 * 24 * 3600 * 1000).toLocaleDateString()
    this.endTime = new Date().toLocaleDateString()
    this.start = this.startTime
    this.end = this.endTime
  },

  methods: {
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
      const cname = this.$route.params.cname
      const query = {
        new_time: val
      }
      store.dispatch('CHART_UPDATE', cname, query)
      this.startTime = new Date(Date.parse(new Date()) - val * 24 * 3600 * 1000).toLocaleDateString()
      this.endTime = new Date().toLocaleDateString()
      this.start = this.startTime
      this.end = this.endTime
    }
  },

  route: {
    data ({ to }) {
      const cname = to.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime
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
    width: 80%;
    float: left;
  }
  .table {
    display: inline;
  }
</style>