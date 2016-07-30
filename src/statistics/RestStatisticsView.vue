<template>
  <div>
    <simpletable :name="name" :data="data"></simpletable>
  </div>
</template>

<script>
import Simpletable from './_component/Simpletable'
import store from './_store/store'
import { getTableName, getTableData } from './_store/getters'

export default {
  name: 'RestStatisticsView',

  components: {
    Simpletable
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
      console.log('rest' + to.params.tname)
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