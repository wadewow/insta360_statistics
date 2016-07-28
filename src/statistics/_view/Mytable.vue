<template>
  <table id="myTable" class="mui-table mui-table--bordered">
    <thead>
      <tr>
        <!--<th v-for="column in data['column']">{{ column }}</th>-->
        <th>类型</th>
        <th>地理位置</th>
        <th>标题</th>
        <th>序列号</th>
        <th class="sort" id="view" @click="sort('view')" value="0">浏览量</th>
        <th class="sort" id="time" @click="sort('time')" value="1">时间 ↓</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data['series']">
        <!--<td v-for="i in item">{{ i }}</td>-->
        <td>{{ item.type }}</td>
        <td>{{ item.share_location }}</td>
        <td><a href= "{{ item.page_url }}" target="_blank">{{ item.title }}</a></td>
        <td>{{ item.serial_num }}</td>
        <td>{{ item.view_times }}</td>
        <td>{{ item.time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Mytable',
  props: {
    data: Object
  },

  methods: {
    sort (v) {
      var element = document.getElementById(v)
      var val = element.innerText
      var s = ''
      if (val.charAt(val.length - 1) === '↓') {
        if (v === 'time') {
          s = '时间 ↑'
        }else if (v === 'view') {
          s = '浏览量 ↑'
        }
      }else {
        if (v === 'time') {
          s = '时间 ↓'
        }else if (v === 'view') {
          s = '浏览量 ↓'
        }
      }
      document.getElementById('view').innerText = '浏览量'
      document.getElementById('time').innerText = '时间'
      element.innerText = s
      this.$dispatch('sort', v)
    }
  }
}
</script>
<style lang='less'>
  @import '../../_less/v2/base';
  @import '../../_less/component/animation';
  .sort{
    cursor:pointer
  }
</style>