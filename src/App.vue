<template>
  <div id="app">
    <div id="nav">
      <Calendar :head_bgcolor="value1" :head_color="value2" :head_size="value3" @getDate="getDate" ></Calendar>
    <div>df</div>
    <!-- <router-view/> -->
  </div>
</template>


<script>
// 引入子组件
import Calendar from 'components/calendar'

export default{
  name:"App",
  components:{
    Calendar
  },
  data(){
    return{
      value1:'',
      value2:'',
      value3:'',
    } 
  },
  methods:{
    getDate(data){  
      console.log(data);
    }
  },
  mounted(){
    this.getDate()
  }
}
</script>

<style>
@import "assets/css/common.css";
</style>
