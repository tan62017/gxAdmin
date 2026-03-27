export class EchartConfig {
  tooltip = {
    backgroundColor: 'rgba(0,0,0,0.5)',
    trigger: 'axis',
    confine: true,
    axisPointer: {
      type: 'none'
    },
    textStyle: {
      color: '#fff',
      fontSize: 16
    }
  }

  legend = {
    itemGap: 30,
    top: 20,
    itemWidth: 10,
    itemHeight: 8,
    textStyle: {
      color: '#fff',
      fontSize: 14
    }
  }

  xAxis = {
    type: 'category',
    axisPointer: {
      show: true,
      type: 'line',
      lineStyle: {
        type: 'solid',
        width: 32,
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    splitLine: {
      show: false
    },
    axisTick: {
      // 不显示坐标轴刻度线
      show: false
    },
    axisLabel: {
      interval: 0,
      color: '#fff',
      formatter: '{style|{value}}',
      rich: {
        style: {
          fontSize: 12
        }
      }
    },
    triggerEvent: true
  }

  yAxis = {
    type: 'value',
    splitLine: {
      show: false
    },
    nameTextStyle: {
      color: '#fff',
      fontSize: '12px'
    },
    axisLabel: {
      color: '#fff',
      rich: {
        style: {
          fontSize: '12px'
        }
      }
    },
    axisLine: {
      show: true
    }
  }

  seriesBar = {
    barWidth: 18,
    type: 'bar',
    barGap: '110%'
  }

  echartLines(data) {
    if (data.length <= 1) return false
    if (data.some(item => item === null || item === undefined)) return false
    return {
      type: 'lines',
      polyline: false,
      smooth: false,
      animation: true, // 控制动画示否开启
      animationDuration: 0,
      animationEasing: 'linear', // 缓动动画
      animationThreshold: 8, // 动画元素的阈值
      coordinateSystem: 'cartesian2d',
      yAxisIndex: 1,
      zlevel: 1,
      effect: {
        show: true,
        smooth: true,
        period: 2,
        // symbolSize: 8
        symbolSize: 3
      },
      lineStyle: {
        color: '#fff',
        width: 3,
        opacity: 0,
        curveness: 0,
        cap: 'round'
      },
      data: this.filterLines(data)
    }
  }

  filterLines(data) {
    return data.map((value, index) => [
      {
        coord: [index, value]
      },
      {
        coord: [index + 1, data[index + 1]]
      }
    ])
  }
}
