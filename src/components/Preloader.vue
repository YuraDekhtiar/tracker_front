<template>
  <div class="text-center">
    <b-spinner class="spinner "  label="Loading...">dd</b-spinner>
    <div class="mt-4"><strong>Loading...</strong></div>
  </div>
</template>

<script>
export default {
  name: "vPreloader"
}
</script>

<style scoped>
  .spinner {
    width: 200px;
    height: 200px;
    margin-top: 10vh;
  }
</style>
