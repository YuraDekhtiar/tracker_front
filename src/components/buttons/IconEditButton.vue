<template>
  <RouterLink class="me-2" :to="href" title="Edit">
    <BootstrapIcon
      icon="pencil-fill"
      size="2x"
      color="blue"
    />
  </RouterLink>
</template>

<script>
export default {
  name: "vIconEditButton",

  props: {
    href: ""
  },
}
</script>

<style scoped>

</style>
