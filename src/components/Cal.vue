<template>
   <div id="cal"> 
    <Calendar :size='size' :key='index' @dblClick='dblClick' @hideColorList='hideColorList' @showColorList='showColorList' @showPannel='showPannel'  @hidePannel='hidePannel' @reduceMonth='reduceMonth' @reduceYear='reduceYear'  @addMonth='addMonth' @addYear='addYear' @toToday='toToday' @selectDay='selectDay'  @changeColor='changeColor' :color='color' :palette='Palette' :range="range" />
   </div>
</template>

<script>
import Calendar from './Calendar'
export default {
  data(){
      return {
         color:'purple',
         index:0,
         Palette:'false'
      }
  },
  props:{
     Color:{
         type:String,
         default:()=>{''}
     },
     size:{
         type:Number,
         default:()=>{
             38
         }
     },
     palette:{
         type:Boolean,
         default:()=>{
             'false'
         }
     },
     range:{
         type:Array,
         default:()=>{
             []
         }
     }
  },
  components:{
      Calendar
  },
  mounted(){
    this.color=this.Color
    this.Palette=this.palette
    this.changeColor(this.color)
  },
  methods:{
      changeColor:function(x){
       this.color=x
       this.index+=1 //每次改变颜色需要重新渲染 所以通过index+1来改变组件的:key值 从而使之重新渲染
       this.$emit('onChangeColor',x)
     },
     selectDay:function(date){
        this.$emit('onSelectDay',date)
     },
     toToday:function(day){
         this.$emit('onToToday',day)
     },
     addYear:function(nowYear){
         this.$emit('onAddYear',nowYear)
     },
     addMonth:function(nowMonth){
        this.$emit('onAddMonth',nowMonth)
     },
     reduceYear:function(nowYear){
         this.$emit('onReduceYear',nowYear)
     },
     reduceMonth:function(nowMonth){
        this.$emit('onReduceMonth',nowMonth)
     },
     hidePannel(){
         this.$emit('onHidePannel')
     },
     showPannel(){
         this.$emit('onShowPannel')
     },
     hideColorList(){
         this.$emit('onHideCList')
     },
     showColorList(){
         this.$emit('onShowCList')
     },
     dblClick:function(day){
         this.$emit('onDblClick',day)
     }

  }
}
</script>

<style>

</style>