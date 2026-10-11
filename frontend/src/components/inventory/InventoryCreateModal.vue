<template>
  <BaseModal
    :model-value="modelValue"
    :title="props.product ? '품목 수정' : '품목 등록'"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <BaseInput
      v-model="form.code"
      label="품목 코드"
      placeholder="예) P001"
      :disabled="!!props.product"
      required
    />

    <BaseInput v-model="form.name" label="품목명" placeholder="품목명을 입력하세요." required />

    <BaseInput v-model="form.unit" label="단위" placeholder="EA / BOX" required />

    <template #footer>
      <BaseButton variant="secondary" @click="close"> 취소 </BaseButton>

      <BaseButton @click="save">
        {{ props.product ? "저장" : "등록" }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { reactive, watch } from "vue";

import BaseModal from "@/components/common/BaseModal.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { useInventoryStore } from "@/stores/inventory";

const props = defineProps({
  modelValue: Boolean,

  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inventoryStore = useInventoryStore();

const form = reactive({
  id: null,
  code: "",
  name: "",
  unit: "",
  active: true,
});

function close() {
  emit("update:modelValue", false);
}

function resetForm() {
  form.code = "";
  form.name = "";
  form.unit = "";
  form.active = true;
}

async function save() {
  if (!form.code || !form.name || !form.unit) {
    alert("필수 항목을 입력하세요.");
    return;
  }

  try {
    if (props.product) {
      await inventoryStore.updateProduct({ ...form });
    } else {
      await inventoryStore.addProduct({
        code: form.code,
        name: form.name,
        unit: form.unit,
      });
    }
  } catch (error) {
    alert(error.response?.data?.message || "품목 저장에 실패했습니다.");
    return;
  }

  resetForm();
  close();
}

watch(
  () => props.product,
  (product) => {
    if (!product) {
      resetForm();
      return;
    }

    form.id = product.id;
    form.code = product.code;
    form.name = product.name;
    form.unit = product.unit;
    form.active = product.active;
  },
  {
    immediate: true,
  },
);
</script>
