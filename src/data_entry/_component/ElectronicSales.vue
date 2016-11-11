<template>
    <div>
    <table class="mui-table mui-table--bordered" style="display:inline">
    <thead>
        <tr>
            <th class = "mui--text-center" style="min-width:120px">渠道</th>
            <th class = "mui--text-center" style="min-width:120px">项目</th>
            <th style="min-width:200px">
                  <div class="mui-textfield">
                  <label for="end_time">选择自然周</label>
                    <input class="pikaday" type="text" id="end_time" v-pikaday="time">
                    <span>{{ computWeek }}</span>
                </div>
            </th>
        </tr>
    </thead>
    <tbody>
         <template v-for="item in data">
        <tr>
            <td rowspan="7" class = "mui--text-center locationBlock"><span class="location">{{ item.location }}</span>
                <div class="delete" value="{{ item.location }}"><a class="mui-btn mui-btn--small mui-btn--danger mui-btn--raised" @click="deleteLocation($index)">删除区域</a>
                </div>
            </td>
            <td>浏览量</td>
            <td><input type="text" v-model="item.view" onfocus="this.select()"></td>
        </tr>
        <tr>
            <td>访客数</td>
            <td><input type="text" v-model="item.visitor" onfocus="this.select()"></td>
        </tr>
        <tr>
            <td>支付金额</td>
            <td><input type="text" v-model="item.payment" onfocus="this.select()"></td>
        </tr>
        <tr>
            <td>支付商品件数</td>
            <td><input type="text" v-model="item.number" onfocus="this.select()"></td>
        </tr>
        <tr>
            <td>支付买家数</td>
            <td><input type="text" v-model="item.buyer" onfocus="this.select()"></td>
        </tr>
        <tr>
            <td>支付转化率</td>
            <td>
                <label>{{ isNaN(item.buyer/item.visitor)||!isFinite(item.buyer/item.visitor) ? 0 : Math.round(item.buyer/item.visitor*1000)/10 }}</label>
                <!--<input type="hidden" v-model="item.conversion" value="{{ isNaN(item.buyer/item.visitor)||!isFinite(item.buyer/item.visitor) ? 0 : Math.round(item.buyer/item.visitor*1000)/10 }}">-->
                <span> %</span>
            </td>
        </tr>
        <tr>
            <td>客单价</td>
            <td>
                <label>{{ isNaN(item.payment/item.buyer)||!isFinite(item.payment/item.buyer) ? 0 : Math.round(item.payment/item.buyer*100)/100 }}</label>
                <span> 元</span>
            </td>
        </tr>
        </template>
        <tr id="last">
            <td  colspan="4" class = "mui--text-center">
                <input type="text" id="addLocation_elec" v-on:keyup.enter="add" placeholder="地区">
                <a class="mui-btn mui-btn--small mui-btn--primary" @click="add">增加地区</a>
            </td>
        </tr>
    </tbody>
    </table>
    <a class="mui-btn mui-btn--large mui-btn--primary mui-btn--raisede" style="margin-left:50px" @click="submit_elec">提交电商数据</a>
    </div>
</template>


<script>
import store from '../_store/store'
import moment from 'moment'
import { getElectronicSalesData } from '../_store/getters'
export default {
  name: 'ElectronicSales',
  props: {
    name: String,
    data: Object
  },
  vuex: {
    getters: {
      data: getElectronicSalesData
    }
  },
  store: store,
  data () {
    return {
      time: moment().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      week: moment().startOf('week').add(1, 'days').format('YYYY-MM-DD'),
      store: store,
      isFirst: true
    }
  },
  watch: {
    'store.state.electronic_sales.week': function (val, oldVal) {
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
      const fname = 'electronic_sales'
      const query = {
        week: this.week,
        username: store.state.userInfo.username
      }
      store.dispatch('GET', fname, query)
      return start + ' ~ ' + end
    }
  },
  created () {
    const fname = 'electronic_sales'
    const query = {
      username: store.state.userInfo.username
    }
    store.dispatch('GET', fname, query)
  },

  methods: {
    add () {
      console.log(store.state.electronic_sales.items)
      var src = document.getElementById('addLocation_elec')
      var location = src.value.replace(/(^\s*)|(\s*$)/g, '')
      if (location === '') {
        alert('请输入地区名')
      } else {
        for (var item in store.state.electronic_sales.items) {
          if (store.state.electronic_sales.items[item].location === location) {
            alert('该地区已存在')
            return false
          }
        }
        src.value = ''
        var newItem = {'location': location, 'view': 0, 'visitor': 0, 'payment': 0, 'number': 0, 'buyer': 0, 'week': this.week}
        store.state.electronic_sales.items.push(newItem)
      }
    },
    deleteLocation (index) {
      // var src = ev.srcElement || ev.target
      // var index = (src.nextElementSibling || this.getNextSibling(src)).value
      store.state.electronic_sales.items.splice(index, 1)
    },
    getNextSibling (node) {
      do { node = node.nextSibling } while (node && node.nodeType !== 1)
      return node
    },
    submit_elec () {
      const items = store.state.electronic_sales.items
      var re = /^\d+$/
      var re1 = /^[0-9]+(.[0-9]+)?$/
      for (var item in items) {
        if (!(re.test(items[item]['view']) && re.test(items[item]['visitor']) && re.test(items[item]['number']) && re.test(items[item]['buyer']) && re1.test(items[item]['payment']))) {
          alert('请正确输入！')
          return false
        }
      }
      const fname = 'electronic_sales'
      const query = {
        data: store.state.electronic_sales.items,
        week: this.week,
        username: store.state.userInfo.username
      }
      store.dispatch('POST', fname, query)
      alert('提交成功')
    }
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

  .locationBlock:hover{
     .delete{
         visibility: visible;
        }
  }

  #end_time{
    width:180px;
    color:transparent;
    position:absolute;
    bottom:0px;
    z-index:999
  }
</style>