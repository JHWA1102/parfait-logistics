<script setup>
import { computed } from "vue";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseTextarea from "@/components/common/BaseTextarea.vue";

import { useCustomerStore } from "@/stores/customer";
import { useWarehouseStore } from "@/stores/warehouse";
import { useInventoryStore } from "@/stores/inventory";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const customerStore = useCustomerStore();
const warehouseStore = useWarehouseStore();
const inventoryStore = useInventoryStore();

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <BaseInput label="주문번호" v-model="form.orderNo" disabled />

    <BaseSelect
      label="거래처"
      v-model="form.customerId"
      :options="customerStore.customers"
      option-label="name"
      option-value="id"
      placeholder="거래처 선택"
    />

    <BaseInput label="주문일" type="date" v-model="form.orderDate" />

    <BaseInput label="납기일" type="date" v-model="form.dueDate" />

    <BaseSelect
      label="창고"
      v-model="form.warehouseId"
      :options="warehouseStore.warehouses"
      option-label="name"
      option-value="id"
      placeholder="창고 선택"
    />

    <BaseSelect
      label="품목"
      v-model="form.productId"
      :options="inventoryStore.products"
      option-label="name"
      option-value="id"
      placeholder="품목 선택"
    />

    <BaseInput label="수량" type="number" min="1" v-model.number="form.quantity" />

    <BaseInput label="상태" v-model="form.status" disabled />
  </div>

  <div class="mt-4">
    <BaseTextarea label="메모" rows="3" v-model="form.memo" />
  </div>
</template>
