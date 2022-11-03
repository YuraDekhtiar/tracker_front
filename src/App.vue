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
    <footer class="footer py-3 my-1 border-top">
      <div class="text-center">
        <span class="mb-3 mb-md-0 text-muted">© {{getCurrentYear()}} Dekhtiar, Inc</span>
      </div>
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


