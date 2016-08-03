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
      <a href="#!/active_map/nano_active_map" class="mui-btn mui-btn--raised">返回</a>
      </div>
    </div>
  </div>
  <block :items="data"></block>
  <chart :name="name" :data="data"></chart>
  </div>
</template>
<script>
import Chart from './_component/Chart'
import Block from './_component/Block'
import store from './_store/store'
import { getChartName, getChartData } from './_store/getters'

export default {
  name: 'LocationActiveDetail',

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
      city: ''
    }
  },

  created () {
    this.startTime = new Date(Date.parse(new Date()) - 29 * 24 * 3600 * 1000).toLocaleDateString()
    this.endTime = new Date().toLocaleDateString()
    this.start = this.startTime
    this.end = this.endTime
    this.city = ''
  },

  methods: {
    queryDate () {
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime,
        location: this.city
      }
      store.dispatch('CHART_UPDATE', cname, query)
      this.start = this.startTime
      this.end = this.endTime
    },
    queryPeriod (val) {
      if (val === 30 || val === 7) {
        this.startTime = new Date(Date.parse(new Date()) - (val - 1) * 24 * 3600 * 1000).toLocaleDateString()
        this.endTime = new Date().toLocaleDateString()
      } else if (val === 1) {
        this.startTime = new Date(Date.parse(new Date()) - 1 * 24 * 3600 * 1000).toLocaleDateString()
        this.endTime = new Date().toLocaleDateString()
      } else if (val === 0) {
        this.startTime = new Date(Date.parse(new Date())).toLocaleDateString()
        this.endTime = this.startTime
      } else if (val === 100) {
        this.startTime = '2016-06-01'
        this.endTime = new Date(Date.parse(new Date())).toLocaleDateString()
      }
      this.start = this.startTime
      this.end = this.endTime
      const cname = this.$route.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end,
        location: this.city
      }
      store.dispatch('CHART_UPDATE', cname, query)
    }
  },

  route: {
    data ({ to }) {
      this.startTime = new Date(Date.parse(new Date()) - 29 * 24 * 3600 * 1000).toLocaleDateString()
      this.endTime = new Date().toLocaleDateString()
      this.start = this.startTime
      this.end = this.endTime
      const cname = to.params.cname
      this.city = to.params.city
      const query = {
        start_time: this.start,
        end_time: this.end,
        location: this.city
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