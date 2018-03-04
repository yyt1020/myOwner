<template>
  <div>
    <echarts-component :data="line" ref="lineGrade"></echarts-component>
    <echarts-component :data="bar" ref="lineGrade"></echarts-component>
    <echarts-component :data="lineGrade" ref="lineGrade"></echarts-component>
    <echarts-component :data="pie" ref="lineGrade"></echarts-component>
    <!--<echarts-component :data="line" ref="lineGrade"></echarts-component>-->
    <!--<echarts-component :dalineGradeArea" rlineGradeArea"></echarts-component>-->
  </div>
</template>

<script>
import echartsComponent from '../src/components/main/main.vue'
import line from './data/line'
import lineGrade from './data/lineGrade'
import bar from './data/bar'
import pie from './data/pie'

export default {
  components: {
    echartsComponent
  },
  data () {
    return {
      line,
      bar,
      lineGrade,
      pie
    }
  },
  mounted(){

  }

}
</script>
