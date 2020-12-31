<template>
  <div id="app">
    <Calendar
      @yearClick="showYear"
      @obtainDate="showDate"
      @gainCurDate="showCurDate"
      :color="Color"
      :backgroundColor="BackgroundColor"
      :opacity="Opacity"
      :fontSize="FontSize"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from "components/calendar/Calendar";

export default {
  name: "App",
  components: {
    Calendar
  },
  data() {
    return {
      Color: "",
      BackgroundColor: "",
      Opacity: "",
      FontSize: ""
    };
  },
  methods: {
    showYear(item) {
      console.log("当前是" + item + "年");
    },
    showDate(item) {
      console.log("当前是" + item);
    },
    showCurDate(item) {
      console.log("今天是" + item);
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
