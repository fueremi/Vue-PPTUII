<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="row mt-5">
        <div class="col-md-7">
          <h3>Kontak Kami</h3>
          <p>
            Konsultasikan kebutuhan anda kepada kami, kami ada melalui berbagai
            media komunikasi. Kabari kami, kami akan hubungi anda.
          </p>
          <input type="text" class="form-control mb-3" placeholder="Nama" />
          <input type="text" class="form-control mb-3" placeholder="Email" />
          <textarea
            id=""
            cols="30"
            rows="10"
            class="form-control mb-3"
            placeholder="Pesan"
          ></textarea>
        </div>
        <div class="col-md-5 mt-5">
          <div
            class="form-contact d-flex flex-column align-items-between justify-content-center bg-primary p-5 text-white"
          >
            <div class="hotline flex-grow-1 mb-5">
              <label for="">Hotline</label>
              <h2>0812-1543-4700</h2>
            </div>
            <div class="email flex-grow-1 mb-3">
              <label>Email</label>
              <h5>ppt.uii@uii.ac.id</h5>
            </div>
            <div class="instagram flex-grow-1 mb-3">
              <label>Instagram</label>
              <h5>@pptuii</h5>
            </div>
            <div class="alamat flex-grow-1 mb-3">
              <label>Alamat</label>
              <h5>
                Jl. Demangan Baru No.24, Mrican, Caturtunggal, Kec. Depok,
                Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
              </h5>
            </div>
            <div class="alamat flex-grow-1 mb-5">
              <label>Hours</label>
              <h5>
                Senin – Jumat: 10.00 – 16.00 <br />
                Sabtu – Ahad: Tutup
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeNavbar from "@/components/Home/Navbar";

export default {
  name: "Kontak",
  components: {
    HomeNavbar,
  },
};
</script>

<style scoped>
.left {
  max-width: 600px;
}

.right {
  max-width: 600px;
}

.bg-primary {
  background-color: #8E546E !important;
  opacity: 0.8;
}
</style>
