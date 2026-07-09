<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEdit ? '거래처 수정' : '거래처 등록'"
    @update:model-value="close"
  >
    <CustomerForm :model-value="form" @update:model-value="updateForm" />

    <template #footer>
      <BaseButton variant="secondary" @click="close"> 취소 </BaseButton>

      <BaseButton @click="save">
        {{ isEdit ? "수정" : "등록" }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import CustomerForm from "./CustomerForm.vue";

import { useCustomerStore } from "@/stores/customer";

const props = defineProps({
  modelValue: Boolean,

  customer: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const customerStore = useCustomerStore();

const form = reactive({
  id: null,
  code: "",
  company: "",
  manager: "",
  phone: "",
  email: "",
  country: "",
  type: "",
});

watch(
  () => props.customer,
  (customer) => {
    console.log("props.customer", customer);

    if (customer) {
      Object.assign(form, customer);
    } else {
      resetForm();
    }
  },
  {
    immediate: true,
  },
);

function save() {
  if (!form.company.trim()) return;

  if (isEdit()) {
    customerStore.updateCustomer({
      ...form,
    });
  } else {
    customerStore.addCustomer({
      ...form,
    });
  }

  close();
}

function close() {
  emit("update:modelValue", false);
  resetForm();
}

function resetForm() {
  Object.assign(form, {
    id: null,
    code: "",
    company: "",
    manager: "",
    phone: "",
    email: "",
    country: "",
    type: "",
  });
}

function updateForm(value) {
  Object.assign(form, value);
}

function isEdit() {
  return form.id !== null && form.id !== undefined;
}
</script>
