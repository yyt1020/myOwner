<template>
  <div class="echartsContainer">
    <v-header :headerOptions="data.headerOptions"></v-header>
    <div class="top">

      <el-row :gutter="20">
        <el-col :span="item.span" :key="index" v-for="(item,key,index) in data.filterOptions">
          <el-select class="floatLeft" v-if="item.type=='select'" style="float:left"
                     :placeholder="item.placeholder" v-model="item.value">
            <el-option v-for="opts in item.options" :key="opts" :value="opts">{{opts}}</el-option>
          </el-select>
          <div class="floatLeft filterDiv positionRelative" v-else-if="item.type=='datalistWithCheckbox'">
            <el-checkbox v-if="showCheckBoxDataList" style="line-height: 40px;" :indeterminate="isIndeterminate"
                         class="displayInBlock"
                         v-model="checkAll" @change="handleCheckAllChange(item,index)">全选
          </el-checkbox>
            <span @click="showCheckBoxDataList=!showCheckBoxDataList"
                  style="line-height:35px;margin: 20px 0;font-size: 14px;font-weight: bolder">{{item.name}}&nbsp;<i
              class="fa fa-sort-desc"></i></span>
            <el-checkbox-group v-if="showCheckBoxDataList" class="displayBlock" v-model="item.value"
                               @change="handleCheckedCitiesChange(item)">
              <el-checkbox v-if="showCheckBoxDataList" v-for="opts in item.options" class="displayBlock" :label="opts"
                           :key="opts">{{opts}}
            </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="floatLeft positionRelative quickTimeSty"  v-else-if="item.type=='dateTimePickerWithQuick'">
            <div @click="showOpenDateTimeQuick=!showOpenDateTimeQuick;">
              <i class="fa fa-clock-o"></i>
              <span>{{item.showValue}}</span>
            </div>
            <el-collapse-transition>
              <div class="datetimePickerDiv" v-show="showOpenDateTimeQuick">
                <el-date-picker v-if="item.realType=='dateTimePicker'" format="yyyy/MM/dd HH:mm:ss"
                                v-model="item.value" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
                <el-time-picker v-else-if="item.realType=='timePicker'" format="HH:mm:ss" v-model="item.value"
                                is-range placeholder="选择时间范围"></el-time-picker>
                <el-date-picker v-else-if="item.realType=='datePicker'"
                                format="yyyy/MM/dd" v-model="item.value" type="daterange"
                                placeholder="选择日期范围"></el-date-picker>
                <div style="clear:both"></div>
                <ul class="timePickerUl" v-for="(quick,quickIndex) in item.pickOptions" :key="quickIndex">
                  <li v-for="(quickSingle,quickSingleIndex) in item.pickOptions[quickIndex]"
                      :key="quickSingleIndex"
                      @click="chooseTimeWithQuick(key,quickSingle)">
                    <a v-if="item.selectedValue==quickSingle.datePickerFun"
                       :style={color:item.selectedColor}>{{quickSingle.label}}</a>
                    <a v-else>{{quickSingle.label}}</a>
                  </li>
                </ul>
                <div style="clear:both"></div>
                <div style="text-align: center" @click="sureFilterDataTime(key)">确定</div>
              </div>
            </el-collapse-transition>
          </div>
        </el-col>
      </el-row>
      <div style="clear:both"></div>
    </div>
    <v-table :tableOption="data.tableOptions" :tableData="resChartOption.table" v-if="data.tableOptions && data.tableOptions.align=='top'"
             :style="data.tableOptions"></v-table>
    <div class="bottom"  v-on:mouseenter="showDataZoom"
         v-on:mouseleave="hideDataZoom"
         id="echart" ref="mychart" :style="data.echartOptions">
    </div>
    <v-table :tableOption="data.tableOptions" :tableData="resChartOption.table" v-if="data.tableOptions && data.tableOptions.align=='bottom'"
             :style="data.tableOptions"></v-table>
  </div>
</template>
<style lang="less">
  @import '../../assets/css/frame.less';
  @import '../../assets/css/font-awesome.css';
</style>
<script>
  // echarts相关
  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/toolbox');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/markLine');
  require('echarts/lib/component/markPoint');
  require('echarts/lib/component/dataZoom');
  require('echarts/lib/component/dataZoomInside');

  import vHeader from '../header/header.vue'
  import vTable from '../table/table.vue'
  import {axios, $utils} from 'helper';
  import lineData from '../../data/line'
//  import echarts from 'echarts'
  import * as moment from 'moment';
  export default {
    name: 'r-echarts-line',
    components: {
      vHeader,
      vTable
    },
    data () {
      return {
        showCheckBoxDataList: false,
        checkAll: true,
        isIndeterminate: true,
        pagePick: 'data1',
        // myChart实例
        myChart: {},
        resChartOption: {},
        allLegend: [],
        allTables:[],
        freshInterval: null,
        showOpenDateTimeQuick: false,
      }
    },
    props: {
      data: {
        required: true,
        type: Object
      },
    },
    mounted () {
      this.setEchart();
      this.chartChange();
    },
    updated () {
//      if (!this.myChart) {
//        this.setEchart();
//      }
//      this.chartChange();

    },
    destroyed(){
      let _this = this;
      clearInterval(_this.freshInterval)
    },
    watch: {
      'filterOptions.freshTime': {
        handler(newValue, oldVlaue) {
          let _this = this;
          if (newValue.value == '停止刷新') {
            clearInterval(_this.freshInterval)
          } else {

            this.freshInterval = setInterval(function () {
              _this.chartChange();
            }, newValue.value * 1000);
          }

        },
        deep: true
      },
      'filterOptions.dataCode': {
        handler(newValue, oldVlaue) {
          if (!this.myChart) {
            this.setEchart();
          }
          this.chartChange();

        },
        deep: true
      },
      'filterOptions.showLegend': {
        handler(oldVlaue, newValue) {
          let arr = [],arrTable=[],_this = this;
          for (let i in this.allLegend) {
            if (newValue.value.indexOf(i) > -1) {
              arr.push({
                name: i,
                type: _this.data.type,
                data: this.allLegend[i],
              });
            }

          }
          _.each(arr,function(a,index){
            a.areaStyle=_this.data.areaType?{normal:{color:_this.opt.color[index]}}:'';
            a.itemStyle=_this.data.areaType?{normal:{color:_this.opt.color[index]}}:'';

          });
          _this.resChartOption.series = _this.ifAverageOrMinMax(arr)
          _this.resChartOption.showLegend = newValue.value;

          _this.myChart.setOption(_this.opt, true);
          _.each(_this.allTables,function(r,index){
            if (newValue.value.indexOf(r.name) > -1) {
              arrTable.push(r)
            }
          });
          _.each(arrTable,function(table,t){
            table.color=_this.opt.color[t]
          })

          _this.resChartOption.table=arrTable


        },
        deep: true
      }
    },
    computed: {
      filterOptions(){
        return this.data.filterOptions || {};
      },
      origin () {
        return this.data.data;
      },
      opt() {
        let that = this;
        let obj=lineData;
        obj.legend.data=that.resChartOption.showLegend;
        if(obj.xAxis instanceof Array){
            _.each(obj.xAxis,function(o){
                o.data=that.resChartOption.xAxis
            })
        }else if(obj.xAxis instanceof Object){
          obj.xAxis.data=that.resChartOption.xAxis;
        }
        obj.series=that.resChartOption.series;
//        let obj = {
//
//          backgroundColor: '#fff',
//          animation: false,
//          legend: {
//            left: 10,
//            data: that.resChartOption.showLegend,
//          },
//          grid:{
//              show:true,
////            backgroundColor:'red',
////            borderColor:'#fff',
////            borderWidth:2,
////            shadowColor: 'rgba(0, 0, 0, 0.5)',
////            shadowBlur: 10
//          },
//          tooltip: {
//            trigger: 'axis',
//            axisPointer: {
//              type: 'cross'
//            },
//            backgroundColor: 'rgba(245, 245, 245, 0.8)',
//            borderWidth: 1,
//            borderColor: '#ccc',
//            padding: 10,
//            textStyle: {
//              color: '#000'
//            },
//
//          },
//          color: [
//            "#c23531",
//            "#2f4554",
//            "#61a0a8",
//            "#d48265",
//            "#91c7ae",
//            "#749f83",
//            "#ca8622",
//            "#bda29a",
//            "#6e7074",
//            "#546570",
//            "#c4ccd3"
//          ],
//          axisPointer: {
//            // link: {xAxisIndex: 'all'},
//            label: {
//              backgroundColor: '#777'
//            }
//          },
//          toolbox: {
//            feature: {
//              dataZoom: {
//                yAxisIndex: false
//              },
//              brush: {
//                type: ['lineX', 'clear']
//              },
//              saveAsImage: {show: true}
//            }
//          },
//          brush: {
//            xAxisIndex: 'all',
//            brushLink: 'all',
//            outOfBrush: {
//              colorAlpha: 0.1
//            }
//          },
//
//          xAxis: {
//            type: 'category',
//            data: that.resChartOption.xAxis,
//            scale: true,
//            boundaryGap: false,
////            axisLine: {onZero: false},
////            splitLine: {show: false},
////            splitNumber: 20,
////            min: 'dataMin',
////            max: 'dataMax',
//          },
//          yAxis: {
//            scale: true,
////            splitArea: {
////              show: true
////            }
//          },
//          dataZoom: [
//            {
//              type: 'inside',
//              // xAxisIndex: [0, 1],
//              start: 50,
//              end: 100
//            },
//            {
//              show: true,
//              // xAxisIndex: [0, 1],
//              type: 'slider',
//              top: '85%',
//              start: 50,
//              end: 100
//            }
//          ],
//          series:that.resChartOption.series,

//        }
        return obj;
      },
    },
    methods: {
      showDataZoom(){
          let _this=this;
        _this.opt.dataZoom[0].show=true;
        _this.opt.dataZoom[1].show=true;
        _this.myChart.setOption(_this.opt, true);
      },
      hideDataZoom(){
        let _this=this;
        _this.opt.dataZoom[0].show=false;
        _this.opt.dataZoom[1].show=false;
        _this.myChart.setOption(_this.opt, true);
      },
      chooseTimeWithQuick(key, child){

        let end = new Date();
        let start = new Date();
        let date = new Date();
        let _this = this;
        switch (child.datePickerFun) {
          case 'lastedWeek'://最近周数
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7 * child.num);
            _this.$set(_this.data.filterOptions[key], 'value', [start, end])
            break;
          case 'lastedMonth': //最近月数
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * child.num);
            _this.$set(_this.data.filterOptions[key], 'value', [start, end])
            break;
          case 'lastedSingleDay': //昨天、前天....
            date.setTime(date.getTime() - 3600 * 1000 * 24 * child.num);
            _this.$set(_this.data.filterOptions[key], 'value', [date, date])
            break;
          case 'lastedDay': //最近天数
            start.setTime(start.getTime() - 3600 * 1000 * 24 * child.num);
            _this.$set(_this.data.filterOptions[key], 'value', [start, end])
            break;
          case 'lastedMinute': //最近分钟数
            start.setTime(start.getTime() - 60 * 1000 * child.num);
            _this.$set(_this.data.filterOptions[key], 'value', [start, end])
            break;
          case 'lastedHour': //最近小时数
            start.setTime(start.getTime() - 3600 * 1000 * child.num);
            _this.$set(_this.data.filterOptions[key], 'value', [start, end])
            break;
          case 'lastedSecond': //最近秒数
            start.setTime(start.getTime() - child.num * 1000);
            _this.$set(_this.data.filterOptions[key], 'value', [start, end])
            break;
          case 'thisWeek': //本周
            _this.$set(_this.data.filterOptions[key], 'value', [new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000), end])
            break;
          case 'thisMonth': //本月
            _this.$set(_this.data.filterOptions[key], 'value', [new Date(date.getFullYear(), date.getMonth(), 1), end])
            break;
        }
      this.$set(_this.data.filterOptions[key],'showValue',child.label);
      this.$set(_this.data.filterOptions[key],'selectedValue',child.datePickerFun);
      this.showOpenDateTimeQuick=false;
      this.chartChange();
      },
      sureFilterDataTime(key){
        let _this=this,filter=_this.data.filterOptions[key],layout;
        switch (filter.realType) {
          case 'dateTimePicker':
            layout= 'YYYY/MM/DD HH:mm:ss';
            break;
          case 'datePicker':
            layout= 'YYYY/MM/DD';
            break;
          case 'timePicker':
            layout= 'HH:mm:ss';
            break;
        }
        filter.value[0]=moment(filter.value[0]).format(layout);
        filter.value[1]=moment(filter.value[1]).format(layout);
        filter.showValue=filter.value[0]+'至'+filter.value[1];
        filter.selectedValue='';
        _this.showOpenDateTimeQuick=false;
        this.chartChange();
      },
      _deepCopy(obj) {
        let str, newobj;
        str = newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
          return
        } else if (window.JSON) {
          str = JSON.stringify(obj) // 系列化对象
          newobj = JSON.parse(str) // 还原
        } else {
          for (let i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
          }
        }
        return newobj;
      },
      handleCheckAllChange(item, i) {
//        this.$set(this.data.filterOptions[i],'value', event.target.checked ?  item.options : [] )
//        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(item) {
//        let checkedCount = item.value.length;
//        this.checkAll = checkedCount === item.options.length;
//        this.isIndeterminate = checkedCount > 0 && checkedCount < item.options.length;
      },
      ifAverageOrMinMax(arr){
        if(this.data.echartOptions.showMaxAndMin){
          _.each(arr,function(i){
            i['markPoint']={
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            }
          })
        }
        if(this.data.echartOptions.showAverage){
          _.each(arr,function(i){
            i['markLine']={
              data : [
                {type : 'average', name: '平均值'}
              ]
            }
          })
        }
        return arr
      },
      setEchart () {
        let dom = this.$refs.mychart;
        this.myChart = echarts.init(dom);
      },
      chartChange (index) {
        let _this = this, obj = {};
        _.each(_this.data.filterOptions, function (i) {
          if (i.apiCross) {
            obj[i.key] = i.value
          }
        });
        _.extend(_this.data.api.params, obj);
        axios(_this.data.api).then(function (res) {
          let arr = [],arrTable=[];
          for (let j in res.data.yAxis) {
            if (res.data.showLegend.indexOf(j) > -1) {
              arr.push({
                name: j,
                type: _this.data.type,
                data: res.data.yAxis[j],
              })
            }
          }
          _.each(arr,function(a,index){
            a.areaStyle=_this.data.areaType?{normal:{color:_this.opt.color[index]}}:'';
            a.itemStyle=_this.data.areaType?{normal:{color:_this.opt.color[index]}}:'';

          });
          if(_this.data.filterOptions){
            _this.$set(_this.data.filterOptions['showLegend'], 'options', res.data.legend);
            _this.$set(_this.data.filterOptions['showLegend'], 'value', res.data.showLegend);
          }

          res.data.series = _this.ifAverageOrMinMax(arr);
          _this.allLegend = res.data.yAxis;
          _this.allTables = res.data.tableDatas;
          _this.resChartOption = res.data;
          _.each(res.data.tableDatas,function(r,index){
            if (res.data.showLegend.indexOf(r.name) > -1) {
              arrTable.push(r)
            }
          });

          _.each(arrTable,function(table,t){
            table.color=_this.opt.color[t]
          })
          _this.resChartOption.table=arrTable
          debugger;
          _this.myChart.setOption(_this.opt, true);
          _this.myChart.dispatchAction({
            type: 'dataZoom',
          });
          _this.myChart.on('dataZoom',params => {
            if(params.batch){
              let opt = _this.myChart.getOption();
              let dz = opt.dataZoom[0];
              let temp={};
              for(let i=0;i<opt.series.length;i++){
                let loc=opt.series[i].data.slice(dz.startValue,dz.endValue+1)
                temp[opt.series[i].name]={
                  min:Math.min.apply(null, loc),
                  max:Math.max.apply(null, loc),
                  color:opt.color[i]
                }
              }
              let arrTas=[]
              for(let j in temp){
                arrTas.push({
                  name:j,
                  min:temp[j].min,
                  max:temp[j].max,
                  type:1,
                  color:temp[j].color
                })
              }
              _this.$delete(_this.resChartOption, 'table');
              _this.$set(_this.resChartOption,'table',arrTas);
            }

          });
        })
      }
    },
  }
</script>
