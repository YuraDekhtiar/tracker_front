<template>
  <div>
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
      <template #selected-row-actions>
        <BootstrapIcon
          icon="trash3-fill"
          size="2x"
          color="red"
        />
      </template>
      <template #table-row="props">
        <span v-if="props.column.field === 'actions'">
          <v-icon-delete-with-modal-conf :item-name="props.row.username || props.row.name" @delete-action="deleteAction(props.row.id)"/>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>

import VIconDeleteWithModalConf from "@/components/buttons/IconDeleteWithModalConf";

export default {
  name: "vShortTable",
  components: {VIconDeleteWithModalConf},
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'username',
          tdClass: 'text-start',
        },
        {
          label: 'Actions',
          field: 'actions',
          width: '100px',
          sortable: false,
          tdClass: 'text-center',
        },
      ],
    }
  },
  methods: {
    deleteAction(id) {
      this.$emit('deleteAction', id);
    }
  },
  props: {
    data: null,
    settings: Object
  },
  emits: {
    deleteAction: null
  }
}
</script>
