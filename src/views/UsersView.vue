<script setup>
  import dateFilter from "@/commons/date.filter";
  import VPreloader from "@/components/Preloader.vue";
</script>

<template>
  <vPreloader v-if="isLoading"/>
  <div v-else class="container">
    <RouterLink class="float-end btn btn-info" :to="`/create-new-user`">Create user</RouterLink>
    <h2 class="text-center">Users</h2>
    <div v-if="errorResponse" class="alert alert-danger" role="alert">
        {{errorMessage}}
      </div>
      <div v-else>
        <vue-good-table
          compactMode
          :columns="columns"
          :rows="users"
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
            initialSortBy: {field: 'username', type: 'asc'}
          }"
      >
        <template #table-row="props">
          <span v-if="props.column.field === 'actions'" >
            <button class="btn p-0 me-2" title="Delete" @click="deleteHandler(props.row.id)">
                <BootstrapIcon
                  icon="trash3-fill"
                  size="2x"
                  color="red"
                />
              </button>
          </span>
          <span v-else-if="props.column.field === 'roles'">
            {{props.row.roles[0].name}}
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
  async created() {
    if (!this.isAdmin) {
      await this.$router.push("/404");
    }
  },
  async beforeMount() {
    document.title = this.title;
    await this.fetchData();
    this.isLoading = false;
  },
  methods: {
    async deleteHandler(id) {
      await api.delete(`/users/delete?id=${id}`)
      this.users = this.users.filter(u => u.id !== id)
    },
    async fetchData() {
      this.users = await api.get('/users').then(
        r => r.data.result.users,
        (error) => {
          this.errorResponse = true;
          this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
        });
      console.log(this.users)
    }
  }
}
</script>
