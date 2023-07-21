<template>
  <div class="zom">
    <input @click="up()" type="button" value="+" />
    <input @click="down()" type="button" value="-" />
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const scal = computed(() => store.state.scal);
    function up() {
      store.commit("zom", "up");
    }
    function down() {
      store.commit("zom", "down");
    }
    return {
      up,
      down,
      scal,
    };
  },
};
</script>
<style>
.zom {
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.zom input {
  border: none;
  border-radius: 1px;
  width: 14px;
  height: 14px;
  padding: 2px;
  color: aqua;
  font-size: 10px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  cursor: pointer;
}
</style>