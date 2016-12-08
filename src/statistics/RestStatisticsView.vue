<template>
    <div>
    <table style="width:300px" class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th colspan="2">历史总数据</th>
        </tr>
        <!--<tr>
          <th v-for="column in data['column']">{{ column }}</th>
        </tr>-->
      </thead>
      <tbody>
        <tr v-for="item in data['series'][0]">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
    </tbody>
    </table>
    <!--<br/>
    <table style="width:600px" class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th v-for="column in data['column']">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data['series'][1]">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td>{{ item.comment }}</td>
        </tr>
    </tbody>
    </table>-->
    </div>
</template>

<script>
import store from './_store/store'
import { getTableName, getTableData } from './_store/getters'

export default {
  name: 'RestStatisticsView',

  components: {
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
      a: '1'
    }
  },

  created () {
    this.a = '2'
  },

  methods: {
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