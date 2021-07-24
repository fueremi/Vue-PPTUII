<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <div>
        <a class="navbar-brand fs-4 text-dark text-wrap" href="#">
          <img
            src="@/assets/pptuii.png"
            alt=""
            width="100"
            class="d-inline-block align-middle"
          />
        </a>
        <nav class="nav mt-5 fs-4 text-start fw-bold">
          <router-link class="nav-link" aria-current="page" to="/psikolog"
            >Home</router-link
          >
          <router-link
            v-if="this.$store.state.session.id === ''"
            class="nav-link"
            to="/login"
            >Login</router-link
          >
          <a
            v-if="this.$store.state.session.id !== ''"
            class="nav-link"
            @click="logout"
            >Logout</a
          >
        </nav>
      </div>
    </div>
    <div class="div mt-5">
      <h2>Jadwal Pasien #tanggal#</h2>
      <button class="btn my-3 text-success" @click="onRefresh()">
        <i class="fas fa-sync"></i>
      </button>
      <ol class="list-group list-group-numbered">
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
          v-for="data in dataExam"
          :key="data.id"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">
              {{ data.user_relationship.first_name }}
              {{ data.user_relationship.last_name }}
              -
              <span v-if="data.examination_type === 'lo-rs'"
                >Layanan Organisasi Rekrutment & Seleksi</span
              >
              <span v-if="data.examination_type === 'lo-apr'"
                >Layanan Organisasi - Assessment / Potensial Review</span
              >
              <span v-if="data.examination_type === 'lo-pso'"
                >Layanan Organisasi - Pengembangan Sistem Organisasi</span
              >
              <span v-if="data.examination_type === 'lo-pps'"
                >Layanan Organisasi - Pelatihan Pengembangan SDM</span
              >
              <span v-if="data.examination_type === 'lik-ki'"
                >Layanan Individu & Keluarga - Konseling Individu</span
              >
              <span v-if="data.examination_type === 'lik-kk'"
                >Layanan Individu & Keluarga - Konseling Keluarga</span
              >
              <span v-if="data.examination_type === 'lik-pk'"
                >Layanan Individu & Keluarga - Penguatan Keluarga</span
              >
              <span v-if="data.examination_type === 'lik-pmbs'"
                >Layanan Individu & Keluarga - Penelusuran Minat & Bakat
                Siswa</span
              >
              <span v-if="data.examination_type === 'lik-pkp'"
                >Layanan Individu & Keluarga - Pendampingan Karier/
                Penjurusan</span
              >
              <span v-if="data.examination_type === 'lik-pkm'"
                >Layanan Individu & Keluarga - Peningkatan Kualitas
                Masyarakat</span
              >
              <span v-if="data.examination_type === 'oa'"
                >Online Assessment</span
              >
            </div>
            {{ timeFormat(data.datetime) }}
          </div>
          <button class="btn" @click="onSesuai(data.id)">
            <span class="badge bg-success rounded-pill">Upload Pemeriksaan</span>
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      dataExam: [],
    };
  },
  methods: {
    timeFormat(payload) {
      return moment(payload)
        .locale("id")
        .format("HH:ss a, DD MMMM YYYY");
    },
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
          this.$store.state.session.id = "";
          this.$store.state.session.user_id = "";
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
    async getAllExam() {
      const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "18032405",
      };
      const API_QUERY = `
        query MyQuery {
            pptuii_examination(where: {_and: {datetime: {_gt: "2021-07-24", _lt: "2021-07-26"}}, status: {_eq: 4}}) {
            admin_id
            datetime
            examination_type
            id
            psikolog_id
            user_id
            status
            user_relationship {
                first_name
                last_name
            }
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data.data.pptuii_examination;
    },
    async onSesuai(payload) {
      Swal.fire({
        title: "<strong>Konfirmasi Layanan!</strong>",
        icon: "info",
        html: `
          <p>Apakah anda yakin ?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
          const API_HEADERS = {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": "18032405",
          };
          const API_QUERY = `
                mutation MyMutation {
                update_pptuii_examination(where: {id: {_eq: ${payload}}}, _set: {status: 4}) {
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
          this.dataExam = await this.getAllExam();
        } else {
          Swal.fire("Konfirmasi dibatalkan", "", "info");
        }
      });
    },
    async onRescheduled(payload) {
      Swal.fire({
        title: "<strong>Konfirmasi Layanan!</strong>",
        icon: "info",
        html: `
          <p>Apakah anda yakin rescheduled layanan?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const { value: reason } = await Swal.fire({
            title: "Masukkan alasan",
            input: "textarea",
            inputLabel: "Kenapa jadwal pasien di Rescheduled?",
            inputPlaceholder: "...",
          });

          if (reason) {
            const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
            const API_HEADERS = {
              "Content-Type": "application/json",
              "x-hasura-admin-secret": "18032405",
            };
            const API_QUERY = `
                mutation MyMutation {
                    update_pptuii_examination(where: {id: {_eq: ${payload}}}, _set: {reason: "${reason}", status: 2}) {
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
            this.dataExam = await this.getAllExam();
          }
        } else {
          Swal.fire("Konfirmasi dibatalkan", "", "info");
        }
      });
    },
    async onTolak(payload) {
      Swal.fire({
        title: "<strong>Konfirmasi Tolak Layanan Pasien!</strong>",
        icon: "info",
        html: `
          <p>Apakah anda yakin akan menolak ?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
          const API_HEADERS = {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": "18032405",
          };
          const API_QUERY = `
                mutation MyMutation {
                update_pptuii_examination(where: {id: {_eq: ${payload}}}, _set: {reason: "Jadwal untuk hari ini penuh", status: 3}) {
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
          this.dataExam = await this.getAllExam();
        } else {
          Swal.fire("Konfirmasi dibatalkan", "", "info");
        }
      });
    },
    async onRefresh() {
      this.dataExam = await this.getAllExam();
    },
  },
  async created() {
    if (this.$store.state.session.id === "") {
      this.$router.push("/login");
    }

    this.dataExam = await this.getAllExam();
  },
  mounted() {
    if (this.$store.state.session.id === "") {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.examinationToggleButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
