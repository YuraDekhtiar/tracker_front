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
        <h2 class="text-center">Add device</h2>
        <vForm @submit="onSubmit" :validation-schema="schema">
          <label for="login" class="form-label">Login</label>
          <Field class="form-control" placeholder="1234" name="login" type="text" v-model="login" />
          <div>
            <ErrorMessage class="" name="login"/>
          </div>
          <label for="name" class="form-label mt-3">Nickname</label>
          <Field class="form-control" placeholder="nickname" name="name" type="text" v-model="name" />
          <div>
            <ErrorMessage class="" name="name"/>
          </div>
          <label for="password" class="form-label mt-3">Password</label>
          <Field class="form-control" placeholder="password" name="password" type="password" v-model="password" />
          <div>
            <ErrorMessage class="" name="password"/>
          </div>
          <label for="passwordConfirm" class="form-label mt-3">Confirm password</label>
          <Field class="form-control" placeholder="confirm password" name="passwordConfirm" type="password" v-model="passwordConfirm" />
          <div>
            <ErrorMessage class="" name="passwordConfirm"/>
          </div>
          <hr />
          <button class="float-end btn btn-success">Add</button>
        </vForm>
      </div>
    </div>
  </div>
</template>


<script>
import * as yup from "yup";
import {Form as vForm, Field, ErrorMessage} from 'vee-validate';
import api from "@/api/api";
import onlyAdmin from "@/commons/only_admin";

export default {
  components: {
    vForm,
    Field,
    ErrorMessage
  },
  data: () => {
    const schema = yup.object({
      login: yup.number().integer().required().min(1).max(999999999999999),
      name: yup.string().min(5, "Name must be at least 5 characters").max(45, "Name must be at least 45 characters"),
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
      login: "",
      name: "",
      password: "",
      passwordConfirm: "",
      message: "",
      successful: false,
    }
  },
  created() {
    if (!onlyAdmin) {
      this.$router.push("/404");
    }
  },
  mounted() {
    this.isLoading = false
  },
  methods: {
    onSubmit() {
      const device = {
        login: this.login.trim(),
        name: this.name.trim(),
        password: this.password.trim(),
      }

      api.post('device/add-device', device).then(
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
