<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="d-flex flex-row gap-3 mt-4">
        <div class="col-md-4 border p-3">
          <h4 class="text-center">List Booking Pemeriksaanmu</h4>
          <div class="mb-4">
            <p class="mt-4" v-if="pemeriksaan.length === 0">
              Tidak ada list booking pemeriksaan dalam minggu ini
            </p>
            <div class="mt-4" v-else>
              <p v-for="pemeriksaan in pemeriksaan" :key="pemeriksaan.id">
                Data {{ pemeriksaan.jenis_pemeriksaan }} -
                {{ pemeriksaan.tanggal_pemeriksaan }} - {{ pemeriksaan.status }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 border p-3">
          <h4 class="text-center">Booking Pemeriksaan</h4>
          <form class="mb-4" @submit.prevent="onSubmit()">
            <div class="mt-4 mb-3">
              <label for="tanggal_pemeriksaan" class="form-label"
                >Tanggal & Waktu</label
              >
              <Datetime
                id="tanggal_pemeriksaan"
                type="datetime"
                v-model="tanggalPemeriksaan"
                input-class="my-class"
                value-zone="Asia/Jakarta"
                zone="Asia/Jakarta"
                format="DDDD, hh:mm"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                :hour-step="1"
                :minute-step="15"
                :min-datetime="minDatetime"
                :week-start="7"
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
          <div class="mb-4">
            <p class="mt-4">
              Tidak ada list pemeriksaan hari ini!.
              <router-link :to="{ name: 'Layanan' }"
                ><small>Ayo booking pemeriksaan</small></router-link
              >
            </p>
          </div>
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
import axios from "axios";
import moment from "moment";
import { Settings as LuxonSettings } from "luxon";
LuxonSettings.defaultLocale = "id-ID";

export default {
  name: "HomePasien",
  components: {
    HomeNavbar,
    Datetime,
  },
  data() {
    return {
      tanggalPemeriksaan: "",
      jenisPemeriksaan: this.$route.params.jenis
        ? this.$route.params.jenis
        : "",
      pemeriksaan: [],
    };
  },
  methods: {
    async onSubmit() {
      if (this.tanggalPemeriksaan === "" || this.jenisPemeriksaan === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html:
            "Tolong pilih <b>Tanggal Pemeriksaan</b> <br>dan <b>Jenis Pemeriksaan</b>!",
        });
        return;
      }

      Swal.fire({
        title: "<strong>Periksa Kembali <br> Jenis & Jadwal Layanan</strong>",
        icon: "info",
        width: "50vw",
        html: `
          <div class="row text-start">
            <div class="col-lg-3 text-end">
              Jenis
            </div>
            <div class="col-lg-9">
              : ${
                this.jenisPemeriksaan === "lo-rs"
                  ? "Layanan Organisasi Rekrutment & Seleksi"
                  : this.jenisPemeriksaan === "lo-apr"
                  ? "Layanan Organisasi - Assessment / Potensial Review"
                  : this.jenisPemeriksaan === "lo-pso"
                  ? "Layanan Organisasi - Pengembangan Sistem Organisasi"
                  : this.jenisPemeriksaan === "lo-pps"
                  ? "Layanan Organisasi - Pelatihan Pengembangan SDM"
                  : this.jenisPemeriksaan === "lik-ki"
                  ? "Layanan Individu & Keluarga - Konseling Individu"
                  : this.jenisPemeriksaan === "lik-kk"
                  ? "Layanan Individu & Keluarga - Konseling Keluarga"
                  : this.jenisPemeriksaan === "lik-pk"
                  ? "Layanan Individu & Keluarga - Penguatan Keluarga"
                  : this.jenisPemeriksaan === "lik-pmbs"
                  ? "Layanan Individu & Keluarga - Penelusuran Minat & Bakat Siswa"
                  : this.jenisPemeriksaan === "lik-pkp"
                  ? "Layanan Individu & Keluarga - Pendampingan Karier Penjurusan"
                  : this.jenisPemeriksaan === "lik-pkm"
                  ? "Layanan Individu & Keluarga - Peningkatan Kualitas Masyarakat"
                  : this.jenisPemeriksaan === "oa"
                  ? "Online Assessment"
                  : ""
              }
            </div>
            <div class="col-lg-3 text-end">
              Tanggal
            </div>
            <div class="col-lg-9">
              : ${moment(this.tanggalPemeriksaan)
                .locale("id")
                .format("dddd, DD MMMM YYYY")}
            </div>
            <div class="col-lg-3 text-end">
              Jam
            </div>
            <div class="col-lg-9">
              : ${moment(this.tanggalPemeriksaan)
                .locale("id")
                .format("h:mm a")}
            </div>
          </div>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const resultNewPemeriksaan = await this.submitNewPemeriksaan();
          if (resultNewPemeriksaan.affected_rows > 0) {
            this.jenisPemeriksaan = "";
            this.tanggalPemeriksaan = "";

            Swal.fire({
              icon: "success",
              title: "Yeay!",
              html:
                "Pemeriksaan Berhasil diajukan <br> Silahkan tunggu konfirmasi dari Admin",
            });
            this.pemeriksaan = await this.getDataPemeriksaan();
            return;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: "Terjadi kesalahan sistem! Silahkan hubungi PPTUII!",
            });
            return;
          }
        } else {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    },
    async submitNewPemeriksaan() {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
      mutation MyMutation {
        insert_pptuii_pemeriksaan(objects:
        {
          pasien_id: "${this.$store.state.session.up_rel[0].id}",
          jenis_pemeriksaan: "${this.jenisPemeriksaan}",
          status: 1,
          tanggal_pemeriksaan: "${this.tanggalPemeriksaan}"
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

      return data.data.data.insert_pptuii_pemeriksaan;
    },
    async getDataPemeriksaan() {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
      query MyQuery {
        pptuii_pemeriksaan(where: {tanggal_pemeriksaan: {_gt: "2021-07-27T00:00:00", _lt: "2021-07-30T00:00:00"}, _and: {pasien_id: {_eq: "${this.$store.state.session.up_rel[0].id}"}}}) {
          jenis_pemeriksaan
          status
          tanggal_pemeriksaan
          psikolog_id
          alasan
          admin_id
        }
      }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data.data.pptuii_pemeriksaan;
    },
  },
  computed: {
    minDatetime() {
      const event = new Date(Date.now());
      event.setDate(event.getDate() + 1);
      return event.toISOString();
    },
  },
  async created() {
    if (this.$store.state.session === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `
          <p class="m-1">Anda tidak memiliki hak akses! </p>
          <p>Silahkan Login terlebih dahulu! </p>`,
      });
      this.$router.push({ name: "Login" });
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

    this.pemeriksaan = await this.getDataPemeriksaan();
  },
};
</script>

<style>
.my-class {
  width: 100%;
  border: none;
  padding: 3px;
}

.my-class:hover {
  cursor: pointer;
}

a {
  color: #8f546e;
}

a:hover {
  color: #000;
}

h4 {
  color: #8f546e;
}
</style>
