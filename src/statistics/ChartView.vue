<template>
  <div>
    <button @click="queryPeriod(1)">今天</button>
    <button @click="queryPeriod(1)">昨天</button>
    <button @click="queryPeriod(7)">最近7天</button>
    <button @click="queryPeriod(30)">最近一个月</button>
  </div>
  <div class="mui-row pikaday">
    <div class="mui-col-md-8"></div>
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
  <chart :name="name" :data="data"></chart>
  <chart style="width:50%; float:left" :name="map_name" :data="map_data"></chart>
  <div style="width:40%; display:inline" class = "table">
     <table  border="1">
         <tr>
            <th>激活所在地</th>
            <th>激活数量</th>
        </tr>
        <tr v-for="item in map_data['top']">
            <td><a href="#!/chart/nano_active">{{ item.name }}</a></td>
            <td>{{ item.value }}</td>
        </tr>
      </table>
  </div>
</template>

<script>
import Chart from './_component/Chart'
import store from './_store/store'
import { getChartName, getChartData, getMapName, getMapData } from './_store/getters'

export default {
  name: 'ChartView',

  components: {
    Chart
  },

  store: store,

  vuex: {
    getters: {
      name: getChartName,
      data: getChartData,
      map_name: getMapName,
      map_data: getMapData
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
      store.dispatch('CHART_UPDATE', cname + '_map', query)
    },
    queryPeriod (val) {
      const cname = this.$route.params.cname
      const query = {
        new_time: val
      }
      store.dispatch('CHART_UPDATE', cname, query)
      store.dispatch('CHART_UPDATE', cname + '_map', query)
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
      store.dispatch('CHART_UPDATE', cname + '_map', query)
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