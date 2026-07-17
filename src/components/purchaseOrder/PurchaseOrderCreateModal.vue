<template>
  <BaseModal
    :model-value="modelValue"
    title="주문 등록"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <SalesOrderForm v-model="form" />

    <template #footer>
      <BaseButton variant="secondary" @click="$emit('update:modelValue', false)"> 취소 </BaseButton>

      <BaseButton @click="handleSave"> 저장 </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { reactive } from "vue";

import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import SalesOrderForm from "@/components/salesOrder/SalesOrderForm.vue";

import { useSalesOrderStore } from "@/stores/salesOrder";
import { generateDocumentNo } from "@/utils/numberGenerator";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const salesOrderStore = useSalesOrderStore();

const createForm = () => ({
  orderNo: generateDocumentNo("SO", salesOrderStore.salesOrders, "orderNo"),

  customerId: "",

  warehouseId: "",

  productId: "",

  quantity: 1,

  orderDate: new Date().toISOString().slice(0, 10),

  dueDate: new Date().toISOString().slice(0, 10),

  status: "주문접수",

  memo: "",
});

const form = reactive(createForm());

function handleSave() {
  const result = salesOrderStore.addSalesOrder({
    ...form,
  });

  if (!result.success) {
    alert(result.message);
    return;
  }

  Object.assign(form, createForm());

  emit("update:modelValue", false);
}
</script>
