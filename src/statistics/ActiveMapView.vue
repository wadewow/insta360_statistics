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
  <div class="mui-col-md-4" style="min-width:370px">
  <div class="right" style="min-width:370px">
    <div class="div1 show">
    <table class="mui-table mui-table--bordered table">
      <thead>
        <tr><td colspan="2"><a :href="href('1')" class="mui-btn mui-btn--primary mui-btn--small">区域对比</a></td></tr>
        <tr>
            <th>全国</th>
            <th>激活数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['top']['native']">
          <template v-if="$index < 10">
            <td><a href="#!/location_active_detail/location_active_detail/{{ item.name }}">{{ item.name }}</a></td>
            <td class="mui--text-center">{{ item.value }}</td>
          </template>
        </tr>
        <tr><td colspan="2"><a @click="spread('1')" class="mui-btn mui-btn--primary mui-btn--small">展开</a></td></tr>
      </tbody>
    </table>
    </div>
    <div class="div1 hidden">
    <table class="mui-table mui-table--bordered table">
      <thead>
        <tr><td colspan="2"><a :href="href('1')" class="mui-btn mui-btn--primary mui-btn--small">区域对比</a></td></tr>
        <tr>
            <th>全国</th>
            <th>激活数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['top']['native']">
            <td><a href="#!/location_active_detail/location_active_detail/{{ item.name }}">{{ item.name }}</a></td>
            <td class="mui--text-center">{{ item.value }}</td>
        </tr>
        <tr><td colspan="2"><a @click="spread('1')" class="mui-btn mui-btn--primary mui-btn--small">收起</a></td></tr>
      </tbody>
    </table>
    </div>
    <div class="div0 show">
    <table class="mui-table mui-table--bordered table">
      <thead>
        <tr><td colspan="2"><a :href="href('0')" class="mui-btn mui-btn--primary mui-btn--small">区域对比</a></td></tr>
        <tr>
            <th>世界</th>
            <th>激活数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['top']['abroad']">
          <template v-if="$index < 10">
            <td><a href="#!/location_active_detail/location_active_detail/{{ item.name }}">{{ item.name }}</a></td>
            <td class="mui--text-center">{{ item.value }}</td>
          </template>
        </tr>
        <tr><td colspan="2"><a @click="spread('0')" class="mui-btn mui-btn--primary mui-btn--small">展开</a></td></tr>
        </tbody>
            </table>
    </div>
   <div class="div0 hidden">
    <table class="mui-table mui-table--bordered table">
      <thead>
        <tr><td colspan="2"><a :href="href('0')" class="mui-btn mui-btn--primary mui-btn--small">区域对比</a></td></tr>
        <tr>
            <th>世界</th>
            <th>激活数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['top']['abroad']">
            <td><a href="#!/location_active_detail/location_active_detail/{{ item.name }}">{{ item.name }}</a></td>
            <td class="mui--text-center">{{ item.value }}</td>
        </tr>
        <tr><td colspan="2"><a @click="spread('0')" class="mui-btn mui-btn--primary mui-btn--small">收起</a></td></tr>
      </tbody>
    </table>
    </div>
    </div>
    </div>
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
      end: ''
    }
  },
  computed: {
  },
  created () {
    this.startTime = store.state.startTime
    this.endTime = store.state.endTime
    this.start = this.startTime
    this.end = this.endTime
    this.updateColor()
  },

  methods: {
    href (v) {
      var start = this.start.replace(/\//g, '-')
      var end = this.end.replace(/\//g, '-')
      return '#!/area/nano_active_area/' + start + '/' + end + '/' + v
    },
    spread (v) {
      var div = 'div' + v
      var elements = document.getElementsByClassName(div)
      for (var i = 0; i < elements.length; i++) {
        var show = elements[i].getAttribute('class')
        if (show === div + ' show') {
          elements[i].setAttribute('class', div + ' hidden')
        } else if (show === div + ' hidden') {
          elements[i].setAttribute('class', div + ' show')
        }
      }

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
        end_time: this.endTime
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
        end_time: this.end
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
      const cname = to.params.cname
      const query = {
        start_time: this.start,
        end_time: this.end
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
  .chart {
    width: 100%;
  }
  .table {
    display: inline;
    margin-left: 10px;
    margin-top: -20px;
  }
  .hidden {
    display:none
  }
  .show{
    display:inline
  }
</style>