<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>창고</th>
        <th>품목코드</th>
        <th>품목명</th>
        <th>단위</th>
        <th>현재재고</th>
        <th>상태</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="stock in stocks" :key="stock.id">
        <!-- 창고 -->
        <td>
          {{ findById(warehouseStore.warehouses, stock.warehouseId, "name") }}
        </td>

        <!-- 품목코드 -->
        <td>
          {{ getProduct(stock.productId)?.code }}
        </td>

        <!-- 품목명 -->
        <td>
          {{ getProduct(stock.productId)?.name }}
        </td>

        <!-- 단위 -->
        <td>
          {{ getProduct(stock.productId)?.unit }}
        </td>

        <!-- 재고 -->
        <td>
          {{ stock.stock }}
        </td>

        <!-- 상태 -->
        <td>
          <BaseBadge :variant="stock.stock < 20 ? 'danger' : 'success'">
            {{ stock.stock < 20 ? "부족" : "정상" }}
          </BaseBadge>
        </td>
      </tr>
    </template>

    <template v-if="stocks.length === 0" #empty> 등록된 창고별 재고가 없습니다. </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from "@/components/common/BaseTable.vue";
import BaseBadge from "@/components/common/BaseBadge.vue";

import { useInventoryStore } from "@/stores/inventory";
import { useWarehouseStore } from "@/stores/warehouse";

import { findById } from "@/utils/lookup";

const inventoryStore = useInventoryStore();
const warehouseStore = useWarehouseStore();

defineProps({
  stocks: {
    type: Array,
    default: () => [],
  },
});

function getProduct(productId) {
  return inventoryStore.products.find((item) => String(item.id) === String(productId));
}
</script>

<style scoped>
td,
th {
  text-align: center;
}
</style>
