<template>
  <v-delete-modal :modalShow="modalShow" :itemName="itemName" @clickConfirm="deleteAction"/>
  <button class="btn p-0" @click="onClick" title="Delete" >
    <BootstrapIcon
      icon="trash3-fill"
      size="2x"
      color="red"
    />
  </button>
</template>

<script>
import VDeleteModal from "@/components/modals/DeleteModal.vue";

export default {
  name: "vIconDeleteWithModalConf",
  components: {VDeleteModal},
  data() {
    return {
      modalShow: false
    }
  },
  methods: {
    onClick() {
      this.modalShow = !this.modalShow;
      this.$emit('click');
    },
    deleteAction() {
      this.$emit('deleteAction');
    }
  },
  props: {
    itemName: String
  },
  emits: {
    click: null,
    deleteAction: null
  }
}
</script>

<style scoped>

</style>
