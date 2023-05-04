<script setup>
  import VPreloader from "@/components/Preloader.vue";
</script>

<template>
  <vPreloader v-if="isLoading"/>
  <div v-else class="container">
    <RouterLink v-if="isAdmin" class="float-end btn btn-info" :to="`/add-device`">Add group</RouterLink>
    <h2 class="text-center">Groups</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <div v-else>
      <vue-good-table
        compactMode
        :columns="columns"
        :rows="groups"
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
          initialSortBy: {field: 'name', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          perPage: 10,
        }">
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
          <span v-if="props.column.field === 'actions'" >
            <span v-if="isAdmin">
              <button class="btn p-0 me-2" title="Delete" @click="deleteHandler(props.row.id)">
                <BootstrapIcon
                  icon="trash3-fill"
                  size="2x"
                  color="red"
                />
              </button>
              <RouterLink class="me-2" :to="`/edit-group/${props.row.id}`" title="Edit">
                <BootstrapIcon
                  icon="pencil-fill"
                  size="2x"
                  color="blue"
                />
              </RouterLink>
            </span>
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
      title: "Groups",
      searchValue: "",
      isLoading: Boolean,
      groups: Array,
      errorMessage: "",
      errorResponse: false,
      columns: [
        {
          label: 'Name',
          field: 'name',
          tdClass: 'text-start',
        },
        {
          label: 'Description',
          field: 'description',
          type: 'string',
          tdClass: 'text-start',
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
      this.groups = await api.get('/groups').then(
        r => r.data.result.groups,
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
        });
    },
    async deleteHandler(id) {
      //await api.delete(`/device/delete?id=${id}`)
      //this.devices = this.devices.filter(d => d.id !== id)
    },
    isOnline(status) {
      return status ? "green" : "red"
    }
  }
}
</script>

<style>


</style>
