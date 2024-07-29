<template>
  <div>
    <Field
      class="form-control mt-2"
      :placeholder="placeholder"
      :name="name"
      :type="type"
      :validateOnBlur="validateOnBlur"
      v-model="input"
      :onblur="inputUpdate"
      trim
    />
  </div>
</template>

<script>



import {Field} from "vee-validate";

export default {
  name: "vField",
  components: {Field},
  data() {
    return {
      input: "",
    }
  },
  methods: {
    inputUpdate() {
      this.$emit('update:input', this.input)
    }
  },
  props: {
    placeholder: "",
    name: "",
    validateOnBlur: false,
    type: "text",
  },
  emits: ['update:input'],
}
</script>

<style scoped>

</style>
