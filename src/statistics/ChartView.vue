<template>
  <div class="mui-row pikaday">
    <div class="mui-col-md-8">
      <div>
        <button class="mui-btn" @click="queryPeriod(0)">今天</button>
        <button class="mui-btn" @click="queryPeriod(1)">昨天</button>
        <button class="mui-btn" @click="queryPeriod(7)">最近7天</button>
        <button class="mui-btn" @click="queryPeriod(30)">最近一个月</button>
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
  <!--<div class="rect" style="float:left;margin-left:50px;width:80px;height:80px;background:#ffffff" v-for="item in data['total']">
    <span>{{ item.name }}</span><br/>
    <span>{{ item.value }}</span>
  </div>-->
  <block :items="data"></block>
  <chart :name="name" :data="data"></chart>
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
      endTime: ''
    }
  },

  created () {
    this.startTime = new Date(Date.parse(new Date()) - 7 * 24 * 3600 * 1000).toLocaleDateString()
    this.endTime = new Date().toLocaleDateString()
  },

  methods: {
    queryDate () {
      const cname = this.$route.params.cname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime
      }
      store.dispatch('CHART_UPDATE', cname, query)
    },
    queryPeriod (val) {
      const cname = this.$route.params.cname
      const query = {
        new_time: val
      }
      store.dispatch('CHART_UPDATE', cname, query)
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