<template>
  <b-button variant="btn p-0" @click="onClick">
    <BootstrapIcon
      icon="plus-square-fill"
      size="2x"
      color="green"
    />
  </b-button>
</template>

<script>
export default {
  name: "vIconAddButton",
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  },
  props: {
    text: String,
  },
  emits: {
    onClick: null
  }
}
</script>

<style scoped>

</style>
