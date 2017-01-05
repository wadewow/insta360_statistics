import moment from 'moment'
import _ from 'lodash'
import dict_json from './dictionary.json'
import store from './store'
export default {
  store: store,
  nano_active: (data, location, start_time) => {
    const x = []
    const x_week = []
    const y_native = []
    const y_abroad = []
    const y_special_region = []
    const y_month = []
    const y_month_native = []
    const y_month_abroad = []
    const y_all = []
    const y_week_native = []
    const y_week_abroad = []
    const y_week = []
    for (var index in data) {
      x.push(index)
      y_native.push(_.round(data[index]['native'] * store.state.multiple))
      y_abroad.push(_.round(data[index]['abroad'] * store.state.multiple))
      y_special_region.push(_.round(data[index]['special_region'] * store.state.multiple))
      y_all.push(_.round(data[index]['all'] * store.state.multiple))
      y_month.push(_.round(data[index]['month_total'] * store.state.multiple))
      y_month_native.push(_.round(data[index]['month_native_total'] * store.state.multiple))
      y_month_abroad.push(_.round(data[index]['month_abroad_total'] * store.state.multiple))
    }
    const length = x.length
    var start = moment(x[0]).diff(moment(x[0]).startOf('week'), 'days')
    // var end = moment(x[length - 1]).diff(moment(x[length - 1]).startOf('week'), 'days')

    for (var i = (7 - start) % 7; i < length; i += 7) {
      x_week.push(x[i])
      // console.log(x[i])
    }
    for (var k in x_week) {
      var sum_native = 0
      var sum_abroad = 0
      var num
      for (var count = 0; count < 7; count++) {
        var date = moment(x_week[k]).add(count, 'days').format('YYYY-MM-DD')
        num = count + 1
        if (data[date] === undefined) {
          num--
          break
        }
        sum_native += _.round(data[date]['native'] * store.state.multiple)
        sum_abroad += _.round(data[date]['abroad'] * store.state.multiple)
      }
      y_week_native.push(sum_native)
      y_week_abroad.push(sum_abroad)
      y_week.push(sum_abroad + sum_native)
      x_week[k] = x_week[k].substring(5) + '~' + moment(x_week[k]).add(num - 1, 'days').format('MM-DD')
    }

    if (x_week.length === 0 && x.length !== 0) {
      const num = x.length
      x_week.push(x[0].substring(5) + '~' + x[num - 1].substring(5))
      sum_native = 0
      sum_abroad = 0
      for (count = 0; count < num; count++) {
        date = moment(x[0]).add(count, 'days').format('YYYY-MM-DD')
        sum_native += _.round(data[date]['native'] * store.state.multiple)
        sum_abroad += _.round(data[date]['abroad'] * store.state.multiple)
      }
      y_week_native.push(sum_native)
      y_week_abroad.push(sum_abroad)
      y_week.push(sum_abroad + sum_native)
    }

    for (var j in x) {
      x[j] = x[j].substring(5)
    }

    var sum_all = _.sum(y_all)
    var native_sum = _.sum(y_native)
    if (start_time <= '2016-06-07') {
      sum_all += 200
      native_sum += 200
    }
    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '总激活量',
        value: sum_all
      },
      {
        name: '国内激活量',
        value: native_sum
      },
      {
        name: '国外激活量',
        value: '其他：' + (_.sum(y_abroad) - _.sum(y_special_region)),
        comment: '港澳台：' + _.sum(y_special_region)
      }
      ],
      title: {
        text: '激活数量走势',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        // zlevel: 1,
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params, ticket, callback) {
          var sum = 0
          var res = params[0].name
          var length = params.length
          for (var i = 0, l = length; i < l; i++) {
            // console.log(params[i])
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + (params[i].value === undefined ? '-' : params[i].value)
            if (params[i].seriesName === '周激活数量' || params[i].seriesName === '30天激活总量' || params[i].seriesName === '国内30天激活量' || params[i].seriesName === '国外30天激活量') {
              continue
            }
            sum += parseInt(params[i].value, 10)
          }
          if (length === 1) {
            return res
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '全部激活量' + ' : ' + (isNaN(sum) ? '-' : sum)
          return res
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['国内激活数量', '国外激活数量', '周激活数量', '国内30天激活量', '国外30天激活量', '30天激活总量']
        // selected: { '全部激活数量': false }
      },
      xAxis: [{
        data: x // 横向则将data放到yAxis
      },
      {
        data: x_week
      }],
      yAxis: [{name: '日激活'}, {name: '周/月激活'}],
      series: [
        // {
        //   name: '全部激活数量',
        //   type: 'line',
        //   data: y_all,
        //   itemStyle: {normal: {areaStyle: {type: 'default'}}}
        // },
        {
          name: '国内激活数量',
          type: 'line',
          data: y_week_native,
          xAxisIndex: 1,
          yAxisIndex: 1
          // stack: 'week'
        },
        {
          name: '国外激活数量',
          type: 'line',
          data: y_week_abroad,
          xAxisIndex: 1,
          yAxisIndex: 1
          // stack: 'week'
        },
        {
          name: '周激活数量',
          type: 'line',
          data: y_week,
          xAxisIndex: 1,
          yAxisIndex: 1
        },
        {
          name: '国内30天激活量',
          type: 'line',
          data: y_month_native,
          // stack: 'month',
          // itemStyle: {normal: {areaStyle: {type: 'default'}}},
          xAxisIndex: 0,
          yAxisIndex: 1
        },
        {
          name: '国外30天激活量',
          type: 'line',
          data: y_month_abroad,
          // stack: 'month',
          // itemStyle: {normal: {areaStyle: {type: 'default'}}},
          xAxisIndex: 0,
          yAxisIndex: 1
        },
        {
          name: '30天激活总量',
          type: 'line',
          data: y_month,
          xAxisIndex: 0,
          yAxisIndex: 1
        },
        {
          name: '国内激活数量',
          type: 'line',
          data: y_native,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: '国外激活数量',
          type: 'line',
          data: y_abroad,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          xAxisIndex: 0,
          yAxisIndex: 0
        }]
    }
  },
  month_share_trends: data => {
    const x = []
    const y_video = []
    const y_image = []
    for (var index in data) {
      x.push(data[index]['time'])
      y_video.push(_.round(parseInt(data[index]['share_video_nums'], 10) * store.state.multiple))
      y_image.push(_.round(parseInt(data[index]['share_image_nums'], 10) * store.state.multiple))
    }
    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '累计图片数量',
        value: _.sum(y_image)
      },
      {
        name: '累计视频数量',
        value: _.sum(y_video)
      }
      ],
      title: {
        text: '内容数量走势',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params, ticket, callback) {
          var sum = 0
          var res = params[0].name
          for (var i = 0, l = params.length; i < l; i++) {
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + (params[i].value === undefined ? '-' : params[i].value)
            sum += parseInt(params[i].value, 10)
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '全部数量' + ' : ' + (isNaN(sum) ? '-' : sum)
          return res
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['图片数量', '视频数量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: '图片数量',
        type: 'line',
        stack: 'all',
        data: y_image,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '视频数量',
        type: 'line',
        stack: 'all',
        data: y_video,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }]
    }
  },
  share_visitor_trend: data => {
    const x = []
    const y_video = []
    const y_image = []
    for (var index in data) {
      x.push(index)
      y_video.push(_.round(parseInt(data[index]['视频'], 10) * store.state.multiple))
      y_image.push(_.round(parseInt(data[index]['图片'], 10) * store.state.multiple))
    }
    const total_image = _.sum(y_image)
    const total_video = _.sum(y_video)

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '图片浏览量',
        value: total_image
      },
      {
        name: '视频浏览量',
        value: total_video
      }
      ],
      title: {
        text: '浏览量走势',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params, ticket, callback) {
          var sum = 0
          var res = params[0].name
          for (var i = 0, l = params.length; i < l; i++) {
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + (params[i].value === undefined ? '-' : params[i].value)
            sum += parseInt(params[i].value, 10)
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '总浏览量' + ' : ' + (isNaN(sum) ? '-' : sum)
          return res
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['图片浏览量', '视频浏览量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: '图片浏览量',
        type: 'line',
        data: y_image,
        stack: 'all',
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '视频浏览量',
        type: 'line',
        data: y_video,
        stack: 'all',
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }]
    }
  },
  location_active_detail: (data, location) => {
    const x = []
    const y = []
    const y_month = []
    var total = 0

    for (var index in data) {
      x.push(data[index]['day_time'])
      y.push(_.round(data[index]['active_nums'] * store.state.multiple))
      y_month.push(_.round(data[index]['month_total'] * store.state.multiple))
      total = total + _.round(parseInt(data[index]['active_nums'], 10) * store.state.multiple)
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '激活量',
        value: total
      }],
      title: {
        text: location + '地区激活数量',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        x: 'center',
        data: [location + '地区激活数量', '30天激活量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: [{name: '日激活'}, {name: '30天激活'}],
      series: [{
        name: location + '地区激活数量',
        type: 'line',
        data: y,
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        yAxisIndex: 0
      },
      {
        name: '30天激活量',
        type: 'line',
        data: y_month,
        yAxisIndex: 1
      }
      ]
    }
  },
  nano_active_map: (data, location, start_time) => {
    const native_data = data['native']
    const abroad_data = data['abroad']
    const all_data = data['all']
    var max = 500
    if (!_.isEmpty(all_data['data'])) {
      var m = _.round(all_data['data'][0]['total'] * store.state.multiple)
      max = (parseInt(m / 100, 10) + 1) * 100
    }
    function getNativeData () {
      const result = []
      for (var index in native_data['data']) {
        result.push(_.assign({'name': native_data['data'][index]['location'], 'value': _.round(native_data['data'][index]['total'] * store.state.multiple)}))
      }
      return result
    }
    const itemStyle = {
      normal: {
        color: '#32cd32',
        label: {
          show: true
          // textStyle: {
          //   color: '#fff',
          //   fontSize: 15
          // }
        }
      },
      emphasis: {               // 也是选中样式
        // borderWidth: 5,
        // borderColor: 'yellow',
        color: '#ccc',
        label: {
          // show: false,
          textStyle: {
            // color: '#eee'
          }
        }
      }
    }
    function getAbroadData () {
      const result = []
      for (var index in abroad_data['data']) {
        result.push(_.assign({'name': abroad_data['data'][index]['location'], 'value': _.round(abroad_data['data'][index]['total'] * store.state.multiple), 'itemStyle': itemStyle}))
      }
      return result
    }
    var total_all = _.round(parseInt(data['all']['total'], 10) * store.state.multiple)
    var total_native = _.round(parseInt(data['native']['total'], 10) * store.state.multiple)
    var total_abroad = total_all - total_native
    const _native_data = getNativeData()
    const _abroad_data = getAbroadData()
    const _native_top = []
    const _abroad_top = []
    const special_region_total = _.round(data['special_region']['total'] * store.state.multiple)
    for (var i in _native_data) {
      _native_data[i]['value'] = _native_data[i]['value']
      _native_top.push(_native_data[i])
    }
    for (var j in _abroad_data) {
      _abroad_top.push(_.assign({'name': dict_json[_abroad_data[j]['name']] !== undefined ? dict_json[_abroad_data[j]['name']] : _abroad_data[j]['name'], 'value': _abroad_data[j]['value']}))
    }

    const _china = {
      name: '全国',
      type: 'map',
      mapType: 'china',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: _native_data
    }

    const _world = {
      name: '世界',
      type: 'map',
      mapType: 'world',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: _abroad_data
    }

    if (start_time <= '2016-06-07') {
      total_all += 200
      total_native += 200
    }

    var option = {
      total: [{
        name: '总激活量',
        value: total_all
      },
        {
          name: '国内激活量',
          value: total_native
        },
        {
          name: '国外激活量',
          value: '其他：' + (total_abroad - special_region_total),
          comment: '港澳台：' + special_region_total
        }
      ],
      top: {
        native: _native_top,
        abroad: _abroad_top
      },
      title: {
        text: '激活地区分布',
        // subtext: '',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          var value = params['value']
          var percent = 0
          var res = params['name'] + ' : '
          if (isNaN(value)) {
            value = '-'
            res = res + value
          }else {
            res = res + value
            if (params['seriesName'] === '全国') {
              percent = _.round(isNaN(parseInt(value, 10) / total_native * 100) ? 0 : (parseInt(value, 10) / total_native * 100), 1)
            }else {
              percent = _.round(isNaN(parseInt(value, 10) / total_all * 100) ? 0 : (parseInt(value, 10) / total_all * 100), 1)
            }
            res = res + '<br/>' + '占比' + ' : ' + percent + '%'
          }
          return res
        }
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        selectedMode: 'single',
        data: ['全国', '世界']
      },
      dataRange: {
        min: 0,
        max: max,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        // orient: 'vertical',
        x: 'right',
        y: 'top',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          saveAsImage: { show: true }
        }
      },
      series: [_china, _world]
    }

    return option
  },
  location_share: data => {
    const native_data = data['native']
    const abroad_data = data['abroad']
    var m = 499
    var k = 0
    for (var n in abroad_data) {
      m = _.round(abroad_data[n]['total'] * store.state.multiple)
      if (k === 1) {
        break
      }
      k++
    }
    for (var o in native_data) {
      var temp = _.round(native_data[o]['total'] * store.state.multiple)
      if (temp > m) {
        m = temp
      }
      break
    }
    var max = (parseInt(m / 100, 10) + 1) * 100
    function getNativeData () {
      const result = []
      for (var index in native_data) {
        result.push(_.assign({'name': index, 'value': _.round(native_data[index]['total'] * store.state.multiple)}))
      }
      return result
    }
    const itemStyle = {
      normal: {
        color: '#32cd32',
        label: {
          show: true
          // textStyle: {
          //   color: '#fff',
          //   fontSize: 15
          // }
        }
      },
      emphasis: {               // 也是选中样式
        // borderWidth: 5,
        // borderColor: 'yellow',
        color: '#ccc',
        label: {
          // show: false,
          textStyle: {
            // color: '#eee'
          }
        }
      }
    }
    function getAbroadData () {
      const result = []
      for (var index in abroad_data) {
        result.push(_.assign({'name': index, 'value': _.round(abroad_data[index]['total'] * store.state.multiple), 'itemStyle': itemStyle}))
      }
      return result
    }

    const _native_data = getNativeData()
    const _abroad_data = getAbroadData()
    const _native_top = []
    const _abroad_top = []
    const total_native = _.sumBy(_native_data, function (o) {
      return o.value
    })
    const total_all = _.sumBy(_abroad_data, function (o) {
      return o.value
    })

    const total_abroad = total_all - total_native
    for (var i in _native_data) {
      _native_top.push(_.assign({'name': _native_data[i]['name'], 'value': _native_data[i]['value'], 'percent': _.round(isNaN(parseInt(_native_data[i]['value'], 10) / total_native * 100) ? 0 : (parseInt(_native_data[i]['value'], 10) / total_native * 100), 1)}))
    }

    for (var j in _abroad_data) {
      _abroad_top.push(_.assign({'name': dict_json[_abroad_data[j]['name']] !== undefined ? dict_json[_abroad_data[j]['name']] : _abroad_data[j]['name'], 'value': _abroad_data[j]['value'], 'percent': _.round(isNaN(parseInt(_abroad_data[j]['value'], 10) / total_all * 100) ? 0 : (parseInt(_abroad_data[j]['value'], 10) / total_all * 100), 1)}))
    }
    const _china = {
      name: '全国',
      type: 'map',
      mapType: 'china',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: _native_data
    }

    const _world = {
      name: '世界',
      type: 'map',
      mapType: 'world',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: _abroad_data
    }

    var option = {
      total: [{
        name: '总分享数',
        value: total_all
      },
        {
          name: '国内分享数',
          value: total_native
        },
        {
          name: '国外分享数',
          value: total_abroad
        }
      ],
      top: {
        native: _native_top,
        abroad: _abroad_top
      },
      title: {
        text: '内容地区分布',
        // subtext: '',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          var value = params['value']
          var percent = 0
          var res = params['name'] + ' : '
          if (isNaN(value)) {
            value = '-'
            res = res + value
          }else {
            res = res + value
            if (params['seriesName'] === '全国') {
              percent = _.round(isNaN(parseInt(value, 10) / total_native * 100) ? 0 : (parseInt(value, 10) / total_native * 100), 1)
            }else {
              percent = _.round(isNaN(parseInt(value, 10) / total_all * 100) ? 0 : (parseInt(value, 10) / total_all * 100), 1)
            }
            res = res + '<br/>' + '占比' + ' : ' + percent + '%'
          }
          return res
        }
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        selectedMode: 'single',
        data: ['全国', '世界']
      },
      dataRange: {
        min: 0,
        max: max,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        // orient: 'vertical',
        x: 'right',
        y: 'top',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          saveAsImage: { show: true }
        }
      },
      // roamController: {
      //   show: true,
      //   x: 'right',
      //   y: 'bottom',
      //   mapTypeControl: {
      //     'china': true,
      //     'world': true
      //   }
      // },
      series: [_china, _world]
      // series: [_world]
    }

    return option
  },
  share_visitor: data => {
    const native_data = data['native']
    const abroad_data = data['abroad']
    var m = 499
    var k = 0
    for (var n in abroad_data) {
      abroad_data[n] = _.round(abroad_data[n] * store.state.multiple)
      if (k === 1) {
        m = abroad_data[n]
      }
      k++
    }
    k = 0
    for (var o in native_data) {
      native_data[o] = _.round(native_data[o] * store.state.multiple)
      if (k === 0) {
        var temp = native_data[o]
        if (temp > m) {
          m = temp
        }
      }
      k++
    }
    var max = (parseInt(m / 100, 10) + 1) * 100
    function getNativeData () {
      const result = []
      for (var index in native_data) {
        result.push(_.assign({'name': index, 'value': native_data[index]}))
      }
      return result
    }
    const itemStyle = {
      normal: {
        color: '#32cd32',
        label: {
          show: true
          // textStyle: {
          //   color: '#fff',
          //   fontSize: 15
          // }
        }
      },
      emphasis: {               // 也是选中样式
        // borderWidth: 5,
        // borderColor: 'yellow',
        color: '#ccc',
        label: {
          // show: false,
          textStyle: {
            // color: '#eee'
          }
        }
      }
    }
    function getAbroadData () {
      const result = []
      for (var index in abroad_data) {
        result.push(_.assign({'name': index, 'value': abroad_data[index], 'itemStyle': itemStyle}))
      }
      return result
    }

    const _native_data = getNativeData()
    const _abroad_data = getAbroadData()
    const _native_top = []
    const _abroad_top = []
    const total_native = _.sumBy(_native_data, function (o) {
      return o.value
    })
    const total_all = _.sumBy(_abroad_data, function (o) {
      return o.value
    })

    const total_abroad = total_all - total_native
    for (var i in _native_data) {
      _native_top.push(_.assign({'name': _native_data[i]['name'], 'value': _native_data[i]['value'], 'percent': _.round(isNaN(parseInt(_native_data[i]['value'], 10) / total_native * 100) ? 0 : (parseInt(_native_data[i]['value'], 10) / total_native * 100), 1)}))
    }
    for (var j in _abroad_data) {
      _abroad_top.push(_.assign({'name': dict_json[_abroad_data[j]['name']] !== undefined ? dict_json[_abroad_data[j]['name']] : _abroad_data[j]['name'], 'value': _abroad_data[j]['value'], 'percent': _.round(isNaN(parseInt(_abroad_data[j]['value'], 10) / total_all * 100) ? 0 : (parseInt(_abroad_data[j]['value'], 10) / total_all * 100), 1)}))
    }
    const _china = {
      name: '全国',
      type: 'map',
      mapType: 'china',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: _native_data
    }

    const _world = {
      name: '世界',
      type: 'map',
      mapType: 'world',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: _abroad_data
    }

    var option = {
      total: [{
        name: '总浏览数',
        value: total_all
      },
        {
          name: '国内浏览数',
          value: total_native
        },
        {
          name: '国外浏览数',
          value: total_abroad
        }
      ],
      top: {
        native: _native_top,
        abroad: _abroad_top
      },
      title: {
        text: '访客地区分布',
        // subtext: '',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          var value = params['value']
          var percent = 0
          var res = params['name'] + ' : '
          if (isNaN(value)) {
            value = '-'
            res = res + value
          }else {
            res = res + value
            if (params['seriesName'] === '全国') {
              percent = _.round(isNaN(parseInt(value, 10) / total_native * 100) ? 0 : (parseInt(value, 10) / total_native * 100), 1)
            }else {
              percent = _.round(isNaN(parseInt(value, 10) / total_all * 100) ? 0 : (parseInt(value, 10) / total_all * 100), 1)
            }
            res = res + '<br/>' + '占比' + ' : ' + percent + '%'
          }
          return res
        }
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        selectedMode: 'single',
        data: ['全国', '世界']
      },
      dataRange: {
        min: 0,
        max: max,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        // orient: 'vertical',
        x: 'right',
        y: 'top',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          saveAsImage: { show: true }
        }
      },
      // roamController: {
      //   show: true,
      //   x: 'right',
      //   y: 'bottom',
      //   mapTypeControl: {
      //     'china': true,
      //     'world': true
      //   }
      // },
      series: [_china, _world]
      // series: [_world]
    }

    return option
  },
  share_list: data => {
    const page_total = data['page_total']
    const column = []
    // for (var item in data['data'][0]) {
    //   column.push(item)
    // }
    for (var i in data['data']) {
      data['data'][i]['share_location'] = data['data'][i]['share_location'].replace(/\,/g, ' ')
      if (data['data'][i]['share_location'] === '') {
        data['data'][i]['share_location'] = '其它'
      }
      if (data['data'][i]['title'] === '') {
        data['data'][i]['title'] = '来自Insta360 Nano用户分享的全景时刻'
      }
    }
    return {
      total: _.round(data['total'] * store.state.multiple),
      current_page: data['current_page'],
      page_total: _.round(page_total * store.state.multiple),
      column: column,
      series: data['data']
    }
  },
  share_locations: data => {
    const abroad_data = data['abroad']
    const locations = []
    for (var n in abroad_data) {
      locations.push(dict_json[n] !== undefined ? dict_json[n] : n)
    }
    return locations
  },
  rest_statistics: data => {
    const column1 = ['出厂序列号总数', '已激活序列号总数', '分享的视频总数', '分享的图片总数', '有分享行为的序列号数', '不重复的视频数', '不重复的图片数']
    // const column2 = ['上线~2016.7.25 18:00', '2016.7.27 17:47 ~ 2016.7.29 12:17', '2016.7.29 12:17 至今', '今天']
    // const column3 = ['第一次上线', '从默认陀螺仪改成默认拖拽', '回滚为默认陀螺仪', '点击knowmore新增用户/总点击数']
    // const column = ['Knowmore 点击比例', '数据', '分享内容页版本']
    const data1 = []
    var count = 0
    for (var item1 in data['nano_statistics']) {
      if (item1 !== 'today_active_nums') {
        data1.push(_.assign({'name': column1[count], 'value': data['nano_statistics'][item1]}))
        count++
      }
    }
    // count = 0
    // const data2 = []
    // for (var item2 in data['know_more']) {
    //   data2.push(_.assign({'name': column2[count], 'value': data['know_more'][item2], 'comment': column3[count]}))
    //   count++
    // }

    const data_total = []
    data_total.push(data1)
    // data_total.push(data2)

    return {
      // total: 1,
      // current_page: 1,
      // page_total: 1,
      // column: column,
      series: data_total
    }
  },
  knowmore: data => {
    // const tip1 = ['上线 ~ 2016.7.25 18:00', '2016.7.27 17:47 ~ 2016.7.29 12:17', '2016.7.29 12:17 ~ 2016.8.13 18:40', '2016.8.13 18:40 至今']
    // const tip2 = ['第一次上线', '从默认拖拽改成陀螺仪', '回滚为默认拖拽', '优化了页面加载速度']
    const column1 = ['Knowmore 点击比例', '数据', '分享内容页版本']
    const column2 = ['日期', '点击knowmore新增用户/总点击数']

    const data1 = []
    const data2 = []
    for (var item1 in data['know_more']) {
      // var array1 = data['know_more'][item1].split('/')
      // var percent1 = 0
      // if (array1.length > 1 && array1[1] !== 0) {
      //   percent1 = _.round(isNaN((parseFloat(array1[0]) / parseFloat(array1[1])) * 100) ? 0 : ((parseFloat(array1[0]) / parseFloat(array1[1])) * 100), 1)
      // }
      data1.push(_.assign({'name': data['know_more'][item1]['time_interval'], 'value': data['know_more'][item1]['know_more_scale'], 'comment': data['know_more'][item1]['description']}))
    }

    for (var item2 in data['data']['info']) {
      var array2 = data['data']['info'][item2].scale.split('/')
      var percent2 = 0
      if (array2.length > 1 && array2[1] !== 0) {
        percent2 = _.round(isNaN((parseFloat(array2[0]) / parseFloat(array2[1])) * 100) ? 0 : ((parseFloat(array2[0]) / parseFloat(array2[1])) * 100), 1)
      }
      data2.push(_.assign({'time': data['data']['info'][item2].time, 'scale': data['data']['info'][item2].scale + ' (' + percent2 + '%)'}))
    }
    const data_total = []
    data_total.push(data1)
    data_total.push(data2)
    return {
      total: data['data']['total'],
      current_page: data['data']['current_page'],
      page_total: data['data']['page_total'],
      column: [column1, column2],
      series: data_total
    }
  },
  link_query: data => {
    const column = ['链接标题', '链接地址', '导流目的地', '访问次数']
    return {
      total: data['total'],
      current_page: data['page'],
      page_total: data['page_total'],
      column: column,
      series: data['data']
    }
  },
  landing_page: data => {
    const column = ['日期', '国内页面PV', '国内页面UV', '点击京东次数', '点击淘宝次数', '国外页面PV', '国外页面UV', '点击buynow次数']
    return {
      current_page: data['current_page'],
      page_total: data['total'],
      column: column,
      series: data['data']
    }
  },
  support_table: data => {
    const column = ['序号', '文章标题', '浏览数', '是/否有帮助（满意度）', '问题反馈']
    for (var index in data['data']) {
      var scale = String(data['data'][index]['help_scale'])
      var temp = scale.split('/')
      var helpful = Number(temp[0])
      var helpless = Number(temp[1])
      var total = helpful + helpless
      var percent = 0
      if (total !== 0) {
        percent = _.round(helpful * 100.0 / total, 1)
      }
      data['data'][index]['help_scale'] = scale + ' (' + percent + '%)'
    }
    return {
      current_page: data['current_page'],
      page_total: data['page_total'],
      total: data['total'],
      column: column,
      series: data['data']
    }
  },
  support_manual_table: data => {
    const column = ['序号', '文章标题', '浏览数']
    return {
      current_page: data['current_page'],
      page_total: data['page_total'],
      total: data['total'],
      column: column,
      series: data['data']
    }
  },
  feedback_table: data => {
    const column = ['时间', '邮箱地址', '问题反馈']
    return {
      title: data['title'],
      current_page: data['current_page'],
      page_total: data['page_total'],
      total: data['total'],
      column: column,
      series: data['data']
    }
  },
  search: data => {
    const column = ['序号', '时间', '关键词', '邮箱地址', '问题反馈']
    return {
      current_page: data['current_page'],
      page_total: data['page_total'],
      total: data['total'],
      column: column,
      series: data['data']
    }
  },
  taobao_detail: data => {
    const column = ['店铺', '商品名', '价格', '近30天销量', '链接', '地区', '淘宝/天猫']
    return {
      commodities: data['commodities'],
      current_page: 1,
      page_total: 1,
      column: column,
      series: data['data']
    }
  },
  store_detail: (data, location) => {
    const store = data['store']
    data = data['data']
    const x = []
    const y = []

    for (var index in data) {
      x.push(index)
      y.push(data[index])
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
      }],
      title: {
        text: store + ' 淘宝店销量',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        x: 'center',
        data: [store + ' 淘宝店销量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: store + ' 淘宝店销量',
        type: 'line',
        data: y,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }]
    }
  },
  nano_store: data => {

    const x = []
    const y_all = []
    const y_pc = []
    const y_mobile = []
    for (var index in data['all']) {
      x.push(index)
      y_all.push(data['all'][index])
      y_pc.push(data['pc'][index])
      y_mobile.push(data['mobile'][index])
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '全部流量',
        value: _.sum(y_all)
      },
      {
        name: 'PC端流量',
        value: _.sum(y_pc)
      },
      {
        name: '手机端流量',
        value: _.sum(y_mobile)
      }],
      title: {
        text: '店铺流量分布',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // mark: {
          //   show: true,
          //   title: {
          //     mark: '辅助线开关',
          //     markUndo: '删除辅助线',
          //     markClear: '清空辅助线'
          //   },
          //   lineStyle: {
          //     width: 2,
          //     color: '#1e90ff',
          //     type: 'dashed'
          //   }
          // },
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['全部', 'PC端', '手机端'],
        selected: { 'PC端': false, '手机端': false }
      },
      xAxis: {
        data: x, // 横向则将data放到yAxis
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      yAxis: {},
      series: [{
        name: '全部',
        type: 'bar',
        data: y_all,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: 'PC端',
        type: 'bar',
        data: y_pc,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '手机端',
        type: 'bar',
        data: y_mobile,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }
      ]
    }
  },
  click_buylink: data => {

    const x = []
    const y_all = []
    const y_pc = []
    const y_mobile = []
    for (var index in data['all']) {
      x.push(index)
      y_all.push(data['all'][index])
      y_pc.push(data['pc'][index])
      y_mobile.push(data['mobile'][index])
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '全部点击数',
        value: _.sum(y_all)
      },
      {
        name: 'PC端点击数',
        value: _.sum(y_pc)
      },
      {
        name: '手机端点击数',
        value: _.sum(y_mobile)
      }],
      title: {
        text: '链接点击地区分布',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // mark: {show: true, title: { mark: '辅助线开关', markUndo: '删除辅助线', markClear: '清空辅助线'}},
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['全部', 'PC端', '手机端'],
        selected: { 'PC端': false, '手机端': false }
      },
      xAxis: {
        data: x, // 横向则将data放到yAxis
        axisLabel: {
          interval: 2,
          rotate: 30,
          textStyle: {
            fontSize: 1,
            fontWeight: 'lighter'
          }
        }
      },
      yAxis: {},
      series: [{
        name: '全部',
        type: 'bar',
        data: y_all,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: 'PC端',
        type: 'bar',
        data: y_pc,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '手机端',
        type: 'bar',
        data: y_mobile,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }
      ]
    }
  },

  nano_active_area: data => {
    const x = []
    const area = []
    const y = []

    var count = 0
    // var _sum = 0
    for (var index in data) {
      x.push(index)
      if (count === 0) {
        for (var i in data[index]) {
          area.push(i)
          var temp = []
          y.push(_.assign({'name': i, 'data': temp}))
        }
      }
      for (var j in y) {
        // _sum += data[index][y[j]['name']]
        y[j]['data'].push(_.round(data[index][y[j]['name']] * store.state.multiple))
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [],
      title: {
        text: '激活Top10区域对比面积图',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  share_area: data => {
    const x = []
    const area = []
    const y = []

    var count = 0
    // var _sum = 0
    for (var index in data) {
      x.push(index)
      if (count === 0) {
        for (var i in data[index]) {
          area.push(i)
          var temp = []
          y.push(_.assign({'name': i, 'data': temp}))
        }
      }
      for (var j in y) {
        // _sum += data[index][y[j]['name']]
        y[j]['data'].push(_.round(data[index][y[j]['name']] * store.state.multiple))
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [],
      title: {
        text: '内容Top10区域对比面积图',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  visit_area: data => {
    const x = []
    const area = []
    const y = []

    var count = 0
    // var _sum = 0
    for (var index in data) {
      x.push(index)
      if (count === 0) {
        for (var i in data[index]) {
          area.push(i)
          var temp = []
          y.push(_.assign({'name': i, 'data': temp}))
        }
      }
      for (var j in y) {
        // _sum += data[index][y[j]['name']]
        y[j]['data'].push(_.round(data[index][y[j]['name']] * store.state.multiple))
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [],
      title: {
        text: '访客Top10区域对比面积图',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  buylink_store_trends: data => {

    const x = []
    const area = []
    const y = []

    var count = 0
    var _sum = 0
    for (var index in data) {
      if (count === 0) {
        for (var i in data[index]) {
          area.push(data[index][i])
          var temp = []
          y.push(_.assign({'name': data[index][i], 'data': temp}))
        }
      }else {
        x.push(index)
        for (var j in y) {
          var num = data[index][y[j]['name']] === undefined ? 0 : data[index][y[j]['name']]
          y[j]['data'].push(num)
          _sum += num
        }
      }
      count++
    }
    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }
    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '全部流量',
        value: _sum
      }],
      title: {
        text: '店铺流量走势',
        x: 'left',
        y: 90
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params, ticket, callback) {
          var sum = 0
          var res = params[0].name
          for (var i = 0, l = params.length; i < l; i++) {
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + (params[i].value === undefined ? '-' : params[i].value)
            sum += parseInt(params[i].value, 10)
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '全部' + ' : ' + (isNaN(sum) ? '-' : sum)
          return res
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        },
        y: 60
      },
      legend: {
        x: 'center',
        data: area,
        itemWidth: 25,
        top: -5,
        itemGap: 20,
        itemHeight: 16
        // selected: { 'PC端流量': false, '手机端流量': false }
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },

  use_condition: data => {
    const x = []
    const y_active = []
    const y_new = []
    const y_duration = []
    for (var index in data) {
      x.push(data[index]['date'])
      y_active.push(_.round(data[index]['active_user'] * store.state.multiple))
      y_new.push(_.round(data[index]['new_user'] * store.state.multiple))
      y_duration.push(data[index]['duration'])
    }
    var avgDuration = _.round(_.mean(y_duration), 0)
    var duration = moment.duration(avgDuration, 'seconds')
    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '新增用户',
        value: _.sum(y_new)
      },
      {
        name: '日均活跃用户',
        value: _.round(_.mean(y_active))
      },
      {
        name: '平均使用时长',
        value: duration.hours() + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's'
      }
      ],
      title: {
        text: '用户概况',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['新增用户', '活跃用户', '平均使用时长(s)']
        // selectedMode: 'single'
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: [
        {
        },
        {
          name: '时长',
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              return value + ' s'
            }
          },
          splitLine: {
            show: false
          }
        }],
      series: [
        {
          name: '新增用户',
          type: 'line',
          data: y_new,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '活跃用户',
          type: 'line',
          data: y_active,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          yAxisIndex: 1,
          name: '平均使用时长(s)',
          type: 'line',
          data: y_duration
        }]
    }
  },
  user_distribution: data => {
    const native_data = data['native']
    const abroad_data = data['abroad']
    var m = 499
    var k = 0
    for (var n in abroad_data) {
      abroad_data[n]['total'] = _.round(abroad_data[n]['total'] * store.state.multiple)
      if (k === 1) {
        m = abroad_data[n]['total']
      }
      k++
    }
    k = 0
    for (var o in native_data) {
      native_data[o]['total'] = _.round(native_data[o]['total'] * store.state.multiple)
      if (k === 0) {
        var temp = native_data[o]['total']
        if (temp > m) {
          m = temp
        }
      }
      k++
    }
    var max = (parseInt(m / 100, 10) + 1) * 100
    function getNativeData () {
      const result = []
      for (var index in native_data) {
        result.push(_.assign({'name': native_data[index]['location'], 'value': native_data[index]['total']}))
      }
      return result
    }
    const itemStyle = {
      normal: {
        color: '#32cd32',
        label: {
          show: true
          // textStyle: {
          //   color: '#fff',
          //   fontSize: 15
          // }
        }
      },
      emphasis: {               // 也是选中样式
        // borderWidth: 5,
        // borderColor: 'yellow',
        color: '#ccc',
        label: {
          // show: false,
          textStyle: {
            // color: '#eee'
          }
        }
      }
    }
    function getAbroadData () {
      const result = []
      for (var index in abroad_data) {
        result.push(_.assign({'name': abroad_data[index]['location'], 'value': abroad_data[index]['total'], 'itemStyle': itemStyle}))
      }
      return result
    }

    const _native_data = getNativeData()
    const _abroad_data = getAbroadData()
    const _native_top = []
    const _abroad_top = []
    const total_native = _.sumBy(_native_data, function (o) {
      return o.value
    })
    const total_all = _.sumBy(_abroad_data, function (o) {
      return o.value
    })
    const total_abroad = total_all - total_native
    for (var i in _native_data) {
      _native_top.push(_.assign({'name': _native_data[i]['name'], 'value': _native_data[i]['value'], 'percent': _.round(isNaN(parseInt(_native_data[i]['value'], 10) / total_native * 100) ? 0 : (parseInt(_native_data[i]['value'], 10) / total_native * 100), 1)}))
    }

    for (var j in _abroad_data) {
      _abroad_top.push(_.assign({'name': dict_json[_abroad_data[j]['name']] !== undefined ? dict_json[_abroad_data[j]['name']] : _abroad_data[j]['name'], 'value': _abroad_data[j]['value'], 'percent': _.round(isNaN(parseInt(_abroad_data[j]['value'], 10) / total_all * 100) ? 0 : (parseInt(_abroad_data[j]['value'], 10) / total_all * 100), 1)}))
    }
    const _china = {
      name: '全国',
      type: 'map',
      mapType: 'china',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: _native_data
    }

    const _world = {
      name: '世界',
      type: 'map',
      mapType: 'world',
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#fff',
          borderColor: '#ccc'
        },
        emphasis: {
          areaColor: '#FFFF00'
        }
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: _abroad_data
    }

    var option = {
      total: [{
        name: '新增用户',
        value: total_all
      },
        {
          name: '国内新增用户',
          value: total_native
        },
        {
          name: '国外新增用户',
          value: total_abroad
        }
      ],
      top: {
        native: _native_top,
        abroad: _abroad_top
      },
      title: {
        text: 'APP用户区域分布',
        // subtext: '',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          var value = params['value']
          var percent = 0
          var res = params['name'] + ' : '
          if (isNaN(value)) {
            value = '-'
            res = res + value
          }else {
            res = res + value
            if (params['seriesName'] === '全国') {
              percent = _.round(isNaN(parseInt(value, 10) / total_native * 100) ? 0 : (parseInt(value, 10) / total_native * 100), 1)
            }else {
              percent = _.round(isNaN(parseInt(value, 10) / total_all * 100) ? 0 : (parseInt(value, 10) / total_all * 100), 1)
            }
            res = res + '<br/>' + '占比' + ' : ' + percent + '%'
          }
          return res
        }
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        selectedMode: 'single',
        data: ['全国', '世界']
      },
      dataRange: {
        min: 0,
        max: max,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        // orient: 'vertical',
        x: 'right',
        y: 'top',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          saveAsImage: { show: true }
        }
      },
      // roamController: {
      //   show: true,
      //   x: 'right',
      //   y: 'bottom',
      //   mapTypeControl: {
      //     'china': true,
      //     'world': true
      //   }
      // },
      series: [_china, _world]
      // series: [_world]
    }
    return option
  },

  market_environment: data => {
    const x = []
    const area = []
    const y = []

    var count = 0
    // var _sum = 0
    for (var index in data) {
      x.push(index)
      if (count === 0) {
        for (var i in data[index]) {
          area.push(i)
          var temp = []
          y.push(_.assign({'name': i, 'data': temp}))
        }
      }
      for (var j in y) {
        // _sum += data[index][y[j]['name']]
        y[j]['data'].push(data[index][y[j]['name']] === undefined ? 0 : data[index][y[j]['name']])
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    var total = []
    for (var k in y) {
      total.push(_.assign({'name': y[k]['name'], 'value': _.sum(y[k]['data'])}))
    }
    total = _.orderBy(total, ['value'], ['desc'])

    return {
      top: {
        native: [],
        abroad: []
      },
      total: total,
      title: {
        text: '搜索指数',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },

  share_channel: data => {
    const versions = data['versions']
    data = data['data']
    const x = []
    const area = []
    const y = []

    var count = 0
    var _sum = 0
    const last_key = _.findLastKey(data)
    for (var i in data[last_key]) {
      area.push(i)
      var temp = []
      y.push(_.assign({'name': i, 'data': temp}))
    }

    for (var index in data) {
      x.push(index)
      for (var j in y) {
        var value = data[index][y[j]['name']] === undefined ? 0 : data[index][y[j]['name']]
        _sum += value
        y[j]['data'].push(value)
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    var total = []
    for (var k in y) {
      var sum = _.sum(y[k]['data'])
      var percent = _.round(sum * 100 / _sum, 1)
      total.push(_.assign({'name': y[k]['name'], 'value': _.sum(y[k]['data']), 'comment': (isNaN(percent) ? 0 : percent) + '%'}))
    }
    total = _.orderBy(total, ['value'], ['desc'])

    return {
      versions: versions,
      top: {
        native: [],
        abroad: []
      },
      total: total,
      title: {
        text: '分享渠道',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x
      },
      yAxis: {},
      series: _series
    }
  },

  share_count: data => {
    const versions = data['versions']
    data = data['data']
    const x = []
    const y_try = []
    const y_success = []
    const y_percent = []
    for (var index in data) {
      x.push(index)
      y_try.push(data[index]['share_count'])
      y_success.push(data[index]['success_count'])
      y_percent.push(data[index]['percent'])
    }
    var try_sum = _.sum(y_try)
    var success_sum = _.sum(y_success)
    var percent = isNaN(success_sum * 100.0 / try_sum) ? 0 : (success_sum * 100.0 / try_sum)
    return {
      versions: versions,
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '进入分享页次数',
        value: try_sum
      },
      {
        name: '成功分享数',
        value: success_sum
      },
      {
        name: '分享转化率',
        value: _.round(percent, 1) + '%'
      }
      ],
      title: {
        text: '分享转化率',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['进入分享页次数', '成功分享数', '分享转化率(%)']
      },
      xAxis: {
        data: x
      },
      yAxis: [
        {
        },
        {
          name: '百分比',
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              return value + ' %'
            }
          },
          splitLine: {
            show: false
          }
          // max: 100
        }],
      series: [
        {
          name: '进入分享页次数',
          type: 'line',
          data: y_try,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '成功分享数',
          type: 'line',
          data: y_success,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          yAxisIndex: 1,
          name: '分享转化率(%)',
          type: 'line',
          data: y_percent
        }]
    }
  },

  fans_trend: data => {
    const x = []
    const area = []
    const y = []

    var count = 0
    // var _sum = 0
    const last_key = _.findLastKey(data)
    for (var i in data[last_key]) {
      area.push(i)
      var temp = []
      y.push(_.assign({'name': i, 'data': temp}))
    }
    for (var index in data) {
      x.push(index)
      for (var j in y) {
        // _sum += data[index][y[j]['name']]
        y[j]['data'].push(isNaN(data[index][y[j]['name']]) ? 0 : data[index][y[j]['name']])
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    var total = []
    for (var k in y) {
      total.push(_.assign({'name': y[k]['name'], 'value': '总计：' + _.last(y[k]['data']), 'comment': '新增：' + (_.last(y[k]['data']) - _.head(y[k]['data']))}))
    }
    _.reverse(total)
    return {
      top: {
        native: [],
        abroad: []
      },
      total: total,
      title: {
        text: '粉丝走势',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  location_active_list: data=> {
    const n = data.length
    const length = _.round(n * store.state.multiple)
    var result = []
    for (var i = 0;i < length;i++) {
      var index = i
      if (index >= n) {
        index = index % n
      }
      result.push(data[index])
    }
    return result
  },
  user_area: data => {
    const x = []
    const area = data['locations']
    const y = []
    data = data['data']

    var count = 0
    for (var index in data) {
      x.push(index)
      if (count === 0) {
        for (var i in area) {
          // area.push(i)
          var temp = []
          y.push(_.assign({'name': area[i], 'data': temp}))
        }
      }
      for (var j in y) {
        y[j]['data'].push(_.round((data[index][y[j]['name']] !== undefined ? data[index][y[j]['name']] : 0) * store.state.multiple))
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [],
      title: {
        text: '新增用户Top10区域对比面积图',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  error_condition: data => {
    const x = []
    const y_total = []
    const y_rate = []
    var start_time = 0
    for (var index in data) {
      x.push(data[index]['date'])
      y_total.push(data[index]['total_error'])
      y_rate.push(_.round(data[index]['error_rate'] * 100, 1))
      start_time += data[index]['total_error'] / data[index]['error_rate']
    }
    const error_sum = _.sum(y_total)
    const rate_avg = _.round(error_sum * 100 / start_time, 1)
    return {
      top: {
        native: [],
        abroad: []
      },
      total: [
        {
          name: '错误数',
          value: error_sum
        },
        {
          name: '错误率',
          value: rate_avg + '%'
        }
      ],
      title: {
        text: '错误异常',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          // magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['错误数', '错误率(%)']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: [
        {
        },
        {
          name: '百分比',
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              return value + ' %'
            }
          },
          splitLine: {
            show: false
          }
        }],
      series: [
        {
          name: '错误数',
          type: 'line',
          data: y_total,
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '错误率(%)',
          type: 'line',
          data: y_rate,
          yAxisIndex: 1
        }]
    }
  },
  competitor_data: data => {
    const x = []
    const area = []
    const y = []

    var count = 0
    for (var index in data) {
      x.push(index)
      if (count === 0) {
        for (var i in data[index]) {
          area.push(i)
          var temp = []
          y.push(_.assign({'name': i, 'data': temp}))
        }
      }
      for (var j in y) {
        y[j]['data'].push(data[index][y[j]['name']])
      }
      count++
    }
    y.reverse()
    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [],
      title: {
        text: '竞品月销量/评论趋势',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: area
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  sales_status: data => {
    // console.log(data)
    const locations = data['locations']
    var last_inventory_first = 0
    var last_inventory_lower = 0
    var last_reject = 0
    last_inventory_first = data['last']['inventory_first']
    last_inventory_lower = data['last']['inventory_lower']
    last_reject = data['last']['reject']
    const x = []
    const y_pick_up = []
    const y_inventory_lower = []
    const y_inventory_first = []
    const y_sales_offline = []
    const y_sales_online = []
    const y_sales_offline_count = []
    const y_reject = []
    const y_sales = []
    const y_inventory = []
    data = data['data']
    for (var index in data) {
      x.push(index)
      y_pick_up.push(data[index]['pick_up'])
      y_inventory_lower.push(data[index]['inventory_lower'])
      y_inventory_first.push(data[index]['inventory_first'])
      y_sales_offline.push(data[index]['sales_offline'])
      y_sales_online.push(data[index]['sales_online'])
      y_sales_offline_count.push(data[index]['sales_offline_count'])
      y_reject.push(data[index]['reject'])
      y_sales.push(data[index]['sales_offline'] + data[index]['sales_online'] + data[index]['sales_offline_count'])
      y_inventory.push(data[index]['inventory_lower'] + data[index]['inventory_first'])
    }
    // 删除最后一项全为0的情况
    const last = x.length - 1
    if (last >= 1) {
      if (y_pick_up[last] === 0 && y_inventory_lower[last] === 0 && y_inventory_first[last] === 0 && y_sales_offline[last] === 0 && y_sales_online[last] === 0 && y_sales_offline_count[last] === 0 && y_reject[last] === 0) {
        x.pop()
        y_pick_up.pop()
        y_inventory_lower.pop()
        y_inventory_first.pop()
        y_sales_offline.pop()
        y_sales_online.pop()
        y_sales_offline_count.pop()
        y_sales.pop()
        y_reject.pop()
        y_inventory.pop()
      }
    }
    return {
      top: {
        native: [],
        abroad: []
      },
      locations: locations,
      total: [{
        name: '期初库存：' + (last_inventory_first + last_inventory_lower + last_reject),
        value: '一级：' + last_inventory_first,
        comment: '下级：' + last_inventory_lower,
        comment1: '退货：' + last_reject
      },
      {
        name: '本期提货',
        value: _.sum(y_pick_up)
      },
      {
        name: '本期销售：' + _.sum(y_sales),
        value: '一级线上：' + _.sum(y_sales_online),
        comment: '一级线下：' + _.sum(y_sales_offline),
        comment1: '下级代理：' + _.sum(y_sales_offline_count)
      },
      {
        name: '本期库存：' + (_.sum(y_inventory) + _.sum(y_reject)),
        value: '一级：' + _.sum(y_inventory_first),
        comment: '下级：' + _.sum(y_inventory_lower),
        comment1: '退货：' + _.sum(y_reject)
      }
      ],
      title: {
        text: '销售情况',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['提货', '销售', '库存', '退货']
        // selected: { '全部激活数量': false }
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [
        {
          name: '提货',
          type: 'line',
          data: y_pick_up,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '销售',
          type: 'line',
          data: y_sales,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '库存',
          type: 'line',
          data: y_inventory,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '退货',
          type: 'line',
          data: y_reject,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        }]
    }
  },
  electronic_sales: data => {
    const locations = data['locations']
    const x = []
    const y_buyer = []
    const y_visitor = []
    const y_number = []
    const y_payment = []
    const y_view = []
    data = data['data']
    for (var index in data) {
      x.push(index)
      y_buyer.push(data[index]['buyer'])
      y_visitor.push(data[index]['visitor'])
      y_payment.push(data[index]['payment'])
      y_view.push(data[index]['view'])
      y_number.push(data[index]['number'])
    }
    // 删除最后一项全为0的情况
    const last = x.length - 1
    if (last >= 1) {
      if (y_buyer[last] === 0 && y_visitor[last] === 0 && y_payment[last] === 0 && y_view[last] === 0 && y_number[last] === 0) {
        x.pop()
        y_buyer.pop()
        y_visitor.pop()
        y_payment.pop()
        y_view.pop()
        y_number.pop()
      }
    }
    const sum_buyer = _.sum(y_buyer)
    const sum_visitor = _.sum(y_visitor)
    var conversion = 0
    if (sum_visitor !== 0) {
      conversion = _.round(sum_buyer / sum_visitor * 100, 1)
    }
    return {
      top: {
        native: [],
        abroad: []
      },
      locations: locations,
      total: [{
        name: '支付件数',
        value: _.sum(y_number)
      },
      {
        name: '支付买家数',
        value: sum_buyer
      },
      {
        name: '支付金额',
        value: _.sum(y_payment)
      },
      {
        name: '浏览量',
        value: _.sum(y_view)
      },
      {
        name: '访客数',
        value: sum_visitor
      },
      {
        name: '转化率',
        value: conversion + '%'
      }
      ],
      title: {
        text: '自有电商渠道',
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['支付件数', '支付买家数', '浏览量', '访客数', '支付金额']
        // selected: { '全部激活数量': false }
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: [
        {
        },
        {
          name: '金额',
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              return value + ' 元'
            }
          },
          splitLine: {
            show: false
          }
        }],
      series: [
        {
          name: '支付件数',
          type: 'line',
          data: y_number,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '支付买家数',
          type: 'line',
          data: y_buyer,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '浏览量',
          type: 'line',
          stack: 'all',
          data: y_view,
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '访客数',
          type: 'line',
          stack: 'all',
          data: y_visitor,
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '支付金额',
          type: 'line',
          data: y_payment,
          yAxisIndex: 1
        }]
    }
  },
  login: data => {
    var result = {}
    const groups = data['group']
    for (var i in groups) {
      result[groups[i]] = true
    }
    return {
      username: data['username'],
      power: result
    }
  }
}
