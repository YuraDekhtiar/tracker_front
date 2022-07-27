<script setup>
  import userNavBar from "@/components/UserNavBar";
  import adminNavBar from "@/components/AdminNavBar";
</script>

<template>
  <div>
    <header v-if="this.$store.state.auth.status.loggedIn">
      <adminNavBar  v-if="isAdmin"  :logoutHandler="logout" v-bind:userName="this.currentUser.username" />
      <userNavBar v-else :logoutHandler="logout" />
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
      isAdmin() {
        if (this.currentUser && this.currentUser['roles']) {
          return this.currentUser['roles'].includes('admin');
        }
        return false;
      }
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


