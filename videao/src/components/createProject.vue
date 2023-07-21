<template>
  <div class="create-new-project-modal">
    <div class="create-new-project">create new project</div>
    <input class="input-project-name" v-model="projectName" type="text" />
    <div class="error-message">{{ this.errorMessage }}</div>
    <input
      @click="createProject"
      class="input-project-name create-project-button"
      type="button"
      value="create"
    />
  </div>
</template>
<script>
import { createproject } from "../api";
export default {
  data() {
    return {
      projectName: "",
      errorMessage: "",
    };
  },
  methods: {
    async createProject() {
      if (this.projectName.length < 5 || this.projectName.length > 100) {
        this.errorMessage = " name length must be in range 5-100";
        setTimeout(() => {
          this.errorMessage = "";
        }, 1000);
      } else {
        const res = await createproject({ name: this.projectName });
        this.$emit("creteModalDisplay", "none");
        if (res) window.location.href = "/";
      }
    },
  },
};
</script>
<style>
.create-new-project-modal {
  width: 100%;
  height: 100%;
}
.create-new-project {
  color: rgb(164, 105, 105);
  padding: 2px 0;
  font-weight: bold;
  font-size: 12px;
  margin-top: 5px;
}
.input-project-name {
  background-color: black !important;
  color: white !important;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  width: 120px !important;
}

.create-project-button {
  width: 60px !important;
}
.error-message {
  margin-top: 2px;
  font-size: 9px;
  height: 15px;
  font-weight: bold;
  margin-bottom: -8px !important;
  color: rgb(158, 3, 3);
}
</style>