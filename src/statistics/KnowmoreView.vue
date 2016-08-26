<template>
  <!--<div>
    <simpletable :name="name" :data="data"></simpletable>
  </div>-->
    <div>
    <div class="mui-col-md-6" style="min-width:570px;margin-bottom:30px">
    <table style="width:400px;" class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th v-for="column in data['column'][1]">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['series'][1]">
          <td>{{ item.time }}</td>
          <td>{{ item.scale }}</td>
        </tr>
    </tbody>
    </table>
    <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='firstPage'>首页</button>
    <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='prevPage'>上页</button>
    <span class="currentPage">{{ data.current_page }}</span> / <span class="totalPage">{{ data.page_total }}</span>
    <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='nextPage'>下页</button>
    <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='lastPage'>尾页</button>
    <span>跳转到第</span>
    <input id="skip" class="skip" type="text" v-model="skip" v-on:keyup.enter="queryPage"></input>
    <span>页</span>
    <button class="mui-btn mui-btn--small mui-btn--raised mui-btn--primary" @click='queryPage'>GO</button>
    <span> 总计 </span><span>{{ data.total }}</span><span> 条</span>
    <input type="hidden" id="total_page" number value="{{ data.page_total }}"></input>
    </div>
    <div class="mui-col-md-6" style="min-width:570px">
    <table class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th v-for="column in data['column'][0]">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['series'][0]">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td>{{ item.comment }}</td>
        </tr>
    </tbody>
    </table>
    </div>
    </div>
</template>

<script>
import Simpletable from './_component/Simpletable'
import store from './_store/store'
import { getTableName2, getTableData2 } from './_store/getters'

export default {
  name: 'RestStatisticsView',

  components: {
    Simpletable
  },

  store: store,

  vuex: {
    getters: {
      name: getTableName2,
      data: getTableData2
    }
  },

  data () {
    return {
      page: 1,
      pageSize: 15,
      skip: ''
    }
  },

  created () {
    this.page = 1
    this.pageSize = 15
    this.skip = ''
  },

  methods: {
    queryPage () {
      var total = document.getElementById('total_page').value
      var val = this.skip
      var re = /^[0-9]*[1-9][0-9]*$/
      this.skip = ''
      if ((!re.test(val)) || parseInt(val, 10) > parseInt(total, 10)) {
        return false
      }
      this.page = val
      this.query()
    },
    firstPage () {
      this.page = 1
      this.query()
    },
    lastPage () {
      var total = document.getElementById('total_page').value
      this.page = parseInt(total, 10)
      this.query()
    },
    nextPage () {
      var total = document.getElementById('total_page').value
      if (this.page >= parseInt(total, 10)) {
        return false
      }
      this.page ++
      this.query()
    },
    prevPage () {
      if (this.page > 1) {
        this.page --
        this.query()
      }
    },
    query () {
      const tname = this.$route.params.tname
      const query = {
        page_number: this.page,
        page_size: this.pageSize
      }
      store.dispatch('TABLE_UPDATE', tname, query)
    }
  },

  route: {
    data ({ to }) {
      const tname = to.params.tname
      const query = {
      }
      store.dispatch('TABLE_UPDATE', tname, query)
    }
  },

  events: {
  }
}
</script>

<style lang="less">
  @import "../_less/v2/base";
  @import "../_less/component/animation";
</style>