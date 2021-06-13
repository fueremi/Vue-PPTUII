<template>
  <button class="btn btn-primary examinationToggleButton" @click="onClick">
    Daftar Periksa
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
        title: "<strong>Jadwal Pemeriksaan</strong>",
        icon: "info",
        html: `
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Jenis Layanan</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Jam</th>
              </tr>
            </thead>
            <tbody>
            ${this.dataExam.data.data.pptuii_examination.map(
              (data, index) => `
              <tr>
                <th scope="row">${index+1}</th>
                <td>${data.examination_type}</td>
                <td>${moment(this.datetimeEmpty).format("dddd, MMM Do YY")}</td>
                <td>${moment(this.datetimeEmpty).format("h:mm a")}</td>
              </tr>
              `
            )}
            </tbody>
          </table>
          `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Great!',
        cancelButtonText: 'Close',
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
