export default {
  //类型要后台返回还是前端设置
  type:'lineGrade',
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
    'freshTime':{
      span:3,
      name:'刷新时间',
      placeholder:'请输入刷新时间',
      key:'freshTime',
      type:'select',
      apiCross:false,
      options:['停止刷新',0.5,1,2,3,4],
      unit:'S',
      value:''
    },
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
    'showLegend':{
      span:3,
      name:'显示图例',
      key:'showLegend',
      apiCross:false,
      type:'datalistWithCheckbox',
      options:["M1","M2","M3"],
      value:["M1","M2"],
    },
    'dateTimePickerWithQuick':{
      span:8,
      name:'时间快捷选择',
      key:'time',
      apiCross:true,
      type:'dateTimePickerWithQuick',
      realType: 'dateTimePicker',

      value:[new Date().getTime() - 3600 * 1000 * 24 * 7,new Date()],
      showValue: '最近一周',
      selectedValue:'lastedWeek',
      selectedColor:'red',

      pickOptions: [[{
        label: '最近1周',
        value: 0,
        datePickerFun: 'lastedWeek',
        num: 1,
      }, {
        label: '最近2个月',
        datePickerFun: 'lastedMonth',
        value: 1,
        num: 2
      }, {
        label: '今天',
        datePickerFun: 'lastedSingleDay',
        num: 0,
        value: 2
      }, {
        label: '最近1天',
        datePickerFun: 'lastedDay',
        num: 1,
        value: 1
      }], [{
        label: '本月',
        datePickerFun: 'thisMonth',
        num: 1,
        value: 4
      }, {
        label: '本周',
        datePickerFun: 'thisWeek',
        num: 1,
        value: 5
      }], [{
        label: '最近5分钟',
        datePickerFun: 'lastedMinute',
        num: 5,
        value: 7
      }, {
        label: '最近30秒',
        value: 8,
        datePickerFun: 'lastedSecond',
        num: 30,
      }, {
        label: '最近3个小时',
        datePickerFun: 'lastedHour',
        value: 9,
        num: 3,
      }]]
    },
  },
  tableOptions: {
    width: '100%',
    align:'bottom',
    // height: '300px',
    // float: 'left',//left right 100%
    fontSize: '12px',
    legendIcon: 'fa fa-circle-o',
    columns: [{
      text: '名称1',
      dataIndex: 'name',
    }, {
      text: 'min',
      dataIndex: 'min',
      sort: true
    }, {
      text: 'max',
      dataIndex: 'max',
      sort: true
    }, {
      text: 'type',
      dataIndex: 'type'
    }],
  },
  containerOption:{

  },
  echartOptions:{
    // float: 'right',
    height:'300px',
    width:'100%',
    border:'1px solid black',
    showMaxAndMin:false,
    showAverage:false,
    areaLine:false,
  }
}
