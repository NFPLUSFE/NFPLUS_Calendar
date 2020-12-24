<template>
   <div class="calendar">
     <!-- 顶部展示选中日期 -->
       <div class="input">{{selectDate}}</div>
       <img @click='show()' class="logo" src="../assets/calendar.png" alt="">
     <!-- 面板 -->
       <div id="pannel" :class="{pActive:pisActive}">
           <!-- 普通日历的年月加减部分 -->
           <div v-if='!this.range' class="pannelNav" >
               <span @click='reduce("year")'>&lt;</span>
               <span @click='reduce("month")'>&lt;&lt;</span>
               <span>{{this.year}}年</span>
               <span>{{this.month+1}}月</span>
               <span @click='add("month")'>&gt;&gt;</span>
               <span @click='add("year")'>&gt;</span>
           </div>
           <!-- 自定义范围日历的范围展示部分 -->
           <div v-if='this.range' class="pannelNav" >
             <span>{{this.range[0]+'---'+this.range[1]}}</span>
           </div>
           <!-- 主体部分 -->
           <div class="pannelDays" >
                 <!-- 星期 -->
                 <span  v-for='j in 7' :key="'_'+j" class="weeks">
                       {{weeks[j-1]}}
                   </span>
                <!-- //普通日历 42个cell-->
                <div v-if='!range'>
                   <div  class="row" v-for='i in 6' :key="'*'+i">
                   <span v-for='j in 7' :key="'*'+j" class='cell' 
                    :class="{noCurMonth:!isCurMonth(showDays[(i-1)*7+(j-1)]),//li的各种样式
                              isCurDay:isCurDay(showDays[(i-1)*7+(j-1)]),
                              curDay:curDay(showDays[(i-1)*7+(j-1)]),
                              isSelectNoCurDay:isSelectNoCurDay(showDays[(i-1)*7+(j-1)])}"
                    @click="selectDay(showDays[(i-1)*7+(j-1)])"
                            >
                       {{showDays[(i-1)*7+(j-1)].getDate()}}
                     <!-- 备注 备忘录 -->
                       <span class="memorial">
                           {{ hasThing(showDays[(i-1)*7+(j-1)])?hasThing(showDays[(i-1)*7+(j-1)]):"" }}
                       </span>
                       <input @focus=focus($event) @blur='blur($event)' value=''  v-if='isCurMonth(showDays[(i-1)*7+(j-1)])'  type="text" class="edit">
                   </span>
                   </div>
                </div>
                <!-- 自定义范围日历 cell的个数不定-->
                <div v-if='range'>
                  <div  class="row" v-for='i in this.row' :key='"="+i'>
                      <span v-for='j in 7' :key="'+'+j" 
                      :class="{isBlank:showDays[(i-1)*7+(j-1)]=='1',//li为空白时类名时isBlank
                              cell:showDays[(i-1)*7+(j-1)]!=='1', //li有时间值时类名为cell
                              isCurDay:isCurDay(showDays[(i-1)*7+(j-1)]),
                              curDay:curDay(showDays[(i-1)*7+(j-1)]),
                              isSelectNoCurDay:isSelectNoCurDay(showDays[(i-1)*7+(j-1)])}"
                      @click="selectDay(showDays[(i-1)*7+(j-1)])"
                              >
                       {{showDays[(i-1)*7+(j-1)]!=="1"?showDays[(i-1)*7+(j-1)].getDate():""}}
                       <!-- 备注 -->
                       <span class="memorial">
                           {{ hasThing(showDays[(i-1)*7+(j-1)])?hasThing(showDays[(i-1)*7+(j-1)]):"" }}
                       </span>
                       <input @focus=focus($event)  @blur='blur($event)' value=''  v-if='showDays[(i-1)*7+(j-1)]!=="1"' type="text" class="edit">
                   </span>
                  </div>
                </div>    
           </div>
           <!-- 底部 -->
           <div class="pannelToday">
               <!-- 今天 -->
               <img v-if='!range' class="tdLogo"  @click='toToday()' src="../assets/today.png" alt="">
               <!-- 调色盘 -->
               <span class="palette" v-if='palette'>
                   <img class='changeColor' :class="{rotate:isActive}" @click='showColorList()' src="../assets/changeColor.png" alt="">
                  <ul>
                      <li :class="{active:isActive}" @click='changeColor($event)' v-for="(item,index) in colors" :key="index" :id="item">{{item}}</li>
                   </ul>
               </span>
           </div>
       </div>
   </div>
</template>

<script>
import {getDate, getYearMonthDay} from './utils'
export default {
  name:'Calendar',
  data(){
     return {
       year:'',
       month:'',
       day:'', 
       weeks:['Mon','Tus','Wed','Thu','Fri','Sat','Sun'], 
       isActive:false, //色板的显示和隐藏
       pisActive:false, //pannel的显示和隐藏 false为显示
       colors:['red','yellow','green','purple'],
       startDate:'', 
       endDate:'',
       length:'',//自定义范围日历需要的cell个数
       row:'',//自定义范围日历需要渲染的cell的行数
       oneDay:24 * 60 * 60 * 1000,
       nowDay:new Date(),
       Size:70,
       b:[],
       Memorial:[]
     }
    },
   props:{
      value :{
          type:Date,
          default:()=>{
              new Date()
          }
      },
      palette:{
         default:()=>{
             'false'
         }
      },
      color:{
          type:String,
          default:()=>{
            'purple' 
          }
      },
      range:{
          type:Array,
          default:()=>{
              []
          }
      },
      size:{
        type:Number,
        default:()=>{
          70
        }
      },
      memorial:{
        type:Array,
        default:()=>{
          []
        }
      }
   },
   computed:{
    //  展示在顶部.input的选中时间
      selectDate(){
        let {year,month,day} = getYearMonthDay(this.nowDay)
        return  `${year}-${month+1}-${day}`
      },
    //返回一个数组 数组内是需要展示在li中的时间
      showDays(){
        let arr = []
        let oneDay = this.oneDay
        if(!this.range){// 42个（普通日历）展示天数
           let nowMonthFirstDay = getDate(this.year,this.month,1),
               week = nowMonthFirstDay.getDay(),//得到一号是星期几
               startDay = nowMonthFirstDay - (week-1) *oneDay//推出li从哪一天开始展示
           for(let i = 0;i<42;i++){
              arr.push(new Date(startDay + i*oneDay))
             }  
        }else if(this.range){//自定义范围 的展示天数
            let length = (this.endDate - this.startDate)/oneDay,
                startDay = this.startDate - 0,
                addNumFront = this.startDate.getDay()-1,//计算出前面需要添加几个空白cell
                num=length+1+addNumFront,
                addNumBehind =7-num%7
                addNumBehind=addNumBehind==7?0:addNumBehind//计算出后面需要添加几个空白cell
            for(let i = 0;i<addNumFront;i++){
                arr.push('1') //前面空白cell
            }
            for(let i = 0;i<length+1;i++){
               arr.push(new Date(startDay + i*oneDay))//自定义的范围的cell
            }
            for(let i =0;i<addNumBehind;i++){
              arr.push('1') //后面空白cell
               }   
        }
        return arr
      }
   },
   mounted(){
        this.Memorial=this.memorial
        console.log(this.Memorial);
        if(this.Memorial.length>0){
          console.log(this.Memorial[0].thing);
          console.log(this.Memorial[0].time);
        }
        

        this.initColor(this.color) //初始化主题色
        this.nowDay = this.value||new Date() //选中哪一天
        this.Size = this.size
        this.initSize(this.Size)//初始化尺寸
        let {year,month,day} = getYearMonthDay(this.nowDay) 
        this.year= year
        this.month=month
        this.day=day  //初始化普通日历 pannelNav的展示数据
        this.isActive=false //调色盘色板隐藏
        if(this.range){
           this.startDate = this.getStartEndDate(this.range,0)
           this.endDate = this.getStartEndDate(this.range,1)  //处理并拿到this.range的开始时间和结束时间
           this.length = this.showDays.length //7的倍数(包括空白li总的长度)
           this.row = this.length/7  //有几行
        } 
   },
   methods:{
    // 返回range数组里面的开始时间和结束时间 i=0返回开始的 i=1返回结束的 
      getStartEndDate(range,i){
        let year = range[i].split('-')[0],
            month = range[i].split('-')[1],
            day = range[i].split('-')[2]
          if(month.substr(0,1)=='0'){
               month = month.substr(1,1)   //去掉“03”前面的0
             }
          if(day.substr(0,1)=='0'){
               day = day.substr(1,1)
             }
        month=month-1
        let date = getDate(year,month,day) 
        return date
    },  
    // 改变主题色
      initColor(color){
         if(color=='red'){
            this.styleChange('rgb(243, 113, 113)','rgb(245, 176, 176)')
          }else if(color=='yellow'){
             this.styleChange('#CFD866','#D4DA89')
          }else if(color=='green'){
             this.styleChange('#1DE0AA','#21FFC1')
          }else{
             this.styleChange('rgb(151, 151, 240)','rgb(213, 213, 248)')
          }
      },
      styleChange(dColor,lColor){
        document.getElementsByTagName('body')[0].style.setProperty('--dColor', dColor);
        document.getElementsByTagName('body')[0].style.setProperty('--lColor', lColor);
      },
    //日历尺寸
      initSize(size){
        let Size = size
        if(size<60){
          Size=60
        }
        if(size>120){
          Size=120
        }
        document.getElementsByTagName('html')[0].style.fontSize = Size+'px';
      },
    //  面板pannel收起与展示
      show(){
        if(!this.pisActive){
          this.pisActive=true
          this.$emit('hidePannel')
        }else{
          this.pisActive=false
          this.$emit('showPannel')
        }
      },

    // li的四种样式：
    // 1、属于当前月字体颜色为黑色 不是当前月为灰色
      isCurMonth(date){
          let {month:m} = getYearMonthDay(date)
          return m==this.month 
      },
    // 2、是当前天并被选中 为深底白字
      isCurDay(date){
          if(date!=='1'){ //date=="1"为空白cell 
            let{day:d,month:m,year:y} = getYearMonthDay(date)
          return d==this.day&&m==this.month&&y==this.year
          }
          
      },
    // 3、被选中但不是当前天 为浅底黑字
      isSelectNoCurDay(date){
        if(date!=="1"){ //date=="1"为空白cell 
          let now = new Date()
          let{year,month,day} = getYearMonthDay(now)
          let{year:y,day:d,month:m} = getYearMonthDay(date)
          return d==this.day&&m==this.month&&!(year==y&&month==m&&day==d)
        }
      },
    // 4、是当前天但不被选中 为红字无底
      curDay(date){
        if(date!=='1'){ //date=="1"为空白cell 
          let now = new Date()
          let{year,month,day} = getYearMonthDay(now)
          let{year:y,month:m,day:d} = getYearMonthDay(date)
          return year==y&&month==m&&day==d&&!(d==this.day&&m==this.month)
        }   
      },

    // 选中某一天 
      selectDay(date){ 
        if(date!=='1'){ //文本为空的cell不能做selectDay事件
          this.nowDay = date //更新顶部.input
          let {year,month,day} = getYearMonthDay(date)
          this.year = year
          this.month = month
          this.day = day  //更新.pannelNav
          this.$emit('selectDay',date)
        }
          
      },
    //   年月的加减 
      reduce(yORm){
          if(yORm=='year'){
            this.year--  
            this.$emit('reduceYear',this.year)
          }else{
            this.month>0?this.month--:this.month=11
            this.$emit('reduceMonth',this.month)
          } 
      },
      add(yORm){
         if(yORm=='year'){
            this.year++  
            this.$emit('addYear',this.year)
          }else{
            this.month<11?this.month++:this.month=0
            this.$emit('addMonth',this.month)
          } 
      },
      
    //点击底部"今"图标  定位到当前天
      toToday(){
          let date = new Date()
          this.selectDay(date)
          this.$emit('toToday',this.nowDay)
      },
    // 展示与隐藏调色盘的色板
      showColorList(){
        if(!this.isActive){
          this.isActive=true
          this.$emit('showColorList')
        }else{
          this.isActive=false
          this.$emit('hideColorList')
        }
      },
    // 点击色板上的颜色 改变主题色
      changeColor(e){
          this.$emit('changeColor',e.target.innerHTML,this.nowDay)
      },
      focus(e){
        e.target.value = e.target.parentNode.children[0].innerText
      },
    // 输入框失去焦点
      blur(e){
         //把事件和对应的时间存到b数组 并发射出去
        
        if(e.target.value!==""){
          
        var thing = e.target.value
        var time = this.nowDay
        this.b = this.Memorial 
        this.b.push({
          time:time,
          thing:thing
         })
          this.$emit('addThings',this.b,this.nowDay)
          e.target.parentNode.children[0].innerHTML=thing //把 事件 放到准备好的span中
          e.target.value='' //清空输入框
         }
      },
      // 重新渲染的时候 判断是否有备注 有的话渲染出来
      hasThing:function(date){
        if(date!=='1'){
        var thing = ''
        for(let i = 0;i<this.Memorial.length;i++){
          if(date.getDate()==this.Memorial[i].time.getDate()&&date.getMonth()==this.Memorial[i].time.getMonth()&&date.getYear()==this.Memorial[i].time.getYear()){
               thing = this.Memorial[i].thing
              }
            }
            return thing
          }
      }
   }
}
</script>
<style lang='scss'>
$deepColor: var(--dColor, #fff);
$lightColor: var(--lColor, #fff);
  html{
    font-size: 70px;
  }
  .calendar{
      font-size: .4rem;
      width: 7rem;
      height: 0.8rem;
      position: relative;
      .input{
        text-align: center;
        line-height: 0.8rem;
        margin: 0 auto;
        }
      .logo{
        width: .4rem;
        position: relative;
        left: 0;
        top: -0.63rem;
        }
      #pannel.pActive{
        opacity: 0;
        transition:all 1s;
       }
      #pannel {
        position:absolute;
        background: #fff;
        transition:all 1s;
        user-select:none;  
        top: 0.8rem; 
        .pannelNav {
           width: 7rem;
           display: flex;
           justify-content: space-around;
           background: linear-gradient(to bottom, $deepColor,$lightColor);
           height: 0.8rem;
           line-height: 0.8rem;
           color:#fff;
             span {
               cursor: pointer;
             }
           }
        .pannelDays {
             overflow: hidden;
             span {
               box-sizing:border-box;
               display: inline-flex; 
               width: 1rem;
               height: 0.8rem;
               float: left;
               transition: .5s;
              }
            span.weeks{
                background: linear-gradient(to bottom, $lightColor,#fff);
                color:rgb(169, 169, 224);
                font-size: .3rem;
            }
            span.isBlank{
                color:transparent
            }
            span.cell{
                cursor: pointer;
                font-size: 0.15rem;
                line-height: 0.4rem;
                position: relative;
                .memorial{
                  color:orange;
                  text-overflow: ellipsis;
                  // white-space: nowrap;
                  overflow: hidden;
                }
                .edit{
                  position: absolute;
                  top: 0.28rem;
                  background-color: transparent;
                  border: 1px solid transparent;
                  display: block;
                  height: 50%;
                  width: 60%;
                  color:#fff;
                 
                }
            }
            .cell:hover{
                border: 1px solid $lightColor;
            }
            span.noCurMonth{
                color:#aaa;
            }
            span.isCurDay{
                background: $deepColor;
                color:#fff
            }
            span.isSelectNoCurDay{
                background-color: $lightColor;
                color:#000   
            }
            span.curDay{
                color:rgb(243, 113, 113)
            }
           }

        .pannelToday {
          text-align: center;
          height: 0.8rem;
          line-height: 0.8rem;
          background: linear-gradient(to bottom,#fff, $lightColor);
            .tdLogo,.changeColor{
               width: .65rem;
               cursor: pointer;
            }
            .changeColor{
               position: absolute;
               right:-.3rem;
               bottom:-.3rem;
               transition: 1s;
            }
            .rotate{
              transform: rotate(360deg);
              transition: 1s;
            }
            ul{
                list-style: none;
                margin: 0;
                padding: 0;
                position: absolute;
                right: -1.5rem;
                bottom: -1rem;
                li{
                    height: 0px;
                    width: 0px;
                    color:transparent;
                    border-radius: 50%;
                    margin-top: -8px;
                    transition: 1s;
                }
                li.active{
                    width: 0.8rem;
                    height: 0.8rem;
                }
                #red{
                    background-color:rgba(red,.5);
                }
                #green{
                    background-color:rgba(green,.5);
                }
                #purple{
                    background-color: rgba(purple,.5)
                }
                #yellow{
                    background-color: rgba(yellow,.5)
                }
            }
          }
       }
  }
</style>