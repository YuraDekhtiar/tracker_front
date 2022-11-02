<template>
    <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="login-wrap p-4 p-md-5">
              <div class="icon d-flex align-items-center justify-content-center">
                <span class="fa fa-user-o"></span>
              </div>
              <h3 class="text-center mt-5 mb-4">Sign In</h3>
              <form  @submit="handleLogin" class="login-form" onsubmit="return false;">
                <div class="form-group">
                  <input type="text" name="username" class="form-control rounded-left mb-2" placeholder="Username" required v-model="username">
                </div>
                <div class="form-group d-flex">
                  <input type="password" name="password" class="form-control rounded-left mb-2" placeholder="Password" required v-model="password">
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control btn btn-primary rounded submit px-3 mb-2">Login</button>
                </div>
              </form>
              <Alert :message="message" :successful="successful" />
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Alert from "@/components/Alert";
export default {
  components: {Alert},
  data() {
    return {
      loading: false,
      message: "",
      username: "",
      password: "",
      successful: false,
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
    handleLogin() {
      this.loading = true;
        const user = {
        username: this.username.trim(),
        password: this.password.trim(),
      }
      if(user.username.length < 4 || user.password.length < 8) {
        this.message = "Login or password is too short"
      } else {
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
      }
    },
  },
}
</script>
