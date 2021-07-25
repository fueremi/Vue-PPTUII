<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <Navbar />
      <div class="row mt-5">
        <div
          class="d-flex flex-column justify-content-around align-items-center"
        >
          <div class="main w-25">
            <h3 class="text-center">Login</h3>
            <form class="mt-5" @submit.prevent="onSubmit()">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Masukkan username anda"
                  v-model="username"
                />
              </div>
              <div class="mb-2">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Masukkan password anda"
                  v-model="password"
                />
              </div>
              <small class="mb-3">
                Belum punya akun ? Silahkan
                <router-link :to="{ name: 'Register' }"
                  ><b>Daftar Disini</b></router-link
                >
              </small>
              <div class="mt-3">
                <input type="submit" class="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "@/components/Home/Navbar";

export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      if (this.username === "" || this.password === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tolong masukkan username dan password anda!",
        });
        return;
      }

      const result = await this.signIn();

      if (result.length < 1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username dan password anda tidak sesuai!",
        });

        this.username = "";
        this.password = "";
        return;
      } else {
        this.$store.dispatch("setSession", result[0]);

        // ? Jika role pasien
        if (this.$store.state.session.role === 1) {
          Swal.fire({
            icon: "success",
            title: "Yeay! Login Berhasil",
            html: `
              Selamat datang <b class='text-capitalize'> ${result[0].up_rel[0].nama} </b> <br>
              Kamu otomatis dialihkan ke halaman utama
            `,
          });
          this.$router.push({ name: "HomePasien" });
          return;

          // ? Jika role admin
        } else if (this.$store.state.session.role === 2) {
          Swal.fire({
            icon: "success",
            title: "Yeay! Login Berhasil",
            html: `
              Selamat datang <b class='text-capitalize'> ${result[0].ua_rel[0].nama} </b> <br>
              Kamu otomatis dialihkan ke halaman utama
            `,
          });
          this.$router.push({ name: "HomeAdmin" });
          return;
        } else if (this.$store.state.session.role === 3) {
          console.log("Psikolog");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html:
              "Terjadi kesalahan dengan aplikasi, <br> Silahkan refresh halaman ini!",
          });
        }
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
        pptuii_user(where: {_and: {username: {_eq: "${this.username}"}, password: {_eq: "${this.password}"}}}) {
          id
          role
          username
          email
          up_rel {
            nama
          }
          ua_rel {
            nama
          }
        }
      }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data.data.pptuii_user;
    },
  },
};
</script>

<style scoped>
.main a {
  text-decoration: none;
  color: #8f546e;
}

.main a:hover {
  opacity: 0.75;
}
</style>
