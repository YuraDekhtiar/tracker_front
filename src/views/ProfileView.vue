<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-5 col-md-3 col-lg-3">
        <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png">
                  </span>
            </div>
          </div>
          <div class="col-sm">
            <div>
              <div class="mt-3">
                Login: {{data.username}}
              </div>
              <div class="mt-3">
                Email: {{data.email}}
              </div>
              <div class="mt-3">
                Last visit: {{data.last_visit}}
              </div>
              <div class="mt-3">
                Date_registration: {{data.date_registration}}
              </div>
              <div class="mt-3">
                Roles: {{data.roles.map(r => r.name)}}
              </div>
              <div class="mt-3 ">Change password:</div>
              <div class="input-group mt-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Old password</span>
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="input-group mt-1">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">New password</span>
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="input-group mt-1 ">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Confirm new password</span>
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
              </div>

                <button type="button" class="btn btn-primary float-right">Change</button>


            </div>

        </div>
      </div>
      </div>
</template>

<script>
import api from "@/api/api";

export default {
  data() {
    return {
      loading: false,
      data: Object,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async created() {
    if (!this.loggedIn) {
      await this.$router.push("/login");
    }

    this.data = await api.get('/profile').then(r => r.data);
  },
}
</script>

<style scoped>
  .avatar {
    font-size: 1rem;
    display: inline-flex;
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
</style>
