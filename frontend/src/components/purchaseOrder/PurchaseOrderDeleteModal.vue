<template>
  <BaseModal
    :model-value="modelValue"
    title="발주 삭제"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <p class="text-sm text-gray-600">
      <strong>{{ purchaseOrder?.orderNo }}</strong> 발주를 삭제하시겠습니까?
    </p>

    <template #footer>
      <BaseButton variant="secondary" @click="$emit('update:modelValue', false)"> 취소 </BaseButton>

      <BaseButton variant="danger" @click="handleDelete"> 삭제 </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { usePurchaseOrderStore } from "@/stores/purchaseOrder";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  purchaseOrder: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const purchaseOrderStore = usePurchaseOrderStore();

function handleDelete() {
  if (!props.purchaseOrder) return;

  const result = purchaseOrderStore.removePurchaseOrder(props.purchaseOrder.orderNo);

  if (!result.success) {
    alert(result.message);
    return;
  }

  emit("update:modelValue", false);
}
</script>
