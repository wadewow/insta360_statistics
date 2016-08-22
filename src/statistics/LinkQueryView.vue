<template>
  <div>
  <div class="mui-container-fluid">
  <form class="mui-form--inline">
  <div class="mui-textfield">
    <input v-model="key" placeholder="输入链接标题进行搜索" type="text">
  </div>
  <button @click="search" class="mui-btn mui-btn--raised mui-btn--primary">Serach</button>
  <button @click="all" class="mui-btn mui-btn--raised mui-btn--primary">All</button>
</form>
  </div>
    <div>
    <table class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th v-for="column in data['column']">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['series']">
          <td>{{ item.name }}</td>
          <td><a target="_blank" href="{{ item.url }}">{{ item.url }}</a></td>
          <td><a target="_blank" href="{{ item.buylink_url }}">{{ item.buylink_url }}</a></td>
          <td>{{ item.total }}</td>
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
    </div>
    </div>
</template>

<script>
import store from './_store/store'
import { getTableName3, getTableData3 } from './_store/getters'

export default {
  name: 'LinkQuery',

  components: {
  },

  store: store,

  vuex: {
    getters: {
      name: getTableName3,
      data: getTableData3
    }
  },

  data () {
    return {
      page: 1,
      pageSize: 15,
      key: ''
    }
  },

  created () {
    this.page = 1
    this.pageSize = 15
    this.key = ''
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
    search (ev) {
      ev.preventDefault()
      this.query()
    },
    all (ev) {
      ev.preventDefault()
      this.key = ''
      this.query()
    },
    query () {
      const tname = this.$route.params.tname
      const query = {
        page: this.page,
        page_size: this.pageSize,
        search_words: this.key
      }
      store.dispatch('TABLE_UPDATE', tname, query)
    }
  },

  route: {
    data ({ to }) {
      this.key = ''
      const tname = to.params.tname
      const query = {
        page: this.page,
        page_size: this.pageSize,
        search_words: this.key
      }
      store.dispatch('TABLE_UPDATE', tname, query)
    }
  }
}
</script>

<style lang="less">
  @import "../_less/v2/base";
  @import "../_less/component/animation";
</style>