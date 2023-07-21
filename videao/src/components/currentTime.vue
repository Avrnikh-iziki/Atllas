<template>
  <div class="currenttime">
    current time :
    <span>{{ time < 60 ? time : `${parseInt(time / 60)}:${time % 60}` }}</span>
  </div>
</template>
<script>
export default {
  name: "curent time",
  props: ["time"],
};
</script>
<style>
.currenttime {
  padding: 0 2px;
}
.currenttime span {
  font-size: 13px;
  font-weight: bold;
  color: black;
}
</style>