<script setup>
import VPreloader from "@/components/Preloader.vue";
import VIconDeleteButton from "@/components/buttons/IconDeleteWithModalConf.vue";
import VAddButton from "@/components/buttons/AddButton.vue";
import VCreateGroupModal from "@/components/modals/CreateGroupModal.vue";
</script>

<template>
  <vPreloader v-if="isLoading"/>
  <div v-else class="container">
    <!--    <RouterLink v-if="onlyAdmin" class="float-end btn btn-info" :to="`/add-device`">Add group</RouterLink>-->
    <div class="d-flex justify-content-end">
      <v-create-group-modal :modalShow="showModal" @click-confirm="fetchData"/>
      <v-add-button text="Create group" @click="showModal = !showModal"/>
    </div>
    <h2 class="text-center">Groups</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-else>
      <vue-good-table
        compactMode
        :columns="columns"
        :rows="groups"
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
          initialSortBy: {field: 'name', type: 'asc'}
        }"
        :pagination-options="{
          enabled: true,
          perPage: 10,
        }">
        <template #table-row="props">
          <span v-if="props.column.field === 'actions'">
            <span v-if="onlyAdmin">
              <v-icon-delete-button :itemName="props.row.name" @deleteAction="deleteHandler(props.row.id)"/>
              <span class="ms-2"/>
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
import vToast from "@/commons/vToast";

export default {
  data() {
    return {
      title: "Groups",
      searchValue: "",
      isLoading: Boolean,
      showModal: false,
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
    onlyAdmin() {
      return this.$store.state.auth.user.isAdmin
    }
  },
  async beforeMount() {
    document.title = this.title;
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    async fetchData() {
      this.groups = await api.get('/group/groups').then(
        r => r.data.result.groups,
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
        });
    },
    async deleteHandler(id) {
      await api.delete(`/group/delete?id=${id}`).then(
        () => {
          vToast.success(this, 'Deleted success')
          this.groups = this.groups.filter(item => item.id !== id)
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
    },
    isOnline(status) {
      return status ? "green" : "red"
    }
  }
}
</script>

<style>


</style>
