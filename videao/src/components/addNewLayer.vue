<template>
  <div class="add-new-layer">
    <div class="label-input">
      <div>
        <div class="lanel-name">Name:</div>
        <div class="layer-name">{{ this.nextLaterName }}</div>
      </div>
      <div>
        <div class="lanel-name">dur(s):</div>
        <input class="inputs" v-model="dur" type="text" />
      </div>
      <div>
        <div class="lanel-name">pos(s):</div>
        <input class="inputs" v-model="pos" type="text" />
      </div>
    </div>
    <input @click="add" class="add_button anim" type="button" value="add" />
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  props: ["nextLaterName"],
  data() {
    return {
      dur: 0,
      pos: 0,
    };
  },
  setup() {
    const store = useStore();
    function addLayer(layer) {
      store.commit("addlayer", layer);
    }
    return {
      addLayer,
    };
  },
  methods: {
    add() {
      if (this.dur) {
        this.$emit("addNewLayetDisplay", "none");
        this.addLayer({ dur: Number(this.dur), pos: Number(this.pos) });
      }
    },
  },
};
</script>
<style>
.add-new-layer {
  width: 100%;
  height: 100%;
}
.label-input div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}
.inputs {
  width: 30% !important;
  height: 10px !important;
  background-color: black !important;
  color: white !important;
  text-align: center;
  font-size: 10px;
}
.layer-name {
  width: 60px;
  background-color: black;
  height: 16px;
  color: white;
  text-align: center;
  font-size: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lanel-name {
  width: 35%;
  height: 15px;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: right;
}
.add_button {
  background-color: red !important;
  margin-top: 10px !important;
  width: 50% !important;
}
</style>