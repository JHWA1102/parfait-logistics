<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEdit ? '출고 수정' : '출고 등록'"
    @update:model-value="close"
  >
    <OutboundForm v-model="form" />

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

import OutboundForm from "./OutboundForm.vue";

import { useOutboundStore } from "@/stores/outbound";

const props = defineProps({
  modelValue: Boolean,

  outbound: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const outboundStore = useOutboundStore();

const form = reactive({
  id: null,

  outboundNo: "",

  date: new Date().toISOString().slice(0, 10),

  customerId: null,

  warehouseId: null,

  productId: null,

  quantity: 0,

  memo: "",

  status: "완료",
});

const isEdit = computed(() => !!props.outbound);

watch(
  () => props.outbound,
  (outbound) => {
    if (outbound) {
      Object.assign(form, outbound);
    } else {
      resetForm();
    }
  },
  {
    immediate: true,
  },
);

function save() {
  if (!form.customerId) return;
  if (!form.warehouseId) return;
  if (!form.productId) return;
  if (Number(form.quantity) <= 0) return;

  if (isEdit.value) {
    outboundStore.updateOutbound({
      ...form,
    });

    close();
    return;
  }

  const result = outboundStore.addOutbound({
    ...form,
  });

  if (!result.success) {
    alert(result.message);
    return;
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

    outboundNo: "",

    date: new Date().toISOString().slice(0, 10),

    customerId: null,

    warehouseId: null,

    productId: null,

    quantity: 0,

    memo: "",

    status: "완료",
  });
}
</script>
