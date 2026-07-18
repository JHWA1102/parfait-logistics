<template>
  <div class="form">
    <BaseInput v-model="form.date" type="date" label="이동일" />

    <BaseSelect
      v-model="form.fromWarehouseId"
      label="출발창고"
      placeholder="출발창고 선택"
      :options="warehouseOptions"
    />

    <BaseSelect
      v-model="form.toWarehouseId"
      label="도착창고"
      placeholder="도착창고 선택"
      :options="warehouseOptions"
    />

    <BaseSelect
      v-model="form.productId"
      label="품목"
      placeholder="품목 선택"
      :options="productOptions"
    />

    <BaseInput v-model.number="form.quantity" type="number" min="1" label="이동수량" />

    <BaseTextarea v-model="form.memo" label="메모" placeholder="메모를 입력하세요." rows="3" />
  </div>
</template>

<script setup>
import { computed } from "vue";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseTextarea from "@/components/common/BaseTextarea.vue";

import { useWarehouseStore } from "@/stores/warehouse";
import { useInventoryStore } from "@/stores/inventory";

const form = defineModel({
  type: Object,
  required: true,
});

const warehouseStore = useWarehouseStore();
const inventoryStore = useInventoryStore();

const warehouseOptions = computed(() =>
  warehouseStore.warehouses.map((warehouse) => ({
    label: warehouse.name,
    value: warehouse.id,
  })),
);

const productOptions = computed(() =>
  inventoryStore.products.map((product) => ({
    label: `${product.code} - ${product.name}`,
    value: product.id,
  })),
);
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
