<template>
  <div class="newlayer">
    <input
      class="anim"
      @click="newproject"
      type="button"
      value="create new project"
    />
    <div class="project-list">
      <div class="project-title">your projects</div>
      <div v-for="(el, index) in this.projects" :key="index">
        <div class="project">
          <div class="project-name">{{ el.name }}</div>
          <div class="project-request">
            <div @click="pickup(el.name, el.id)" class="project-render anim">
              ren
            </div>

            <div
              @click="deleteProject(el.id, el.name)"
              class="project-del anim"
            >
              del
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="change">
      <div class="error">{{ this.error }}</div>
      <input
        class="anim"
        @click="newLayer"
        type="button"
        value="Add New Layer"
      />
      <input class="anim" @click="save" type="button" value="Save project" />

      <div class="project-selected">
        {{ this.Name == null ? this.initialProject.name : this.Name }}
      </div>
    </div>

    <!-- add new layer to project  -->
    <div class="add_new-layer_modal" :style="{ display: this.display }">
      <AddNewLayer
        v-on:addNewLayetDisplay="addNewLayerDisplay"
        :nextLaterName="this.nextLaterName"
      />
    </div>

    <!-- delet project confirm  -->
    <div
      class="project-delet-modal"
      :style="{ display: this.deleConfirmDesplay }"
    >
      <DeletProject
        v-on:display="deleteConfirmDisplay"
        :project="{ projectId: this.projectId, projectName: this.projectName }"
      />
    </div>

    <!-- create project modal -->
    <div
      :style="{ display: this.creteModalDisplay }"
      class="project-creat-modal"
    >
      <CreatNewProject v-on:creteModalDisplay="createProjectDisplay" />
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { savePrject } from "../api";
import DeletProject from "../components/deleproject.vue";
import CreatNewProject from "../components/createProject.vue";
import AddNewLayer from "../components/addNewLayer.vue";
export default {
  components: {
    DeletProject,
    CreatNewProject,
    AddNewLayer,
  },
  data() {
    return {
      deleConfirmDesplay: "none",
      projectId: "",
      projectName: "",
      creteModalDisplay: "none",
      display: "none",
      nextLaterName: "",
      error: "",
      Id: null,
      Name: null,
    };
  },
  setup() {
    const store = useStore();
    const data = computed(() => store.state.layers);
    const projects = computed(() => store.state.projects);
    const initialProject = computed(() => store.state.initialProject);

    function select(id) {
      store.dispatch("project", id);
    }
    return {
      data,
      projects,
      select,
      initialProject,
    };
  },

  methods: {
    deleteConfirmDisplay(paylod) {
      this.deleConfirmDesplay = paylod;
    },
    deleteProject(id, name) {
      this.projectId = id;
      this.projectName = name;
      this.deleConfirmDesplay =
        this.deleConfirmDesplay == "none" ? "inline" : "none";
    },
    createProjectDisplay(paylod) {
      this.creteModalDisplay = paylod;
    },
    addNewLayerDisplay(paylod) {
      this.display = paylod;
    },

    save() {
      const data = JSON.parse(JSON.stringify(this.data));
      const id = this.Id || this.initialProject.id;
      const userId = JSON.parse(localStorage.getItem("user"))?.id;

      const obj = { layer: data };
      if (userId && id) savePrject({ id, obj });
      else {
        this.error = "log in or add first projrct";
        setTimeout(() => {
          this.error = "";
        }, 1000);
      }
    },
    newLayer() {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      const id = this.Id || this.initialProject.id;

      const layerlength = JSON.parse(JSON.stringify(this.data)).length;
      const name = `Layer ${layerlength + 1}`;
      this.nextLaterName = name;
      if (userId && id)
        this.display = this.display == "none" ? "inline !important" : "none";
      else {
        this.error = "log in or add firdt projrct ";
        setTimeout(() => {
          this.error = "";
        }, 1000);
      }
    },
    newproject() {
      this.creteModalDisplay =
        this.creteModalDisplay == "none" ? "inline !important" : "none";
    },

    // change this to get it from data base and pushet it to store
    pickup(name, id) {
      this.display = "none";
      this.Id = id;
      this.Name = name;
      this.select(id);
    },
  },
};
</script>
<style>
.project-title {
  width: 100%;
  text-align: center;
  margin-top: 3px;
  color: rgb(176, 18, 18);
  font-size: 12px;
  font-weight: bold;
}
.error {
  width: 145px;
  margin-left: 5px;
  text-align: center;
  height: 15px;
  color: red;
  font-size: 13px;
  font-weight: bold;
}
.anim:hover {
  transform: scale(0.9);
  transition: 400 ease-in-out;
}
.newlayer {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
}
.newlayer input {
  width: 150px;
  margin-top: 5px;
  border-radius: 5px;
  padding: 3px 8px;
  color: black;
  margin-left: 5px;
  background-color: rgb(128, 245, 239);
  border: none;
  cursor: pointer;
}
.project-selected {
  width: 135px;
  background-color: black;
  margin-top: 5px;
  border-radius: 5px;
  padding: 3px 8px;
  margin-left: 5px;
  color: white;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
}
.change {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 110px;
  justify-content: center;
}

.project-list {
  width: 150px;
  height: 200px;
  margin: 2px 0;
  margin-left: 5px;
  background-color: rgb(230, 237, 236);
  border-radius: 5px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  background: rgb(142, 138, 138) parent;
}

::-webkit-scrollbar-thumb {
  background: red;
}

::-webkit-scrollbar-thumb:hover {
  background: orange;
}

.project {
  display: flex;
  background-color: rgb(28, 203, 195);
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  margin-top: 2px;
}
.project-name {
  background-color: rgb(0, 0, 0);
  color: white;
  width: 100%;
  height: 20px;
  margin-right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 3px;
}
.project-request {
  display: flex;
  justify-content: space-around;
}
.project-request div {
  width: 20px;
  height: 20px;
  margin-right: 2px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 10px;
  justify-content: center;
  background-color: black;
  border-radius: 3px;
  cursor: pointer;
}
.redered {
  width: 130px !important;
  text-align: center;
  background-color: black !important;
  color: white !important;
  cursor: auto !important;
  border: 2px solid rgb(128, 245, 239) !important;
}

/* add new layer modal */
.add_new-layer_modal {
  width: 150px;
  height: 100px;
  top: 300px;
  left: 168px;
  background-color: rgb(128, 245, 239);
  position: absolute;
  border-radius: 6px;
  text-align: center;
}
/* project-delet_modal */

.project-delet-modal {
  width: 150px;
  height: 100px;
  top: 190px;
  left: 168px;
  background-color: rgb(128, 245, 239);
  position: absolute;
  border-radius: 6px;
  text-align: center;
}
/* project creat moda */
.project-creat-modal {
  width: 150px;
  height: 100px;
  top: 80px;
  left: 168px;
  background-color: rgb(128, 245, 239);
  position: absolute;
  border-radius: 6px;
  text-align: center;
}
</style>