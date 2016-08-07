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
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['全部激活数量', '国内激活数量', '国外激活数量'],
        selected: { '国内激活数量': false, '国外激活数量': false }
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: '全部激活数量',
        type: 'line',
        data: y_all,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '国内激活数量',
        type: 'line',
        data: y_native,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '国外激活数量',
        type: 'line',
        data: y_abroad,
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
        text: '分享数量走势',
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
        data: y_image,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '视频数量',
        type: 'line',
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
      y_video.push(parseInt(data[index]['视频'], 10))
      y_image.push(parseInt(data[index]['图片'], 10))
    }
    const total_imgage = _.sum(y_image)
    const total_video = _.sum(y_video)

    return {
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
        text: '浏览次数走势',
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '视频浏览量',
        type: 'line',
        data: y_video,
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
    var count = 0
    for (var i in _native_data) {
      _native_top.push(_native_data[i])
      count++
      if (count === 10) {
        break
      }
    }
    count = 0
    for (var j in _abroad_data) {
      _abroad_top.push(_.assign({'name': dict_json[_abroad_data[j]['name']], 'value': _abroad_data[j]['value']}))
      count++
      if (count === 10) {
        break
      }
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
              percent = _.round((parseInt(value, 10) / total_native * 100), 1)
            }else {
              percent = _.round((parseInt(value, 10) / total_all * 100), 1)
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
          restore: { show: true },
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
    var count = 0
    for (var i in _native_data) {
      _native_top.push(_.assign({'name': _native_data[i]['name'], 'value': _native_data[i]['value'], 'percent': _.round((parseInt(_native_data[i]['value'], 10) / total_native * 100), 1)}))
      count++
      if (count === 10) {
        break
      }
    }
    count = 0
    for (var j in _abroad_data) {
      _abroad_top.push(_.assign({'name': dict_json[_abroad_data[j]['name']], 'value': _abroad_data[j]['value'], 'percent': _.round((parseInt(_abroad_data[j]['value'], 10) / total_all * 100), 1)}))
      count++
      if (count === 10) {
        break
      }
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
        text: '分享地区分布',
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
              percent = _.round((parseInt(value, 10) / total_native * 100), 1)
            }else {
              percent = _.round((parseInt(value, 10) / total_all * 100), 1)
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
          restore: { show: true },
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
    var count = 0
    for (var i in _native_data) {
      _native_top.push(_.assign({'name': _native_data[i]['name'], 'value': _native_data[i]['value'], 'percent': _.round((parseInt(_native_data[i]['value'], 10) / total_native * 100), 1)}))
      count++
      if (count === 10) {
        break
      }
    }
    count = 0
    for (var j in _abroad_data) {
      _abroad_top.push(_.assign({'name': dict_json[_abroad_data[j]['name']], 'value': _abroad_data[j]['value'], 'percent': _.round((parseInt(_abroad_data[j]['value'], 10) / total_all * 100), 1)}))
      count++
      if (count === 10) {
        break
      }
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
        text: '浏览地区分布',
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
              percent = _.round((parseInt(value, 10) / total_native * 100), 1)
            }else {
              percent = _.round((parseInt(value, 10) / total_all * 100), 1)
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
          restore: { show: true },
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
      total: 1,
      current_page: 1,
      page_total: 1,
      // column: column,
      series: data_total
    }
  },
  knowmore: data => {
    const tip1 = ['上线~2016.7.25 18:00', '2016.7.27 17:47 ~ 2016.7.29 12:17', '2016.7.29 12:17 至今']
    const tip2 = ['第一次上线', '从默认陀螺仪改成默认拖拽', '回滚为默认陀螺仪']
    const column1 = ['Knowmore 点击比例', '数据', '分享内容页版本']
    const column2 = ['日期', '点击knowmore新增用户/总点击数']
    var count = 0

    const data1 = []
    for (var item1 in data['know_more']) {
      data1.push(_.assign({'name': tip1[count], 'value': data['know_more'][item1], 'comment': tip2[count]}))
      count++
    }
    const data_total = []
    data_total.push(data1)
    data_total.push(data['data']['info'])
    return {
      total: data['data']['total'],
      current_page: data['data']['current_page'],
      page_total: data['data']['page_total'],
      column: [column1, column2],
      series: data_total
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
    var _sum = 0
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
        _sum += data[index][y[j]['name']]
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
        text: '激活情况区域对比面积图',
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
    var _sum = 0
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
        _sum += data[index][y[j]['name']]
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
        text: '分享情况区域对比面积图',
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
    var _sum = 0
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
        _sum += data[index][y[j]['name']]
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
        text: '浏览情况区域对比面积图',
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
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
    const y_pc = []
    const y_mobile = []
    const y_all = []
    for (var index in data) {
      x.push(index)
      y_pc.push(data[index]['pc'])
      y_mobile.push(data[index]['mobile'])
      y_all.push(data[index]['all'])
    }

    return {
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
      }
      ],
      title: {
        text: '店铺流量走势',
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
          dataZoom: { show: true, title: {dataZoom: '区域缩放', dataZoomReset: '区域缩放后退'}},
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: {stack: '切换为面积图'}},
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['全部流量', 'PC端流量', '手机端流量'],
        selected: { 'PC端流量': false, '手机端流量': false }
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: '全部流量',
        type: 'line',
        data: y_all,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: 'PC端流量',
        type: 'line',
        data: y_pc,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      },
      {
        name: '手机端流量',
        type: 'line',
        data: y_mobile,
        itemStyle: {normal: {areaStyle: {type: 'default'}}}
      }]
    }
  }
}
