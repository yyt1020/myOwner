<template>
  <div>
    <v-line v-if="data.type=='line'" :data="data"></v-line>
    <v-bar v-else-if="data.type=='bar'" :data="data"></v-bar>
    <v-pie v-else-if="data.type=='pie'" :data="data"></v-pie>
    <v-lineGrade v-else-if="data.type=='lineGrade'" :data="data"></v-lineGrade>
  </div>
</template>
<script>
  import vLine from '../line/line.vue'
  import vBar from '../bar/bar.vue'
  import vPie from '../pie/pie.vue'
  import vLineGrade from '../lineGrade/lineGrade.vue'
    export default{
      data(){
        return {}
      },
      components: {
        vLine,
        vBar,
        vPie,
        vLineGrade
      },
      props: {
        data: {
          required: true,
          type: Object
        },
      },
    }
</script>
