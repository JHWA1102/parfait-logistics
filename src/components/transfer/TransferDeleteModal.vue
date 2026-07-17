<template>
  <BaseModal
    :model-value="modelValue"
    title="재고 이동 삭제"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <p class="message">
      <strong>{{ transfer?.transferNo }}</strong> 재고 이동 내역을 삭제하시겠습니까?
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

import { useTransferStore } from "@/stores/transfer";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  transfer: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "deleted"]);

const transferStore = useTransferStore();

function handleDelete() {
  if (!props.transfer) return;

  transferStore.removeTransfer(props.transfer.id);

  emit("deleted");
  emit("update:modelValue", false);
}
</script>

<style scoped>
.message {
  margin: 20px 0;
  font-size: 15px;
  line-height: 1.6;
}
</style>
