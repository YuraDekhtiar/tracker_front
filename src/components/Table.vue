<template>
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

    <tr v-for="(item, i) in items" v-bind:key="i">
      <th scope="row">{{ item.id }}</th>
      <td>{{ item.device_login }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.time_last_connection }}</td>
      <td>{{ item.is_online }}</td>
      <td><button type="button" class="btn btn-info">Tracking</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'vTable',
  props: {
    items: Object
  }
}
</script>

<style scoped>

</style>
