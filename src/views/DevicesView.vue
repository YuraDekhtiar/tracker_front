<script setup>
  import dateFilter from "@/commons/date.filter";
</script>

<template>
  <div v-if="!isLoading">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Device login</th>
        <th scope="col">Name</th>
        <th scope="col">Last connection</th>
        <th scope="col">Online</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item, i) in devices" v-bind:key="i">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.device_login }}</td>
        <td>{{ item.name }}</td>
        <td>{{dateFilter(item.time_last_connection)}}</td>
        <td>{{ item.is_online }}</td>
        <td><RouterLink class="btn btn-success" :to="`/map/${item.id}`">Tracking</RouterLink></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

import api from "@/api/api";

export default {
  data() {
    return {
      isLoading: Boolean,
      devices: Array,
    }
  },
  async beforeMount() {
    await this.fetchData()
    this.isLoading = false;

  },
  methods: {
    async fetchData() {
      this.devices = await api
        .get('devices').then(r => r.data)
    }
  }
}
</script>

<style>
.table {
  margin: 0 auto;
}
@media (min-width: 1600px) {
  .table {
    width: 80%;
  }
}
</style>
