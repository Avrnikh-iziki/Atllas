<template>
  <div class="time" id="#par">
    <div
      v-for="(el, index) in this.degradation"
      :key="index"
      class="degradation"
    >
      <div class="degrate" :style="style1(index)">
      </div>
     
    </div>
    <div
      @mousemove="draging()"
      @mouseup="drop()"
      @mousedown="drag()"
      :style="style()"
      class="partime"
    >
      <div class="time-head" />
      <div class="time-body" />
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const total = computed(() => store.state.total);
    const zom = computed(() => store.state.scal);
   
    return { total, zom };
  },
  data() {
    return {
      pickedUp: false,
      mouseX: 0,
      initialX: 0,
      secondinpxs: 0,
      degradation: [],
      changingscal: 5,
    };
  },
  // create degradation wen window size change
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  mounted() {
    this.myEventHandler();
  },
  methods: {
    myEventHandler(e) {
      let width = document.getElementById("#par").getBoundingClientRect().width;
      this.degradation = Array.from(
        Array(Math.floor(width / 5)).keys()
      );
     
    },
  // degradution style 
    style1(index) {
      return {
        transform: `translateX(${index * (5+ this.zom)}px)`,
        width: "1px",
        height: `${index % 6 == 0 ? 10 : index % 3 == 0 ? 7 : 5}px`,
        "background-color": "black",
      };
    },
    currenttime() {
      const zom = 1 + Number(this.zom.toFixed(1));
      this.$emit("time", Number((this.mouseX/ zom).toFixed(0)));
    },
    style() {
      const zom = 1 + Number(this.zom.toFixed(1));
      //change the position of layers with translate property
      return {
        transform: `translateX(${this.mouseX * zom}px)`,
      };
    },
    drag() {
      //when i click layer and get his position in the sccren
      this.pickedUp = true;
      this.initialX = event.clientX - this.mouseX;
    },

    draging() {
      //moving the layer but without cross the limit  of the parent element
      if (this.pickedUp) {
        let doc = document.getElementById("#par");
        let parentRect = doc.getBoundingClientRect();
        const minX = 0;
        const maxX = parentRect.width;
        this.mouseX = Math.min(
          Math.max(event.clientX - this.initialX, minX),
          maxX - 15
        );
        this.currenttime();
      }
    },
    drop() {
      //get the initial  position when mouse up
      this.pickedUp = false;
      this.index = null;
    },
  },
};
</script>
<style>
.time {
  width: calc(100% - 70px);
  position: relative;
}
.partime {
  position: absolute;
  width: 10px;
  height: 130px;
  z-index: 10;
  top: 10px;
  left: -5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time-head {
  height: 10px;
  width: 10px;
  background-color: red;
  cursor: grab;
  border-radius: 50%;
}
.time-body {
  width: 2px;
  height: 120px;
  background-color: red;
}
.degradation {
  width: 100%;
  height: 20px;
  position: absolute;
  border-top: 2px solid black;
  overflow: hidden;
 
  display: flex;
  flex-direction: row;
}

</style>