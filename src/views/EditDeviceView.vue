<script setup>
  import VPreloader from "@/components/Preloader.vue";
</script>
<template>
  <vPreloader v-if="isLoading"/>
  <div v-else class="container">
    <div
      v-if="message"
      class="alert mt-2"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
    <div v-if="successful" class="col-md-12  col-lg-8 d-block mx-auto mb-4">
      <h2 class="text-center">Edit device</h2>
        <vForm @submit="onSubmit" :validation-schema="schema">
          <label for="id" class="form-label">id</label>
          <Field class="form-control" name="id" type="text" v-model="id" readonly/>
          <div>
            <ErrorMessage class="" name="id"/>
          </div>
          <label for="login" class="form-label mt-3">Login</label>
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
          <label for="conf-password" class="form-label mt-3">Confirm password</label>
          <Field class="form-control" placeholder="confirm password" name="passwordConfirm" type="password" v-model="passwordConfirm" />
          <div>
            <ErrorMessage class="" name="passwordConfirm"/>
          </div>
          <hr />
          <button class="float-end btn btn-success">Save</button>
        </vForm>
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
  data: () => {
    const schema = yup.object({
      id: yup.number().integer().required().min(1).max(999999999999999),
      login: yup.number().integer().required().min(1).max(999999999999999),
      name: yup.string().min(5, "Name must be at least 5 characters").max(45, "Name must be at least 45 characters"),
      password: yup.string().min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters").nullable(),
      passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match').min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters").nullable(),
    });
    return {
      schema,
      isLoading: true,
      errorResponse: false,
      id: "",
      login: "",
      name: "",
      password: null,
      passwordConfirm: null,
      message: "",
      successful: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('admin');
      }
      return false;
    }
  },
  created() {
    if (!this.isAdmin) {
      this.$router.push("/404");
    }
  },
  async beforeMount() {
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    onSubmit() {
      let device = {
        id: this.id,
        login: this.login,
        name: this.name.trim(),
      }
      if(this.password !== null) {
        device = {
          ...device,
          password: this.password.trim()
        }
      }
      api.put('device/edit', device).then(
        (res) => {
          this.message = res.data.result?.message;
          this.successful = true;
        },
        (error) => {
          this.message = error.response.data.message;
          this.successful = false;
        }
      );
    },
    async fetchData() {
      await api
        .get(`device?id=${this.$route.params.id}`).then(
          (res) => {
            this.id = res.data.result.id;
            this.login = res.data.result.login;
            this.name = res.data.result.name;
            this.successful = true;
          },
          (error) => {
            this.message = error.response.data.message;
            this.successful = false;
          }
        );
    },
  }
}
</script>

<style>

</style>
