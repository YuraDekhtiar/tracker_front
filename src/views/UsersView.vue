<script setup>
import dateFilter from "@/commons/date.filter";
import VPreloader from "@/components/Preloader.vue";
import VIconDeleteWithModalConf from "@/components/buttons/IconDeleteWithModalConf";
import VAddButton from "@/components/buttons/AddButton";
</script>

<template>
  <v-preloader v-if="isLoading"/>
  <div v-else class="container">
    <RouterLink class="float-end" :to="`/create-new-user`"><v-add-button text="Create user"/></RouterLink>

    <h2 class="text-center">Users</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <div v-else>
      <vue-good-table
        compactMode
        :columns="columns"
        :rows="users"
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
            initialSortBy: {field: 'username', type: 'asc'}
          }"
      >
        <template #table-row="props">
          <span v-if="props.column.field === 'actions'">
          <v-icon-delete-with-modal-conf :item-name="props.row.username" @delete-action="deleteHandler(props.row.id)"/>
          </span>
          <span v-else-if="props.column.field === 'roles'">
            {{ props.row.roles[0].name }}
          </span>
          <span v-else-if="props.column.field === 'last_visit'">
            {{ dateFilter(props.row.last_visit) }}
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
      title: "Users",
      isLoading: Boolean,
      users: Array,
      errorMessage: "",
      errorResponse: false,
      columns: [
        {
          label: 'Username',
          field: 'username',
          type: 'string',
          tdClass: 'text-start',
        },
        {
          label: 'Email',
          field: 'email',
          type: 'string',
          tdClass: 'text-start',
        },
        {
          label: 'Last visit',
          field: 'last_visit',
          type: 'string',
        },
        {
          label: 'Roles',
          field: 'roles',
          type: 'string',
          tdClass: 'text-start',
        },
        {
          label: 'Actions',
          field: 'actions',
          sortable: false,
          tdClass: 'text-center',
        }
      ],
    }
  },
  async created() {
    if (!this.onlyAdmin) {
      await this.$router.push("/404");
    }
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
  async beforeMount() {
    document.title = this.title;
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    async fetchData() {
      this.users = await api.get('/users').then(
        r => r.data.result.users,
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
        });
    },
    async deleteHandler(id) {
      await api.delete(`/users/delete?id=${id}`).then(
        async () => {
          vToast.success(this, "Success")
          this.users = this.users.filter(u => u.id !== id)
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      )
    },
  }
}
</script>
