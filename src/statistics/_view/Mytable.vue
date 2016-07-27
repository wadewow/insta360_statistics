<template>
  <table id="myTable" class="mui-table mui-table--bordered">
    <thead>
      <tr>
        <!--<th v-for="column in data['column']">{{ column }}</th>-->
        <th>类型</th>
        <th>地理位置</th>
        <th>标题</th>
        <th>序列号</th>
        <th @click="sortByViewTimes">浏览量</th>
        <th>时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data['series']">
        <!--<td v-for="i in item">{{ i }}</td>-->
        <td>{{ item.type }}</td>
        <td>{{ item.share_location }}</td>
        <td><a href= "{{ item.page_url }}">{{ item.title }}</a></td>
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
  }
}
</script>
<style lang='less'>
  @import '../../_less/v2/base';
  @import '../../_less/component/animation';
</style>