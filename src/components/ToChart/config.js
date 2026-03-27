import { cloneDeep, merge } from 'lodash-es'
import { DataZoomComponent } from 'echarts/components'
import { use } from 'echarts'

use([DataZoomComponent])

export class EchartsConfig {
  static BAR_COLORS = ['#1956F9']
  static LINE_COLORS = ['#FF9B52']
}

export class EchartConfig {
  /**
   *
   * @param {Array<Number>} timeSlice
   * @param {Number} currentYear
   */
  static createDataZoomSlice(timeSlice, currentYear) {
    const start = timeSlice.findIndex(item => item.split('-')[0] === currentYear)
    const end = timeSlice.findLastIndex(item => item.split('-')[0] === currentYear)
    return [start, end]
  }

  static dataZoom = {
    id: 'dataZoomX',
    type: 'slider',
    startValue: 0,
    endValue: 0,
    xAxisIndex: [0],
    filterMode: 'filter',
    zoomLock: false,
    realtime: false,
    showDataShadow: false,
    showDetail: false,
    moveHandleSize: 20,
    // 鼠标控制滚动
    zoomOnMouseWheel: true,

    fillerColor: 'transparent',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    handleSize: 10,
    bottom: -10,
    selectedDataBackground: {
      lineStyle: {
        color: '#fff'
      },
      areaStyle: {
        color: '#fff',
        opacity: 0
      }
    }
    // brushSelect: false,
  }

  static AREA_LIGH_LIGHT_COLOR = '#3e464c'
  PADDING = 50

  Y_AXIS_OPTION = {
    scale: true,
    type: 'value',
    name: '',
    nameTextStyle: { color: '#363737', fontSize: '14px' },
    splitLine: { show: false },
    axisLabel: { color: '#363737', formatter: '{style|{value}}', rich: { style: { fontSize: '14px' } } },
    axisLine: { show: true }
  }

  X_AXIS_OPTION = {
    type: 'category',
    axisPointer: { type: 'shadow' },
    splitLine: { show: false },
    data: [],
    axisLabel: { color: '#363737', formatter: '{style|{value}}', rich: { style: { fontSize: 14 } } }
  }

  BAR_OPTION = {
    name: '',
    type: 'bar',
    emphasis: { label: { fontSize: 20 } },
    label: { fontSize: 14, show: false, color: '#363737', position: 'top' },
    barWidth: 18,
    color: '#363737',
    data: [],
    labelLayout: {
      hideOverlap: true
    },
    itemStyle: {
      barWidth: 18,
      borderRadius: [9, 9, 0, 0]
    }
  }

  LINE_OPTION = {
    name: '',
    type: 'line',
    barWidth: 18,
    itemStyle: { color: '#363737' },
    lineStyle: { width: 2 },
    symbolSize: 5,
    smooth: true,
    label: {
      show: true,
      color: '#363737',
      fontSize: 16
    },
    data: []
  }

  PIE_OPTION = {
    type: 'pie',
    radius: ['70%', '100%'],
    label: {
      show: true,
      position: 'outside'
      // alignTo: 'edge'
    }
  }

  baseOption = {
    tooltip: {
      backgroundColor: 'rgba(1,35,35,0.85)',
      trigger: 'axis',
      textStyle: { color: '#fff', fontSize: 16 },
      axisPointer: { type: 'none', crossStyle: { color: '#000' } },
      confine: true,
      formatter: params => {
        let htmlStr = ''
        const valMap = {}
        params = Array.isArray(params) ? params : [params]
        for (let i = 0; i < params.length; i++) {
          const param = params[i]
          const xName = param.name // x轴的名称
          const seriesName = param.seriesName // 图例名称
          const value = param.value // y轴值
          const color = param.color // 图例颜色
          if (i === 0 && param.seriesType !== 'pie') {
            htmlStr += `${xName}<br/>` // x轴的名称
          }
          htmlStr += '<div>'
          if (param.seriesName !== '背景') {
            // 为了保证和原来的效果一样，这里自己实现了一个点的效果
            htmlStr += `<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${color};"></span>`
            // 圆点后面显示的文本
            if (value === '-' && param.componentSubType === 'line') {
              htmlStr += `${seriesName}：${params[i].value || '-'}`
            } else {
              // const unit = seriesName[seriesName.length - 1] == '值' ? '亿元' : '%'
              const u = this.units[seriesName] || ''

              htmlStr += `${param.seriesType !== 'pie' ? seriesName : param.name}：${value || '-'} ${u}`
            }
            htmlStr += '</div>'
            valMap[seriesName] = value
          }
        }
        return htmlStr
      }
    },
    grid: { left: this.PADDING, top: this.PADDING, right: this.PADDING, bottom: this.PADDING },
    legend: {
      itemGap: 10,
      textStyle: { color: '#333333', fontSize: 14 },
      top: 0,
      right: 60,
      itemWidth: 10,
      itemHeight: 10
    },
    xAxis: [],
    yAxis: [],
    series: []
  }

  units = {}

  option = {}

  constructor(userOption = {}) {
    const baseOption = cloneDeep(this.baseOption)
    let { xAxis, yAxis, series } = userOption
    if (xAxis) {
      xAxis = xAxis.map(item => merge({}, this.X_AXIS_OPTION, item))
    }
    if (yAxis) {
      yAxis = yAxis.map(item => merge({}, this.Y_AXIS_OPTION, item))
    }
    if (series) {
      this.updateUnits(series)
      let lineIndex = 0
      let barIndex = 0

      series = series.map(item => {
        item.itemStyle = {
          ...item.itemStyle
          // color: item.type === 'pie' ? undefined : item.itemStyle?.color || this.colors[index]
        }
        if (item.type === 'bar') {
          item.itemStyle.color = EchartsConfig.BAR_COLORS[barIndex]
          barIndex++
          return merge(cloneDeep(this.BAR_OPTION), item)
        }
        if (item.type === 'line') {
          item.itemStyle.color = EchartsConfig.LINE_COLORS[lineIndex]
          lineIndex++
          return merge(cloneDeep(this.LINE_OPTION), item)
        }
        if (item.type === 'pie') {
          return merge(cloneDeep(this.PIE_OPTION), item)
        }
        return item
      })
    }
    baseOption.xAxis = xAxis
    baseOption.yAxis = yAxis
    baseOption.series = series
    const isPie = series.some(item => item.type === 'pie')
    if (isPie) {
      baseOption.tooltip.trigger = 'item'
    }
    this.option = merge(baseOption, userOption)
  }

  updateUnits(series) {
    for (const sery of series) {
      if (sery.name) {
        this.units[sery.name] = sery.unit || ''
      }
    }
  }

  static createEchartsOption(option) {
    return new EchartConfig(option).option
  }
}
