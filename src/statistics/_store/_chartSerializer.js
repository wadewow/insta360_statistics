import _ from 'lodash'
import dict_json from './dict.json'
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
        text: '设备激活情况',
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
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['国内激活数量', '国外激活数量', '全部激活数量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: '全部激活数量',
        type: 'line',
        data: y_all
      },
      {
        name: '国内激活数量',
        type: 'line',
        data: y_native
      },
      {
        name: '国外激活数量',
        type: 'line',
        data: y_abroad
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
        text: '分享内容数统计',
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
          magicType: { show: true, type: ['line', 'bar'] },
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
        data: y_image
      },
      {
        name: '视频数量',
        type: 'line',
        data: y_video
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
        text: location + '地区月激活数量',
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
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        x: 'center',
        data: ['地区月激活数量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: '地区月激活数量',
        type: 'line',
        data: y
        // markLine: {
        //   lineStyle: {
        //     normal: {
        //       type: 'dashed'
        //     }
        //   },
        //   data: [
        //     [{ type: 'min' }, { type: 'max' }]
        //   ]
        // }
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
        text: '区域激活情况',
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
    const total_abroad = _.sumBy(_abroad_data, function (o) {
      return o.value
    }) - parseInt(abroad_data['China']['total'], 10)
    const total_native = _.sumBy(_native_data, function (o) {
      return o.value
    })

    const total_all = total_abroad + total_native
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

  share_list: data => {
    const page_total = data['page_total']
    const column = []
    for (var item in data['data'][0]) {
      column.push(item)
    }
    for (var i in data['data']) {
      data['data'][i]['share_location'] = data['data'][i]['share_location'].replace(/\,/g, ' ')
      if (data['data'][i]['title'] === '') {
        data['data'][i]['title'] = '-'
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
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['全部', 'PC端', '手机端']
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
        data: y_all
      },
      {
        name: 'PC端',
        type: 'bar',
        data: y_pc
      },
      {
        name: '手机端',
        type: 'bar',
        data: y_mobile
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
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'center',
        data: ['全部', 'PC端', '手机端']
      },
      xAxis: {
        data: x, // 横向则将data放到yAxis
        axisLabel: {
          interval: 1,
          rotate: 45,
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
        data: y_all
      },
      {
        name: 'PC端',
        type: 'bar',
        data: y_pc
      },
      {
        name: '手机端',
        type: 'bar',
        data: y_mobile
      }
      ]
    }
  }
}
