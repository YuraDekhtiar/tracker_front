<template>
  <div class="row justify-content-center me-0 ms-0">
    <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
      <div class="row justify-content-center mt-4 mb-3">
        <img class="col-xs-2 col-sm-6 col-md-6 col-lg-7 col-xl-5 mt-1" src="/images/logo.png" alt="Logo">
      </div>
      <h3 class="text-center my-4">Sign In</h3>
      <v-form @submit="handleLogin" :validation-schema="schema">
        <Field name="username" v-model="values.username" v-slot="{ errorMessage }">
          <v-primary-input
            type="text"
            placeholder="Username"
            v-model:input=values.username
            :invalid-massage="errorMessage"
            :state="!errorMessage"
          />
        </Field>
        <Field name="password" v-model="values.password" v-slot="{ errorMessage }">
          <v-primary-input
            type="password"
            placeholder="Password"
            v-model:input=values.password
            :invalid-massage="errorMessage"
            :state="!errorMessage"
          />
        </Field>
        <v-primary-button text="Login" class="form-control" type="submit"/>
      </v-form>
      <Alert :message="errorLoginMessage"/>
    </div>
  </div>

</template>

<script>
import Alert from "@/components/Alert";
import {Form as vForm, Field, ErrorMessage} from 'vee-validate';
import vPrimaryInput from "@/components/inputs/PrimaryInput.vue";
import VPreloader from "@/components/Preloader.vue";
import * as yup from "yup";
import VPrimaryButton from "@/components/buttons/PrimaryButton";

export default {
  components: {VPrimaryButton, Alert, vForm, Field, ErrorMessage, vPrimaryInput, VPreloader},
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Field username is required"),
      password: yup.string().required("Field password is required"),
    });
    return {
      title: "GPS Tracker - Login",
      errorLoginMessage: "",
      values: {
        username: "",
        password: "",
      },
      schema,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async beforeMount() {
    document.title = this.title;
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      const user = {
        username: this.values.username.trim(),
        password: this.values.password.trim(),
      }
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        error => {
          this.errorLoginMessage =
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
