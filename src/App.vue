<template>
  <div id="app"> 
    <!-- <Cal/> -->
    <!-- :range="['2020-11-10','2021-1-03']" :range="['2020-11-10','2020-12-03']"-->
    <Cal Color='yellow' :palette='true' :size="100"  
        @onHideCList='hideColorList' @onShowCList='showColorList'
        @onShowPannel='showPannel' @onHidePannel='hidePannel' 
        @onReduceYear='reduceYear' @onReduceMonth='reduceMonth' @onAddYear='addYear' @onAddMonth='addMonth' 
        @onToToday='toToday' @onChangeColor='nowColor' @onSelectDay='selectDay'
        @onAddThings='addThings'  />
  </div>
</template>

<script>
import Cal from './components/Cal'
export default {
  name: 'App',
  data(){
    return {
     
    }
  },
  methods:{
    // test所有回调函数
    selectDay:function(date){
      console.log(date);
    },
    nowColor:function(color){
      console.log(color);
    },
    toToday:function(day){
      console.log('今天'+day);
    },
    addYear:function(year){
      console.log(year);
    },
    addMonth:function(month){
      console.log(month);
    },
    reduceYear:function(year){
      console.log(year);
    },
    reduceMonth:function(month){
      console.log(month);
    },
    showPannel(){
      console.log('面板出现');
    },
    hidePannel(){
      console.log('面板隐藏');
    },
    hideColorList(){
      console.log('色板隐藏');
    },
    showColorList(){
      console.log('色板显示');
    },
    addThings:function(things,day){
      console.log('备注了'+things+day);
    }
  },
  components: {
    Cal,
  },
}
</script>

<style>
</style>
