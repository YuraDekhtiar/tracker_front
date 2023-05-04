<template>
  <div>
    <vue-good-table
      compactMode
      :columns="columns"
      :rows="rows"
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
  </div>
</template>

<script>

import VDeleteButton from "@/components/buttons/DeleteButton.vue";
import VCancelButton from "@/components/buttons/CancelButton.vue";

export default {
  name: "vShortDeviceTable",

  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
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
  props: {
    rows: Object
  }
}
</script>
