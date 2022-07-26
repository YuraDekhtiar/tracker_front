
<template>
  <div>
    <vTable :items="resData"></vTable>
  </div>
</template>


<script>
import vTable from "@/components/Table";
import api from "@/api/api";

export default {
  components: {
    vTable
  },
  data() {
    return {
      resData: Object,
    }
    },
  async beforeMount() {
  await this.fetchData()
    this.isLoading = false;
  },
  methods: {
    async fetchData() {
      this.resData = await api
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
