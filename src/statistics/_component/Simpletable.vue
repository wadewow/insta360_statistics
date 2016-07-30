<template>
  <table id="simpleTable" class="mui-table mui-table--bordered">
    <thead>
      <tr>
        <th v-for="column in data['column']">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data['series']">
        <td v-for="i in item">{{ i }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Simpletable',
  props: {
    name: String,
    data: Object
  },

  methods: {
  },

  filters: {
    substring (s) {
      if (s.length > 40) {
        s = s.substring(0, 40) + '...'
      }
      return s
    }
  }
}
</script>
<style lang='less'>
  @import '../../_less/v2/base';
  @import '../../_less/component/animation';
</style>