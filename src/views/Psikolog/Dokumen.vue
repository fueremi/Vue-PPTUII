<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="row mt-5">
        <h3>Upload Hasil Pemeriksaan</h3>

        <div v-if="files !== null" class="my-3 py-5">
          <div>
            <ul class="list-group w-50">
              <li class="list-group-item" aria-current="true">
                {{ files[0].name }}
              </li>
              <li class="list-group-item">
                {{ (files[0].size / 1000).toFixed(2) }} kb
              </li>
              <li class="list-group-item">
                <button @click="onPreview" class="btn btn-primary">
                  Preview
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-cloak
          @drop.prevent="addFile"
          @dragover.prevent
          v-else
          class="m-3 p-5 border d-flex flex-column justify-content-center align-items-center"
        >
          <i class="fas fa-upload fa-3x text-muted"></i>
          <p class="my-3">Drag dan Drop file hasil pemeriksaan</p>
        </div>
      </div>
      <form @submit.prevent="onSubmit()">
        <input
          :disabled="uploadDisabled"
          type="submit"
          class="btn btn-primary"
        />
      </form>
    </div>
  </div>
</template>

<script>
import HomeNavbar from "@/components/Home/Navbar";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "Dokumen",
  components: {
    HomeNavbar,
  },
  data() {
    return {
      files: null,
      dokumen: "",
      id: this.$route.params.id,
    };
  },
  computed: {
    uploadDisabled() {
      return this.files === null;
    },
  },
  methods: {
    addFile(e) {
      if (e.dataTransfer.files[0].size >= 1000000) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          html: "Maksimal ukuran dokumen yang diupload adalah <b>1 MB</b>",
        });
        return
      }

      this.createBase64(e.dataTransfer.files[0]);
      this.files = e.dataTransfer.files;
    },
    createBase64(payload) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.dokumen = e.target.result;
      };
      reader.readAsDataURL(payload);
    },
    onSubmit() {
      Swal.fire({
        title: "Dokumen",
        icon: "info",
        width: "50vw",
        html: `<p>Apakah <b>Dokumen</b> yang Akan di-Upload sudah benar ?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const resultNewDokumen = await this.addNewDokumen();
          if (resultNewDokumen.affected_rows > 0) {
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: "Dokumen berhasil di-<strong>Upload</strong>!",
            });
            this.$router.push({ name: "HomePsikolog" });
          }
        } else {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    },
    async addNewDokumen() {
      const API_URL = "https://fathir-hasura.herokuapp.com/v1/graphql";
      const API_HEADERS = {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "3yYlj28KnyN4",
      };
      const API_QUERY = `
        mutation MyMutation {
          insert_pptuii_dokumen(
            objects: {
              nama: "${Date.now()}-${this.files[0].name}", 
              dokumen: "${this.dokumen}", 
              pemeriksaan_id: "${this.id}"
            }
          ) 
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

      return data.data.data.insert_pptuii_dokumen;
    },
    onPreview() {
      Swal.fire({
        title: "Preview Dokumen Pemeriksaan",
        heightAuto: true,
        width: "90vw",
        html: `<iframe height="100%" width="100%" src="${this.dokumen}"></iframe>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: "Thumbs up, great!",
      });
    },
  },
  created() {if (this.$store.state.session === null) {
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
  },
};
</script>

<style scoped>
.swal2-html-container {
  height: 70vh;
}

.btn-primary.disabled,
.btn-primary:disabled {
  color: white;
  background: #8f546e;
  border-color: #8f546e;
}
</style>
