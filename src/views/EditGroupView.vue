<script setup>
import VPreloader from "@/components/Preloader.vue";
import VAddToGroupModal from "@/components/modals/AddGroupModal.vue";
import VSuccessButton from "@/components/buttons/SuccessButton.vue";
import VShortTable from "@/components/tables/ShortTable";
</script>

<template>
  <v-preloader v-if="isLoading"/>
  <div v-else class="container">
    <h2 class="text-center">{{ group.name }}</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-else>
      <!-- Add user to group -->
      <v-add-to-group-modal
        :modal-show="modalShowUsers"
        :data="usersOutGroup"
        :settings="tableUserSettings"
        @click-add="clickAddUserHandler"
      />

      <!-- Add device to group -->
      <v-add-to-group-modal
        :modal-show="modalShowDevices"
        :data="devicesOutGroup"
        :settings="tableDevicesSettings"
        @click-add="clickAddDeviceHandler"

      />

      <div class="form-floating mb-3">
        <input class="form-control" id="floatingInput" placeholder="group_name" v-model="name">
        <label for="group_name">Name</label>

      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Description" id="description" v-model="description"/>
        <label for="description">Description</label>
      </div>
      <div class="d-flex justify-content-end">
        <v-success-button text="Save" class="mt-2" @click="saveHandler"/>
      </div>
      <div class="row row-cols-12">
        <div class="col-6">
          <h4 class="text-center">Users</h4>
          <button class="btn btn-info mb-2" @click="openUsersModal">Add user</button>
          <v-short-table :data="group.users" :settings="tableUserSettings" @deleteAction="deleteUserHandler"/>
        </div>
        <div class="col-6">
          <h4 class="text-center ">Devices</h4>
          <button class="btn btn-info mb-2" @click="openDevicesModal">Add device</button>
          <v-short-table :data="group.devices" :settings="tableDevicesSettings" @deleteAction="deleteDeviceHandler"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import api from "@/api/api";
import vToast from "@/commons/vToast";
import onlyAdmin from "@/commons/only_admin";

export default {
  data() {
    return {
      title: "Group edit",
      isLoading: true,
      errorMessage: "",
      group: Object,
      name: "",
      description: "",
      usersOutGroup: Object,
      devicesOutGroup: Object,
      tableUserSettings: {
        columns: [
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
        initialSortBy: {field: 'username', type: 'asc'}
      },
      tableDevicesSettings: {
        columns: [
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
        initialSortBy: {field: 'name', type: 'asc'}
      },
      errorResponse: false,
      modalShowUsers: false,
      modalShowDevices: false
    }
  },
  created() {
    if (!onlyAdmin) {
      this.$router.push("/404");
    }
  },
  async beforeMount() {
    document.title = this.title;
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    async fetchData() {
      this.group = await api.get(`/group?id=${this.$route.params.id}`).then(
        (r) => {
          this.name = r.data.result.name;
          this.description = r.data.result.description;
          return r.data.result;
        },
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
        }
      );
    },
    async fetchUsersOutGroup() {
      this.usersOutGroup = await api.get(`/user/users-out-group?id=${this.$route.params.id}`)
        .then(
          (r) => r.data.result.users,
          (error) => {
            vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
          }
        )
    },
    async fetchDevicesOutGroup() {
      this.devicesOutGroup = await api.get(`/device/devices-out-group?id=${this.$route.params.id}`)
        .then(
          (r) => r.data.result.users,
          (error) => {
            vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
          }
        )
    },
    async openUsersModal() {
      await this.fetchUsersOutGroup()
      this.modalShowUsers = !this.modalShowUsers;
    },
    async deleteUserHandler(id) {
      await api.delete(`/group/delete-user?user_id=${id}&group_id=${this.$route.params.id}`).then(
        async () => {
          vToast.success(this, "Success")
          this.group.users = this.group.users.filter(item => item.id !== id)
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
    },
    async deleteDeviceHandler(id) {
      this.group.devices = this.group.devices.filter(item => item.id !== id)
      await api.delete(`/group/delete-device?device_id=${id}&group_id=${this.$route.params.id}`).then(
        async () => {
          vToast.success(this, "Success")
          this.group.devices = this.group.devices.filter(item => item.id !== id)
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
    },
    async openDevicesModal() {
      await this.fetchDevicesOutGroup()
      this.modalShowDevices = !this.modalShowDevices;
    },
    async clickAddUserHandler(id) {
      await api.post(`/group/add-user?user_id=${id}&group_id=${this.$route.params.id}`).then(
        () => {
          vToast.success(this, "Success")
          this.fetchData()
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
      await this.fetchUsersOutGroup()
    },
    async clickAddDeviceHandler(id) {
      await api.post(`/group/add-device?device_id=${id}&group_id=${this.$route.params.id}`).then(
        () => {
          vToast.success(this, "Success")
          this.fetchData()
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
      await this.fetchUsersOutGroup()
    },
    async saveHandler() {
      await api.post(`/group/edit`, {
        id: this.$route.params.id,
        name: this.name,
        description: this.description
      }).then(
        () => {
          vToast.success(this, "Success")
          this.fetchData()
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
    }
  }
}
</script>

<style>

</style>
