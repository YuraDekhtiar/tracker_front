<template>
  <div
    v-if="message"
    class="alert mt-2"
    :class="successful ? 'alert-success' : 'alert-danger'"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "vAlert",
  props: {
    message: String,
    successful: Boolean,
  },
}
</script>

<style scoped>

</style>
