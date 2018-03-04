
export default{
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    right: 'right',
    data: ['M1','M2','M3','M4','M5']
  },
  series : [
    {
      name: '数据',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'M1'},
        {value:310, name:'M2'},
        {value:234, name:'M3'},
        {value:135, name:'M4'},
        {value:1548, name:'M5'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

