<template>
  <div>
    <div class="mui-row" style="margin-top:10px">
      <div class="mui-col-md-2">
        <div class="mui-radio" style="display:inline">
            <label><input type="radio" name="language" v-model='language' value="cn" checked @click="queryLanguage('cn')">中文</label>
        </div>
        <div class="mui-radio" style="display:inline">
            <label><input type="radio" name="language" v-model='language' value="en" @click="queryLanguage('en')">英文</label>
        </div>
      </div>
      <div class="mui-col-md-10"></div>
    </div>
    <table class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th v-for="column in data['column']">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, item) in data['series']">
          <td>{{ index + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.views }}</td>
          <td>{{ item.help_scale }}</td>
          <td><a href="#!/support/feedback/feedback_{{ name }}/{{ item.post_id }}">查看全部</a></td>
        </tr>
    </tbody>
    </table>
  <div class="mui-container-fluid page_tool">
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
</template>

<script>
import store from '../_store/store'
import { getSupportTableName, getSupportTableData } from '../_store/getters'

export default {
  name: 'TableView',

  components: {
  },

  store: store,

  vuex: {
    getters: {
      name: getSupportTableName,
      data: getSupportTableData
    }
  },

  data () {
    return {
      page: 1,
      pageSize: 20,
      skip: '',
      language: 'cn'
    }
  },

  created () {
    this.page = 1
    this.pageSize = 20
    this.skip = ''
    this.language = 'cn'
  },

  methods: {
    queryLanguage (val) {
      this.language = val
      this.query()
    },
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
      const header = {
        lang: this.language
      }
      store.dispatch('TABLE_UPDATE', tname, query, header)
    }
  },

  route: {
    data ({ to }) {
      const back = to.query.back
      if (back !== 'true') {
        this.page = 1
      }
      const tname = to.params.tname
      const query = {
        page_size: this.pageSize,
        page_number: this.page
      }
      const header = {
        lang: this.language
      }
      store.dispatch('TABLE_UPDATE', tname, query, header)
    }
  }

}
</script>

<style lang="less">
  @import "../../_less/v2/base";
  @import "../../_less/component/animation";
  .skip {
    width:35px
  }
  .mui-radio {
    display:inline;
    margin-left:10px;
  }
</style>