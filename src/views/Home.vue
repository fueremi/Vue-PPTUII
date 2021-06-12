<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <a class="navbar-brand fs-4 text-dark text-wrap" href="#">
        <img
          src="../assets/pptuii.png"
          alt=""
          width="100"
          class="d-inline-block align-middle"
        />
      </a>
      <nav class="nav mt-5 fs-4 text-start fw-bold">
        <router-link class="nav-link active" aria-current="page" to="/">Profile</router-link>
        <router-link class="nav-link" to="/services">Service</router-link>
        <a class="nav-link" href="#">Contact</a>
      </nav>
      <div class="row mt-5">
        <div class="col-md-6">
          <p style="text-align: justify" class="fs-6">
            <b class="fs-4"
              >Pusat Psikologi Terapan Universitas Islam Indonesia (PPT UII)</b
            >
            <br />
            adalah sebuah Lembaga yang bernaung dibawah Jurusan Psikologi,
            Universitas Islam Indonesia. PPT UII hadir dengan jasa layanan
            psikologi yang ilmiah dan professional, yang berlandaskan pada
            nilai-nilai Islami yang holistik, sesuai dengan Visi Lembaga ini
          </p>

          <p style="text-align: justify" class="mt-5 fs-6">
            <b class="fs-4">Sejak 2001</b> <br />
            PPT UII telah membuktikan kiprah profesionalnya di masyarakat, baik
            instutusi, organisasi, perusahaan, sekolah, maupun individu yang
            menjadi mitra PPT UII
          </p>

          <p style="text-align: justify" class="mt-5 fs-6">
            <b class="fs-4">Komitmen Kami</b> <br />
            Komitmen kami adalah untuk memberikan kemanfaatan bagi masyarakat
            dalam bidang kesehatan mental yang holistic, mencakup aspek fisik,
            mental, social, dan spiritual. <br />
            Komitmen ini hadir dalam layanan-layanan yang dapat diakses oleh
            berbagai pihak yang berkepentingan, sesuai dengan tujuan dan
            kebutuhan, serta dibawah kode etik profesi dan ilmuwan Psikologi.
          </p>
        </div>
        <div class="col-md-6 text-center">
          <img src="../assets/pptuii.png" alt="" width="350">
          <p class="text-center fst-italic d-inline-block w-50">
            Jasa layanan psikologi yang ilmiah dan professional yang berlandaskan pada nilai-nilai Islami yang holistik
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  // created() {
  //   if (this.$store.state.session.id === "") {
  //     this.$router.push("/login");
  //   }
  // },
};
</script>

<style>
.nav-link {
  color: rgb(15, 15, 15);
  padding: 0;
  margin-right: 10px;
}

.active {
  border-bottom: 3px black solid;
}

.nav-link:hover {
  color: #8f546e;
}
</style>
