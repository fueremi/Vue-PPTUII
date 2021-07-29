<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="row mt-5">
        <h3>Upload Hasil Pemeriksaan</h3>

        <div
          class="m-3 p-5 border"
          v-cloak
          @drop.prevent="addFile"
          @dragover.prevent
        >
          <div v-if="files !== null">
            <p>
              {{ files[0].name }} {{ (files[0].size / 1000).toFixed(2) }} kb
            </p>
            <!-- <ul
              class="m-0 d-flex flex-column justify-content-center align-items-center"
            >
              <i class="fas fa-upload fa-3x text-muted"></i>
              <p class="my-3">Drag dan Drop file hasil pemeriksaan</p>
              <hr />
              <li v-for="(file, index) in files" :key="index">
                <div class="d-flex justify-content-start align-items-center">
                  {{ file[0].name }} ({{ file[0].size }} kb)
                  <button
                    @click="removeFile(file)"
                    title="Remove"
                    class="btn text-danger py-0"
                  >
                    x
                  </button>
                </div>
              </li>
            </ul> -->
            <button @click="onPreview" class="btn btn-primary">Preview</button>
          </div>
          <div
            v-else
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <i class="fas fa-upload fa-3x text-muted"></i>
            <p class="my-3">Drag dan Drop file hasil pemeriksaan</p>
          </div>
        </div>
      </div>
      <button
        class="btn btn-primary"
        :disabled="uploadDisabled"
        @click="upload"
      >
        Upload
      </button>
    </div>
  </div>
</template>

<script>
import HomeNavbar from "@/components/Home/Navbar";
import Swal from "sweetalert2";

export default {
  name: "Dokumen",
  components: {
    HomeNavbar,
  },
  data() {
    return {
      files: null,
      dokumen: "",
    };
  },
  computed: {
    uploadDisabled() {
      return this.files === null;
    },
  },
  methods: {
    addFile(e) {
      if (e.dataTransfer.files[0].type !== "application/pdf") {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          html:
            "Format dokumen yang diperbolehkan hanya <b>PDF, Word, and Excel</b>",
        });
        return;
      }

      if (e.dataTransfer.files[0].size >= 1000000) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          html: "Maksimal ukuran dokumen yang diupload adalah <b>1 MB</b>",
        });
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
    upload() {
      let formData = new FormData();
      this.files.forEach((f, x) => {
        formData.append("file" + (x + 1), f);
      });

      fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("done uploading", res);
        })
        .catch((e) => {
          console.error(JSON.stringify(e.message));
        });
    },
    onPreview() {
      // let pdfWindow = window.open("");
      // pdfWindow.document.write(
      //   `<html<head><title>"${this.files[0].name}"</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>`
      // );
      // pdfWindow.document.write(
      //   `<body><embed width='100%' height='100%' src='${this.dokumen}#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>`
      // );
      var win = window.open(
        "",
        "Title",
        "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=900,top=" +
          (screen.height - 900) +
          ",left=" +
          (screen.width - 840)
      );
      win.document.body.innerHTML =
        `<iframe src="${this.dokumen}" style="display:flex; position:absolute" width="100%" height="100%"></iframe>`;

    //   var newWindow = window.open(
    //     "",
    //     "PDF",
    //     "dependent=yes,locationbar=no,scrollbars=no,menubar=no,resizable,screenX=50,screenY=50,width=850,height=800"
    //   );
    //   newWindow.document.write(
    //     `<html><body><center><a title="Download File" style="font-family: 'Verdana';color: #333;text-decoration: none;font-weight: 600;" download="File.PDF" href="${this.dokumen}">Download File</a></center><br><object style="display:initial; position:absolute" width=100% height=100% type="application/pdf" data="${this.dokumen}"><embed style="display:initial; position:absolute" type="application/pdf" src="${this.dokumen}" id="embed_pdf"></embed></object></body></html>`
    //   );
    //   newWindow.window.focus();
    },
  },
};
</script>
