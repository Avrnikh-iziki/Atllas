<template>
  <div class="container">
    <header style="margin-bottom: 15px">
      <Top />
    </header>
    <Newlayer />
    <div class="timeline base">
      <Timeline v-on:time="currenttime" />
    </div>
    <div class="players base">
      <div >
        <Layer />
      </div>
      <Player />
    </div>
    <div class="buttom base">
      <CurentTime :time="time" />
      <Zomm />
    </div>
  </div>
</template>
<script>
import Newlayer from "../components/newLayer.vue";
import Layer from "../components/layerStack.vue";
import Player from "../components/layerDuration.vue";
import Timeline from "../components/showTime.vue";
import Zomm from "../components/Zoom.vue";
import CurentTime from "../components/currentTime.vue";
import Top from "../components/header.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  name: "Home",
  components: {
    Newlayer,
    Layer,
    Zomm,
    Player,
    Timeline,
    CurentTime,
    Top,
  },
  data() {
    return {
      time: 0,
    };
  },

  setup() {
    const store = useStore();
    const data = computed(() => store.state.layers);
    onMounted(() => {
      store.dispatch("project");
    });

    return { data };
  },
  methods: {
    currenttime(time) {
      this.time = time;
    },
  },
};
</script>
<style>

.base {
  width: 100%;
  height: 20px;
  background-color: rgb(142, 138, 138);
}
.container {
  background-color: white;
  width: 100%;
  height: 100%;
}
.timeline {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.players {
  height: 120px;
  background-color: rgb(222, 226, 231);
  display: flex;
  overflow-y: scroll;
  position: relative;
}
.players div {
  height: auto;
}
.buttom {
  display: flex;
  justify-content: space-between;
}
.save {
  width: 100%;
  text-align: right;
  margin-top: 5px;
}

.save input {
  border: 1px solid red;
  width: 80px;
  text-align: center;
  padding: 2px;
  border-radius: 2px;
  background-color: aqua;
  cursor: pointer;
}
</style>