<template>
  <BaseModal
    :model-value="modelValue"
    title="재고 이동 등록"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <TransferForm v-model="form" />

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

import TransferForm from "./TransferForm.vue";

import { useTransferStore } from "@/stores/transfer";

import { generateDocumentNo } from "@/utils/numberGenerator";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const transferStore = useTransferStore();

const createForm = () => ({
  transferNo: generateDocumentNo("TR", transferStore.transfers, "transferNo"),
  date: new Date().toISOString().slice(0, 10),

  fromWarehouseId: "",
  toWarehouseId: "",

  productId: "",

  quantity: 1,

  memo: "",
});

const form = reactive(createForm());

function handleSave() {
  const result = transferStore.addTransfer({ ...form });

  if (!result.success) {
    alert(result.message);
    return;
  }

  Object.assign(form, createForm());

  emit("update:modelValue", false);
}
</script>
