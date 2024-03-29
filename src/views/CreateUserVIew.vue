<script setup>
import VPreloader from "@/components/Preloader";

</script>
<template>
  <v-preloader v-if="isLoading"/>
  <div v-else class="container">
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-else>
      <div
        v-if="message"
        class="alert mt-2"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
      <div class="col-md-12  col-lg-8 d-block mx-auto mb-4" v-if="!successful">
        <h2 class="text-center">Create new user</h2>
        <vForm @submit="onSubmit" :validation-schema="schema">
          <label for="username" class="form-label">Username</label>
          <Field class="form-control" placeholder="admin" name="username" type="text" v-model="username" />
          <div>
            <ErrorMessage class="" name="username"/>
          </div>

          <label for="email" class="form-label mt-3">Email</label>
          <Field class="form-control" placeholder="your_mail@example.com" name="email" type="email" v-model="email" />
          <div>
            <ErrorMessage class="" name="email"/>
          </div>

          <label for="password" class="form-label mt-3">Password</label>
          <Field class="form-control" name="password" type="password" v-model="password" />
          <div>
            <ErrorMessage name="password"/>
          </div>
          <label for="passwordConfirm" class="form-label mt-3">Confirm password</label>
          <Field class="form-control" name="passwordConfirm" type="password" v-model="passwordConfirm" />
          <div>
            <ErrorMessage name="passwordConfirm"/>
          </div>
          <h4 class="mt-3">Roles</h4>
          <div class="ms-3">
            <div class="form-check">
              <input v-model="role" value="user" id="role-user" name="roles" type="radio" class="form-check-input" checked required="">
              <label class="form-check-label" for="role-user">User</label>
            </div>
            <div class="form-check">
              <input v-model="role" value="admin" id="role-admin" name="roles" type="radio" class="form-check-input" required="">
              <label class="form-check-label" for="role-admin">Admin</label>
            </div>
          </div>
          <hr />
          <button class="float-end btn btn-success">Create</button>
        </vForm>
      </div>
    </div>
  </div>
</template>


<script>
import * as yup from "yup";
import {Form as vForm, Field, ErrorMessage} from 'vee-validate';
import api from "@/api/api";

export default {
  components: {
    vForm,
    Field,
    ErrorMessage
  },
  data:() => {
    const schema = yup.object({
      username: yup.string().required('Username is required').min(3).max(20),
      email: yup.string().required('Email is required').email().max(45),
      password: yup.string().required('Password is required').min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters"),
      passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Confirm password must match Password').required('Confirm password is required').min(8, "Confirm password must be at least 8 characters")
        .max(20, "Confirm password must be at most 20 characters"),
    });
    return {
      schema,
      isLoading: true,
      errorMessage: "",
      errorResponse: false,
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "user",
      message: "",
      successful: false,
    }
  },
  created() {
    if (!this.onlyAdmin) {
      this.$router.push("/404");
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    onlyAdmin() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('admin');
      }
      return false;
    }
  },
  mounted() {
    this.isLoading = false
  },
  methods: {
    onSubmit() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role,
      }
      api.post('users/create-new-user', user).then(
        (res) => {
          this.message = res.data.result.message;
          this.successful = true;
        },
        (error) => {
          this.message = error.response.data.message
          this.successful = false;
        }
      )
    }
  }
}
</script>

<style>

</style>
