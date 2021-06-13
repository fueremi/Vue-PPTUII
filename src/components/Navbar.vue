<template>
  <div>
    <a class="navbar-brand fs-4 text-dark text-wrap" href="#">
      <img
        src="../assets/pptuii.png"
        alt=""
        width="100"
        class="d-inline-block align-middle"
      />
    </a>
    <nav class="nav mt-5 fs-4 text-start fw-bold">
      <router-link class="nav-link" aria-current="page" to="/"
        >Profil</router-link
      >
      <router-link class="nav-link" to="/services">Layanan</router-link>
      <a class="nav-link" href="#">Kontak</a>
      <router-link v-if="this.$store.state.session.id === ''" class="nav-link" to="/login">Login</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

};
</script>

<style>
.router-link-exact-active{
  border-bottom: black 3px solid;
}

.nav-link {
  color: black
}

.nav-link:hover {
  color: #8f546e;
}
</style>
