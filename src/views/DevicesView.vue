<script setup>
import VPreloader from "@/components/Preloader.vue";
import dateFilter from "@/commons/date.filter";
import VIconDeleteWithModalConf from "@/components/buttons/IconDeleteWithModalConf";
import VIconEditButton from "@/components/buttons/IconEditButton";
import VAddButton from "@/components/buttons/AddButton";
</script>

<template>
  <v-preloader v-if="isLoading"/>
  <div v-else class="container">
    <RouterLink v-if="onlyAdmin" class="float-end" :to="`/add-device`"><v-add-button text="Add device"/></RouterLink>

    <h2 class="text-center">Devices</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-else>
      <vue-good-table
        compactMode
        :columns="columns"
        :rows="devices"
        line-numbers
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
        :pagination-options="{
          enabled: true,
          perPage: 10,
        }"
      >
        <template #table-row="props">
          <span v-if="props.column.field === 'is_online'" :title="isOnline(props.row.is_online).title">
            <BootstrapIcon
              icon="record-fill"
              size="2x"
              :color="isOnline(props.row.is_online).color"
            />
          </span>
          <span v-else-if="props.column.field === 'actions'">
            <span v-if="onlyAdmin">
              <v-icon-delete-with-modal-conf
                :item-name="props.row.name"
                @delete-action="deleteHandler(props.row.id)"
              />
              <v-icon-edit-button :href="`/edit/${props.row.id}`"/>
            </span>
            <RouterLink :to="`/map/${props.row.id}`" title="Tracking">
              <BootstrapIcon
                icon="geo-alt-fill"
                size="2x"
                color="green"
              />
            </RouterLink>
          </span>
          <span v-else-if="props.column.field === 'time_last_connection'">
            {{ dateFilter(props.row.time_last_connection) }}
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>

import api from "@/api/api";
import vToast from "@/commons/vToast";

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
          type: 'string',
          tdClass: 'text-start',
        },
        {
          label: 'Status',
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
  async beforeMount() {
    document.title = this.title;
    await this.fetchData();
    this.isLoading = false;
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
  methods: {
    async fetchData() {
      this.devices = await api.get(`/device/devices`).then(
        (r) => r.data.result.devices,
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
        });
    },
    async deleteHandler(id) {
      await api.delete(`/device/delete?id=${id}`).then(
        async () => {
          vToast.success(this, "Success")
          this.devices = this.devices.filter(d => d.id !== id)
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
    },
    isOnline(status) {
      return {color: status ? "green" : "red", title: status ? "Online" : "Offline"};
    }
  }
}
</script>

<style>


</style>
