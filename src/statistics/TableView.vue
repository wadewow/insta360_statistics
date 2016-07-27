<template>
  <div class="mui-row pikaday">
    <div class="mui-col-md-8">
        <div class="period">
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(0)">今天</button>
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(1)">昨天</button>
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(7)">最近7天</button>
            <button class="mui-btn mui-btn--primary" @click="queryPeriod(30)">最近一个月</button>
        </div>
        <div class="mui-radio">
            <input type="radio" checked="checked" name="type" value="all" v-model='type' @click="queryType('all')">全部</input>
            <input type="radio" name="type" value="video" v-model='type' @click="queryType('video')">视频</input>
            <input type="radio" name="type" value="img" v-model='type' @click="queryType('img')">图片</input>
        </div>
        <div class="mui-radio">
            <input type="radio" checked="checked" name="order" value="time_desc" v-model='order' @click="sort('time_desc')">时间降序</input>
            <input type="radio" name="order" value="time_asc" v-model='order' @click="sort('time_asc')">时间升序</input>
            <input type="radio" name="order" value="view_desc" v-model='order' @click="sort('view_desc')">浏览量降序</input>
            <input type="radio" name="order" value="view_asc" v-model='order' @click="sort('view_asc')">浏览量升序</input>
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
  <mytable :name="name" :data="data"></mytable>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='prevPage'>prev</button>
      <span class="current">{{ data.current_page }} / {{ data.page_total }}</span>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='nextPage'>next</button>
  <span>跳转到第</span>
  <input id="skip" class="skip" type="text" v-on:keyup.enter="queryPage"></input>
  <span>页</span>
  <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='queryPage'>GO</button>
  <input type="hidden" id="total_page" value="{{ data.page_total }}"></input>
</template>

<script>
import Mytable from './_view/Mytable'
import store from './_store/store'
import { getTableName, getTableData } from './_store/getters'

export default {
  name: 'TableView',

  components: {
    Mytable
  },

  store: store,

  vuex: {
    getters: {
      name: getTableName,
      data: getTableData
    }
  },

  data () {
    return {
      startTime: '',
      endTime: '',
      type: 'all',
      page: 1,
      order: 'time_desc',
      pageSize: 15,
      start: '',
      end: ''
    }
  },

  created () {
    this.startTime = new Date(Date.parse(new Date()) - 7 * 24 * 3600 * 1000).toLocaleDateString()
    this.endTime = new Date().toLocaleDateString()
    this.start = this.startTime
    this.end = this.endTime
    this.type = 'all'
    this.page = 1
    this.order = 'time_desc'
    this.pageSize = 15
  },

  methods: {
    queryDate () {
      const tname = this.$route.params.tname
      const query = {
        start_time: this.startTime,
        end_time: this.endTime,
        query_type: this.type,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.page = 1
      this.start = this.startTime
      this.end = this.endTime

    },
    queryPeriod (val) {
      const tname = this.$route.params.tname
      const query = {
        new_time: val,
        query_type: this.type,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.startTime = new Date(Date.parse(new Date()) - val * 24 * 3600 * 1000).toLocaleDateString()
      this.endTime = new Date().toLocaleDateString()
      this.start = this.startTime
      this.end = this.endTime
      this.page = 1
    },
    queryPage () {
      var element = document.getElementById('skip')
      var total = document.getElementById('total_page').value
      var val = element.value
      var re = /^[0-9]*[1-9][0-9]*$/
      element.value = ''
      if ((!re.test(val)) || parseInt(val, 10) > parseInt(total, 10)) {
        return false
      }
      this.page = val
      const tname = this.$route.params.tname
      const query = {
        start_time: this.start,
        end_time: this.end,
        page_number: val,
        query_type: this.type,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.keepSame()
    },
    nextPage () {
      var total = document.getElementById('total_page').value
      if (this.page >= parseInt(total, 10)) {
        return false
      }
      this.page ++
      const tname = this.$route.params.tname
      const query = {
        start_time: this.start,
        end_time: this.end,
        page_number: this.page,
        query_type: this.type,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.keepSame()
    },
    prevPage () {
      if (this.page > 1) {
        this.page --
        const tname = this.$route.params.tname
        const query = {
          start_time: this.start,
          end_time: this.end,
          page_number: this.page,
          query_type: this.type,
          query_order: this.order,
          page_size: this.pageSize
        }
        store.dispatch('TABLE_UPDATE', tname, query)
        this.keepSame()
      }
    },
    queryType (val) {
      const tname = this.$route.params.tname
      const query = {
        start_time: this.start,
        end_time: this.end,
        query_type: val,
        query_order: this.order,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.page = 1
      this.keepSame()
    },
    sort (val) {
      const tname = this.$route.params.tname
      const query = {
        start_time: this.start,
        end_time: this.end,
        query_type: this.type,
        query_order: val,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.page = 1
      this.keepSame()
    },
    keepSame () {
      this.startTime = this.start
      this.endTime = this.end
    }
  },

  route: {
    data ({ to }) {
      const tname = to.params.tname
      const query = {
        start_time: this.start,
        end_time: this.end,
        page_size: this.pageSize,
        query_order: this.order,
        query_type: this.type,
        page_number: this.page
      }
      store.dispatch('TABLE_UPDATE', tname, query)
      this.keepSame()
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
    .period {
      display:inline;
    }
    .mui-radio {
      display:inline;
    }
  }
  .skip {
    width:35px
  }
</style>