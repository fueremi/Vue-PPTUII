<template>
  <div>
    <router-link
      class="navbar-brand fs-4 text-dark text-wrap"
      :to="{ name: 'Home' }"
    >
      <img
        src="../assets/pptuii.png"
        alt=""
        width="100"
        class="d-inline-block align-middle"
      />
    </router-link>
    <nav class="nav mt-5 fs-4 text-start fw-bold">
      <a class="nav-link" aria-current="page"
        >Welcome {{ this.$store.state.session.up_rel[0].nama }} </a
      >
      <router-link class="nav-link" aria-current="page" :to="{ name: 'Profil' }"
        >Profil</router-link
      >
      <router-link class="nav-link" :to="{ name: 'Layanan' }"
        >Layanan</router-link
      >
      <a class="nav-link" href="#">Kontak</a>
      <router-link
        v-if="this.$store.state.session === null"
        class="nav-link"
        to="/login"
        >Login</router-link
      >
      <a
        v-if="this.$store.state.session !== null"
        class="nav-link"
        @click="logout"
        >Logout</a
      >
    </nav>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  methods: {
    logout() {
      Swal.fire({
        title: "<strong>Anda akan logout!</strong>",
        icon: "info",
        html: `
          <p>Apakah anda yakin akan logout ?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store.state.session = null;
          this.$toast.open({
            message: `
            <p class="text-center">
              <b>Berhasil Logout</b>
            </p>
            <hr/>
            <p>Akun anda berhasil logout. </p>
          `,
            type: "success",
            position: "top",
            // all of other options may go here
          });
        } else {
          Swal.fire("Logout batal dilakukan", "", "info");
        }
      });
    },
  },
};
</script>

<style>
.router-link-exact-active {
  border-bottom: black 3px solid;
}

.nav-link {
  color: black;
}

.nav-link:hover {
  color: #8f546e;
}
</style>
