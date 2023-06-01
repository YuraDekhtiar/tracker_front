<template>
  <b-button variant="primary" @click="onClick">
    <slot>
      {{ text }}
    </slot>
  </b-button>
</template>

<script>
export default {
  name: "vPrimaryButton",
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
