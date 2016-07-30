<template>
  <table id="myTable" class="mui-table mui-table--bordered">
    <thead>
      <tr>
        <!--<th v-for="column in data['column']">{{ column }}</th>-->
        <th style="width:6%;min-width:48px;font-weight:500">类型</th>
        <th style="width:16%;min-width:80px;font-weight:500;min-width:80px">地理位置</th>
        <th style="width:30%;min-width:100px;font-weight:500">标题</th>
        <th style="width:16%;font-weight:500">序列号</th>
        <th class="sort" style="width:8%;min-width:75px" id="week_prew" @click="sort('week_prew')" value="0">周浏览</th>
        <th class="sort" style="width:8%;min-width:75px" id="view" @click="sort('view')" value="0">总浏览</th>
        <th class="sort" style="width:16%;min-width:55px" id="time" @click="sort('time')" value="1">时间 ↓</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data['series']">
        <!--<td v-for="i in item">{{ i }}</td>-->
        <td style="width:6%">{{ item.type }}</td>
        <td style="width:16%">{{ item.share_location }}</td>
        <td style="width:30%"><a href= "{{ item.page_url }}" title="{{ item.title }}" target="_blank">{{ item.title|substring }}</a></td>
        <td style="width:16%">{{ item.serial_num }}</td>
        <td style="width:8%">{{ item.week_prews }}</td>
        <td style="width:8%">{{ item.view_times }}</td>
        <td style="width:16%">{{ item.time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Mytable',
  props: {
    name: String,
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
          s = '总浏览 ↑'
        }else if (v === 'week_prew') {
          s = '周浏览 ↑'
        }
      }else {
        if (v === 'time') {
          s = '时间 ↓'
        }else if (v === 'view') {
          s = '总浏览 ↓'
        }else if (v === 'week_prew') {
          s = '周浏览 ↓'
        }
      }
      document.getElementById('week_prew').innerText = '周浏览'
      document.getElementById('view').innerText = '总浏览'
      document.getElementById('time').innerText = '时间'
      element.innerText = s
      this.$dispatch('sort', v)
    }
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
  .sort{
    cursor:pointer
  }
</style>