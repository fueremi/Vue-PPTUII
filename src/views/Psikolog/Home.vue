<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="d-flex flex-row gap-3 mt-4">
        <div class="col-md-8 border p-3">
          <h4 class="text-center">Jadwal Pelayanan Pasien Hari ini</h4>
          <button @click="onRefresh()" class="btn">
            <i class="fas fa-sync"></i> Refresh
          </button>
          <div class="mb-4">
            <p class="mt-4" v-if="pemeriksaan.length === 0">
              Tidak ada list booking pemeriksaan dalam minggu ini.
            </p>
            <div class="mt-4" v-else>
              <div class="accordion" id="accordionPemeriksaan">
                <div
                  class="accordion-item"
                  v-for="pemeriksaan in pemeriksaan"
                  :key="pemeriksaan.id"
                >
                  <h2
                    class="accordion-header"
                    :id="`heading-${pemeriksaan.id}`"
                  >
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#collapse${pemeriksaan.id}`"
                      aria-expanded="false"
                      :aria-controls="`collapse${pemeriksaan.id}`"
                    >
                      <div
                        class="d-flex flex-row justify-content-between align-items-center w-100"
                      >
                        <div class="accordion-title">
                          <p class="fw-bold m-0 text-capitalize">
                            {{ pemeriksaan.pp_rel.nama }}
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lo-rs'"
                          >
                            Layanan Organisasi Rekrutment & Seleksi
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lo-apr'"
                          >
                            Layanan Organisasi - Assessment / Potensial Review
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lo-pso'"
                          >
                            Layanan Organisasi - Pengembangan Sistem Organisasi
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lo-pps'"
                          >
                            Layanan Organisasi - Pelatihan Pengembangan SDM
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lik-ki'"
                          >
                            Layanan Individu & Keluarga - Konseling Individu
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lik-kk'"
                          >
                            Layanan Individu & Keluarga - Konseling Keluarga
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lik-pk'"
                          >
                            Layanan Individu & Keluarga - Penguatan Keluarga
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lik-pmbs'"
                          >
                            Layanan Individu & Keluarga - Penelusuran Minat &
                            Bakat Siswa
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lik-pkp'"
                          >
                            Layanan Individu & Keluarga - Pendampingan Karier/
                            Penjurusan
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'lik-pkm'"
                          >
                            Layanan Individu & Keluarga - Peningkatan Kualitas
                            Masyarakat
                          </p>
                          <p
                            class="m-0"
                            v-if="pemeriksaan.jenis_pemeriksaan === 'oa'"
                          >
                            Online Assessment
                          </p>
                          <p class="m-0">
                            <small>{{
                              formattedDate(pemeriksaan.tanggal_pemeriksaan)
                            }}</small>
                          </p>
                        </div>
                        <div class="accordion-badge me-3">
                          <button
                            v-if="pemeriksaan.status === 4"
                            class="badge bg-primary rounded-pill border-0"
                          >
                            Menunggu Psikolog Mengambil
                          </button>
                          <span
                            v-if="pemeriksaan.status === 5"
                            class="badge bg-success rounded-pill text-capitalize"
                            >{{ pemeriksaan.pps_rel.nama }}</span
                          >
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    :id="`collapse${pemeriksaan.id}`"
                    class="accordion-collapse collapse"
                    :aria-labelledby="`heading-${pemeriksaan.id}`"
                    data-bs-parent="#accordionPemeriksaan"
                  >
                    <div class="accordion-body">
                      <div class="d-flex flex-row">
                        <div class="col-md-6">
                          <ul class="list-group">
                            <li
                              class="list-group-item"
                              v-if="pemeriksaan.pp_rel.jenis_kelamin === 'l'"
                            >
                              Laki-Laki
                            </li>
                            <li class="list-group-item" v-else>Perempuan</li>
                            <li class="list-group-item">
                              {{ pemeriksaan.pp_rel.hp }}
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-6">
                          <ul class="list-group">
                            <li class="list-group-item">
                              <span v-if="pemeriksaan.admin_id === null">
                                -
                              </span>
                              <span v-else>
                                <span class="text-uppercase">
                                  {{ pemeriksaan.pa_rel.no_administrasi }}
                                </span>
                                , {{ pemeriksaan.pa_rel.nama }}
                              </span>
                            </li>
                            <li class="list-group-item">
                              <span v-if="pemeriksaan.psikolog_id === null">
                                -
                              </span>
                              <span v-else>
                                <span class="text-uppercase">
                                  {{ pemeriksaan.pps_rel.no_psikolog }}
                                </span>
                                , {{ pemeriksaan.pps_rel.nama }}
                              </span>
                            </li>
                            <div v-if="pemeriksaan.pd_rel.length > 0">
                              <li
                                class="list-group-item"
                                v-for="pd in pemeriksaan.pd_rel"
                                :key="pd.nama"
                              >
                                <small>{{ pd.nama }}</small>
                                <a
                                  class="ms-2"
                                  :href="
                                    `data:application/octet-stream;base64,${
                                      pd.dokumen.split(',')[1]
                                    }`
                                  "
                                  :download="pd.nama"
                                  ><i class="fas fa-download"></i
                                ></a>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </div>
                      <div class="my-3 d-flex flex-row gap-3">
                        <button
                          v-if="pemeriksaan.status === 4"
                          @click="onDiambil(pemeriksaan.id)"
                          class="btn btn-primary"
                        >
                          Saya ambil
                        </button>
                        <div
                          class="w-100 d-flex flex-row justify-content-between align-items-end"
                          v-else-if="idPsikolog === pemeriksaan.psikolog_id"
                        >
                          <div
                            class="d-flex flex-column justify-content-start align-items-start"
                          >
                            <router-link
                              :to="{
                                name: 'Dokumen',
                                params: { id: pemeriksaan.id },
                              }"
                              class="btn btn-primary"
                            >
                              Upload Pemeriksaan
                            </router-link>
                            <small
                              >Untuk hasil dari pelayanan, silahkan upload
                              disini</small
                            >
                          </div>
                          <div>
                            <button
                              @click="onSelesai(pemeriksaan.id)"
                              class="btn btn-success"
                            >
                              Selesai
                            </button>
                          </div>
                        </div>
                        <p v-else>
                          Pelayanan Pemeriksaan ini telah diambil oleh
                          <strong>{{ pemeriksaan.pps_rel.nama }}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-6 border p-3">
          <h4 class="text-center">B</h4>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import HomeNavbar from "@/components/Home/Navbar";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "HomePsikolog",
  components: {
    HomeNavbar,
  },
  data() {
    return {
      startHariIni: new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
      ).toISOString(),
      endHariIni: new Date(
        new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
      ).toISOString(),
      pemeriksaan: [],
      idPsikolog: this.$store.state.session.ups_rel[0].id,
    };
  },
  methods: {
    async getApprovedPemeriksaan() {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
      query MyQuery {
        pptuii_pemeriksaan(
          order_by: {
            tanggal_pemeriksaan: asc
          }
          where: {
            _or: [
              {_and: 
                [ 
                  { tanggal_pemeriksaan: {_gte: "${this.startHariIni}", _lte: "${this.endHariIni}"}},
                  { status: {_eq: 4}}
                ]
              },
              {_and:
                [
                  { tanggal_pemeriksaan: {_gte: "${this.startHariIni}", _lte: "${this.endHariIni}"}},
                  { status: {_eq: 5}}
                ]
              }
            ]
          }
        ) {
          id
          jenis_pemeriksaan
          status
          tanggal_pemeriksaan
          psikolog_id
          alasan
          admin_id
          pp_rel{
            nama
            hp
            jenis_kelamin
          }
          pa_rel{
            nama
            no_administrasi
          }
          pps_rel{
            nama
            no_psikolog
          }
          pd_rel{
            nama
            dokumen
          }
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
    formattedDate(params) {
      return moment(params)
        .locale("id")
        .format("DD MMMM YYYY, HH:ss a");
    },
    onDiambil(params) {
      Swal.fire({
        title: "Pemeriksaan",
        icon: "info",
        width: "50vw",
        html: `<p>Apakah anda yakin akan <strong class="text-success">Mengambil</strong> Pemeriksaan ini?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const resultUpdatePemeriksaan = await this.updatePemeriksaan(params);
          if (resultUpdatePemeriksaan.affected_rows > 0) {
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: "Pemeriksaan ini berhasil anda <strong>Ambil</strong>!",
            });
            this.pemeriksaan = await this.getApprovedPemeriksaan();
            return;
          }
        } else {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    },
    async updatePemeriksaan(params) {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
        mutation MyMutation {
          update_pptuii_pemeriksaan(where: {id: {_eq: "${params}"}}, _set: {psikolog_id: "${this.idPsikolog}", status: 5}) {
            affected_rows
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data.data.update_pptuii_pemeriksaan;
    },
    async onRefresh() {
      this.pemeriksaan = await this.getApprovedPemeriksaan();
    },
    onSelesai(params) {
      Swal.fire({
        title: "Pemeriksaan",
        icon: "info",
        width: "50vw",
        html: `
          <p>Apakah anda yakin akan <strong class="text-success">Menyelesaikan</strong> Pemeriksaan ini?</p>
          <small class='text-danger'><b>Warning!</b> Data pemeriksaan tidak dapat diubah setelah statusnya <b>Selesai</b>!</small>
        `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const pemeriksaanSelesai = await this.updatePemeriksaanSelesai(params)
          if ( pemeriksaanSelesai.affected_rows > 0 ){
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: "Pemeriksaan ini berhasil anda <strong>Ambil</strong>!",
            });
            this.pemeriksaan = await this.getApprovedPemeriksaan();
            return;
          }
        } else {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    },
    async updatePemeriksaanSelesai(params) {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
        mutation MyMutation {
          update_pptuii_pemeriksaan(
            where: {
              id: {_eq: "${params}"}
            }, 
            _set: {
              status: 6
            }
          ) {
            affected_rows
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data.data.data.update_pptuii_pemeriksaan;
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

    this.pemeriksaan = await this.getApprovedPemeriksaan();
  },
};
</script>

<style scoped>
.accordion-button:not(.collapsed) {
  color: #fff;
  background-color: rgb(144, 84, 110);
}

.accordion-button:not(.collapsed) .badge {
  background-color: #fff !important;
  color: #8f546e !important;
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>");
  transform: rotate(-180deg);
}

.btn-primary:hover {
  opacity: 0.8;
  background-color: #8f546e;
}

.btn-upload {
  color: #8f546e;
  background-color: #fff;
  border: 1px solid #8f546e;
}

.btn-upload:hover {
  border: 1px solid #fff;
}

strong {
  color: #8f546e;
}

.vdatetime-time-picker__list--hours
  .vdatetime-time-picker__item:nth-child(-n + 7) {
  display: none;
}

.vdatetime-time-picker__list--hours
  .vdatetime-time-picker__item:nth-last-child(-n + 6) {
  display: none;
}
</style>
