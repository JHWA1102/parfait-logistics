<template>
  <div class="space-y-6">
    <!-- 기본 정보 -->
    <div class="grid grid-cols-2 gap-4">
      <BaseInput v-model="form.orderNo" label="발주번호" disabled />

      <BaseSelect v-model="form.supplierId" label="공급업체" :options="supplierOptions" />

      <BaseInput v-model="form.orderDate" type="date" label="발주일" />

      <BaseInput v-model="form.dueDate" type="date" label="납기일" />
    </div>

    <!-- 품목 -->
    <div>
      <div class="mb-3 flex items-center justify-between">
        <h3 class="text-sm font-semibold">품목 목록</h3>

        <BaseButton size="sm" @click="addItem"> + 품목 추가 </BaseButton>
      </div>

      <div
        v-for="(item, index) in form.items"
        :key="index"
        class="mb-3 grid grid-cols-[1fr_140px_80px] gap-3"
      >
        <BaseSelect v-model="item.productId" :options="productOptions" placeholder="품목 선택" />

        <BaseInput v-model.number="item.quantity" type="number" min="1" />

        <BaseButton variant="danger" @click="removeItem(index)"> 삭제 </BaseButton>
      </div>
    </div>

    <!-- 메모 -->
    <BaseTextarea v-model="form.memo" label="메모" rows="3" />
  </div>
</template>

<script setup>
import { computed } from "vue";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseTextarea from "@/components/common/BaseTextarea.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { useInventoryStore } from "@/stores/inventory";
import { useCustomerStore } from "@/stores/customer";

const form = defineModel({
  type: Object,
  required: true,
});

const inventoryStore = useInventoryStore();
const customerStore = useCustomerStore();

const productOptions = computed(() =>
  inventoryStore.products.map((product) => ({
    label: product.name,
    value: product.id,
  })),
);

const supplierOptions = computed(() =>
  customerStore.customers
    .filter((customer) => customer.type === "supplier")
    .map((customer) => ({
      label: customer.name,
      value: customer.id,
    })),
);

function addItem() {
  form.value.items.push({
    productId: "",
    quantity: 1,
    receivedQuantity: 0,
  });
}

function removeItem(index) {
  if (form.value.items.length === 1) {
    return;
  }

  form.value.items.splice(index, 1);
}
</script>
