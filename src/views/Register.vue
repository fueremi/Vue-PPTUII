<template>
  <div
    class="container d-flex flex-column min-vh-100 justify-content-center align-items-center"
  >
    <div class="text-center mb-5 pb-5">
      <img src="../assets/pptuii.png" height="300" alt="" />
      <h3>Register</h3>
      <form>
        <div class="row g-3 text-start mt-3">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
        </div>
        <div class="row g-3 text-start mt-2">
          <div class="col-md-3">
            <select class="form-select" aria-label="Default select example">
              <option selected>Gender :</option>
              <option value="l">Laki-Laki</option>
              <option value="p">Perempuan</option>
            </select>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="Phone Number"
              aria-label="Phone Number"
            />
          </div>
          <div class="col-md-5">
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              aria-label="Email"
            />
          </div>
        </div>
        <div class="row g-3 text-start mt-2">
          <div class="col-md-6">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
            />
          </div>
          <div class="col-md-6">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
            />
          </div>
        </div>
        <div class="row g-3 text-start mt-2">
          <div class="d-grid gap-2">
            <input type="submit" class="btn btn-primary btn-block" />
          </div>
        </div>
      </form>
    </div>

    <footer class="my-3">
      Copyright &copy; Universitas Islam Indonesia | 2021
    </footer>
  </div>
</template>

<style scoped>
.btn-primary {
  background-color: #8f546e !important;
  border-color: #8f546e !important;
}
</style>
