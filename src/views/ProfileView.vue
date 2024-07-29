<script setup>
import dateFilter from "@/commons/date.filter";
import VPreloader from "@/components/Preloader";
import VErrorMessage from "@/components/ErrorMessage.vue";
import VField from "@/components/inputs/Field.vue";
</script>
<template>
  <v-preloader v-if="isLoading"/>
  <div v-else class="container">
    <div class="row">
      <div class="col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
        <div class="media align-items-center">
          <button
            class=" btn avatar avatar-sm rounded-circle position-relative"
            @mouseover="showButton = true"
            @mouseleave="showButton = false"
            @click="onClickUpload"
          >
            <img
              alt="User icon"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              href=""
            >

            <BootstrapIcon
              v-if="showButton"
              class="col-sm-3 p-0 position-absolute bottom-0 end-0"
              icon="pencil-square"
              size="2x"
              color="black"
            />
            <input type="file" ref="fileInput" @change="onFileChange" style="display: none">
          </button>
          <div class="text-center">
            <span class="fs-2 text">
              {{ data.username }}
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm col-md col-lg col-xl col-xxl">
        <b-card no-body>
          <b-tabs small card>
            <b-tab title="General">
              <div>
                <div class="mt-3">
                  <span class="fs-4 text primary">Email: </span><span class="fs-4 text">{{ data.email }}</span>
                </div>
                <div class="mt-3">
                  <span class="fs-4 text">Last visit: </span><span class="fs-4 text">{{
                    dateFilter(data.last_visit)
                  }}</span>
                </div>
                <div class="mt-3">
                  <span class="fs-4 text">Date registration: </span><span
                  class="fs-4 text">{{ dateFilter(data.date_registration) }}</span>
                </div>
              </div>
            </b-tab>
            <b-tab title="Info">
              <div class="mt-3" v-if="data?.roles.length > 0">
                <ul class="fs-5 text">
                  Roles:
                  <li v-for="item in data?.roles" :key="item.id">
                    <span class="fs-5 text">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
              <div class="mt-3">
                <ul class="fs-5 text" v-if="data?.groups.length > 0">
                  Groups:
                  <li v-for="item in data?.groups" :key="item.id">
                    <span class="fs-5 text">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </b-tab>
            <b-tab title="Edit profile">
              <vForm @submit="onSubmit" :validation-schema="schema">
                <vField
                  placeholder="Old password"
                  name="oldPassword"
                  type="password"
                  :validateOnBlur="false"
                  v-model:input="oldPassword" />
                <div>
                  <vErrorMessage name="oldPassword"/>
                </div>
                <vField
                  placeholder="New password"
                  name="newPassword"
                  type="password"
                  :validateOnBlur="false"
                  v-model:input="newPassword"/>
                <div>
                  <vErrorMessage class="" name="newPassword"/>
                </div>
                <vField
                  placeholder="Confirm password"
                  name="newConfPassword"
                  type="password"
                  :validateOnBlur="false"
                  v-model:input="newConfPassword"/>
                <div>
                  <vErrorMessage class="" name="newConfPassword"/>
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn btn-primary mt-2" type="submit">Save</button>
                </div>
              </vForm>
            </b-tab>
          </b-tabs>
        </b-card>

      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import {Form as vForm, Field, ErrorMessage} from 'vee-validate';
import * as yup from "yup";
import vToast from "@/commons/vToast";

export default {
  components: {
    vForm,
    Field,
    ErrorMessage,
  },
  data: () => {
    const schema = yup.object({
      oldPassword: yup.string().required('Old password is required'),
      newPassword: yup.string().required('Password is required')
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters"),
      newConfPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Confirm password must match Password')
        .required('Confirm password is required').min(8, "Confirm password must be at least 8 characters")
        .max(20, "Confirm password must be at most 20 characters"),
    });

    return {
      title: "Profile",
      schema,
      showButton: false,
      isLoading: true,
      data: Object,
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
  async beforeMount() {
    document.title = this.title;
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    onClickUpload() {
      this.$refs.fileInput.click();
    },
    async fetchData() {
      this.data = await api.get('/profile').then(r => r.data.result);
    },
    async onSubmit(values, {resetForm}) {
      this.loading = true;
      const passwords = {
        oldPassword: this.oldPassword.trim(),
        newPassword: this.newPassword.trim(),
        confNewPassword: this.newConfPassword.trim(),
      }
      console.log(passwords)
      await api.put('/profile/change-pass', passwords).then(
        () => {
          vToast.success(this, "Success")
          resetForm()
        },
        (error) => {
          vToast.error(this, error.response.data.message)
        }
      );
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
