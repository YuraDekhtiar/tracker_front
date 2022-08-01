<template>
  <div v-if="!isLoading" class="container">
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <div v-else>

    </div>

  </div>

</template>


<script>


export default {
  data() {
    return {
      isLoading: true,
      errorMessage: "",
      errorResponse: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('admin');
      }
      return false;
    }
  },
  mounted() {
    this.isLoading = false
  }
}
</script>

<style>

</style>
