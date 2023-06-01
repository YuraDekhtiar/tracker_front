<template>
  <div>
    <b-modal
      ok-only
      v-model="show"
      :title="heading"
      :ok-variant="okVariant"
      :ok-title="okText"
      @ok="ok"
      v-if="show"
    >
      <vue-good-table
        compactMode
        :columns="settings.columns"
        :rows="data"
        line-numbers
        :search-options="{
              placeholder: 'Search',
              enabled: true,
            }"
        :sort-options="{
              enabled: true,
              initialSortBy: settings.initialSortBy
            }"
      >
        <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
              <v-icon-add-button @on-click="onClick(props.row.id)" />
            </span>
        </template>
      </vue-good-table>
    </b-modal>
  </div>
</template>

<script>

import VIconAddButton from "@/components/buttons/IconAddButton";
export default {
  name: "vAddGroupModal",
  components: {VIconAddButton},
  data() {
    return {
      show: false,
      heading: "Add to group",
      okText: "Done",
      okVariant: "outline-success"
    }
  },
  methods: {
    ok() {
      this.close();
      this.$emit('clickConfirm');
    },
    close() {
      this.show = false;
    },
    onClick(id) {
      this.$emit('clickAdd', id);
    }
  },
  event: {
    clickConfirm: null,
    clickAdd: null

  },
  props: {
    modalShow: false,
    data: null,
    settings: Object
  },
  watch: {
    modalShow() {
      this.show = !this.show;
    }
  }
}
</script>
