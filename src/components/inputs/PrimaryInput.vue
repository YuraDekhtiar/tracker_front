<template>
  <div class="form-floating mb-3">
    <b-form-input
      :type="type"
      id="floatingInput"
      :state="inputState"
      :placeholder="placeholder"
      v-model="input"
      :onblur="inputUpdate"
      trim
    />
    <label for="floatingInput">{{ placeholder }}</label>
    <b-form-invalid-feedback id="input-live-feedback" class="m-2">
      {{ invalidMassage }}
    </b-form-invalid-feedback>
  </div>
</template>

<script>

export default {
  name: "vPrimaryInput",
  data() {
    return {
      input: "",
      validateError: null,
    }
  },
  computed: {
    inputState() {
      this.inputUpdate()
      return this.validateError
    },
  },
  methods: {
    inputUpdate() {
      this.$emit('update:input', this.input)
    }
  },
  props: {
    placeholder: "",
    invalidMassage: "",
    state: null,
    type: "text"
  },
  watch: {
    state(e) {
      this.validateError = e
    }
  },
  emits: ['update:input'],
}
</script>

<style scoped>

</style>
