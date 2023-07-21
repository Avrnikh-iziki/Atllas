<template>
  <div class="player">
    <div
      v-for="(el, index) in this.data"
      :key="index"
      class="parent"
      id="#parent"
    >
      <div
        :id="index"
        @mousemove="draging(index, el)"
        @mouseup="drop(index)"
        @mousedown="drag(index)"
        class="duration"
        :style="style(index, el)"
      >
        <div
          @mousedown="resizestart()"
          @mousemove="resizing(el)"
          @mouseup="resizeend()"
          v-if="index === 0"
          class="resizeicon"
        >
          +
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// vuex store
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  data() {
    return {
      pickedUp: false,
      mouseX: 0,
      resazX: 0,
      initialX: 0,
      index: null,
      resize: false,
    };
  },
  setup() {
    // get layers data from the store
    const store = useStore();
    const data = computed(() => store.state.layers);
    const zom = computed(() => store.state.scal);

    //updat the position of thee layers when we move it
    function update(paylod) {
      store.commit("up", paylod);
    }
    return { data, update, zom };
  },
  methods: {
    style(index, el) {
      //change the position of layers with translate property
      const zom = 1 + Number(this.zom.toFixed(1));
     
      return {
        width: `${((index == 0 ? this.resazX : 0) + el.dur * zom)}px`,
        transform: `translateX(${
          el.pos * zom + (this.index == index ? this.mouseX * zom : 0)
        }px)`,
      };
    },
    drag(index) {
      //when i click layer and get his position in the sccren
      this.pickedUp = true;
      this.index = index;
      this.initialX = event.clientX - this.mouseX;
    },

    draging(index, el) {
      //moving the layer but without cross the limit  of the parent element
      if (this.pickedUp && !this.resize) {
        let doc = document.getElementById("#parent");
        let parentRect = doc.getBoundingClientRect();
        const minX = 0;
        const maxX = parentRect.width;
        this.mouseX = Math.min(
          Math.max(event.clientX - this.initialX, minX - el.pos),
          maxX - el.dur - el.pos
        );
      }
    },
    drop(index) {
      //get the initial  position when mouse up
      this.pickedUp = false;
      this.update([index, this.mouseX, this.resazX]);
      this.index = null;
      this.mouseX = 0;
    },
    
    // change  the size of the first element 
    resizestart() {
      this.resize = true;
      this.initialX = event.clientX - this.mouseX;
    },
    resizing(el) {
      if (this.resize) {
        let doc = document.getElementById("#parent");
        let parentRect = doc.getBoundingClientRect();
        const minX = 0;
        const maxX = parentRect.width;
        this.resazX = Math.min(
          Math.max(event.clientX - this.initialX, minX - el.pos),
          maxX - el.dur - el.pos
        );
      }
    },
    resizeend() {
      this.update([0, this.mouseX, this.resazX]);
      this.resazX = 0;
      this.resize = false;
    },
  },
};
</script>
<style>
.player {
  width: 100%;
  height: 100%;
  margin: 0 2px;
  /* overflow-x: hidden; */
}
.parent {
  height: 35px !important;
  margin-bottom: 2px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: hidden;
}
.duration {
  background-color: green;
  width: 40px;
  height: 30px !important;
  border-radius: 3px;
  cursor: grab;
}
.parent:nth-child(1) div {
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: -5px;
}
.resizeicon {
  width: 10px;
  height: 8px;
  padding: 1px;
  border-radius: 3px;
  background-color: red !important ;
  color: white;
  cursor: crosshair;
  z-index: 20;
}
</style>