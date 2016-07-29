<template>
  <table id="myTable" class="mui-table mui-table--bordered">
    <thead>
      <tr>
        <!--<th v-for="column in data['column']">{{ column }}</th>-->
        <th class="mui-col-md-1">类型</th>
        <th class="mui-col-md-2">地理位置</th>
        <th class="mui-col-md-4">标题</th>
        <th class="mui-col-md-2">序列号</th>
        <th class="sort mui-col-md-1" id="view" @click="sort('view')" value="0">浏览量</th>
        <th class="sort mui-col-md-2" id="time" @click="sort('time')" value="1">时间 ↓</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data['series']">
        <!--<td v-for="i in item">{{ i }}</td>-->
        <td class="mui-col-md-1">{{ item.type }}</td>
        <td class="mui-col-md-2">{{ item.share_location }}</td>
        <td class="mui-col-md-4"><a href= "{{ item.page_url }}" target="_blank">{{ item.title }}</a></td>
        <td class="mui-col-md-2">{{ item.serial_num }}</td>
        <td class="mui-col-md-1">{{ item.view_times }}</td>
        <td class="mui-col-md-2">{{ item.time }}</td>
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