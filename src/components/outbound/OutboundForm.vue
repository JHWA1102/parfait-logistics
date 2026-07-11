<template>
  <div class="outbound-form">
    <BaseInput v-model="localForm.outboundNo" label="출고번호" placeholder="자동 생성" disabled />

    <BaseInput v-model="localForm.date" type="date" label="출고일" required />

    <BaseSelect
      v-model="localForm.customerId"
      label="고객사"
      :options="customerOptions"
      placeholder="고객사를 선택하세요."
      required
    />

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

    <BaseInput
      v-model.number="localForm.quantity"
      type="number"
      label="출고수량"
      placeholder="수량을 입력하세요."
      required
    />

    <BaseTextarea
      v-model="localForm.memo"
      label="비고"
      placeholder="비고를 입력하세요."
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
import { useCustomerStore } from "@/stores/customer";
import { useWarehouseStore } from "@/stores/warehouse";

import { toOptions } from "@/utils/lookup";

const inventoryStore = useInventoryStore();
const customerStore = useCustomerStore();
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

  outboundNo: "",

  date: new Date().toISOString().slice(0, 10),

  customerId: null,

  warehouseId: null,

  productId: null,

  quantity: 0,

  memo: "",
});

/* 고객사 */

const customerOptions = computed(() =>
  toOptions(
    customerStore.customers.filter((customer) => customer.type === "고객사"),
    "company",
  ),
);

/* 창고 */

const warehouseOptions = computed(() => toOptions(warehouseStore.warehouses, "name"));

/* 품목 */

const productOptions = computed(() =>
  inventoryStore.products.map((product) => ({
    label: `${product.code} - ${product.name}`,
    value: product.id,
  })),
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
.outbound-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
