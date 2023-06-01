<template>
  <b-button variant="outline-success" @click="onClick">
    {{ text }}
  </b-button>
</template>

<script>
export default {
  name: "vSuccessButton",
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
