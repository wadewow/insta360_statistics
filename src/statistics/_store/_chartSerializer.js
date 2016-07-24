export default {
  nano_active: data => {

    const x = []
    const y = []
    for (var index in data) {
      x.push(index)
      y.push(data[index])
    }

    return {
      color: ['#A5D6A7'],
      title: {
        text: 'Nano激活数量',
        textAlign: 'left'
      },
      tooltip: {},
      legend: {
        data: ['激活数量']
      },
      xAxis: {
        data: x // 横向则将data放到yAxis
      },
      yAxis: {},
      series: [{
        name: '激活数量',
        type: 'bar',
        data: y,
        markLine: {
          lineStyle: {
            normal: {
              type: 'dashed'
            }
          },
          data: [
            [{ type: 'min' }, { type: 'max' }]
          ]
        }
      }]
    }
  },
  nano_active_map: data => {
    const randomData = () => {
      return Math.round(Math.random() * 1000)
    }

    var option = {
      title: {
        text: '区域查询',
        subtext: '以下为echarts演示数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'left',
        data: ['nano']
      },
      visualMap: {
        min: 0,
        max: 10000,
        color: ['#000', '#fff'],
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
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'nano',
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
          data: [
            { name: '北京', value: randomData() },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '河南', value: randomData() },
            { name: '云南', value: randomData() },
            { name: '辽宁', value: randomData() },
            { name: '黑龙江', value: randomData() },
            { name: '湖南', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '山东', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '江苏', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '湖北', value: randomData() },
            { name: '广西', value: randomData() },
            { name: '甘肃', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '陕西', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '贵州', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '青海', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '海南', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
          ]
        }
      ]
    }

    return option
  }
}
