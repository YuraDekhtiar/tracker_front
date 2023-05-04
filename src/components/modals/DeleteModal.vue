<template>
  <div>
    <b-modal
      v-model="show"
      :title="heading"
      :ok-variant="okVariant"
      :ok-title="textDeleteButton"
      :cancel-variant="cancelVariant"
      :cancel-title="textCancelButton"
      hide-header-close
      @cancel="close"
      @ok="ok"
    >
      <div>
        <div class="d-block text-center">
          <h5> {{ message }} </h5>
          <h4> {{ itemName }} </h4>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

import VDeleteButton from "@/components/buttons/DeleteButton.vue";
import VCancelButton from "@/components/buttons/CancelButton.vue";

export default {
  name: "vDeleteModal",
  components: {VCancelButton, VDeleteButton},
  data() {
    return {
      show: false,
      heading: "Delete",
      message: "Are you sure want to delete:",
      textDeleteButton: "Delete",
      textCancelButton: "Cancel",
      okVariant: "danger",
      cancelVariant: "outline-secondary"
    }
  },
  methods: {
    ok() {
      this.close();
      this.$emit('clickConfirm');
    },
    close() {
      this.show = false;
    }
  },
  event: {
    clickConfirm: null
  },
  props: {
    modalShow: false,
    itemName: String
  },
  watch: {
    modalShow() {
      this.show = !this.show;
    }
  }
}
</script>
