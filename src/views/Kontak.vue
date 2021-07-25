<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="row mt-5">
        <h3>Kontak</h3>
      </div>
    </div>
  </div>
</template>

<script>
import HomeNavbar from '@/components/Home/Navbar'

export default {
  name: 'Kontak',
  components: {
    HomeNavbar,
  }
}
</script>