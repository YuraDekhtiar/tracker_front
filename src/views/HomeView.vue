
<template>
  <div>
    <vTable :items="resData"></vTable>
  </div>
</template>


<script>
import vTable from "@/components/Table";

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
      try {
        this.resData = await fetch(`/api/devices/`, {
          method: 'GET',
          }).then(res => res.json())
        } catch (e) {
          console.log(e)
        }
      },
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
