<script setup>
  import { RouterLink } from 'vue-router';
</script>
<template>
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
          <li class="nav-item">
            <button class="nav-link" v-on:click="logoutHandler">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'userNavBar',
  props: {
    logoutHandler: Function
  }
}
</script>
