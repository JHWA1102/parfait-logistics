<template>
  <div class="adjustment-form">
    <BaseInput v-model="localForm.adjustmentNo" label="조정번호" placeholder="자동 생성" disabled />

    <BaseInput v-model="localForm.date" type="date" label="조정일" required />

    <BaseSelect
      v-model="localForm.warehouseId"
      label="창고"
      :options="warehouseOptions"
      placeholder="창고를 선택하세요."
      required
    />

    <BaseSelect
      v-model="localForm.productId"
      label="품목"
      :options="productOptions"
      placeholder="품목을 선택하세요."
      required
    />

    <BaseInput :model-value="currentStock" label="현재 재고" disabled />

    <BaseInput
      v-model.number="localForm.afterStock"
      type="number"
      label="조정 후 재고"
      placeholder="조정 후 재고를 입력하세요."
      required
    />

    <BaseInput :model-value="adjustQuantity" label="조정 수량" disabled />

    <BaseInput
      v-model="localForm.reason"
      label="조정 사유"
      placeholder="예) 재고실사, 파손, 분실"
      required
    />

    <BaseTextarea
      v-model="localForm.memo"
      label="메모"
      placeholder="메모를 입력하세요."
      :rows="4"
    />
  </div>
</template>

<script setup>
import { reactive, watch, computed } from "vue";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseTextarea from "@/components/common/BaseTextarea.vue";

import { useInventoryStore } from "@/stores/inventory";
import { useWarehouseStore } from "@/stores/warehouse";

import { toOptions } from "@/utils/lookup";

const inventoryStore = useInventoryStore();
const warehouseStore = useWarehouseStore();

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localForm = reactive({
  id: null,

  adjustmentNo: "",

  date: new Date().toISOString().slice(0, 10),

  warehouseId: null,

  productId: null,

  afterStock: 0,

  reason: "",

  memo: "",
});

/* 창고 */

const warehouseOptions = computed(() => toOptions(warehouseStore.warehouses, "name"));

/* 품목 */

const productOptions = computed(() =>
  inventoryStore.products.map((product) => ({
    label: `${product.code} - ${product.name}`,
    value: product.id,
  })),
);

/* 현재 재고 */

const currentStock = computed(() => {
  const product = inventoryStore.findProduct(localForm.productId);

  return product ? product.stock : 0;
});

/* 조정 수량 */

const adjustQuantity = computed(() => {
  return Number(localForm.afterStock) - Number(currentStock.value);
});

/* 품목 변경 시 현재 재고 자동 입력 */

watch(
  () => localForm.productId,
  () => {
    localForm.afterStock = currentStock.value;
  },
);

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
.adjustment-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
