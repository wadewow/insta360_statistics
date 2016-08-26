import moment from 'moment'
import _ from 'lodash'
import dict_json from './dictionary.json'
export default {
  nano_active: data => {

    const x = []
    const y_native = []
    const y_abroad = []
    const y_all = []
    for (var index in data) {
      x.push(index)
      y_native.push(data[index]['native'])
      y_abroad.push(data[index]['abroad'])
      y_all.push(data[index]['all'])
    }

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '总激活量',
        value: _.sum(y_all),
        comment: '(未加200)'
      },
      {
        name: '国内激活量',
        value: _.sum(y_native)
      },
      {
        name: '国外激活量',
        value: _.sum(y_abroad)
      }
      ],
      title: {
        text: '激活数量走势',
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
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value
            sum += parseInt(params[i].value, 10)
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '全部激活量' + ' : ' + sum
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
        data: ['国内激活数量', '国外激活数量']
        // selected: { '全部激活数量': false }
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
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
          data: y_native,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        },
        {
          name: '国外激活数量',
          type: 'line',
          data: y_abroad,
          stack: 'all',
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
        }]
    }
  },
  month_share_trends: data => {
    const x = []
    const y_video = []
    const y_image = []
    for (var index in data) {
      x.push(data[index]['time'])
      y_video.push(parseInt(data[index]['share_video_nums'], 10))
      y_image.push(parseInt(data[index]['share_image_nums'], 10))
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
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value
            sum += parseInt(params[i].value, 10)
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '全部数量' + ' : ' + sum
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
  content_production: data => {
    const x = []
    const y_video = []
    const y_image = []
    const y_length = []
    for (var index in data) {
      x.push(data[index]['time'])
      y_video.push(parseInt(data[index]['share_video_nums'], 10))
      y_image.push(parseInt(data[index]['share_image_nums'], 10))
      y_length.push(parseInt(data[index]['video_duration'], 10))
    }
    var y_length_sum = _.sum(y_length)
    var duration = moment.duration(y_length_sum, 'seconds')
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
      },
      {
        name: '累计视频时长',
        value: duration.hours() + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's'
      }
      ],
      title: {
        text: '内容生产',
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
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['图片数量', '视频数量', '视频时长(s)']
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
      series: [{
        name: '图片数量',
        type: 'line',
        data: y_image,
        stack: 'all',
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '视频数量',
        type: 'line',
        data: y_video,
        stack: 'all',
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '视频时长(s)',
        type: 'line',
        data: y_length,
        yAxisIndex: 1
      }]
    }
  },
  share_visitor_trend: data => {
    const x = []
    const y_video = []
    const y_image = []
    for (var index in data) {
      x.push(index)
      y_video.push(parseInt(data[index]['视频'], 10))
      y_image.push(parseInt(data[index]['图片'], 10))
    }
    const total_imgage = _.sum(y_image)
    const total_video = _.sum(y_video)

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '图片浏览量',
        value: total_imgage
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
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value
            sum += parseInt(params[i].value, 10)
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '总浏览量' + ' : ' + sum
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
    var total = 0

    for (var index in data) {
      x.push(data[index]['day_time'])
      y.push(data[index]['active_nums'])
      total = total + parseInt(data[index]['active_nums'], 10)
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
          magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
          // restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        x: 'center',
        data: [location + '地区激活数量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: location + '地区激活数量',
        type: 'line',
        data: y,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }]
    }
  },
  nano_active_map: data => {
    const native_data = data['native']
    const abroad_data = data['abroad']
    const all_data = data['all']
    var max = 500
    if (!_.isEmpty(all_data['data'])) {
      var m = all_data['data'][0]['total']
      max = (parseInt(m / 100, 10) + 1) * 100
    }
    function getNativeData () {
      const result = []
      for (var index in native_data['data']) {
        result.push(_.assign({'name': native_data['data'][index]['location'], 'value': native_data['data'][index]['total']}))
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
        result.push(_.assign({'name': abroad_data['data'][index]['location'], 'value': abroad_data['data'][index]['total'], 'itemStyle': itemStyle}))
      }
      return result
    }
    const total_all = parseInt(data['all']['total'], 10)
    const total_native = parseInt(data['native']['total'], 10)
    const total_abroad = total_all - total_native
    const _native_data = getNativeData()
    const _abroad_data = getAbroadData()
    const _native_top = []
    const _abroad_top = []
    for (var i in _native_data) {
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

    var option = {
      total: [{
        name: '总激活量',
        value: total_all,
        comment: '(未加200)'
      },
        {
          name: '国内激活量',
          value: total_native
        },
        {
          name: '国外激活量',
          value: total_abroad
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
      m = abroad_data[n]['total']
      if (k === 1) {
        break
      }
      k++
    }
    for (var o in native_data) {
      var temp = native_data[o]['total']
      if (temp > m) {
        m = temp
      }
      break
    }
    var max = (parseInt(m / 100, 10) + 1) * 100
    function getNativeData () {
      const result = []
      for (var index in native_data) {
        result.push(_.assign({'name': index, 'value': native_data[index]['total']}))
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
        result.push(_.assign({'name': index, 'value': abroad_data[index]['total'], 'itemStyle': itemStyle}))
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
      m = abroad_data[n]
      if (k === 1) {
        break
      }
      k++
    }
    for (var o in native_data) {
      var temp = native_data[o]
      if (temp > m) {
        m = temp
      }
      break
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
      if (data['data'][i]['title'] === '') {
        data['data'][i]['title'] = '来自Insta360 Nano用户分享的全景时刻'
      }
    }
    return {
      total: data['total'],
      current_page: data['current_page'],
      page_total: page_total,
      column: column,
      series: data['data']
    }
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
        y[j]['data'].push(data[index][y[j]['name']])
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
        y[j]['data'].push(data[index][y[j]['name']])
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
        y[j]['data'].push(data[index][y[j]['name']])
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
        y: 30
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
            res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value
            sum += parseInt(params[i].value, 10)
          }
          res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '全部' + ' : ' + sum
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
        y: 30
      },
      legend: {
        x: 'center',
        data: area,
        itemWidth: 5,
        top: -3,
        itemGap: 3,
        itemHeight: 10
        // selected: { 'PC端流量': false, '手机端流量': false }
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  // buylink_store_trends: data => {

  //   const x = []
  //   const y_pc = []
  //   const y_mobile = []
  //   const y_all = []
  //   for (var index in data) {
  //     x.push(index)
  //     y_pc.push(data[index]['pc'])
  //     y_mobile.push(data[index]['mobile'])
  //     y_all.push(data[index]['all'])
  //   }

  //   return {
  //     total: [{
  //       name: '全部流量',
  //       value: _.sum(y_all)
  //     },
  //     {
  //       name: 'PC端流量',
  //       value: _.sum(y_pc)
  //     },
  //     {
  //       name: '手机端流量',
  //       value: _.sum(y_mobile)
  //     }
  //     ],
  //     title: {
  //       text: '店铺流量走势',
  //       x: 'left'
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {            // 坐标轴指示器，坐标轴触发有效
  //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
  //       },
  //       formatter: function (params, ticket, callback) {
  //         var sum = 0
  //         var res = params[0].name
  //         for (var i = 0, l = params.length; i < l; i++) {
  //           res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>' + params[i].seriesName + ' : ' + params[i].value
  //           sum += parseInt(params[i].value, 10)
  //         }
  //         res += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px"></span>' + '全部流量' + ' : ' + sum
  //         return res
  //       }
  //     },
  //     toolbox: {
  //       show: true,
  //       feature: {
  //         // dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
  //         dataView: { show: true, readOnly: false },
  //         magicType: { show: true, type: ['stack', 'tiled'], title: {stack: '切换为面积图', tiled: '切换为折线图'}},
  //         // restore: { show: true },
  //         saveAsImage: { show: true }
  //       }
  //     },
  //     legend: {
  //       x: 'center',
  //       data: ['PC端流量', '手机端流量']
  //       // selected: { 'PC端流量': false, '手机端流量': false }
  //     },
  //     xAxis: {
  //       data: x // 横向则将data放到yAxis
  //     },
  //     yAxis: {},
  //     series: [{
  //       name: 'PC端流量',
  //       type: 'line',
  //       data: y_pc,
  //       stack: 'all',
  //       itemStyle: {normal: {areaStyle: {type: 'default'}}}
  //     },
  //     {
  //       name: '手机端流量',
  //       type: 'line',
  //       data: y_mobile,
  //       stack: 'all',
  //       itemStyle: {normal: {areaStyle: {type: 'default'}}}
  //     }]
  //   }
  // }
  use_condition: data => {
    const x = []
    const y_active = []
    const y_new = []
    const y_duration = []
    for (var index in data) {
      x.push(data[index]['date'])
      y_active.push(data[index]['active_user'])
      y_new.push(data[index]['new_user'])
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
        name: '活跃用户',
        value: _.sum(y_active)
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
      m = abroad_data[n]['total']
      if (k === 1) {
        break
      }
      k++
    }
    for (var o in native_data) {
      var temp = native_data[o]['total']
      if (temp > m) {
        m = temp
      }
      break
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
        y[j]['data'].push(data[index][y[j]['name']])
      }
      count++
    }

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    const select = {}
    for (var a in area) {
      var name = area[a]
      select[name] = false
    }
    select['insta360'] = true

    return {
      top: {
        native: [],
        abroad: []
      },
      total: [],
      title: {
        text: '百度指数',
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
        data: area,
        selected: select
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: _series
    }
  },
  user_area: data => {
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

    const _series = []
    for (var item in y) {
      _series.push(_.assign({'name': y[item]['name'], 'type': 'line', 'stack': 'all', 'data': y[item]['data'], 'itemStyle': {normal: {areaStyle: {type: 'default'}}}}))
    }

    return {
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
    for (var index in data) {
      x.push(data[index]['date'])
      y_total.push(data[index]['total_error'])
    }
    return {
      top: {
        native: [],
        abroad: []
      },
      total: [{
        name: '错误数',
        value: _.sum(y_total)
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
        data: ['错误数']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [
        {
          name: '错误数',
          type: 'line',
          data: y_total,
          itemStyle: {normal: {areaStyle: {type: 'default'}}}
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
      y_reject.push(data[index]['reject'])
      y_sales.push(data[index]['sales_offline'] + data[index]['sales_online'])
      y_inventory.push(data[index]['inventory_lower'] + data[index]['inventory_first'])
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
        value: '线上：' + _.sum(y_sales_online),
        comment: '线下：' + _.sum(y_sales_offline)
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
