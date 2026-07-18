<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEdit ? '재고조정 수정' : '재고조정 등록'"
    @update:model-value="close"
  >
    <AdjustmentForm v-model="form" />

    <template #footer>
      <BaseButton variant="secondary" @click="close"> 취소 </BaseButton>

      <BaseButton @click="save">
        {{ isEdit ? "수정" : "등록" }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { reactive, computed, watch } from "vue";

import BaseModal from "@/components/common/BaseModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import AdjustmentForm from "./AdjustmentForm.vue";

import { useAdjustmentStore } from "@/stores/adjustment";

const props = defineProps({
  modelValue: Boolean,

  adjustment: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const adjustmentStore = useAdjustmentStore();

const form = reactive({
  id: null,

  adjustmentNo: "",

  date: new Date().toISOString().slice(0, 10),

  warehouseId: null,

  productId: null,

  afterStock: 0,

  reason: "",

  memo: "",
});

const isEdit = computed(() => form.id !== null);

watch(
  () => props.adjustment,
  (adjustment) => {
    if (adjustment) {
      Object.assign(form, adjustment);
    } else {
      resetForm();
    }
  },
  {
    immediate: true,
  },
);

function save() {
  if (!form.productId) return;

  if (!form.warehouseId) return;

  if (form.afterStock < 0) return;

  if (!form.reason.trim()) return;

  if (isEdit.value) {
    adjustmentStore.updateAdjustment({
      ...form,
    });
  } else {
    const result = adjustmentStore.addAdjustment({
      ...form,
    });

    if (!result.success) {
      alert(result.message);
      return;
    }
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

    adjustmentNo: "",

    date: new Date().toISOString().slice(0, 10),

    warehouseId: null,

    productId: null,

    afterStock: 0,

    reason: "",

    memo: "",
  });
}
</script>
