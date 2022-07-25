<template>
    <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="login-wrap p-4 p-md-5">
              <div class="icon d-flex align-items-center justify-content-center">
                <span class="fa fa-user-o"></span>
              </div>
              <h3 class="text-center mb-4">Sign In</h3>
              <form  v-on:submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                  <input type="text" name="username" class="form-control rounded-left mb-2" placeholder="Username" required>
                </div>
                <div class="form-group d-flex">
                  <input type="password" name="password" class="form-control rounded-left mb-2" placeholder="Password" required>
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control btn btn-primary rounded submit px-3 mb-2">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      loading: false,
      message: "",
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(submitEvent) {
      this.loading = true;
      const user = {
        username: submitEvent.target.elements.username.value,
        password: submitEvent.target.elements.password.value,
      }
      this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push("/");
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
  },
}
</script>
