<script setup>
  import dateFilter from "@/commons/date.filter";
</script>

<template>
    <div v-if="!isLoading" class="container">
      <h2 class="text-center">Users</h2>
      <RouterLink class="float-end btn btn-info" :to="`/create-new-user`">Create user</RouterLink>
      <div v-if="errorResponse" class="alert alert-danger" role="alert">
        {{errorMessage}}
      </div>
      <div v-else>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Last visit</th>
            <th scope="col">Roles</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in users" v-bind:key="i">
            <th scope="row">{{ i+1 }}</th>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ dateFilter(item.last_visit) }}</td>
            <td>
              <div v-for="(item, i) in item.roles" v-bind:key="i">
                <div>{{item.name}}</div>
              </div>
            </td>
            <td><button class="btn btn-danger" title="Delete" @click="deleteHandler(item.id)">X</button></td>
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
      isLoading: Boolean,
      users: Array,
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

  async created() {
    if (!this.isAdmin) {
      await this.$router.push("/404");
      return ;
    }
    this.users = await api.get('/users').then(
      r => r.data.result,
      (error) => {
        this.errorResponse = true;
        this.errorMessage = `${error.response.data.status || ""}  ${error.response.data.message || "Not internet connecting"}`;
      }
    );
    this.isLoading = false;
  },
  methods: {
    async deleteHandler(id) {
      await api.delete(`/users/delete?id=${id}`)
      this.users = this.users.filter(u => u.id !== id)
    }
  }
}
</script>
