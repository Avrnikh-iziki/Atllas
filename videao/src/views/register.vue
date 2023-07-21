<template>
  <div class="c-login">
    <div class="c-form">
      <div class="title">
        <h3>Register</h3>
      </div>
      <form>
        <input v-model="name" type="string" placeholder="name" />
        <input v-model="user" type="string" placeholder="username" />
        <input v-model="password" type="password" placeholder="password" />
        <h5>{{ this.error }}</h5>
        <input type="button" value="register" @click="submit()" />
      </form>
      <div>
        <h6><a href="/">clike here</a> to back homr page</h6>
      </div>
    </div>
  </div>
</template>
<script>
import { register } from "../api";
export default {
  name: "curent time",
  data() {
    return {
      user: "",
      password: "",
      name: "",
      error: null,
    };
  },
  methods: {
    async submit() {
      let res = await register({
        name: this.name,
        email: this.user,
        password: this.password,
      });
      if (res) window.location.href = "/login";
      else {
        this.error = "fail to register user already exist";
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    },
  },
};
</script>
<style>
.c-login {
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.c-form {
  width: 60%;
  height: 350px;
  background-color: rgb(117, 114, 114);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 1200px) {
  .c-form {
    width: 800px;
  }
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.c-form input {
  height: 30px;
  margin: 3px 0;
  width: 80%;
}
input:nth-child(5) {
  width: 40%;
  background-color: aqua;
  border: 1px solid red;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
}
h3,
h6 {
  color: antiquewhite;
}
h5 {
  height: 15px;
  color: rgb(231, 83, 83);
}
.title {
  margin-bottom: 3px;
}
</style>