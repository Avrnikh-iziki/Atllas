<template>
  <div class="c">
    <div v-for="(el, index) in data" :key="el" class="layer">
      {{ `Layer ${index + 1}` }}
    </div>
  </div>
</template>
<script>
//get layers from data
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "layer",
  setup() {
    const store = useStore();
    const data = computed(() => store.state.layers);
    return { data };
  },
};
</script>

<style>
.c {
  /* background-color: rgb(162, 164, 167) !important; */
  background-color: rgb(142, 138, 138) !important;
  width: 70px;
  height: auto !important;
  min-height: 100% !important;
  font-size: 18px;
}
.layer {
  height: 35px !important ;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(209, 183, 149);
}
</style>