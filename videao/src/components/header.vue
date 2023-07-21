<template>
  <div class="head">
    <!-- heder section -->
    <div class="right">
      <div class="name"><span>A</span>tlas</div>
      <div class="email">{{ user ? user.email : "login please" }}</div>
    </div>
    <div class="left">
      <div class="login anim" style="disab"><a href="/login">Login</a></div>
      <div @click="logout()" class="login anim">Logout</div>
      <div @click="modal()" class="login anim">Delete</div>
    </div>

    <!-- confirm section -->
    <div class="delete-conf" :style="style()">
      <div>
        <h5>
          Type <span>{{ user?.email }}</span
          > to confirm
        </h5>
      </div>
      <input v-model="text" type="text" />
      <h6 class="delete-text">please enter the text as it is to confirm</h6>
      <div class="delete-button">
        <input class="del-con anim" @click="delet()" type="button" value="delete" />
        <input class="del-con anim" @click="concel()" type="button" value="concel" />
      </div>
    </div>
  </div>
</template>
<script>
// request api wuth fetch to data base

import { logout } from "../api";
import { deletaccount } from "../api";

export default {
  name: "heade",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      display: true,
      text: "",
    };
  },

 
  methods: {
    style() {
      // trigger the model when you click the delete in nave bar
      return {
        display: this.display ? "none" : "inline !important",
      };
    },

    concel() {
      // concel the modal
      this.display = true;
    },
    async delet() {
      //check if the confirm  text is correct
      const confirm = Number(this.user.email == this.text);
      const res = await deletaccount({ confirm });
      if(res) window.location.href = "/"
    },
    async logout() {
      //logout send the request , change token in the vuex to null en delle localstorge item
      const res = await logout();
      if (res) window.location.href = "/login";
    },
    modal() {
      this.display = this.user ? !this.display : true;
    },
  },
};
</script>
<style>
.head {
  width: 100%;
  height: 50px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  text-align: center;
  position: relative;
}
.right {
  margin-left: 10px;
  
}
.name{
  min-width: 100px;
  font-weight: bold;
  font-style: italic;
}
.name span{
  
  font-size: 20px;
}
.email{
  font-size: 11px;
  font-weight: bold;
  color: red;
}
.left {
  display: flex;
  width: 120px;
  align-items: center;
  justify-content: space-around;
}
.login {
  border-bottom: 1px solid red;
  padding: 2px 2px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
.login a {
  text-decoration: none;
  color: white;
}

/* delete acount modal  */
.delete-conf {
  position: absolute;
  width: 200px;
  height: 140px;
  background-color: rgb(100, 86, 86);
  top: 45px;
  right: 0px;
}
.del-con {
  border: none;
  height: 20px;
}

.delete-text {
  color: red;
  margin-top: 2px;
  margin-bottom: 5px;
}
.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-button input {
  cursor: pointer;
  margin-left: 3px;
}
span {
  color: rgb(17, 210, 78);
}

.anim:hover {
  transform: scale(0.9);
  transition: 500 ease-in-out;
}
</style>