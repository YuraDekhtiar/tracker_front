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
            <RouterLink class="nav-link" to="/">Devices</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/map">Map</RouterLink>
          </li>
          <li class="nav-item" v-if="isAdmin" >
            <RouterLink class="nav-link" to="/users">Users</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png">
                  </span>
                <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm m-lg-4 font-weight-bold">{{userName}}</span>
                </div>
              </div>
            </a>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" to="/profile">Profile</RouterLink></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" v-on:click="logoutHandler">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'vNavbar',
  props: {
    logoutHandler: Function,
    userName: String,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('admin');
      }
      return false;
    }
  },
}
</script>

<style scoped>
.dropdown-menu {
  width: 10px;
}
.media {
  display: flex;
  align-items: flex-start;
}

.media-body {
  flex: 1 1;
}

.avatar {
  font-size: 1rem;
  display: inline-flex;
  width: 48px;
  height: 48px;
  color: #fff;
  border-radius: 50%;
  background-color: #adb5bd;
  align-items: center;
  justify-content: center;
}
.avatar img {
  width: 100%;
  border-radius: 50%;
}

.avatar-sm {
  font-size: .875rem;
  width: 36px;
  height: 36px;
}
</style>
