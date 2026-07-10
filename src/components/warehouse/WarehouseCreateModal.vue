<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEdit ? '창고 수정' : '창고 등록'"
    @update:model-value="close"
  >
    <WarehouseForm v-model="form" />

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

import WarehouseForm from "./WarehouseForm.vue";

import { useWarehouseStore } from "@/stores/warehouse";

const props = defineProps({
  modelValue: Boolean,

  warehouse: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const warehouseStore = useWarehouseStore();

const form = reactive({
  id: null,
  code: "",
  name: "",
  type: "",
  manager: "",
  phone: "",
  address: "",
  status: "운영중",
});

const isEdit = computed(() => form.id !== null);

watch(
  () => props.warehouse,
  (warehouse) => {
    if (warehouse) {
      Object.assign(form, warehouse);
    } else {
      resetForm();
    }
  },
  {
    immediate: true,
  },
);

function save() {
  if (!form.code.trim()) return;
  if (!form.name.trim()) return;

  if (isEdit.value) {
    warehouseStore.updateWarehouse({
      ...form,
    });
  } else {
    warehouseStore.addWarehouse({
      ...form,
    });
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
    code: "",
    name: "",
    type: "",
    manager: "",
    phone: "",
    address: "",
    status: "운영중",
  });
}
</script>
