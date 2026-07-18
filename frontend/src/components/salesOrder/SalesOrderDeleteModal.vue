<template>
  <BaseModal
    :model-value="modelValue"
    title="주문 삭제"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <p class="text-center py-4">선택한 주문을 삭제하시겠습니까?</p>

    <template #footer>
      <BaseButton variant="secondary" @click="$emit('update:modelValue', false)"> 취소 </BaseButton>

      <BaseButton variant="danger" @click="handleDelete"> 삭제 </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { useSalesOrderStore } from "@/stores/salesOrder";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  salesOrder: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const salesOrderStore = useSalesOrderStore();

function handleDelete() {
  if (!props.salesOrder) return;

  salesOrderStore.removeSalesOrder(props.salesOrder.id);

  emit("update:modelValue", false);
}
</script>
