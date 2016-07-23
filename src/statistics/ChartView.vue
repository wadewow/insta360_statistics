<template>
  <div class="pikaday">
    <div class="right">
      <label for="end_time">To</label>
      <input type="text" class="form-control" id="end_time" placeholder="End Time" v-pikaday="endTime">
    </div>
    <div class="right">
      <label for="start_time">From</label>
      <input type="text" class="form-control" id="start_time" placeholder="Start Time" v-pikaday="startTime">
    </div>
    <span class="clearfix"></span>
  </div>

  <chart :name="name" :data="data"></chart>
</template>

<script>
import Chart from './_component/Chart'
import store from './_store/store'
import { getChartName, getChartData } from './_store/getters'

export default {
  name: 'ChartView',

  components: {
    Chart
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

  computed: {
    submit: (e) => {
    }
  },

  created () {
    // var _this = this
    // setInterval(() => {
    //   console.log(_this.startTime)
    // }, 2000)
  },

  route: {
    data ({ to }) {
      const cname = to.params.cname
      const query = to.query
      store.dispatch('CHART_UPDATE', cname, query)
    }
  }

}
</script>

<style lang="less">
  @import "../_less/v2/base";
  @import "../_less/component/animation";

  .pikaday{
    overflow: auto;
    padding: 1em;
  }
</style>