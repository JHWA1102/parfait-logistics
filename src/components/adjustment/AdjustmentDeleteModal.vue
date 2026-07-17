<template>
  <BaseModal :model-value="modelValue" title="재고조정 삭제" @update:model-value="close">
    <div class="delete-content">
      <p class="delete-message">아래 재고조정 내역을 삭제하시겠습니까?</p>

      <div class="delete-info">
        <div>
          <strong>조정번호</strong>
          <span>{{ adjustment?.adjustmentNo }}</span>
        </div>

        <div>
          <strong>품목</strong>
          <span>{{ productName }}</span>
        </div>

        <div>
          <strong>조정수량</strong>
          <span> {{ adjustment?.quantity > 0 ? "+" : "" }}{{ adjustment?.quantity }} </span>
        </div>

        <div>
          <strong>사유</strong>
          <span>{{ adjustment?.reason }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="close"> 취소 </BaseButton>

      <BaseButton variant="danger" @click="remove"> 삭제 </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from "vue";

import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { useInventoryStore } from "@/stores/inventory";

import { findById } from "@/utils/lookup";

const inventoryStore = useInventoryStore();

const props = defineProps({
  modelValue: Boolean,

  adjustment: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "delete"]);

const productName = computed(() => {
  if (!props.adjustment) return "";

  return findById(inventoryStore.products, props.adjustment.productId, "name");
});

function close() {
  emit("update:modelValue", false);
}

function remove() {
  emit("delete");
}
</script>

<style scoped>
.delete-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.delete-message {
  font-size: 15px;
  color: var(--text-primary);
}

.delete-info {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;

  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);

  background: var(--color-gray-50);
}

.delete-info div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-info strong {
  color: var(--text-secondary);
  font-weight: var(--font-semibold);
}

.delete-info span {
  color: var(--text-primary);
}
</style>
