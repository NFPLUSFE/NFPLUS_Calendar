<template>
  <div id="app">
    <Calendar></Calendar>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Calendar from 'components/calendar/Calendar'

export default {
  name: "App",
  components:{
    Calendar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
