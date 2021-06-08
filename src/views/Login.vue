<template>
  <div
    class="container d-flex flex-column min-vh-100 justify-content-center align-items-center"
  >
    <div class="text-center mb-5 pb-5">
      <img src="../assets/pptuii.png" height="300" alt="" />
      <h3>Login</h3>
      <form class="row mt-3 g-3 text-center">
        <div class="col-md-4">
          <label for="email" class="visually-hidden">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            placeholder="email@example.com"
            v-model="email"
          />
        </div>
        <div class="col-md-4">
          <label for="password" class="visually-hidden">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="col-md-4">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" @click="signIn" class="btn btn-primary">
              Sign In
            </button>
            <button type="button" class="btn btn-outline-primary">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>

    <footer>
      Copyright &copy; Universitas Islam Indonesia | 2021
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async getAccount(email, password) {
      const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "18032405",
      };
      const API_QUERY = `
        query MyQuery {
          pptuii_user(where: {email: {_eq: "${email}"}, password: {_eq: "${password}"}}) {
            email
            first_name
            gender
            id
            last_name
            password
            phone_number
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data;
    },

    async signIn() {

      // ? Validasi email kosong
      if ( this.email === '' ){
        this.$toast.open({
          message: `
            <div class="text-dark">
              <p class="text-center">
                <b>Email is Empty</b>
              </p>
              <hr/>
              <p>
                Please make sure you're already entered the email
              </p>
            </div>
          `,
          type: "warning",
          position: "top",
        })
        return
      }
      // ? End of Validasi email kosong

      // ? Validasi format email
      if ( !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))  ){
        this.$toast.open({
          message: `
            <div class="text-dark">
              <p class="text-center">
                <b>Wrong format email!</b>
              </p>
              <hr/>
              <p>
                Please make sure you're already entered the correct email!
              </p>
            </div>
          `,
          type: "warning",
          position: "top",
        })
        return
      }
      // ? End of validasi format email

      // ? Validasi password kosong
      if ( this.password === '' ){
        this.$toast.open({
          message: `
            <div class="text-dark">
              <p class="text-center">
                <b>Password is Empty</b>
              </p>
              <hr/>
              <p>
                Please make sure you're already entered the password
              </p>
            </div>
          `,
          type: "warning",
          position: "top",
        })
        return
      }
      // ? End of Validasi email kosong

      const data = await this.getAccount(this.email, this.password);
      if (data.data.data.pptuii_user.length >= 1) {
        // TODO => Toast => Success => Login succeed
        this.$toast.open({
          message: `
            <p class="text-center">
              <b >Logged In!</b>
            </p>
            <hr/>
            <p>Welcome to PPT UII, <b>${data.data.data.pptuii_user[0].first_name} ${data.data.data.pptuii_user[0].last_name}</b>. You're directing to home page!</p>
          `,
          type: "success",
          position: "top",
          // all of other options may go here
        });
        await this.$router.push({ path: "/" });
      } else if (data.data.data.pptuii_user.length < 1) {
        // TODO => Toast => Warning => Error when data kosong
        this.$toast.open({
          message: `
            <p class="text-center">
              <b>Combination Email & Password is Incorrect</b>
            </p>
            <hr/>
            <p>
              Please make sure you're email and password is correct!
            </p>
          `,
          type: "error",
          position: "top",
        })
      } else {
        // TODO => Toast => Danger => Error when because system
      }
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
}

.btn-primary {
  background-color: #8f546e !important;
  border-color: #8f546e !important;
}

.btn-outline-primary {
  color: #8f546e;
  border-color: #8f546e;
}

.btn-outline-primary:hover {
  background-color: #8f546e !important;
  color: white;
}
</style>
