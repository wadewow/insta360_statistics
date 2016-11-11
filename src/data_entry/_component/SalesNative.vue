<template>
  <div class="mui-col-md-11">
    <table class="mui-table mui-table--bordered" style="display:inline">
      <thead>
        <tr>
          <th class="mui--text-center" style="min-width:120px">地区</th>
          <th class="mui--text-center" style="min-width:120px">代理商名称</th>
          <th class="mui--text-center" style="min-width:120px">代理商性质</th>
          <th class="mui--text-center" style="min-width:120px">拿货价</th>
          <th colspan="2" class="mui--text-center" style="min-width:120px">项目</th>
          <th style="min-width:200px">
            <div class="mui-textfield">
              <label for="end_time">选择自然周</label>
              <input class="pikaday" type="text" id="end_time" v-pikaday="time">
              <span>{{ computWeek }}</span>
            </div>
            <!--<button class="mui-btn mui-btn--small mui-btn--primary mui-btn--raised" @click="query">查询</button>-->
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in data">
          <tr>
            <td rowspan="7" class="mui--text-center locationBlock">
              <span class="location">{{ item.location }}</span>
              <div class="delete" value="{{ item.location }}">
                <a class="mui-btn mui-btn--small mui-btn--danger mui-btn--raised" @click="deleteLocation($index)">删除区域</a>
                <!--<input type="hidden" id="locationValue" number value="{{ $index }}"></input>-->
              </div>
            </td>
            <td rowspan="7">
              <input type="text" v-model="item.agent_name" onfocus="this.select()">
            </td>
            <td rowspan="7">
              <input type="text" v-model="item.agent_type" onfocus="this.select()">
            </td>
            <td rowspan="7">
              <input type="text" v-model="item.agent_price" onfocus="this.select()">
            </td>
            <td>进</td>
            <td>提货数量</td>
            <td><input type="text" v-model="item.pick_up" onfocus="this.select()"></td>
          </tr>
          <tr>
            <td rowspan="3">销</td>
            <td>线上直销</td>
            <td><input type="text" v-model="item.sales_online" onfocus="this.select()"></td>
          </tr>
          <tr>
            <td>线下直销</td>
            <td><input type="text" v-model="item.sales_offline" onfocus="this.select()"></td>
          </tr>
          <tr>
            <td>下级销量</td>
            <td><input type="text" v-model="item.sales_offline_count" onfocus="this.select()"></td>
          </tr>
          <tr>
            <td rowspan="2">存</td>
            <td>代理商</td>
            <td><input type="text" v-model="item.inventory_first" onfocus="this.select()"></td>
          </tr>
          <tr>
            <td>代理商下级</td>
            <td><input type="text" v-model="item.inventory_lower" onfocus="this.select()"></td>
          </tr>
          <tr>
            <td>退</td>
            <td>退货</td>
            <td><input type="text" v-model="item.reject" onfocus="this.select()"></td>
          </tr>
        </template>
        <tr id="last">
          <td colspan="4" class="mui--text-center">
            <input type="text" id="addLocation" v-on:keyup.enter="add" placeholder="地区">
            <a class="mui-btn mui-btn--small mui-btn--primary" @click="add">增加地区</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mui-col-md-1">
    <a class="mui-btn mui-btn--large mui-btn--primary mui-btn--raisede" @click="submit_native">提交国内数据</a>
  </div>
</template>


<script>
// import _ from 'lodash'
import store from '../_store/store'
import moment from 'moment'
import { getSalesNativeData } from '../_store/getters'
export default {
  name: 'SalesNativeTable',
  props: {
    name: String,
    data: Object
  },
  vuex: {
    getters: {
      data: getSalesNativeData
    }
  },
  store: store,
  data () {
    return {
      time: moment().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      week: moment().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      is_native: 1,
      store: store,
      isFirst: true
    }
  },
  watch: {
    'store.state.sales_native.week': function (val, oldVal) {
      if (this.isFirst) {
        this.time = val
        this.week = this.time
        this.isFirst = false
      }
    }
  },
  computed: {
    computWeek: function () {
      var day = moment(this.time).subtract(1, 'days')
      if (!day.isValid()) {
        return moment().subtract(1, 'days').startOf('week').add(1, 'days').format('YYYY-MM-DD') + ' ~ ' + moment().endOf('week').add(1, 'days').format('YYYY-MM-DD')
      }
      var start = day.startOf('week').add(1, 'days').format('YYYY-MM-DD')
      var end = day.endOf('week').add(1, 'days').format('YYYY-MM-DD')
      if (this.week === start) {
        return start + ' ~ ' + end
      }
      this.week = start
      const fname = 'native_sales'
      const query = {
        week: this.week,
        is_native: this.is_native,
        username: store.state.userInfo.username
      }
      store.dispatch('GET', fname, query)
      return start + ' ~ ' + end
    }
  },
  created () {
    this.is_native = 1
    const fname = 'native_sales'
    const query = {
      is_native: this.is_native,
      username: store.state.userInfo.username
    }
    store.dispatch('GET', fname, query)
  },

  methods: {
    add () {
      var src = document.getElementById('addLocation')
      var location = src.value.replace(/(^\s*)|(\s*$)/g, '')
      if (location === '') {
        alert('请输入地区名')
      } else {
        for (var item in store.state.sales_native.items) {
          if (store.state.sales_native.items[item].location === location) {
            alert('该地区已存在')
            return false
          }
        }
        src.value = ''
        var newItem = {
          'location': location,
          'pick_up': 0,
          'sales_online': 0,
          'agent_name': '',
          'agent_type': '',
          'agent_price': 0,
          'sales_offline': 0,
          'sales_offline_count': 0,
          'inventory_first': 0,
          'inventory_lower': 0,
          'reject': 0,
          week: this.week,
          is_native: this.is_native
        }
        store.state.sales_native.items.push(newItem)
      }
    },
    deleteLocation (index) {
      // var src = ev.srcElement || ev.target
      // var index = (src.nextElementSibling || this.getNextSibling(src)).value
      // // var index = _.findIndex(store.state.sales_native.items, function (n) {return n.location === location})
      store.state.sales_native.items.splice(index, 1)
    },
    getNextSibling (node) {
      do { node = node.nextSibling } while (node && node.nodeType !== 1)
      return node
    },
    submit_native () {
      const items = store.state.sales_native.items
      var re = /^\d+$/
      for (var item in items) {
        if (!(re.test(items[item]['pick_up']) && re.test(items[item]['sales_online']) && re.test(items[item]['sales_offline']) && re.test(items[item]['inventory_first']) && re.test(items[item]['inventory_lower']) && re.test(items[item]['reject']) && re.test(items[item]['agent_price']))) {
          alert('请正确输入！')
          return false
        }
      }
      const fname = 'native_sales'
      const query = {
        data: store.state.sales_native.items,
        week: this.week,
        is_native: this.is_native,
        username: store.state.userInfo.username
      }
      store.dispatch('POST', fname, query)
      alert('提交成功')
    }
    // query () {
    //   this.week = moment(this.time).startOf('week').add(1, 'days').format('YYYY-MM-DD')
    //   const fname = 'native_sales'
    //   const query = {
    //     week: this.week,
    //     is_native: this.is_native
    //   }
    //   store.dispatch('GET', fname, query)
    // }
  }

  // route: {
  //   data ({ to }) {
  //     this.time = moment().format('YYYY-MM-DD')
  //     this.week = moment().startOf('week').add(1, 'days').format('YYYY-MM-DD')
  //     store.dispatch('GET', this.week)
  //     alert('data')
  //   }
  // }
}
</script>
<style lang='less'>
  @import '../../_less/v2/base';
  @import '../../_less/component/animation';
  .delete {
    top: 100px;
    position: relative;
    visibility: hidden;
  }
  
  .location {
    padding-top: 40px;
    display: block;
  }
  
  .locationBlock:hover {
    /*background-color: #DCDCDC;*/
    /*color: white;*/
    /*font-size: 16px;*/
    .delete {
      visibility: visible;
    }
  }
  
  #end_time {
    width: 180px;
    color: transparent;
    position: absolute;
    bottom: 0px;
    z-index: 999
  }
</style>