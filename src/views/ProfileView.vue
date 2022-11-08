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
              <vForm @submit="onSubmit" :validation-schema="schema">
                <Field class="form-control " placeholder="old password"  name="oldPassword" type="password" v-model="oldPassword" />
                <div>
                  <ErrorMessage class="" name="oldPassword"/>
                </div>
                <Field class="form-control mt-2" placeholder="new password" name="newPassword" type="password" v-model="newPassword" />
                <div>
                  <ErrorMessage class="" name="newPassword"/>
                </div>
                <Field class="form-control mt-2" placeholder="confirm password" name="newConfPassword" type="password" v-model="newConfPassword" />
                <div>
                  <ErrorMessage class="" name="newConfPassword"/>
                </div>
                <div
                  v-if="message"
                  class="alert mt-2"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >
                  {{ message }}
                </div>
                <button class="btn btn-primary mt-2" type="submit">Save</button>
              </vForm>
              <hr/>
            </div>
        </div>
      </div>
      </div>
</template>

<script>
import api from "@/api/api";
import {Form as vForm, Field, ErrorMessage} from 'vee-validate';
import * as yup from "yup";

export default {
  components: {
    vForm,
    Field,
    ErrorMessage
  },
  data: () => {
    const schema = yup.object({
      oldPassword: yup.string().required('Old password is required'),
      newPassword: yup.string().required('Password is required').min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters"),
      newConfPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Confirm password must match Password').required('Confirm password is required').min(8, "Confirm password must be at least 8 characters")
        .max(20, "Confirm password must be at most 20 characters"),
    });
    return {
      schema,
      loading: false,
      data: Object,
      message: "",
      successful: false,
      oldPassword: "",
      newPassword: "",
      newConfPassword: ""

    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async created() {
    this.data = await api.get('/profile').then(r => r.data.result);
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      this.message = "";

      const passwords = {
        oldPassword: this.oldPassword.trim(),
        newPassword: this.newPassword.trim(),
        confNewPassword: this.newConfPassword.trim(),
      }
      await api.put('/profile/change-pass', passwords).then(
        () => {
          this.message = "Success";
          this.successful = true;
        },
        (error) => {
          this.message = error.response.data.message
          this.successful = false;
        }
      );
    },

    async handleChangePass(submitEvent) {
      const minLength = 8;
      this.loading = true;
      this.message = "";
      const passwords = {
        oldPassword: submitEvent.target.elements.oldPass.value.trim(),
        newPassword: submitEvent.target.elements.newPass.value.trim(),
        confNewPassword: submitEvent.target.elements.confNewPass.value.trim(),
      }
      if (passwords.newPassword !== passwords.confNewPassword) {
        this.message = "Confirm password doesn't match New password"
        this.successful = false
      } else if(passwords.oldPassword < minLength || passwords.newPassword < minLength || passwords.confNewPassword < minLength) {
        this.message = "The password must be at least 8 characters"
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
