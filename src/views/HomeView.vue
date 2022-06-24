<template>
  <div class="table">
    <b-table :items="items" ></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { id: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { id: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { id: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
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
