<template>
  <div class="mui-row pikaday">
    <div class="mui-col-md-8">
  <block :items="data"></block>
    </div>
    <div class="mui-col-md-3">
      <div class="mui-textfield right">
        <input type="text" id="end_time" placeholder="Month" v-pikaday="month">
      </div>
    </div>
    <div class="mui-col-md-1">
      <button @click="queryDate" class="mui-btn mui-btn--raised text-right">Submit</button>
    </div>
  </div>
  <chart :name="name" :data="data"></chart>
  <!--<div class="mui--text-right"><button @click="" class="mui-btn mui-btn--raised">返回</button></div>-->
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
      month: '',
      city: ''
    }
  },

  created () {
    this.month = (new Date(Date.parse(new Date()) - 7 * 24 * 3600 * 1000).toLocaleDateString()).substring(0, 7)
    this.city = ''
  },

  methods: {
    queryDate () {
      const cname = this.$route.params.cname
      const query = {
        location: this.city,
        month_time: this.month.substring(0, 7)
      }
      store.dispatch('CHART_UPDATE', cname, query)
    }
  },

  route: {
    data ({ to }) {
      this.city = to.params.city
      const cname = to.params.cname
      const query = {
        location: to.params.city,
        month_time: this.month
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