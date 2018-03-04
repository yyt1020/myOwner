export default {
  //类型要后台返回还是前端设置
  type:'pie',
  areaType:true,
  api:{
    method:'get',
    url:'http://localhost:10201/liutao/v1/vueData',
    params:{}
  },
  headerOptions: {
    headerAttr: {
      height: '50px',
      width: '100%',
      background: '-webkit-linear-gradient(top, #ffffff, #f4f6fa)',
      'text-align': 'center',
      'line-height':'50px',
      'border':'1px solid black'
    },
    titleAttr: {
      fontSize: '16px',
      color: 'black',
      text: '统计图'
    }
  },
  filterOptions:{
    'dataCode':{
      span:3,
      name:'数据源切换',
      placeholder:'数据切换',
      key:'dataCode',
      apiCross:true,
      type:'select',
      options:["data1","data2"],
      value:'data1'
    },
  },
  containerOption:{

  },
  echartOptions:{
    // float: 'right',
    height:'300px',
    width:'100%',
    border:'1px solid black',
    showMaxAndMin:true,
    showAverage:true,
    areaLine:false,
  }
}
