<template>
  <el-table :data="tableData"
            stripe
            :style="{fontSize:tableOption.fontSize+'px'}">
    <el-table-column v-for="(column, index) in tableOption.columns"
                     :width="column.width"
                     :sortable="column.sort"
                     :prop="column.dataIndex"
                     :key="column.dataIndex"
                     :label="column.text">
      <template  scope="scope">
        <span class="cursor">
          <span v-if="index==0" @click="" >
            <i v-if="scope.row.name" :class="tableOption.legendIcon" :style="{color:scope.row.color}"></i>
          </span>
            {{scope.row[column.dataIndex]}}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
    export default{
        props:{
          tableOption:Object,
          tableData:{
              type:Array
          }
        },
        data(){
            return {}
        },
      computed: {

      },
      watch:{
        'tableData': {
          handler(newValue, oldVlaue) {
            let _this = this;
//          debugger;

          },
          deep: true
        }
      },
      methods:{
        init () {

        },
      },
      updated(){
//        debugger;
      },
      mounted () {
        if (this.tableOption) {
          this.init()
        }
      },
    }
</script>
