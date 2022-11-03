<script setup>
  import Navbar from "@/components/Navbar";
  import store from '@/store/index.js';

</script>

<template>
  <div class="wrapper">
    <header class="border-bottom" v-if="store.state.auth.status.loggedIn">
      <Navbar :logoutHandler="logout" v-bind:userName="currentUser.username" />
    </header>
    <main class="content">
      <RouterView />
    </main>
    <footer class="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-1 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
        </a>
        <span class="mb-3 mb-md-0 text-muted">© {{getCurrentYear()}} Dekhtiar, Inc</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
        <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
        <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import dayjs from "dayjs";
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
    methods: {
      logout() {
        this.$store.dispatch("auth/logout").then(() => {
          this.$router.push("/login");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString();
          });
        },
        getCurrentYear() {
          return dayjs().year()
        }
      }
  }
</script>

<style>
  header {
    margin-bottom: 10px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  .content {
    flex: 1 0 auto;
  }
  .footer {
    flex: 0 0 auto;
  }
</style>


