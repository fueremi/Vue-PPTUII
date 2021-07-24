<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <Navbar />
      <h3 class="fs-3 mt-5">Layanan Organisasi</h3>
      <div class="row mb-5">
        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5">Rekrutment & Seleksi</b>
            <br />
            Meliputi aktivitas untuk memetakan kompetensi dasar calon karyawan
            dan memberikan rekomendasi sesuai hasil asesmen kepada perusahaan/
            organisasi yang membutuhkan (the right man in the right job)
          </p>

          <router-link to="/pemeriksaan/lo-rs" class="btn btn-primary">Daftar</router-link>
        </div>
        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5">Assessment / Potential Review</b>
            <br />
            Meliputi asesmen kompetensi dengan menggunakan lebih dari 1 metode
            dan multi asesor untuk mengidentifikasi potensi karyawan. layanan
            ini dapat digunakan untuk proses seleksi promosi jabatan maupun
            strategi pengembangan karyawan organisasi/ perusahaan
          </p>

          <router-link to="/pemeriksaan/lo-apr" class="btn btn-primary">Daftar</router-link>
        </div>

        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5">Pengembangan Sistem Organisasi</b>
            <br />
            Meliputi pendampingan kepada organisasi/ perusahaan yang membutuhkan
            layanan penataan sistem organisasi yang efektif, dan sistematis,
            mulai dari tahap pengembangan (development), implementasi hingga
            perawatan (maintenance)
          </p>

          <router-link to="/pemeriksaan/lo-pso" class="btn btn-primary">Daftar</router-link>
        </div>

        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5"
              >Pelatihan Pengembangan SDM (indoor maupun outdoor)</b
            >
            <br />
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Team Building</li>
              <li class="list-group-item">Effective Communication</li>
              <li class="list-group-item">Leadership</li>
              <li class="list-group-item">Service Excellent</li>
              <li class="list-group-item">by Request</li>
            </ul>
          </p>

          <router-link to="/pemeriksaan/lo-pps" class="btn btn-primary">Daftar</router-link>
        </div>
      </div>
      <hr>

      <h3 class="fs-3 mt-5">Layanan Individu & Keluarga</h3>
      <div class="row mb-5">
        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5">Konseling Individu</b>
            <br />
            Layanan ini diperuntukkan bagi individu yang menemukan hambatan dalam menemukan potensi diri, maupun yang memiliki persoalan pribadi yang membutuhkan layanan profesional dari Psikolog
          </p>

          <router-link to="/pemeriksaan/lik-ki" class="btn btn-primary">Daftar</router-link>
        </div>
        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5">Konseling Keluarga</b>
            <br />
            Layanan ini diperuntukkan bagi keluarga yang memiliki problem yang ingin diselesaikan dengan bantuan profesional, berupa konseling keluarga
          </p>

          <router-link to="/pemeriksaan/lik-kk" class="btn btn-primary">Daftar</router-link>
        </div>

        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5">Penguatan Keluarga</b>
            <br />
            Layanan ini merupakan bentuk dari program aktivitas keluarga yang bertujuan untuk menguatkan ikatan antar anggota keluarga
          </p>

          <router-link to="/pemeriksaan/lik-pk" class="btn btn-primary">Daftar</router-link>
        </div>

        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5"
              >Penelusuran minat & bakat siswa (individu & klasikal)</b
            >
            <br />
            Layanan ini berupa penelusuran potensi kecerdasan, serta minat dan bakat siswa
          </p>

          <router-link to="/pemeriksaan/lik-pmbs" class="btn btn-primary">Daftar</router-link>
        </div>

        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5"
              >Pendampingan karier/ penjurusan</b
            >
            <br />
            Layanan ini diperuntukkan khusus bagi siswa tingkat menengah atas yang membutuhkan pendampingan untuk menentukan pilihan karier yang tepat
          </p>

          <router-link to="/pemeriksaan/lik-pkp" class="btn btn-primary">Daftar</router-link>
        </div>

        <div class="col-lg-6 mt-5">
          <p style="text-align: justify">
            <b class="fs-5"
              >Peningkatan kualitas masyarakat (Community development)</b
            >
            <br />
            Layanan ini bertujuan untuk memenuhi kebutuhan masyakat/ komunitas yang semaki spesifik dan beragam seperti pelatihan pra-nikah, workshop parenting, dll
          </p>

          <router-link to="/pemeriksaan/lik-pkm" class="btn btn-primary">Daftar</router-link>
        </div>
      </div>
      <hr>

      <h3 class="fs-3 mt-5">Online Assessment</h3>
      <div class="row mb-5">
        <div class="col-lg mt-5">
          <ul class="list-group">
            <li class="list-group-item list-group-item-primary text-center mt-1">Tes Potensi Intelektual</li>
            <li class="list-group-item list-group-item-primary text-center mt-1">Tes Minat / Bakat</li>
            <li class="list-group-item list-group-item-primary text-center mt-1">Tes Sikap Kerja</li>
            <li class="list-group-item list-group-item-primary text-center mt-1">Tes Kepribadian</li>
            <li class="list-group-item list-group-item-primary text-center mt-1">Lain-lain</li>
          </ul>

          <router-link to="/pemeriksaan/oa" class="btn btn-primary mt-3">Daftar</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'  

export default {
  name: "Service",
  components: {
    Navbar
  },
  // created() {
  //   if (this.$store.state.session.id === "") {
  //     this.$router.push("/login");
  //   }
  // },
};
</script>

<style scoped>
.btn-primary {
  background-color: #8f546e;
  border-color: #8f546e;
}

.list-group-item-primary{
  color: #fff;
  background-color: #8f546e;
  border-color: #fff;
}
</style>
