<template>
  <BaseModal :model-value="modelValue" title="거래처 삭제" @update:model-value="close">
    <div class="delete-modal">
      <div class="delete-modal__icon">⚠️</div>

      <p class="delete-modal__text">
        <strong>{{ customer?.company }}</strong> 거래처를 삭제하시겠습니까?
      </p>

      <p class="delete-modal__description">삭제된 거래처는 복구할 수 없습니다.</p>
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
  modelValue: {
    type: Boolean,
    default: false,
  },

  customer: {
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
}
</script>

<style scoped>
.delete-modal {
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  gap: 14px;

  padding: 12px 0;
}

.delete-modal__icon {
  font-size: 48px;
}

.delete-modal__text {
  font-size: 16px;
  color: #334155;
}

.delete-modal__description {
  font-size: 14px;
  color: #94a3b8;
}
</style>
