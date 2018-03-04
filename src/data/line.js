export default {
  backgroundColor: '#fff',
  animation: false,
  legend: {
    left: 10,
    data:[],
  },
  grid:{
    show:true,
//            backgroundColor:'red',
//            borderColor:'#fff',
//            borderWidth:2,
//            shadowColor: 'rgba(0, 0, 0, 0.5)',
//            shadowBlur: 10
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#000'
    },

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
  axisPointer: {
    // link: {xAxisIndex: 'all'},
    label: {
      backgroundColor: '#777'
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      },
      brush: {
        type: ['lineX', 'clear']
      },
      magicType: {show: true, type: ['line', 'bar']},
      saveAsImage: {show: true}
    }
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1
    }
  },

  xAxis: {
    type: 'category',
    data: [],
    scale: true,
    boundaryGap: false,
//            axisLine: {onZero: false},
//            splitLine: {show: false},
//            splitNumber: 20,
//            min: 'dataMin',
//            max: 'dataMax',
  },
  yAxis: {
    scale: true,
//            splitArea: {
//              show: true
//            }
  },
  dataZoom: [
    {
      show:false,
      type: 'inside',
      // xAxisIndex: [0, 1],
      start: 50,
      end: 100
    },
    {
      show: false,

      // xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: 50,
      end: 100
    }
    // {
    //   start:0,//默认为0
    //   end: 100-1500/31,//默认为100
    //   type: 'slider',
    //   show: true,
    //   xAxisIndex: [0],
    //   handleSize: 0,//滑动条的 左右2个滑动条的大小
    //   height: 20,//组件高度
    //   left: 50, //左边的距离
    //   right: 40,//右边的距离
    //   bottom: 26,//右边的距离
    //   handleColor: '#ddd',//h滑动图标的颜色
    //   handleStyle: {
    //     borderColor: "#cacaca",
    //     borderWidth: "1",
    //     shadowBlur: 2,
    //     background: "#ddd",
    //     shadowColor: "#ddd",
    //   },
    //   fillerColor:'#1eb5e5',
    //   // fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
    //   //   //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
    //   //   //给第一个设置0，第四个设置1，就是垂直渐变
    //   //   offset: 0,
    //   //   color: '#1eb5e5'
    //   // }, {
    //   //   offset: 1,
    //   //   color: '#5ccbb1'
    //   // }]),
    //   backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
    //   showDataShadow: false,//是否显示数据阴影 默认auto
    //   showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
    //   handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
    //   filterMode: 'filter',
    // },
    // //下面这个属性是里面拖到
    // {
    //   type: 'inside',
    //   show: true,
    //   xAxisIndex: [0],
    //   start: 0,//默认为1
    //   end: 100-1500/31,//默认为100
    // },
  ],
  series:[],
}
