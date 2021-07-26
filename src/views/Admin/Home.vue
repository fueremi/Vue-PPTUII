<template>
  <div class="home container my-3">
    <div class="container-fluid">
      <HomeNavbar />
      <div class="d-flex flex-row gap-3 mt-4">
        <div class="col-md-4 border p-3">
          <h4 class="text-center">A</h4>
        </div>
        <div class="col-md-4 border p-3">
          <h4 class="text-center">B</h4>
        </div>
        <div class="col-md-4 border p-3">
          <h4 class="text-center">C</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeNavbar from '@/components/Home/Navbar'

export default {
name: 'HomePasien',
components: {
  HomeNavbar
}

}
</script>