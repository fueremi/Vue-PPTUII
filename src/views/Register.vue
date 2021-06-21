<template>
  <div
    class="container d-flex flex-column min-vh-100 justify-content-center align-items-center"
  >
    <div class="text-center mb-5 pb-5">
      <img src="../assets/pptuii.png" height="300" alt="" />
      <h3>Register</h3>
      <form @submit="onSubmit">
        <div class="row g-3 text-start mt-3">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="First name"
              aria-label="First name"
              v-model="user.first_name"
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Last name"
              aria-label="Last name"
              v-model="user.last_name"
            />
          </div>
        </div>
        <div class="row g-3 text-start mt-1">
          <div class="col-md-3">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="user.gender"
            >
              <option value="l">Laki-Laki</option>
              <option value="p">Perempuan</option>
            </select>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="Phone Number"
              aria-label="Phone Number"
              v-model="user.phone_number"
            />
          </div>
          <div class="col-md-5">
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              aria-label="Email"
              v-model="user.email"
            />
          </div>
        </div>
        <div class="row g-3 text-start mt-1">
          <div class="col-md-6">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
              v-model="user.password"
            />
          </div>
          <div class="col-md-6">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              v-model="user.confirm_password"
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

export default {
  name: "Register",
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        gender: "l",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.user.password !== this.user.confirm_password) {
        this.$toast.open({
          message: `
            <p class="text-center">
              <b>Password didn't matches</b>
            </p>
            <hr/>
            <p>
              Please make sure you're enter password correctly!
            </p>
          `,
          type: "error",
          position: "top",
        });

        this.user = {
          gender: this.user.gender,
          password: "",
          confirm_password: "",
        };

        return;
      }

      const newUser = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        gender: this.user.gender,
        phone_number: this.user.phone_number,
        email: this.user.email,
        password: this.user.password,
      };
      console.log(newUser);
      this.addNewUser(newUser);
    },
    async addNewUser(newUser) {
      const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "18032405",
      };
      const API_QUERY = `
        mutation MyMutation {
          insert_pptuii_user(objects: {email: "${newUser.email}", first_name: "${newUser.first_name}", gender: "${newUser.gender}", last_name: "${newUser.last_name}", password: "${newUser.password}", phone_number: "${newUser.phone_number}", role: 1}) {
            affected_rows
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      console.log(data);
      this.user = {
        first_name: "",
        last_name: "",
        gender: "l",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: "",
      };

      this.$toast.open({
        message: `
            <p class="text-center">
              <b >Account Created!</b>
            </p>
            <hr/>
            <p>Please login to our application. Thank you</p>
          `,
        type: "success",
        position: "top",
        // all of other options may go here
      });
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.btn-primary {
  background-color: #8f546e !important;
  border-color: #8f546e !important;
}
</style>
