<template>
  <b-button variant="outline-secondary" @click="onClick">
    {{ text }}
  </b-button>
</template>

<script>
export default {
  name: "vCancelButton",
  methods: {
    onClick() {
      this.$emit('click')
    }
  },
  props: {
    text: String,
  },
  emits: {
    click: null
  }
}
</script>

<style scoped>

</style>
