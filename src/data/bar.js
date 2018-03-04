export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  color: [
    "#c23531",
    "#2f4554",
    "#61a0a8",
    "#d48265",
    "#91c7ae",
    "#749f83",
    "#ca8622",
    "#bda29a",
    "#6e7074",
    "#546570",
    "#c4ccd3"
  ],
  brush: {
    toolbox: [ 'lineX', 'keep', 'clear'],
    xAxisIndex: 0
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      dataView: {}
    }
  },
  legend: {
    data:[]
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      data :  [],
      axisPointer: {
        type: 'shadow'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
    }
  ],
  yAxis : [
    {
      type : 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    }
  ],
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series : []

}
