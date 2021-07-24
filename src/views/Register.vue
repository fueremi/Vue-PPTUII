<template>
  <div
    class="container d-flex flex-column min-vh-100 justify-content-center align-items-center"
  >
    <div class="text-center">
      <img src="../assets/pptuii.png" height="300" alt="" />
      <h3>Register Pasien</h3>
      <form @submit.prevent="onSubmit()">
        <div class="row g-3 text-start mt-3">
          <div class="col-md-8">
            <input
              type="text"
              class="form-control"
              placeholder="Nama Lengkap..."
              aria-label="Nama Lengkap"
              v-model="nama"
            />
          </div>
          <div class="col-md-4">
            <select
              class="form-select"
              aria-label="Pilih Jenis Kelamin"
              v-model="jenis_kelamin"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="l">Laki-Laki</option>
              <option value="p">Perempuan</option>
            </select>
          </div>
        </div>
        <div class="row g-3 text-start mt-1">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Handphone..."
              aria-label="Handphone"
              v-model="hp"
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Email..."
              aria-label="Email"
              v-model="email"
            />
          </div>
        </div>
        <div class="row g-3 text-start mt-1">
          <div class="col-md-6">
            <input
              type="password"
              class="form-control"
              placeholder="Password..."
              aria-label="Password"
              v-model="password"
            />
          </div>
          <div class="col-md-6">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password..."
              aria-label="Confirm Password"
              v-model="confirm_password"
            />
          </div>
        </div>
        <div class="row g-3 text-start mt-1">
          <div class="d-grid gap-2">
            <input type="submit" class="btn btn-primary btn-block" />
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
import Swal from 'sweetalert2'

export default {
  name: "Register",
  data() {
    return {
      nama: '',
      jenis_kelamin: '',
      hp: '',
      email: '',
      password: '',
      confirm_password: ''
    };
  },
  methods: {
    onSubmit() {
      // ? Validasi form
      if (this.nama === '' || this.jenis_kelamin === '' || this.hp === '' || this.email === '' || this.password === '' || this.confirm_password === ''){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please input all field",
        });
        return
      }
      if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))) {
        Swal.fire({
          icon: "error",
          title: "Oops Something Went Wrong...",
          text: "Please provide valid email",
        });
        this.email = ''
        return
      }
      if (this.password !== this.confirm_password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password and Confirm Password didn't match",
        });
        this.password = ''
        this.confirm_password = ''
        return;
      }

      // ? Panggil fungsi submit ke database


    },
    submitPasienBaru() {
      // TODO Buat API untuk input ke Database
    }
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #8f546e !important;
  border-color: #8f546e !important;
}
</style>
