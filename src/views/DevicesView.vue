<script setup>
  import dateFilter from "@/commons/date.filter";
  import VPreloader from "@/components/Preloader.vue";
</script>

<template>
  <vPreloader v-if="isLoading"/>

  <div v-else class="container">
    <h2 class="text-center">Devices</h2>
    <RouterLink v-if="isAdmin" class="float-end btn btn-info" :to="`/add-device`">Add device</RouterLink>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <div v-else>
      <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Device login</th>
        <th scope="col">Name</th>
        <th scope="col">Last connection</th>
        <th scope="col">Online</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in devices" v-bind:key="i">
        <th scope="row">{{ i+1 }}</th>
        <td>{{ item.login }}</td>
        <td>{{ item.name }}</td>
        <td>{{dateFilter(item.time_last_connection)}}</td>
        <td>
          <BootstrapIcon
            icon="record-fill"
            size="2x"
            :color="isOnline(item.is_online)"
          />
        </td>
        <td>
          <span v-if="isAdmin">
            <button class="btn btn-danger me-2" title="Delete" @click="deleteHandler(item.id)">X</button>
            <RouterLink class="btn btn-info me-2" :to="`/edit/${item.id}`" title="Edit">E</RouterLink>
          </span>
          <RouterLink class="btn btn-success" :to="`/map/${item.id}`" title="Tracking">T</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>

import api from "@/api/api";

export default {
  data() {
    return {
      title: "Devices",
      isLoading: Boolean,
      devices: Array,
      errorMessage: "",
      errorResponse: false
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
  async beforeMount() {
    document.title = this.title;
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    async fetchData() {
      this.devices = await api.get('/devices').then(
        r => r.data.result,
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
       });
    },
    async deleteHandler(id) {
      await api.delete(`/device/delete?id=${id}`)
      this.devices = this.devices.filter(d => d.id !== id)
    },
    isOnline(status) {
      return status ? "green" : "red"
    }
  }
}
</script>

<style>
.table {
  margin: 0 auto;
}
@media (min-width: 1600px) {
  .table {
    width: 80%;
  }
}
</style>
