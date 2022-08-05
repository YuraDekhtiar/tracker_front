<script setup>
  import dateFilter from "@/commons/date.filter";
</script>
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
            <hr/>
            <div>
              <div class="mt-3">
                <span class="fs-4 text">Login: </span><span class="fs-5 text">{{data.username}}</span>
              </div>
              <div class="mt-3">
                <span class="fs-4 text">Email: </span><span class="fs-5 text">{{data.email}}</span>
              </div>
              <div class="mt-3">
                <span class="fs-4 text">Last visit: </span><span class="fs-5 text">{{dateFilter(data.last_visit)}}</span>
              </div>
              <div class="mt-3">
                <span class="fs-4 text">Date registration: </span><span class="fs-5 text">{{dateFilter(data.date_registration)}}</span>
              </div>
              <div class="mt-3">
                <ul>
                  <span class="fs-5 text">Roles: </span>
                  <li v-for="item in data.roles" :key="item.name">
                    <span class="fs-5 text">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
              <hr/>
              <form v-on:submit.prevent="handleChangePass">
                <div class="fs-5 text" >Change password:</div>
                <input type="password" class="form-control mt-1" name="oldPass" placeholder="Old password">
                <input type="password" class="form-control mt-2" name="newPass" placeholder="New password">
                <input type="password" class="form-control mt-1" name="confNewPass" placeholder="Confirm new password">
                <div
                  v-if="message"
                  class="alert mt-2"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >
                  {{ message }}
                </div>
                <button class="btn btn-primary mt-3" type="submit">Save</button>
              </form>
              <hr/>
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
      message: "",
      successful: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async created() {
    this.data = await api.get('/profile').then(r => r.data);
  },
  methods: {
    async handleChangePass(submitEvent) {
      this.loading = true;
      this.message = "";
      const passwords = {
        oldPassword: submitEvent.target.elements.oldPass.value,
        newPassword: submitEvent.target.elements.newPass.value,
        confNewPassword: submitEvent.target.elements.confNewPass.value,
      }
      if (passwords.newPassword !== passwords.confNewPassword) {
        this.message = "Confirm password doesn't match New password"
        this.successful = false
      } else {
        await api.put('/profile/change-pass', passwords).then( () => {
            this.message = "Success";
            this.successful = true;
          },
          (error) => {
            this.message = error.response.data.message
            this.successful = false;
          }
        );
      }
    },
  }
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