<script setup>
import VPreloader from "@/components/Preloader.vue";
import VShortUserTable from "@/components/tables/ShortUserTable.vue";
import VShortDeviceTable from "@/components/tables/ShortDeviceTable.vue";
import VAddToGroupModal from "@/components/modals/AddToGroupModal.vue";
</script>

<template>
  <vPreloader v-if="isLoading"/>
  <div v-else class="container">
    <h2 class="text-center">{{ group.name }}</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-else>
      <v-add-to-group-modal :modal-show="modalShowUsers" :data="group.users" :columns="columnsTableUsers" />
      <v-add-to-group-modal :modal-show="modalShowDevices" :data="group.devices" :columns="columnsTableDevices" />

      <div class="form-floating mb-3">
        <input class="form-control" id="floatingInput" placeholder="Group name" :value="group.name">
        <label for="floatingInput">Group name</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Description" id="description" :value="group.description"/>
        <label for="description">Description</label>
      </div>
      <div class="mt-1">
        <button class="float-end btn btn-success">Change</button>
      </div>
      <br/>
      <br/>
      <div class="row row-cols-12">
        <div class="col-6">
          <h4 class="text-center">Users</h4>
          <button class="btn btn-info mb-2" @click="openUsersModal">Add user</button>
          <v-short-user-table :rows="group.users"  />
        </div>
        <div class="col-6">
          <h4 class="text-center ">Devices</h4>
          <button class="btn btn-info mb-2" @click="openDevicesModal">Add device</button>
          <v-short-device-table :rows="group.devices" />
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
      title: "Group edit",
      isLoading: Boolean,
      group: Array,
      errorMessage: "",
      columnsTableUsers: [
        {
          label: 'Name',
          field: 'username',
          tdClass: 'text-start',
        },
        {
          label: 'Actions',
          field: 'actions',
          width: '100px',
          sortable: false,
          tdClass: 'text-center',
        },
      ],
      columnsTableDevices: [
        {
          label: 'Name',
          field: 'name',
          tdClass: 'text-start',
        },
        {
          label: 'Actions',
          field: 'actions',
          width: '100px',
          sortable: false,
          tdClass: 'text-center',
        },
      ],
      errorResponse: false,
      modalShowUsers: false,
      modalShowDevices: false
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
    openUsersModal() {
      this.modalShowUsers = !this.modalShowUsers;
    },
    openDevicesModal() {
      this.modalShowDevices = !this.modalShowDevices;
    },
    async fetchData() {
      this.group = await api.get(`/group?id=${this.$route.params.id}`).then(
        r => r.data.result,
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
        });
    },
    console() {
      console.log("my-click")
    }
  }
}
</script>

<style>

</style>
