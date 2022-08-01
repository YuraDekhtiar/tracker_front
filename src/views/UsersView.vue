<script setup>
  import dateFilter from "@/commons/date.filter";
</script>

<template>
    <div v-if="!isLoading" class="container">
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
          </tr>
          </thead>
          <tbody>

          <tr v-for="(item, i) in users" v-bind:key="i">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{dateFilter(item.last_visit)}}</td>
            <td>
              <div v-for="(item, i) in item.roles" v-bind:key="i">
                <div>{{item.name}}</div>
              </div>
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
      isLoading: Boolean,
      users: Array,
      errorMessage: "",
      errorResponse: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('admin');
      }
      return false;
    }
  },
  async created() {
    if (!this.loggedIn) {
      await this.$router.push("/login");
    }
    this.users = await api.get('/users').then(
      r => r.data,
      (error) => {
        this.errorResponse = true;
        this.errorMessage = `${error.response.data.status} ${error.response.data.message}`;
      }
    );
    this.isLoading = false;
  }
}
</script>
