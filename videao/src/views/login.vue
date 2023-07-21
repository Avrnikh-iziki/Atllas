<template>
  <div class="c-login">
    <div class="c-form">
      <div>
        <h3>Login</h3>
      </div>
      <form>
        <input v-model="user" type="string" placeholder="username" />
        <input v-model="password" type="password" placeholder="password" />
        <h5>{{ this.error }}</h5>
        <input type="button" value="login" @click="submit()" />
      </form>
      <div>
        <div class="register">
          <a href="/register">clike here</a> to register
        </div>
        <div class="backhome"><a href="/">clike here</a> to back homr page</div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "../api";

export default {
  name: "curent time",
  data() {
    return {
      user: "",
      password: "",
      error: null,
    };
  },

  methods: {
    async submit() {
      let res = await login({ email: this.user, password: this.password });
      if (res) window.location.href = "/";
      else {
        this.error = " wrong password or username";
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
  height: 300px;
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
input:nth-child(4) {
  width: 40%;
  background-color: aqua;
  border: 1px solid red;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px !important;
}
h3,
h6 {
  color: antiquewhite;
  margin-bottom: -2px;
}
.register,
.backhome {
  margin-top: 2px;
  font-size: 10px;
  color: white;
}
h5 {
  height: 15px;
  color: rgb(231, 83, 83);
}
</style>