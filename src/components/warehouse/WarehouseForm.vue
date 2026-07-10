<template>
  <div class="warehouse-form">
    <BaseInput v-model="localForm.code" label="창고 코드" placeholder="예) WH-001" required />

    <BaseInput
      v-model="localForm.name"
      label="창고명"
      placeholder="창고명을 입력하세요."
      required
    />

    <div class="warehouse-form__field">
      <label class="warehouse-form__label">
        창고 유형
        <span class="required">*</span>
      </label>

      <select v-model="localForm.type" class="warehouse-form__select">
        <option value="">선택하세요</option>
        <option value="일반">일반</option>
        <option value="물류센터">물류센터</option>
        <option value="냉장">냉장</option>
        <option value="냉동">냉동</option>
        <option value="항만">항만</option>
      </select>
    </div>

    <BaseInput v-model="localForm.manager" label="담당자" placeholder="담당자명을 입력하세요." />

    <BaseInput v-model="localForm.phone" label="연락처" placeholder="010-0000-0000" />

    <BaseInput v-model="localForm.address" label="주소" placeholder="창고 주소를 입력하세요." />

    <div class="warehouse-form__field">
      <label class="warehouse-form__label"> 운영 상태 </label>

      <select v-model="localForm.status" class="warehouse-form__select">
        <option value="운영중">운영중</option>
        <option value="점검중">점검중</option>
        <option value="폐쇄">폐쇄</option>
      </select>
    </div>
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
  type: "",
  manager: "",
  phone: "",
  address: "",
  status: "운영중",
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
.warehouse-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.warehouse-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.warehouse-form__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.required {
  color: #ef4444;
}

.warehouse-form__select {
  width: 100%;
  height: 44px;

  padding: 0 14px;

  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);

  background: #fff;

  font-size: 14px;

  transition: 0.2s;
}

.warehouse-form__select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
</style>
