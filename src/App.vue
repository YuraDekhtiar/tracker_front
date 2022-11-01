<script setup>
  import Navbar from "@/components/Navbar";
  import store from '@/store/index.js';

</script>

<template>
  <div>
    <header v-if="store.state.auth.status.loggedIn">
      <Navbar :logoutHandler="logout" v-bind:userName="currentUser.username" />
    </header>
  </div>
  <RouterView />

</template>

<script>
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
        }
      }
  }
</script>

<style>
  header {
    margin-bottom: 10px;
  }
  #app {
    margin: 0 10px;
    min-width: 360px;
  }
</style>


