<template>
  <div class="d-flex flex-row justify-content-between align-items-center">
    <div class="navbar-brand">
      <img
        src="../../assets/pptuii.png"
        alt="logo pptuii"
        height="100"
        width="auto"
      />
    </div>
    <div class="navbar-menu d-flex flex-row gap-3">
      <router-link
        v-if="
          this.$store.state.session !== null &&
            this.$store.state.session.role === 1
        "
        class="nav-link"
        :to="{ name: 'HomePasien' }"
        >Welcome,
        <b class="text-capitalize">{{
          this.$store.state.session.up_rel[0].nama
        }}</b></router-link
      >
      <router-link
        v-if="
          this.$store.state.session !== null &&
            this.$store.state.session.role === 2
        "
        class="nav-link"
        :to="{ name: 'HomeAdmin' }"
        >Welcome,
        <b class="text-capitalize">{{
          this.$store.state.session.ua_rel[0].nama
        }}</b></router-link
      >
      <router-link class="nav-link" :to="{ name: 'Profil' }"
        >Profil</router-link
      >
      <router-link class="nav-link" :to="{ name: 'Layanan' }"
        >Layanan</router-link
      >
      <router-link class="nav-link" :to="{ name: 'Kontak' }"
        >Kontak</router-link
      >
      <router-link
        v-if="this.$store.state.session === null"
        class="nav-link"
        :to="{ name: 'Login' }"
        >Login</router-link
      >
      <a v-else href="#" @click.prevent="onClick()" class="nav-link">Logout</a>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  methods: {
    onClick() {
      Swal.fire({
        title: "Anda akan logout!",
        icon: "info",
        html: `Apakah anda yakin akan logout ?`,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store.state.session = null;
          Swal.fire({
            icon: "success",
            title: "Yeay! Berhasil Logout",
            html: "Kamu akan dialihkan ke <b>Halaman Home</b>",
          });
          this.$router.push({ name: "Profil" });
          return;
        } else {
          Swal.fire("Logout batal dilakukan", "", "info");
        }
      });
    },
  },
};
</script>

<style scoped>
.nav-link {
  color: #8f546e;
}

.router-link-exact-active {
  color: #000;
  border-bottom: 1px solid #ccc;
}
</style>
