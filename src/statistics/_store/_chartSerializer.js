import _ from 'lodash'

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
        value: _.sum(y_all)
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
        x: 'center'
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
          // dataZoom: {
          //   show: true,
          //   title: {
          //     dataZoom: '区域缩放',
          //     dataZoomReset: '区域缩放后退'
          //   }
          // },
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
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'left',
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
        text: '分享次数走势',
        x: 'center'
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
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        x: 'left',
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
  location_active_detail: data => {
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
        text: '地区月激活数量',
        x: 'center'
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
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        x: 'left',
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
      max = (parseInt(m / 50, 10) + 1) * 50
    }
    function getNativeData () {
      const result = []
      for (var index in native_data['data']) {
        result.push(_.assign({'name': native_data['data'][index]['location'], 'value': native_data['data'][index]['total']}))
      }
      return result
    }
    function getAbroadData () {
      const result = []
      for (var index in abroad_data['data']) {
        result.push(_.assign({'name': abroad_data['data'][index]['location'], 'value': abroad_data['data'][index]['total']}))
      }
      return result
    }

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
      _abroad_top.push(_abroad_data[j])
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
          areaColor: '#eee'
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
          areaColor: '#eee'
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
        value: data['all']['total']
      },
        {
          name: '国内激活量',
          value: data['native']['total']
        },
        {
          name: '国外激活量',
          value: data['abroad']['total']
        }
      ],
      top: {
        native: _native_top,
        abroad: _abroad_top
      },
      title: {
        text: '区域激活情况',
        // subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'left',
        selectedMode: 'single',
        data: ['全国', '世界']
      },
      visualMap: {
        min: 0,
        max: max,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        right: 'right',
        bottom: 'bottom',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
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
  }
}
