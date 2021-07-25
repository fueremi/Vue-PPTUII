<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <Navbar />
      <div class="row mt-5">
        <div
          class="d-flex flex-column justify-content-around align-items-center"
        >
          <div class="main w-50">
            <h3 class="text-center">Register Akun Pasien</h3>
            <form class="mt-5" @submit.prevent="onSubmit()">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="nama" class="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nama"
                    placeholder="Masukkan nama lengkap anda"
                    v-model="nama"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label" for="jenis_kelamin"
                    >Jenis Kelamin</label
                  >
                  <select
                    class="form-select"
                    id="jenis_kelamin"
                    v-model="jenis_kelamin"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="l">Laki-Laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="hp" class="form-label">Nomor Handphone</label>
                  <input
                    type="text"
                    class="form-control"
                    id="hp"
                    placeholder="Masukkan nomor hp anda"
                    v-model="hp"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Masukkan email anda"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-2">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Masukkan username anda"
                    v-model="username"
                  />
                </div>
                <div class="col-md-6 mb-2">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Masukkan password anda"
                    v-model="password"
                  />
                </div>
              </div>
              <small class="mb-3">
                Sudah punya akun ?
                <router-link :to="{ name: 'Login' }"
                  ><b>Login Disini</b></router-link
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
  name: "Register",
  components: {
    Navbar,
  },
  data() {
    return {
      nama: "",
      jenis_kelamin: "",
      hp: "",
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      if (
        this.nama === "" ||
        this.jenis_kelamin === "" ||
        this.hp === "" ||
        this.email === "" ||
        this.username === "" ||
        this.password === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Pastikan semua field input sudah terisi",
        });
        return;
      }

      const resultNewUser = await this.submitNewUser();
      if (resultNewUser.data) {
        const resultNewPasien = await this.submitNewPasien(
          resultNewUser.data.insert_pptuii_user.returning[0].id
        );
        if (resultNewPasien.affected_rows > 0) {
          Swal.fire({
            icon: "success",
            title: "Yeay! Akun berhasil dibuat",
            html:
              "Silahkan Login. Kamu akan diarahkan ke <b>Halaman Login</b>!",
          });

          this.$router.push({ name: "Login" });
          return;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Terdapat masalah dengan sistem. Silahkan hubungi admin",
          });
          return;
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username/Email sudah digunakan!",
        });
        return;
      }
    },

    async submitNewUser() {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
      mutation MyMutation {
        insert_pptuii_user(objects: {
          email: "${this.email}", 
          password: "${this.password}", 
          role: 1, 
          username: "${this.username}"
        }) 
        {
          affected_rows
          returning {
            id
          }
        }
      }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data;
    },
    async submitNewPasien(params) {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
      mutation MyMutation {
        insert_pptuii_pasien(objects: {
          hp: "${this.hp}", 
          jenis_kelamin: "${this.jenis_kelamin}", 
          nama: "${this.nama}", 
          user_id: "${params}"
        }) 
        {
          affected_rows
        }
      }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data.data.insert_pptuii_pasien;
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
