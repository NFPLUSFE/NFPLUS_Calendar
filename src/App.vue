<template>
  <div id="app">
    <div id="nav">
      <Calendar :head_bgcolor="value1" :head_color="value2" :head_size="value3" :timeFormate="timeType" @getDate="getDate" ></Calendar>
    <!-- <router-view/> -->
    </div>
  </div>
</template>


<script>
// 引入子组件
import Calendar from './components/calendar'

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
      // 时间格式 如yyyy-mm-dd||yyyy/mm/dd ...
      timeType:'-',
    } 
  },
  methods:{
    getDate(data){  
      console.log(data);
    }
  },
  mounted(){
  }
}
</script>

<style>
@import "assets/css/common.css";
</style>
