<template>
  <DashboardPanel title="재고 부족 품목">
    <table class="low-stock-table">
      <thead>
        <tr>
          <th>품목코드</th>
          <th>품목명</th>
          <th>재고</th>
          <th>상태</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in lowStockProducts" :key="product.id">
          <td>{{ product.code }}</td>

          <td>{{ product.name }}</td>

          <td>{{ product.stock }} {{ product.unit }}</td>

          <td>
            <BaseBadge variant="danger"> 부족 </BaseBadge>
          </td>
        </tr>

        <tr v-if="lowStockProducts.length === 0">
          <td colspan="4" class="empty">🎉 재고 부족 품목이 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </DashboardPanel>
</template>

<script setup>
import { computed } from "vue";

import DashboardPanel from "./DashboardPanel.vue";
import BaseBadge from "@/components/common/BaseBadge.vue";

import { useInventoryStore } from "@/stores/inventory";

const inventoryStore = useInventoryStore();

const lowStockProducts = computed(() => inventoryStore.lowStockProducts);
</script>

<style scoped>
.low-stock-table {
  width: 100%;
  border-collapse: collapse;
}

.low-stock-table th {
  padding: 12px;

  text-align: left;

  border-bottom: 1px solid var(--border-color);

  font-size: 13px;
  font-weight: var(--font-semibold);

  color: var(--text-secondary);
}

.low-stock-table td {
  padding: 14px 12px;

  border-bottom: 1px solid #f1f5f9;

  font-size: 14px;

  color: var(--text-primary);
}

.low-stock-table tbody tr:hover {
  background: var(--color-gray-50);
}

.empty {
  text-align: center;

  padding: 36px;

  color: var(--text-secondary);
}
</style>
