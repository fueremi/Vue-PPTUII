<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <img src="../../assets/pptuii.png" height="300" alt="" />
      <h3 class="fs-3 my-5">Pendaftaran Pemeriksaan</h3>
      <form @submit="onSubmit">
        <div class="mb-3">
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
          <label for="exampleFormControlInput1" class="form-label"
            >Jenis Layanan</label
          >
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="jenisPemeriksaan"
          >
            <option selected>Silahkan pilih jenis layanan</option>
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
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

export default {
  name: "Pemeriksaan",
  components: {
    Datetime,
  },
  data() {
    return {
      datetimeEmpty: "",
      jenisPemeriksaan: this.$route.params.jenis,
    };
  },
  computed: {
    minDatetime() {
      const event = new Date(Date.now());
      event.setDate(event.getDate()+1)
      return event.toISOString();
    },
  },
  methods: {
    onSubmit() {
      if (this.datetimeEmpty === "") {
        this.$toast.open({
          message: `
            <p class="text-center">
              <b>Jadwal Periksa Belum di Tentukan!</b>
            </p>
            <hr/>
            <p>
              Masukkan Tanggal dan Waktu Periksa anda
            </p>
          `,
          type: "error",
          position: "top",
        });
        return;
      }

      Swal.fire({
        title: "<strong>Periksa Kembali <br> Jenis & Jadwal Layanan</strong>",
        icon: "info",
        html: `
          <div class="row text-start">
            <div class="col-lg-3">
              Jenis
            </div>
            <div class="col-lg-9">
              : ${this.jenisPemeriksaan}
            </div>
            <div class="col-lg-3">
              Tanggal
            </div>
            <div class="col-lg-9">
              : ${moment(this.datetimeEmpty).format("dddd, MMM Do YY")}
            </div>
            <div class="col-lg-3">
              Jam
            </div>
            <div class="col-lg-9">
              : ${moment(this.datetimeEmpty).format("h:mm a")}
            </div>
          </div>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const newExamination = {
            user_id: this.$store.state.session.user_id,
            datetime: this.datetimeEmpty,
            examination_type: this.jenisPemeriksaan,
          };
          this.addNewExamination(newExamination);

          this.$toast.open({
            message: `
            <p class="text-center">
              <b>Pemeriksaan berhasil dibuat!</b>
            </p>
            <hr/>
            <p>Silahkan tunggu dari pihak PPT UII untuk memastikan jadwal anda</p>
          `,
            type: "success",
            position: "top",
            // all of other options may go here
          });
          this.$router.push("/");
        } else {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },

    async addNewExamination(newExamination) {
      const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "18032405",
      };
      const API_QUERY = `
        mutation MyMutation {
          insert_pptuii_examination(objects: {user_id: ${newExamination.user_id}, datetime: "${newExamination.datetime}", examination_type: "${newExamination.examination_type}"}) {
            affected_rows
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );
    },
  },
  created() {
    if (this.$store.state.session.id === "") {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.my-class {
  border: none;
  padding: 3px;
}

.btn-primary {
  background-color: #8f546e;
  border-color: #fff;
}

.btn-primary:hover {
  color: #8f546e;
  background-color: #fff;
  border-color: #8f546e;
}
</style>
