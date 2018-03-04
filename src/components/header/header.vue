<template>
  <header>
    <div class="title" v-bind:style="headerOptions.headerAttr">
      <span v-bind:style="headerOptions.titleAttr">{{headerOptions.titleAttr.text}}</span>
    </div>
  </header>
</template>

<script>
    export default{
      props: {
        headerOptions:{
         type:Object
        }
      },
      data(){
        return {

        }
      }
    }
</script>
