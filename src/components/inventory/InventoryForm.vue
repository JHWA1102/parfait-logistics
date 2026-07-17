<template>
  <div class="inventory-form">
    <BaseInput v-model="localForm.code" label="품목 코드" placeholder="예) P0001" required />

    <BaseInput
      v-model="localForm.name"
      label="품목명"
      placeholder="품목명을 입력하세요."
      required
    />

    <BaseInput v-model="localForm.unit" label="단위" placeholder="EA / BOX" required />
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

import BaseInput from "@/components/common/BaseInput.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localForm = reactive({
  id: null,

  code: "",

  name: "",

  unit: "",
});

watch(
  () => props.modelValue,
  (value) => {
    if (!value) return;

    Object.assign(localForm, value);
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(
  localForm,
  () => {
    emit("update:modelValue", {
      ...localForm,
    });
  },
  {
    deep: true,
  },
);
</script>

<style scoped>
.inventory-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
