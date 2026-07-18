<template>
  <BaseModal :model-value="modelValue" title="입고 삭제" @update:model-value="close">
    <div class="delete-modal">
      <p class="delete-modal__message">
        입고번호
        <strong>{{ inbound?.inboundNo }}</strong>
        를 삭제하시겠습니까?
      </p>

      <p class="delete-modal__description">삭제된 입고 내역은 복구할 수 없습니다.</p>
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="close"> 취소 </BaseButton>

      <BaseButton variant="danger" @click="remove"> 삭제 </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

const props = defineProps({
  modelValue: Boolean,

  inbound: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "delete"]);

function close() {
  emit("update:modelValue", false);
}

function remove() {
  emit("delete");
  close();
}
</script>

<style scoped>
.delete-modal {
  padding: 12px 0;
}

.delete-modal__message {
  font-size: var(--font-md);
  font-weight: var(--font-semibold);
  color: var(--text-primary);

  line-height: 1.6;
}

.delete-modal__description {
  margin-top: 8px;

  font-size: var(--font-sm);
  color: var(--text-secondary);
}
</style>
