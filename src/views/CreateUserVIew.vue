<template>
  <div v-if="!isLoading" class="container">
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <div v-else>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

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
