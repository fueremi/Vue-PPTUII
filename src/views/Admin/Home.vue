<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="d-flex flex-row gap-3 mt-4">
        <div class="col-md-8 border p-3">
          <h4 class="text-center">Booking Pelayanan</h4>
          <button @click="onRefresh()" class="btn"><i class="fas fa-sync"></i> Refresh</button>
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
                          <span
                            v-if="pemeriksaan.status === 1"
                            class="badge bg-primary rounded-pill"
                            >Menunggu Konfirmasi</span
                          >
                          <span
                            v-if="pemeriksaan.status === 2"
                            class="badge bg-warning rounded-pill"
                            >Rescheduled</span
                          >
                          <span
                            v-if="pemeriksaan.status === 3"
                            class="badge bg-danger rounded-pill"
                            >Canceled</span
                          >
                          <span
                            v-if="pemeriksaan.status === 4"
                            class="badge bg-success rounded-pill"
                            >Approved</span
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
                                {{ pemeriksaan.pa_rel.nama }}
                              </span>
                            </li>
                            <li class="list-group-item">
                              <span v-if="pemeriksaan.alasan === null">
                                -
                              </span>
                              <span v-else-if="pemeriksaan.alasan === 'null'">
                                Pemeriksaan sudah diapprove. Silahkan datang
                                tepat waktu
                              </span>
                              <span v-else> {{ pemeriksaan.alasan }} </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        class="my-3 d-flex flex-row gap-3"
                        v-if="pemeriksaan.status === 1"
                      >
                        <button
                          @click="onApprove(pemeriksaan)"
                          class="btn btn-primary"
                        >
                          Approve
                        </button>
                        <button
                          @click="onRescheduled(pemeriksaan)"
                          class="btn btn-rescheduled"
                        >
                          Rescheduled
                        </button>
                      </div>
                      <div v-else-if="pemeriksaan.status === 2" class="m-3">
                        <p><strong>Pemeriksaan Rescheduled!</strong></p>
                      </div>
                      <div v-else-if="pemeriksaan.status === 3" class="m-3">
                        <p><strong>Pemeriksaan Canceled oleh <b>Pasien</b>!</strong></p>
                      </div>
                      <div v-else-if="pemeriksaan.status === 4" class="m-3">
                        <p><strong>Pemeriksaan Approved!</strong></p>
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
  name: "HomePasien",
  components: {
    HomeNavbar,
  },
  data() {
    return {
      sekarang: new Date().toISOString(),
      tigahari: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      pemeriksaan: [],
    };
  },
  methods: {
    async getAllPemeriksaan() {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
      query MyQuery {
        pptuii_pemeriksaan(where: {tanggal_pemeriksaan: {_gt: "${this.sekarang}", _lt: "${this.tigahari}"}}, order_by: {tanggal_pemeriksaan: asc}) {
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
    onApprove(params) {
      Swal.fire({
        title: "Pemeriksaan",
        icon: "info",
        width: "50vw",
        html: `<p>Apakah anda yakin akan <strong class="text-success">Approve</strong> jadwal pemeriksaan ?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          params = { ...params, ...{ status: 4 } };
          const resultUpdatePemeriksaan = await this.updatePemeriksaan(params);
          if (resultUpdatePemeriksaan.affected_rows > 0) {
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: "Pemeriksaan berhasil di-<strong>Approve</strong>!",
            });

            this.pemeriksaan = await this.getAllPemeriksaan();
            return;
          }
        } else {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    },
    onRescheduled(params) {
      Swal.fire({
        title: "Pemeriksaan",
        icon: "info",
        width: "50vw",
        html: `<p>Apakah anda yakin akan <strong class="text-warning">Rescheduled</strong> jadwal pemeriksaan ?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const { value: alasan } = await Swal.fire({
            title: "Masukkan alasan",
            input: "textarea",
            inputLabel: "Kenapa jadwal pasien di Rescheduled?",
            inputPlaceholder: "...",
          });
          if (alasan) {
            params = { ...params, ...{ status: 2, alasan } };
            const resultUpdatePemeriksaan = await this.updatePemeriksaan(
              params
            );
            if (resultUpdatePemeriksaan.affected_rows > 0) {
              Swal.fire({
                icon: "success",
                title: "Yeay...",
                html: "Pemeriksaan berhasil di-<strong>Rescheduled</strong>!",
              });
              this.pemeriksaan = await this.getAllPemeriksaan();
              return;
            }
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
          update_pptuii_pemeriksaan(where: {id: {_eq: "${params.id}"}}, _set: {admin_id: "${this.$store.state.session.ua_rel[0].id}", status: ${params.status}, alasan: "${params.alasan}"}) {
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
    async onRefresh(){
      this.pemeriksaan = await this.getAllPemeriksaan()
    }
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

    this.pemeriksaan = await this.getAllPemeriksaan();
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

.btn-rescheduled {
  color: #8f546e;
  background-color: #fff;
  border: 1px solid #8f546e;
}
.btn-rescheduled:hover {
  border: 1px solid #fff;
}

.btn-reject:hover {
  color: #8f546e;
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
