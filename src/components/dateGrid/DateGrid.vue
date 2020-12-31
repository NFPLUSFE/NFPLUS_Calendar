<template id="DateGrid">
  <div class="DateGrid">
    <span class="grid" v-for="(item, d_index) in 42" :key="d_index">
      <div v-if="item < currMonthFirstDay" class="li-box">
        <span></span>
      </div>
      <div
        v-if="
          item >= currMonthFirstDay &&
          item < currMonthLastDate + currMonthFirstDay
        "
        class="date li-box"
        :class="{Highlight:gridItemIndex == item}"
        @click="clear(item)"
      >
        {{ item - currMonthFirstDay + 1 }}
        <span
          class="lunarDate"
          :class="{Highlight:gridItemIndex == item}"
        >{{getLunarDay(currentYear, currentMonth, item-1)}}</span>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: "DateGrid",
  props: {
    currentYear: Number,
    currentMonth: Number,
    currentDay: Number,
    currentDate: Number,
    index: Number
  },
  watch: {
    currentYear(val) {
      this.currMonthDate();
      this.mountedDone();
      console.log("success");
    }
  },
  data() {
    return {
      currMonthFirstDay: 0,
      currMonthLastDate: 0,
      gridItemIndex: -1,
      updateYear: 0,
      days: []
    };
  },
  mounted() {
    this.mountedDone();
    this.currMonthDate();
  },
  methods: {
    // 当前月份的第一天的星期和最后一天的日期
    currMonthDate() {
      let currMonthHeader = new Date(this.currentYear, this.index - 2, 1);

      let currMonthFooter = new Date(this.currentYear, this.index - 1, 0);

      this.currMonthFirstDay = currMonthHeader.getDay();
      this.currMonthLastDate = currMonthFooter.getDate();

      if (this.currMonthFirstDay == 0) {
        this.currMonthFirstDay = 7;
      }

      // 月份位置
      this.$el.previousSibling.style.transform = `translateX(${(this
        .currMonthFirstDay -
        1) *
        55.3}px)`;
    },
    // 显示当前日期
    mountedDone() {
      let date = new Date();
      // console.log(date.getFullYear());
      // console.log(this.currentYear);
      // console.log(this.currentMonth());

      if (
        date.getFullYear() == this.currentYear &&
        date.getMonth() + 1 == this.currentMonth &&
        date.getDate() == this.currentDate
      ) {
        setTimeout(() => {
          let all = document.getElementsByClassName("DateGrid");
          all[this.currentMonth - 1].children[this.currentDate].className =
            "grid Highlight";

          // let lunar = document.getElementsByClassName("lunarDate");
          // for(let i=0;i<lunar.length;i++){
          //   lunar[i].style.color = "#fffae5";
          // }
        }, 100);
      }
    },
    // 点击 高亮
    clear(m) {
      // debugger
      setTimeout(() => {
        this.gridItemIndex = m;
        
        let special = document.getElementsByClassName("Highlight");

        for (let i = 0; i < special.length; i++) {
          special[i].style.backgroundColor = "transparent";
        }

        // 发送点击时间
        this.$emit(
          "dateClick",
          `${this.currentYear}年${this.index - 1}月${m -
            this.currMonthFirstDay +
            1}日`
        );
      }, 100);
    },
    // 农历
    getLunarDay(solarYear, solarMonth, solarDay) {
      const madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      const numString = "一二三四五六七八九十";
      const monString = "正二三四五六七八九十冬腊";
      const CalendarData = [
        0xa4b,
        0x5164b,
        0x6a5,
        0x6d4,
        0x415b5,
        0x2b6,
        0x957,
        0x2092f,
        0x497,
        0x60c96,
        0xd4a,
        0xea5,
        0x50da9,
        0x5ad,
        0x2b6,
        0x3126e,
        0x92e,
        0x7192d,
        0xc95,
        0xd4a,
        0x61b4a,
        0xb55,
        0x56a,
        0x4155b,
        0x25d,
        0x92d,
        0x2192b,
        0xa95,
        0x71695,
        0x6ca,
        0xb55,
        0x50ab5,
        0x4da,
        0xa5b,
        0x30a57,
        0x52b,
        0x8152a,
        0xe95,
        0x6aa,
        0x615aa,
        0xab5,
        0x4b6,
        0x414ae,
        0xa57,
        0x526,
        0x31d26,
        0xd95,
        0x70b55,
        0x56a,
        0x96d,
        0x5095d,
        0x4ad,
        0xa4d,
        0x41a4d,
        0xd25,
        0x81aa5,
        0xb54,
        0xb6a,
        0x612da,
        0x95b,
        0x49b,
        0x41497,
        0xa4b,
        0xa164b,
        0x6a5,
        0x6d4,
        0x615b4,
        0xab6,
        0x957,
        0x5092f,
        0x497,
        0x64b,
        0x30d4a,
        0xea5,
        0x80d65,
        0x5ac,
        0xab6,
        0x5126d,
        0x92e,
        0xc96,
        0x41a95,
        0xd4a,
        0xda5,
        0x20b55,
        0x56a,
        0x7155b,
        0x25d,
        0x92d,
        0x5192b,
        0xa95,
        0xb4a,
        0x416aa,
        0xad5,
        0x90ab5,
        0x4ba,
        0xa5b,
        0x60a57,
        0x52b,
        0xa93,
        0x40e95
      ];
      if (!(solarYear < 1921 || solarYear > 2999)) {
        solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
        const timeArr = [solarYear, solarMonth, solarDay];
        let TheDate =
          timeArr.length !== 3
            ? new Date()
            : new Date(timeArr[0], timeArr[1], timeArr[2]);
        let total, m, n, k;
        let isEnd = false;
        let theDateYear = TheDate.getFullYear();
        total =
          (theDateYear - 1921) * 365 +
          Math.floor((theDateYear - 1921) / 4) +
          madd[TheDate.getMonth()] +
          TheDate.getDate() -
          38;
        if (theDateYear % 4 === 0 && TheDate.getMonth() > 1) {
          total++;
        }
        for (m = 0; ; m++) {
          k = CalendarData[m] < 0xfff ? 11 : 12;
          for (n = k; n >= 0; n--) {
            if (total <= this.getBit(CalendarData[m], n)) {
              isEnd = true;
              break;
            }
            total = total - this.getBit(CalendarData[m], n);
          }
          if (isEnd) {
            break;
          }
        }
        let cMonth, cDay;
        cMonth = k - n + 1;
        cDay = total;
        if (k === 12) {
          if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
          }
          if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
          }
        }

        let cDayStr = numString.charAt(cDay - 1);
        if (cDay % 10 !== 0 || cDay === 10) {
          cDayStr = numString.charAt((cDay - 1) % 10);
        }
        return cDay === 1
          ? monString.charAt(cMonth - 1) + "月"
          : (cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十") +
              cDayStr;
      }
    },
    // 处理二进制数据
    getBit(m, n) {
      return 29 + ((m >> n) & 1);
    }
  }
};
</script>

<style scoped>
.DateGrid {
  height: 280px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 2px;
  flex-wrap: wrap;
}
/* 每个月的区域 */
.grid {
  display: inline-block;
  width: 52px;
  text-align: center;
  padding: 0 1px;
}

.li-box {
  width: 53.57px;
  height: 70px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #000000;
}

.lunarDate {
  display: inline-block;
  width: 53.57px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  color: #5f5c5c;
}

.Highlight {
  background-color: rgb(236, 75, 48);
  color: #fffae5;
}
</style>