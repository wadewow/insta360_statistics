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
        data: x
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
  }
}
