<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <nav class="navbar  navbar-expand-lg navbar-light bg-light ">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container-fluid mx-auto">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/map">Map</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
  <RouterView />

</template>

<style>
  header {
    margin-bottom: 10px;
  }
  #app {
    margin: 0 10px;
    min-width: 360px;
  }
</style>


