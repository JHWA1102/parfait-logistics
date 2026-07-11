<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEdit ? '입고 수정' : '입고 등록'"
    @update:model-value="close"
  >
    <InboundForm v-model="form" />

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

import InboundForm from "./InboundForm.vue";

import { useInboundStore } from "@/stores/inbound";

const props = defineProps({
  modelValue: Boolean,

  inbound: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inboundStore = useInboundStore();

const form = reactive({
  id: null,

  inboundNo: "",

  date: new Date().toISOString().slice(0, 10),

  supplierId: null,

  warehouseId: null,

  productId: null,

  quantity: 0,

  memo: "",

  status: "완료",
});

const isEdit = computed(() => !!props.inbound);

watch(
  () => props.inbound,
  (inbound) => {
    if (inbound) {
      Object.assign(form, inbound);
    } else {
      resetForm();
    }
  },
  {
    immediate: true,
  },
);

function save() {
  if (!form.supplierId) return;
  if (!form.warehouseId) return;
  if (!form.productId) return;
  if (Number(form.quantity) <= 0) return;

  if (props.inbound) {
    inboundStore.updateInbound({
      ...form,
    });
  } else {
    inboundStore.addInbound({
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

    inboundNo: "",

    date: new Date().toISOString().slice(0, 10),

    supplierId: null,

    warehouseId: null,

    productId: null,

    quantity: 0,

    memo: "",

    status: "완료",
  });
}
</script>
