<template>
  <BaseTable>
    <thead>
      <tr>
        <th>주문번호</th>
        <th>거래처</th>
        <th>창고</th>
        <th>품목</th>
        <th>수량</th>
        <th>주문일</th>
        <th>납기일</th>
        <th>상태</th>
        <th>관리</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="salesOrder in salesOrders" :key="salesOrder.id">
        <td>{{ salesOrder.orderNo }}</td>

        <td>{{ customerName(salesOrder.customerId) }}</td>

        <td>{{ warehouseName(salesOrder.warehouseId) }}</td>

        <td>{{ productName(salesOrder.productId) }}</td>

        <td>{{ salesOrder.quantity }}</td>

        <td>{{ salesOrder.orderDate }}</td>

        <td>{{ salesOrder.dueDate }}</td>

        <td>{{ salesOrder.status }}</td>

        <td class="space-x-2">
          <BaseButton size="sm" @click="$emit('edit', salesOrder)"> 수정 </BaseButton>

          <BaseButton size="sm" variant="danger" @click="$emit('delete', salesOrder)">
            삭제
          </BaseButton>

          <BaseButton
            size="sm"
            :disabled="salesOrder.status === '출고완료'"
            @click="$emit('release', salesOrder)"
          >
            출고등록
          </BaseButton>
        </td>
      </tr>

      <tr v-if="salesOrders.length === 0">
        <td colspan="9" class="text-center py-4">등록된 주문이 없습니다.</td>
      </tr>
    </tbody>
  </BaseTable>
</template>

<script setup>
import BaseTable from "@/components/common/BaseTable.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { useCustomerStore } from "@/stores/customer";
import { useWarehouseStore } from "@/stores/warehouse";
import { useInventoryStore } from "@/stores/inventory";

defineProps({
  salesOrders: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete", "release"]);

const customerStore = useCustomerStore();
const warehouseStore = useWarehouseStore();
const inventoryStore = useInventoryStore();

function customerName(id) {
  return customerStore.customers.find((customer) => customer.id === id)?.name ?? "-";
}

function warehouseName(id) {
  return warehouseStore.warehouses.find((warehouse) => warehouse.id === id)?.name ?? "-";
}

function productName(id) {
  return inventoryStore.products.find((product) => product.id === id)?.name ?? "-";
}
</script>
