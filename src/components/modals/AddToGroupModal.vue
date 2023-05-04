<template>
  <div>
    <b-modal
      ok-only
      v-model="show"
      :title="heading"
      :ok-variant="okVariant"
      :ok-title="okText"
      @ok="ok"
    >
      <vue-good-table
        compactMode
        :columns="columns"
        :rows="data"
        :line-numbers="true"
        :search-options="{
              placeholder: 'Search',
              enabled: true,
            }"
        :sort-options="{
              enabled: true,
              initialSortBy: {field: 'name', type: 'asc'}
            }"
      >
        <template #selected-row-actions>
          <BootstrapIcon
            icon="trash3-fill"
            size="2x"
            color="red"
          />
        </template>
        <template #table-row="props">
            <span v-if="props.column.field === 'actions'">
                  <BootstrapIcon
                    icon="trash3-fill"
                    size="2x"
                    color="red"
                  />
            </span>
        </template>
      </vue-good-table>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: "vAddToGroupModal",
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
    }
  },
  event: {
    clickConfirm: null
  },
  props: {
    modalShow: false,
    data: Object,
    columns: Object
  },
  watch: {
    modalShow() {
      this.show = !this.show;
    }
  }
}
</script>
