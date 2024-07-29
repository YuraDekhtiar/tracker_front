<template>
  <div>
    <b-modal
      v-model="show"
      v-if="show"
      :title="heading"
      no-close-on-backdrop
      hide-footer
    >
      <vForm @submit="onSubmit" :validation-schema="schema">
        <Field name="name" v-model="values.name" v-slot="{ errorMessage }">
          <v-primary-input
            placeholder="Name"
            v-model:input=values.name
            :invalid-massage="errorMessage"
            :state="!errorMessage"
          />
        </Field>
        <Field name="description" v-model="values.description" v-slot="{ errorMessage }">
          <v-description-input
            placeholder="Description"
            v-model:input=values.description
            :invalid-massage="errorMessage"
            :state="!errorMessage"
          />
        </Field>
        <button type="submit" class="float-end btn btn-success">Create</button>
      </vForm>
    </b-modal>
  </div>
</template>

<script>

import VDescriptionInput from "@/components/inputs/DescriptionInput.vue";
import * as yup from "yup";
import VueYupValidation from "vue-yup-validation";
import vPrimaryInput from "@/components/inputs/PrimaryInput.vue";
import VPrimaryButton from "@/components/buttons/PrimaryButton";
import {Form as vForm, Field, ErrorMessage} from 'vee-validate';
import api from "@/api/api";
import vToast from "@/commons/vToast";

export default {
  name: "vCreateGroupModal",
  components: {VPrimaryButton, vPrimaryInput, VDescriptionInput, VueYupValidation, vForm, Field, ErrorMessage},
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("Field is required").min(2, 'Min length 2 symbols').max(255, 'Max length 255 symbols'),
      description: yup.string().max(255, 'Max length 255 symbols')
    });
    return {
      show: false,
      heading: "Create group",
      okText: "Create",
      okVariant: "outline-success",
      errorInput: false,
      schema,
      values: {
        name: "",
        description: "",
      }
    }
  },
  methods: {
    onSubmit() {
      this.sendData();
    },
    sendData() {
      let group = {
        name: this.values.name,
        description: this.values.description,
      }
      api.post('group/create', group).then(
        () => {
          vToast.success(this, `${this.values.name} created success`)
          this.$emit('clickConfirm');
          this.close();
        },
        (error) => {
          vToast.error(this, `${error.response.data.message}. Status: ${error.response.data.status} `)
        }
      );
    },

    clear() {
      this.values.name = "";
      this.values.description = "";
    },
    close() {
      this.clear()
      this.show = false;
    }
  },
  event: {
    clickConfirm: null
  },
  props: {
    modalShow: false,
  },
  watch: {
    modalShow() {
      this.show = !this.show;
    }
  }
}
</script>
