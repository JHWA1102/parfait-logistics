<template>
  <BaseModal
    :model-value="modelValue"
    title="품목 삭제"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <p class="message">
      <strong>{{ product?.name }}</strong> 품목을 삭제하시겠습니까?
    </p>

    <template #footer>
      <BaseButton variant="secondary" @click="emit('update:modelValue', false)"> 취소 </BaseButton>

      <BaseButton variant="danger" @click="confirmDelete"> 삭제 </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

const props = defineProps({
  modelValue: Boolean,

  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "delete"]);

function confirmDelete() {
  emit("delete");
  emit("update:modelValue", false);
}
</script>

<style scoped>
.message {
  font-size: 16px;
  line-height: 1.6;
}
</style>
