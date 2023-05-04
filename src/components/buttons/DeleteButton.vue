<template>
  <b-button variant="danger" @click="onClick">
    {{ text }}
  </b-button>
</template>

<script>
export default {
  name: "vDeleteButton",
  methods: {
    onClick () {
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
