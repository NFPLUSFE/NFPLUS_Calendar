<template id="Calendar">
<div class="box" v-cloak>
        <!-- 当前日期显示 -->
        <p class="datePlay">{{init_year}}-{{init_month}}-{{init_day}}</p>
        <!-- 主体内容 -->
        <div class="w">
            <!-- 头部 -->
            <div class="head">
                <ul class="clearfix">
                    <!-- list1 -->
                    <li class="">
                        <div class="clearfix">
                            <span>{{ msg_year }}年</span>
                            <span class="lab-r">
                                <img v-show="imgFlag1" src="../assets/images/button_down.png" alt="" @click="imgPlay1">
                                <img v-show="!imgFlag1" src="../assets/images/button_up.png" alt="" @click="imgPlay1">
                            </span>
                        </div>
                        <div class="list1" v-show="!imgFlag1">
                            <ul>
                                <li v-for="item in Year" @click="YeaVal(item.name)" :key="item.id">{{ item.name }}</li>
                            </ul>
                        </div>
                    </li>
                    <!-- list2 -->
                    <li>
                        <div>
                            <span class="lab-l">
                                <img src="../assets/images/angle_left.png" alt="" @click="sub">
                            </span>
                            <span style="display: inline-block;" class="month">{{ msg_month }}月
                                <img src="../assets/images/button_down.png" alt="" @click="imgPlay2" v-show="imgFlag2">
                                <img src="../assets/images/button_up.png" alt="" @click="imgPlay2" v-show="!imgFlag2">
                            </span>
                            <span class="lab-r">
                                <img src="../assets/images/angle_right.png" alt="" @click="add">
                            </span>
                        </div>
                        <div class="list2" v-show="!imgFlag2">
                            <ul>
                                <li v-for="(item,i) in 12" @click="MonVal(item)" :key="i">{{ item }}</li>
                            </ul>
                        </div>

                    </li>
                    <!-- list3 -->
                    <li>
                        <div>
                            <span class="festival">{{ msg_festival }}</span>
                            <span class="lab-r">
                                <img v-show="imgFlag3" src="../assets/images/button_down.png" alt="" @click="imgPlay3">
                                <img v-show="!imgFlag3" src="../assets/images/button_up.png" alt="" @click="imgPlay3">
                            </span>
                        </div>
                        <div class="list3" v-show="!imgFlag3">
                            <ul>
                                <li v-for="item in Festival" @click="FesVal(item)" :key="item.id">{{ item.name }}</li>
                            </ul>
                        </div>

                    </li>
                    <!-- list4 -->
                    <li>
                        <span @click="timeInit">返回今天</span>
                    </li>
                </ul>
            </div>
            <!-- 主体内容 -->
            <div class="content" @click="hid">
                <!-- 头部 星期几 -->
                <div class="con-head">
                    <ul>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                        <li>日</li>
                    </ul>
                </div>
                <!-- 具体日期 -->
                <!-- row1 -->
                <div class="con-row">
                    <span class="row1" v-for="(item,i) in row1" @click="bg_color1(i,'row1')" :key="item.id">{{item}}</span>
                </div>
                <!-- row2 -->
                <div class="con-row">
                    <span class="row2" v-for="(item,i) in row2" @click="bg_color1(i,'row2')" :key="item.id">{{item}}</span>
                </div>
                <!-- row3 -->
                <div class="con-row">
                    <span class="row3" v-for="(item,i) in row3" @click="bg_color1(i,'row3')" :key="item.id">{{item}}</span>
                </div>
                <div class="con-row">
                    <span class="row4" v-for="(item,i) in row4" @click="bg_color1(i,'row4')" :key="item.id">{{item}}</span>
                </div>
                <div class="con-row">
                    <span class="row5" v-for="(item,i) in row5" @click="bg_color1(i,'row5')" :key="item.id">{{item}}</span>
                </div>
                <div class="con-row">
                    <span class="row6" v-for="(item,i) in row6" @click="bg_color1(i,'row6')" :key="item.id">{{item}}</span>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default{
  name:"Calendar",
  props:{
      head_color:'',
      head_bgcolor:'',
      head_size:'',
      timeFormate:'',
  },
    data (){
      return{
        init_year: '',
        init_month: '',
        init_day: '',
        msg_year: '',
        msg_month: '',
        msg_day: '',
        msg_xq: '',
        msg_festival: '',
        imgFlag1: true,
        imgFlag2: true,
        imgFlag3: true,
        Year: [{ name: 1991 }, { name: 1992 }, { name: 1993 }, { name: 1994 }, { name: 1995 }, { name: 1996 }, { name: 1997 }, { name: 1998 }, { name: 1999 }, { name: 2000 }, { name: 2001 }, { name: 2002 }, { name: 2003 }, { name: 2004 }, { name: 2005 }, { name: 2006 }, { name: 2007 }, { name: 2008 }, { name: 2009 }, { name: 2010 }, { name: 2011 }, { name: 2012 }, { name: 2013 }, { name: 2014 }, { name: 2015 }, { name: 2016 }, { name: 2017 }, { name: 2018 }, { name: 2019 }, { name: 2020 }, { name: 2021 }, { name: 2022 }, { name: 2023 }, { name: 2024 }, { name: 2025 }, ],
        Festival: [{ id: 1, name: '元  旦 节' }, { id: 2, name: '植 树 节 ' }, { id: 3, name: '劳 动 节 ' }, { id: 4, name: '儿 童 节 ' }, { id: 5, name: '建 军 节 ' }, { id: 6, name: '国 庆 节 ' }],
        row1: [],
        row2: [],
        row3: [],
        row4: [],
        row5: [],
        row6: [],
      }
    },
    methods: {
        // 头部下拉列表
        imgPlay1() {
            this.imgFlag1 = !this.imgFlag1
        },
        imgPlay2() {
            this.imgFlag2 = !this.imgFlag2
        },
        imgPlay3() {
            this.imgFlag3 = !this.imgFlag3
        },
        // 年份显示与隐藏
        YeaVal(data) {
            this.msg_year = data
            this.imgFlag1 = !this.imgFlag1
            this.play()
        },
        // 月份显示与隐藏
        MonVal(data) {
            this.msg_month = data;
            this.imgFlag2 = !this.imgFlag2
            this.play()
        },
        // 节日显示与隐藏
        FesVal(data) {
            this.msg_festival = data.name
            this.imgFlag3 = !this.imgFlag3
            if (data.id == 1) {
                this.msg_month = 1
            } else if (data.id == 2) {
                this.msg_month = 3
            } else if (data.id == 3) {
                this.msg_month = 5
            } else if (data.id == 4) {
                this.msg_month = 6
            } else if (data.id == 5) {
                this.msg_month = 8
            } else if (data.id == 6) {
                this.msg_month = 10
            }
            this.play()
        },
        
        //通过点击下方的div来触发  隐藏列表
        hid() {
            this.imgFlag1 = this.imgFlag2 = this.imgFlag3 = true
        },
        //月份sun按钮
        sub() {
            if (this.msg_month == 1) {
                alert("已经是最小月份，请规范操作")
                return;

            } else {
                this.msg_month--;
            }
            this.play()

        },
        // 月份add按钮
        add() {
            if (this.msg_month == 12) {
                alert("已经是最大月份，请规范操作")
                return;

            } else {
                this.msg_month++;
            }
            this.play()


        },
        // 时间初始化 （返回今天按钮）
        timeInit() {
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()
            this.msg_year = this.init_year = year
            this.msg_month = this.init_month = month
            this.msg_day = this.init_day = day
            this.msg_festival = '假期时间'
            this.play()
        },

        // 遍历日期
        play() {
            // 获取特定月的第一天星期几(n1)
            var date1 = new Date('' + this.msg_year + ', ' + this.msg_month + ',1')
            var n1 = date1.getDay()
            this.msg_xq = n1;

            // 获取特定月的天数(n2)
            var date2 = new Date(this.msg_year, this.msg_month, 0)
            var n2 = date2.getDate()

            //遍历日期
            var d = 1
                //解决1号是星期日(n1=0)的情况 设个变量r1
            var r1 = 0
                // 第一行
            for (let i = 0; i < 7; i++) {
                if (n1 == 0) {
                    if (r1 < 6) {
                        this.row1.splice(i, 1, '')
                        r1++
                    } else {
                        this.row1.splice(i, 1, d)
                        d++
                    }

                } else {
                    if (i < (n1 - 1)) {
                        this.row1.splice(i, 1, '')
                    } else {
                        this.row1.splice(i, 1, d)
                        d++
                    }
                }

            }
            // 第二行
            for (var i = 0; i < 7; i++) {
                this.row2.splice(i, 1, d)
                d++
            }
            // 第三行
            for (var i = 0; i < 7; i++) {
                this.row3.splice(i, 1, d)
                d++
            }
            // 第四行
            for (var i = 0; i < 7; i++) {
                if (d <= n2) {
                    this.row4.splice(i, 1, d)
                    d++
                } else {
                    d = 1
                    this.row4.splice(i, 1, d)
                    d++
                }
            }
            // 第五行
            for (var i = 0; i < 7; i++) {
                if (d <= n2) {
                    this.row5.splice(i, 1, d)
                    d++
                } else {
                    d = 1
                    this.row5.splice(i, 1, d)
                    d++
                }

            }
            // 第六行
            for (var i = 0; i < 7; i++) {
                if (d <= n2) {
                    this.row6.splice(i, 1, d)
                    d++
                } else {
                    d = 1
                    this.row6.splice(i, 1, d)
                    d++
                }
            }
            //调用 当前日期加背景色&节假日标记函数
            this.auto_color()
            var that = this
            setTimeout(function() {
                that.sign()
            }, 150)
        },

        // 点击时 加背景色&去除背景色
        bg_color1(i, ro) {
            var ff = document.getElementsByClassName(ro)[i]
            this.msg_day=ff.innerText
            if (ff.style.backgroundColor == "red") {
                ff.style.backgroundColor = "transparent"
            } 
            else {
                ff.style.backgroundColor = "red"
                ff.style.borderRadius = "50%"

            }
            // 调用callBack 函数
            this.callBack()
            
        },

        //给当前日期加背景色&下个月的日期修改为浅色字体
        auto_color() {
            var that = this
            setTimeout(function() {
                var date = new Date()
                var year = date.getFullYear()
                var month = date.getMonth() + 1
                var day = date.getDate()
                var ff1 = document.getElementsByClassName('row1')
                var ff2 = document.getElementsByClassName('row2')
                var ff3 = document.getElementsByClassName('row3')
                var ff4 = document.getElementsByClassName('row4')
                var ff5 = document.getElementsByClassName('row5')
                var ff6 = document.getElementsByClassName('row6')
                // 将所有的日期背景置为透明
                for (var i = 0; i < 7; i++) {
                    ff1[i].style.backgroundColor = "transparent"
                    ff2[i].style.backgroundColor = "transparent"
                    ff3[i].style.backgroundColor = "transparent"
                    ff4[i].style.backgroundColor = "transparent"
                    ff5[i].style.backgroundColor = "transparent"
                    ff6[i].style.backgroundColor = "transparent"
                }
                // 将当前日期的背景颜色置为 #ffbb00
                if (that.msg_year == year && that.msg_month == month) {
                    for (var i = 0; i < 7; i++) {
                        if (ff1[i].innerText == day) {
                            ff1[i].style.backgroundColor = "#ffbb00"
                            ff1[i].style.borderRadius = "50%"

                        }
                    }
                    for (var i = 0; i < 7; i++) {
                        if (ff2[i].innerText == day) {
                            ff2[i].style.backgroundColor = "#ffbb00"
                            ff2[i].style.borderRadius = "50%"

                        }
                    }
                    for (var i = 0; i < 7; i++) {
                        if (ff3[i].innerText == day) {
                            ff3[i].style.backgroundColor = "#ffbb00"
                            ff3[i].style.borderRadius = "50%"

                        }
                    }
                    for (var i = 0; i < 7; i++) {
                        if (ff4[i].innerText == day) {
                            ff4[i].style.backgroundColor = "#ffbb00"
                            ff4[i].style.borderRadius = "50%"

                        }
                    }
                    for (var i = 0; i < 7; i++) {
                        if (ff5[i].innerText == day) {
                            ff5[i].style.backgroundColor = "#ffbb00"
                            ff5[i].style.borderRadius = "50%"

                        }
                    }
                    for (var i = 0; i < 7; i++) {
                        if (ff6[i].innerText == day) {
                            ff6[i].style.backgroundColor = "#ffbb00"
                            ff6[i].style.borderRadius = "50%"

                        }
                    }
                }
                // 将非本月的日期背景颜色置为 浅色背景 #d9d9d9 (非本月的日期只可能出现在最后两行)
                for (var i = 0; i < 7; i++) {
                    if (ff5[i].innerText < 16) {
                        // ff5[i].style.backgroundColor = "#d9d9d9"
                        ff5[i].style.color = "#d9d9d9"
                    } else {
                        ff5[i].style.color = "#000000"

                    }
                }
                for (var i = 0; i < 7; i++) {
                    if (ff6[i].innerText < 16) {
                        ff6[i].style.color = "#d9d9d9"
                    } else {
                        ff6[i].style.color = "#000000"

                    }
                }
            }, 100)



        },

        // 标记节假日
        sign() {
            var ff1 = document.getElementsByClassName('row1')
            var ff2 = document.getElementsByClassName('row2')
            var ff3 = document.getElementsByClassName('row3')
            var ff4 = document.getElementsByClassName('row5')
            var ff5 = document.getElementsByClassName('row5')
            var ff6 = document.getElementsByClassName('row6')
            if (this.msg_month == 1 || this.msg_month == 5 || this.msg_month == 6 || this.msg_month == 8 || this.msg_month == 10) {
                for (var i = 0; i < 7; i++) {
                    if (ff1[i].innerText == 1) {
                        ff1[i].style.backgroundColor = "#ffbb00"
                        ff1[i].style.borderRadius = "50%"

                    }
                }
            }
            if (this.msg_month == 3) {
                for (var i = 0; i < 7; i++) {
                    if (ff2[i].innerText == 12) {
                        ff2[i].style.backgroundColor = "#ffbb00"
                        ff2[i].style.borderRadius = "50%"
                    } else if (ff3[i].innerText == 12) {
                        ff3[i].style.backgroundColor = "#ffbb00"
                        ff3[i].style.borderRadius = "50%"
                    }
                }
            }
        },

        //由父组件的值决定主题样式
        arg(){
            document.querySelector("p").style.backgroundColor=this.head_bgcolor
            document.querySelector("p").style.color=this.head_color
            document.querySelector("p").style.fontSize=this.head_size+'px'
        },
        // 回调函数
        callBack(){
            // 回调当前选择的时间和格式选择
            var date=`${this.msg_year}${this.timeFormate}${this.msg_month}${this.timeFormate}${this.msg_day}`
                this.$emit('getDate',date)
        },
    },
    mounted() {
        // 调用时间初始化函数
        this.timeInit()
        // 调用修改主题样式函数
        this.arg()
        

    },
}

</script>



<style scoped>
/* 大盒子 */
.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 530px;
    border: 2px solid skyblue;
    border-radius: 4px;
}
/* 显示完整日期 */
.box .datePlay {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    color: #ffffff;
    background-color: skyblue;
}
/* 面板 */
.box .w {
  width: 510px;
  padding: 10px;
  padding-top: 0;
}
/* 搜索框和下拉列表 */
.box .w .head {
  width: 100%;
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 255, 0.5);
}
.box .w .head ul {
  padding: 5px 0px 15px 0;
}

.box .w .head ul > li {
  float: left;
  margin-right: 10px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #999999;
}
.box .w .head ul li:nth-child(2) {
  width: 136px;
}
.box .w .head ul li:nth-child(3) {
  width: 128px;
}
.box .w .head ul > li:last-child {
  margin-right: 0;
}
.box .w .head ul > li span {
  font-size: 18px;
  padding: 0 10px;
}
.box .w .head ul > li .lab-l {
  padding: 0 5px;
  border-right: 1px solid #cccccc;
}
.box .w .head ul > li .lab-l img {
  width: 20px;
  vertical-align: middle;
}
.box .w .head ul > li .lab-r {
  padding: 0 5px;
  border-left: 1px solid #cccccc;
}
.box .w .head ul > li .lab-r img {
  width: 20px;
  vertical-align: middle;
}
.box .w .head ul > li .month {
  width: 68px;
  padding: 0 3px;
}
.box .w .head ul > li .month img {
  width: 20px;
  vertical-align: middle;
}
.box .w .head ul > li .festival {
    padding: 0 12px;
    
}
.box .w .head ul > li .list1 {
  overflow-x: auto;
  overflow-x: hidden;
  position: absolute;
  margin-top: 1px;
  margin-left: -1px;
  width: 116px;
  height: 190px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 5px #d9d9d9;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 100;
  background-color: #ffffff;
  cursor: pointer;
}
.box .w .head ul > li .list1 ul {
  padding: 0;
}
.box .w .head ul > li .list1 ul li {
  border: none;
  margin-left: -1px;
  width: 110px;
  height: 38px;
  line-height: 38px;
  padding-left: 10px;
  font-size: 18px;
  border-bottom: 1px solid #d9d9d9;
}
.box .w .head ul > li .list1 ul li:hover {
  background-color: pink;
}
.box .w .head ul > li .list2 {
  overflow-x: auto;
  overflow-x: hidden;
  position: absolute;
  margin-top: 1px;
  margin-left: -1px;
  width: 136px;
  height: 190px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 5px #d9d9d9;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 100;
  background-color: #ffffff;
  cursor: pointer;
}
.box .w .head ul > li .list2 ul {
  padding: 0;
}
.box .w .head ul > li .list2 ul li {
  border: none;
  margin-left: -1px;
  width: 110px;
  height: 38px;
  line-height: 38px;
  padding-left: 10px;
  font-size: 18px;
  border-bottom: 1px solid #d9d9d9;
}
.box .w .head ul > li .list2 ul li:hover {
  background-color: pink;
}
.box .w .head ul > li .list3 {
  overflow-x: auto;
  overflow-x: hidden;
  position: absolute;
  margin-top: 1px;
  margin-left: -1px;
  width: 128px;
  height: 190px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 5px #d9d9d9;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 100;
  background-color: #ffffff;
}
.box .w .head ul > li .list3 ul {
  padding: 0;
}
.box .w .head ul > li .list3 ul li {
  border: none;
  margin-left: -1px;
  width: 110px;
  height: 38px;
  line-height: 38px;
  padding-left: 10px;
  font-size: 18px;
  border-bottom: 1px solid #d9d9d9;
  cursor: pointer;
}
.box .w .head ul > li .list3 ul li:hover {
  background-color: pink;
}
/* 日期头部 */
.box .w .content .con-head {
  height: 40px;
}
.box .w .content .con-head ul {
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 255, 0.3);
}
.box .w .content .con-head ul li {
  flex: 1;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 18px;
}
.box .w .content .con-head ul li:nth-child(6) {
  color: red;
}
.box .w .content .con-head ul li:last-child {
  color: red;
}
/* 日期内容 */
.box .w .content .con-row {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #cccccc;
}
.box .w .content .con-row span {
  flex: 1;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  font-weight: 540;
}
.box .w .content .con-row span:hover {
  background-color: pink!important;
  border-radius: 50%;
}

</style>
