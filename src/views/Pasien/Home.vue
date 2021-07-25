<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="d-flex flex-row gap-3 mt-4">
        <div class="col-md-4 border p-3">
          <h4 class="text-center">List Booking Pemeriksaanmu</h4>
          <div class="mb-4">
            <p class="mt-4">Tidak ada list booking pemeriksaan dalam minggu ini</p>
          </div>
        </div>
        <div class="col-md-4 border p-3">
          <h4 class="text-center">Booking Pemeriksaan</h4>
          <form class="mb-4" @submit.prevent="onSubmit()">
            <div class="mt-4 mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Tanggal & Waktu</label
              >
              <Datetime
                type="datetime"
                v-model="datetimeEmpty"
                input-class="my-class"
                value-zone="Asia/Jakarta"
                zone="Asia/Jakarta"
                :format="{
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZoneName: 'short',
                }"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                :hour-step="1"
                :minute-step="15"
                :min-datetime="minDatetime"
                :week-start="7"
                use12-hour
                auto
                placeholder="Pilih Waktu Periksa"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="jenis_pemeriksaan" class="form-label"
                >Jenis Layanan</label
              >
              <select
                id="jenis_pemeriksaan"
                class="form-select"
                aria-label="Default select example"
                v-model="jenisPemeriksaan"
              >
                <option value="">Silahkan pilih jenis layanan</option>
                <option value="lo-rs"
                  >Layanan Organisasi - Rekrutment & Seleksi</option
                >
                <option value="lo-apr"
                  >Layanan Organisasi - Assessment / Potensial Review</option
                >
                <option value="lo-pso"
                  >Layanan Organisasi - Pengembangan Sistem Organisasi</option
                >
                <option value="lo-pps"
                  >Layanan Organisasi - Pelatihan Pengembangan SDM</option
                >
                <option value="lik-ki"
                  >Layanan Individu & Keluarga - Konseling Individu</option
                >
                <option value="lik-kk"
                  >Layanan Individu & Keluarga - Konseling Keluarga</option
                >
                <option value="lik-pk"
                  >Layanan Individu & Keluarga - Penguatan Keluarga</option
                >
                <option value="lik-pmbs"
                  >Layanan Individu & Keluarga - Penelusuran Minat & Bakat
                  Siswa</option
                >
                <option value="lik-pkp"
                  >Layanan Individu & Keluarga - Pendampingan Karier/
                  Penjurusan</option
                >
                <option value="lik-pkm"
                  >Layanan Individu & Keluarga - Peningkatan Kualitas
                  Masyarakat</option
                >
                <option value="oa">Online Assessment</option>
              </select>
            </div>
            <div class="mb-3 d-block">
              <input class="btn btn-primary btn-block" type="submit" />
            </div>
          </form>
        </div>
        <div class="col-md-4 border p-3">
          <h4 class="text-center">Jadwal Pemeriksaan Hari ini</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import HomeNavbar from "@/components/Home/Navbar";
import Swal from "sweetalert2";

export default {
  name: "HomePasien",
  components: {
    HomeNavbar,
    Datetime,
  },
  data() {
    return {
      datetimeEmpty: "",
      jenisPemeriksaan: this.$route.params.jenis
        ? this.$route.params.jenis
        : "",
    };
  },
  computed: {
    minDatetime() {
      const event = new Date(Date.now());
      event.setDate(event.getDate() + 1);
      return event.toISOString();
    },
  },
  created() {
    if (this.$store.state.session === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: "Anda tidak memiliki hak <br> untuk mengakses halaman ini",
      });
      this.$router.push({ name: "Profil" });
      return;
    }

    if (this.$route.params.jenis) {
      Swal.fire({
        icon: "info",
        title: "Info",
        html:
          "Kamu dialihkan ke <b>Halaman Home</b> <br> Silahkan Pilih Tanggal & Waktu Pemeriksaan",
      });
    }
  },
};
</script>

<style>
.my-class {
  width: 100%;
}

.my-class:hover {
  cursor: pointer;
}
</style>
