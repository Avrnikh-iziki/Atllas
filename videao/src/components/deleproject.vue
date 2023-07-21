<template>
  <div class="delete-project-container">
    <div class="delete-project">
      tape
      <span>
        {{
          this.project.projectName ? `${this.project.projectName}` : ""
        }}</span
      >
      to confirm
    </div>
    <input
      class="conformatin-string"
      v-model="confirmationString"
      type="text"
    />
    <div class="important">write the string as it is</div>
    <div class="confirm-concel">
      <button class="confirm anim" @click="confirm">confirm</button>
      <button class="concel anim" @click="concel">concel</button>
    </div>
  </div>
</template>
<script>
import { deletproject } from "../api";
export default {
  name: "deleteProjectModal",
  props: ["project"],
  data() {
    return {
      projectTitle: "",
      confirmationString: "",
    };
  },
  methods: {
    async confirm() {
      let confirm = Number(
        this.project.projectName == this.confirmationString.trim()
      );
      const id = this.project.projectId;
      await deletproject({ id, confirm });
      this.$emit("display", "none");
    },
    concel() {
      this.$emit("display", "none");
    },
  },
};
</script>
<style>
.anim:hover {
  transform: scale(0.9);
  transition: 400 ease-in-out;
}
.delete-project-container {
  width: 100%;
  height: 100%;
  font-size: 11px;
  padding: 3px 1px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}
.delete-project {
  width: 100%;
  height: 20px;
  color: rgb(170, 15, 15);
}
.conformatin-string {
  width: 80% !important;
  background-color: black !important;
  color: white !important;
  font-size: 11px !important;
  text-align: center;
}
.confirm-concel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.important {
  color: rgb(90, 7, 7);
}
.confirm {
  border: none;
  border-radius: 2px;
  color: white;
  background-color: red;
  cursor: pointer;
}
.concel {
  border: none;
  border-radius: 2px;
  color: red;
  background-color: white;
  cursor: pointer;
}
</style>