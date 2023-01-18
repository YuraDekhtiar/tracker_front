<script setup>
import VPreloader from "@/components/Preloader.vue";
</script>

<template>
  <vPreloader v-if="isLoading"/>
  <div v-else class="container">
    <RouterLink v-if="isAdmin" class="float-end btn btn-info" :to="`/add-device`">Add device</RouterLink>
    <h2 class="text-center">Devices</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <div v-else>
      <vue-good-table
        compactMode
        :columns="columns"
        :rows="devices"

        :line-numbers="true"
        :select-options="{
          enabled: true,
          selectionInfoClass: 'selection-info',
          selectOnCheckboxOnly: true
        }"
        :search-options="{
          placeholder: 'Search',
          enabled: true,

        }"
        :sort-options="{
          enabled: true,
          initialSortBy: {field: 'login', type: 'asc'}
        }"
      >
        <template #selected-row-actions>
          <span v-if="isAdmin">
            <button class="btn" title="Delete" @click="deleteHandler(0)">
              <BootstrapIcon
                icon="trash3-fill"
                size="2x"
                color="red"
              />
            </button>
          </span>
        </template>

        <template #table-row="props">
          <span v-if="props.column.field === 'is_online'">
            <BootstrapIcon
              icon="record-fill"
              size="2x"
              :color="isOnline(props.row.is_online)"
            />
          </span>
          <span v-else-if="props.column.field === 'actions'" >
            <span v-if="isAdmin">
              <button class="btn p-0 me-2" title="Delete" @click="deleteHandler(props.row.id)">
                <BootstrapIcon
                  icon="trash3-fill"
                  size="2x"
                  color="red"
                />
              </button>
              <RouterLink class="me-2" :to="`/edit/${props.row.id}`" title="Edit">
                <BootstrapIcon
                  icon="pencil-fill"
                  size="2x"
                  color="blue"
                />
              </RouterLink>
            </span>
            <RouterLink :to="`/map/${props.row.id}`" title="Tracking">
              <BootstrapIcon
                icon="geo-alt-fill"
                size="2x"
                color="green"
              />
            </RouterLink>
          </span>
          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>

import api from "@/api/api";
export default {
  data() {
    return {
      title: "Devices",
      searchValue: "",
      isLoading: Boolean,
      devices: Array,
      errorMessage: "",
      errorResponse: false,
      columns: [
        {
          label: 'Device login',
          field: 'login',
          type: 'number',
          tdClass: 'text-start',
        },
        {
          label: 'Name',
          field: 'name',
          tdClass: 'text-start',
        },
        {
          label: 'Last connection',
          field: 'time_last_connection',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
          dateOutputFormat: 'dd/MM/yyyy HH:mm:ss',
          tdClass: 'text-start',
        },
        {
          label: 'Online',
          field: 'is_online',
          width: '90px',
          tdClass: 'text-center',

        },
        {
          label: 'Actions',
          field: 'actions',
          width: '150px',
          sortable: false,
          tdClass: 'text-center',
        },
      ],
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


</style>
