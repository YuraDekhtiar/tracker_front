<template>
  <b-button variant="primary" @click="onClick">
    {{ text }}
  </b-button>
</template>

<script>
export default {
  name: "vPrimaryButton",
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
