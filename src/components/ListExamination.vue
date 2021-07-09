<template>
  <button class="btn btn-primary examinationToggleButton" @click="onClick">
    Cek Jadwal
    <span class="badge bg-light">
      {{ dataExam.data ? dataExam.data.data.pptuii_examination.length : "..." }}
    </span>
  </button>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment'

export default {
  name: "ListExamination",
  data() {
    return {
      dataExam: {},
    };
  },
  methods: {
    async getAccountExam() {
      const API_URL = "https://fueremi-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "18032405",
      };
      const API_QUERY = `
        query MyQuery {
          pptuii_examination(where: {user_id: {_eq: ${this.$store.state.session.user_id}}}) {
            admin_id
            datetime
            examination_type
            id
            psikolog_id
            user_id
            status
            reason
          }
        }
      `;
      const data = await axios.post(
        API_URL,
        { query: API_QUERY },
        { headers: API_HEADERS }
      );

      return data;
    },
    onClick() {
      Swal.fire({
        title: "<strong>Jadwal Konseling</strong>",
        icon: "info",
        width: '72rem',
        html: `
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Jenis Layanan</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Jam</th>
                <th scope="col">Status</th>
                <th scope="col">Reason</th>
              </tr>
            </thead>
            <tbody>
            ${this.dataExam.data.data.pptuii_examination.map(
              (data, index) => `
                ${data.status === 1 ? '<tr>' : ''}
                ${data.status === 2 ? '<tr class="table-warning">' : ''}
                ${data.status === 3 ? '<tr class="table-danger">' : ''}
                ${data.status === 4 ? '<tr class="table-success">' : ''}
                <th scope="row">${index+1}</th>
                ${data.examination_type === 'lo-rs' ? '<td class="text-start">Layanan Organisasi Rekrutment & Seleksi</td>' : ''}
                ${data.examination_type === 'lo-apr' ? '<td class="text-start">Layanan Organisasi - Assessment / Potensial Review</td>' : ''}
                ${data.examination_type === 'lo-pso' ? '<td class="text-start">Layanan Organisasi - Pelatihan Pengembangan SDM</td>' : ''}
                ${data.examination_type === 'lo-pps' ? '<td class="text-start">Layanan Organisasi - Pelatihan Pengembangan SDM</td>' : ''}
                ${data.examination_type === 'lik-ki' ? '<td class="text-start">Layanan Individu & Keluarga - Konseling Individu</td>' : ''}
                ${data.examination_type === 'lik-kk' ? '<td class="text-start">Layanan Individu & Keluarga - Konseling Keluarga</td>' : ''}
                ${data.examination_type === 'lik-pk' ? '<td class="text-start">Layanan Individu & Keluarga - Penguatan Keluarga</td>' : ''}
                ${data.examination_type === 'lik-pmbs' ? '<td class="text-start">Layanan Individu & Keluarga - Penelusuran Minat & Bakat Siswa</td>' : ''}
                ${data.examination_type === 'lik-pkp' ? '<td class="text-start">Layanan Individu & Keluarga - Pendampingan Karier/Penjurusan</td>' : ''}
                ${data.examination_type === 'lik-pkm' ? '<td class="text-start">Layanan Individu & Keluarga - Peningkatan Kualitas Masyarakat</td>' : ''}
                ${data.examination_type === 'oa' ? '<td>Online Assesment</td>' : ''}
                <td class="text-start">${moment(data.datetime).locale('id').format("dddd, Do MMMM YY")}</td>
                <td>${moment(data.datetime).locale('id').format("h:mm a")}</td>
                ${data.status === 1 ? '<td class="text-start">Waiting</td>' : ''}
                ${data.status === 2 ? '<td class="text-start">Rescheduled</td>' : ''}
                ${data.status === 3 ? '<td class="text-start">Ditolak</td>' : ''}
                ${data.status === 4 ? '<td class="text-start">Diterima</td>' : ''}
                ${data.reason === null ? '<td class="text-center">-</td>' : ''}
                ${data.reason !== null ? '<td class="text-start">'+ data.reason +'</td>' : ''}
              </tr>
              `
            )}
            </tbody>
          </table>
          `,
        showCloseButton: true,
      });
    },
  },
  async created() {
    this.dataExam = await this.getAccountExam();
  },
};
</script>

<style scoped>
.badge {
  color: #8f546e;
}
</style>
