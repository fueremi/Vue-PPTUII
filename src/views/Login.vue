<template>
  <div
    class="container d-flex flex-column min-vh-100 justify-content-center align-items-center"
  >
    <div class="text-center mb-5 pb-5">
      <router-link to="/">
        <img src="../assets/pptuii.png" height="300" alt="" />
      </router-link>
      <h3>Login Pasien</h3>
      <form class="row mt-3 g-3 text-center" @submit.prevent="onSubmit()">
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
            <button type="submit" class="btn btn-primary">
              Sign In
            </button>
            <router-link
              type="button"
              to="/register"
              class="btn btn-outline-primary"
            >
              Register
            </router-link>
          </div>
        </div>
      </form>
    </div>

    <footer class="my-3">
      Copyright &copy; Universitas Islam Indonesia | 2021
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      if (this.email === "" || this.password === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please provide your email & password",
        });
      }

      const result = await this.signIn();

      if (result.length < 1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your email and password didn't match",
        });

        this.email = "";
        this.password = "";
        return;

      } else {
        const params = {
          id: result[0].id,
          nama: result[0].nama,
          email: result[0].email,
          role: 'pasien'
        }
        await this.$store.dispatch('setSession', params)
        Swal.fire({
          icon: "success",
          title: "Yeay! Login Berhasil",
          html: `
            Selamat datang <b class='text-capitalize'> ${result[0].nama} </b> <br>
            Kamu otomatis dialihkan ke halaman utama
          `,
        });
        this.$router.push({'name' : 'HomePasien'})
      }
    },
    async signIn() {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
        query MyQuery {
          pptuii_pasien(where: {_and: {email: {_eq: "${this.email}"}, password: {_eq: "${this.password}"}}}) {
            email
            id
            nama
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data.data.pptuii_pasien;
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
