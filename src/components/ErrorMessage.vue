<script setup>

import {ErrorMessage} from "vee-validate";
</script>

<template>
  <ErrorMessage class="text-danger ms-2 mt-1" :name="name" as="div" />
</template>

<script>
export default {
  name: 'vErrorMessage',

  props: {
    name: ""
  },
}
</script>

<style scoped>

</style>
