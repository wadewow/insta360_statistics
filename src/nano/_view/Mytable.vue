<template>
  <table id="myTable" class="mui-table mui-table--bordered">
    <thead>
      <tr>
        <!--<th v-for="column in data['column']">{{ column }}</th>-->
        <th style="width:6%;min-width:48px;font-weight:500">类型</th>
        <th style="width:11%;min-width:80px;font-weight:500;min-width:80px">地理位置</th>
        <th style="width:20%;min-width:50px;font-weight:500">标题</th>
        <th style="width:15%;min-width:50px;font-weight:500">缩略图（点击查看原图）</th>
        <th class="sort" style="width:8%;min-width:75px" id="week_prew" @click="sort('week_prew')" value="0">{{ week_prew }}</th>
        <th class="sort" style="width:8%;min-width:75px" id="view" @click="sort('view')" value="0">{{ view }}</th>
        <th class="sort" style="width:16%;min-width:55px" id="time" @click="sort('time')" value="1">{{ time }}</th>
        <th style="width:16%;font-weight:500">序列号</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data['series']">
        <!--<td v-for="i in item">{{ i }}</td>-->
        <td style="width:6%">{{ item.type }}</td>
        <td style="width:11%">{{ item.share_location }}</td>
        <td style="width:20%"><i v-if="item.flag==1" class="iconfont">&#xe60f;</i><a href="{{ item.page_url|replace }}?uns=true" title="{{ item.title }}" target="_blank">{{ item.title|substring }}</a></td>
        <td style="width:15%">
            <!--<a href="{{ item.start_url|replace }}" title="{{ item.title }}" target="_blank">-->
            <a :href="replace(item.type, item.start_url, item.page_url)" title="{{ item.title }}" target="_blank">
                <img v-bind:src= "item.start_url|modify" alt="{{ item.title }}" class="thumb"></img>
            </a>
        </td>
        <td style="width:8%">{{ item.week_prews }}</td>
        <td style="width:8%">{{ item.view_times }}</td>
        <td style="width:16%">{{ item.time }}</td>
        <td style="width:16%">{{ item.serial_num }}</td>
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
  data () {
    return {
      week_prew: '周浏览',
      view: '总浏览',
      time: '时间 ↓'
    }
  },
  methods: {
    replace (type, img, page) {
      if (type === '图片') {
        var res = img.replace('http://nano.insta360.com/public/media/thumb', '//insta360-hangzhou.oss-cn-hangzhou.aliyuncs.com/nano/private/media/jpg').replace('start.jpg', '.jpg')
        return res
      }else {
        return page
      }
    },
    sort (v) {
      var val = ''
      if (v === 'time') {
        val = this.time
      }else if (v === 'view') {
        val = this.view
      }else if (v === 'week_prew') {
        val = this.week_prew
      }
      this.time = '时间'
      this.view = '总浏览'
      this.week_prew = '周浏览'
      if (val.charAt(val.length - 1) === '↓') {
        if (v === 'time') {
          this.time = '时间 ↑'
        }else if (v === 'view') {
          this.view = '总浏览 ↑'
        }else if (v === 'week_prew') {
          this.week_prew = '周浏览 ↑'
        }
      }else {
        if (v === 'time') {
          this.time = '时间 ↓'
        }else if (v === 'view') {
          this.view = '总浏览 ↓'
        }else if (v === 'week_prew') {
          this.week_prew = '周浏览 ↓'
        }
      }
      this.$dispatch('sort', v)
    }
  },

  filters: {
    substring (s) {
      if (s.length > 40) {
        s = s.substring(0, 40) + '...'
      }
      return s
    },
    replace (s) {
      s = s.replace('http://nano.insta360.com', 'https://s.insta360.com')
      return s
    },
    modify (s) {
      s = s.replace('http://nano.insta360.com', 'https://static.insta360.com/share')
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
  .thumb{
    border-radius: 50%;
    height: 96px;
    width: 96px;
  }
</style>