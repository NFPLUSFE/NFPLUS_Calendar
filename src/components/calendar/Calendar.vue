<template id="Calendar">
  <div>
    <div class="plan" @click="shouldMonth" :class="{choosed: !isActive}">
      <div
        class="title"
      >{{(new Date()).getFullYear()}} {{(new Date()).getMonth()+1}} {{(new Date()).getDate()}}</div>
    </div>
    <div class="calendar-box" :class="{choosed: isActive}">
      <div class="head">
        <div class="word-size pre" @click="preYear"><</div>
        <div class="word-size cur">{{curYear}}</div>
        <div class="word-size next" @click="nextYear">></div>
        <ul class="weeks">
          <li v-for="item in ['一','二','三','四','五','六','日']" :key="item">{{item}}</li>
        </ul>
      </div>
      <div class="body" ref="mbody">
        <div ref="wrapper" class="wrapper">
          <span v-for="(item, index) in 12" :key="index">
            <div class="t-head">{{item+'月'}}</div>

            <DateGrid
              :index="item+1"
              :currentYear="curYear"
              :currentMonth="curMonth"
              :currentDate="curDate"
              :currentDay="curDay"
            />
          </span>
        </div>
      </div>
      <div class="foot">
        <span class="back" @click="isActive=true">back</span>
        <span class="today" @click="shouldMonth">today</span>
      </div>
    </div>
  </div>
</template>

<script>
import DateGrid from "components/dateGrid/DateGrid";

export default {
  name: "Calendar",
  components: {
    DateGrid
  },
  data() {
    return {
      isActive: true,
      curYear: 0,
      curMonth: 0,
      curDate: 0,
      curDay: 0
    };
  },
  mounted() {
    this.currentDate();
  },
  methods: {
    // 获取当前日期
    currentDate(cur_1, cur_2, cur_3) {
      // debugger
      let d;

      if ((cur_1, cur_2, cur_3)) {
        d = new Date(cur_1, cur_2, cur_3);
      } else {
        d = new Date();
      }

      this.curYear = d.getFullYear();
      this.curMonth = d.getMonth() + 1;
      this.curDate = d.getDate();
      this.curDay = d.getDay();

      // this.$forceUpdate()
      // console.log('111');
      // console.log(this.curYear);
    },
    // 获取当前月份对应展示的日历,滚动到视图上方
    shouldMonth() {
      this.isActive = false;

      let date = new Date();

      setTimeout(() => {
        window.scroll(0, (date.getMonth() + 1) * 500);
      }, 100);
    },
    // 上一年
    preYear() {
      this.curYear = this.curYear - 1;

      this.currentDate(that.curYear, 0, 1);
    },
    // 下一年
    nextYear() {
      this.curYear = this.curYear + 1;
      this.currentDate(this.curYear, 0, 1);
    }
  }
};
</script>

<style scoped>
/* 封面 */
.plan {
  width: 360px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border-radius: 10px;
  background-color: #cccccc;
  opacity: 0.6;
  margin: 200px auto;
}

.title {
  width: 100%;
  height: 100px;
  font-size: 48px;
  font-weight: 600;
  /* padding: 10px 0 0 20px; */
  color: rgb(209, 36, 6);
}
/* 主体 */
.calendar-box {
  width: 100%;
  height: 100%;
  background-color: rgb(254, 254, 254);
}

.choosed {
  display: none;
}
/* 头部 */
.head {
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  background-color: rgb(244, 244, 244);
  color: rgb(236, 75, 48);
  border-bottom: 1px solid rgb(203, 203, 203);
  z-index: 999;
}

.word-size {
  font-size: 20px;
  font-weight: 600;
}

.pre {
  width: 30px;
  height: 16px;
  float: left;
  line-height: 16px;
  margin: 10px 0 0 10px;
}

.cur {
  width: calc(100%-60px);
  margin-top: 5px;
  text-align: center;
}

.next {
  width: 30px;
  height: 16px;
  float: right;
  line-height: 16px;
  margin: -20px 10px 0 0;
}

.weeks {
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
  font-size: 12px;
}

.weeks li {
  display: block;
  color: rgb(34, 34, 34);
}

/* 月份显示 */
.body {
  position: relative;
  overflow: hidden;
  margin: 55px auto;
  width: 100%;
}

.wrapper {
  /* position: relative; */
  width: 100%;
  padding-top: 10px;
  transition: 0.3s;
}

.wrapper span {
  display: inline-block;
  margin-top: 20px;
  height: 340px;
}

.t-head {
  width: 53.5px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: 700;
}

/* 底部 */
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  background-color: rgb(244, 244, 244);
  color: rgb(236, 75, 48);
  border-top: 1px solid rgb(203, 203, 203);
}

.back {
  float: left;
  margin-left: 10px;
}

.today {
  float: right;
  margin-right: 10px;
}
</style>