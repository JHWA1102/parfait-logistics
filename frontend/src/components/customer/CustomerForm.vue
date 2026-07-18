<template>
  <div class="customer-form">
    <BaseInput v-model="localForm.code" label="거래처 코드" placeholder="예) SUP-0001" required />

    <BaseInput
      v-model="localForm.company"
      label="회사명"
      placeholder="회사명을 입력하세요."
      required
    />

    <BaseInput v-model="localForm.manager" label="담당자" placeholder="담당자명을 입력하세요." />

    <BaseInput v-model="localForm.phone" label="연락처" placeholder="010-0000-0000" />

    <BaseInput v-model="localForm.email" label="이메일" placeholder="example@company.com" />

    <BaseInput v-model="localForm.country" label="국가" placeholder="대한민국" />

    <div class="customer-form__field">
      <label class="customer-form__label"> 구분 </label>

      <select v-model="localForm.type" class="customer-form__select">
        <option value="">선택하세요</option>
        <option value="공급업체">공급업체</option>
        <option value="고객사">고객사</option>
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
  company: "",
  manager: "",
  phone: "",
  email: "",
  country: "",
  type: "",
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
.customer-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.customer-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.customer-form__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.customer-form__select {
  width: 100%;
  height: 42px;

  padding: 0 14px;

  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);

  background: white;

  font-size: 14px;

  transition: 0.2s;
}

.customer-form__select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}
</style>
