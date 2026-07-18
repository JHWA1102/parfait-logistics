<template>
  <BaseCard title="최근 작업 현황">
    <BaseTable>
      <thead>
        <tr>
          <th>일자</th>
          <th>구분</th>
          <th>문서번호</th>
          <th>창고</th>
          <th>품목</th>
          <th>수량</th>
          <th>재고변경</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="history in recentHistories" :key="history.id">
          <td>{{ history.date }}</td>

          <td>
            <span class="badge" :class="badgeClass(history.type)">
              {{ history.type }}
            </span>
          </td>

          <td>{{ history.documentNo }}</td>

          <td>{{ warehouseName(history.warehouseId) }}</td>

          <td>{{ productName(history.productId) }}</td>

          <td>{{ quantityText(history) }}</td>

          <td>
            {{ history.beforeStock }}
            →
            {{ history.afterStock }}
          </td>
        </tr>

        <tr v-if="recentHistories.length === 0">
          <td colspan="7" class="empty">최근 작업 내역이 없습니다.</td>
        </tr>
      </tbody>
    </BaseTable>
  </BaseCard>
</template>

<script setup>
import { computed } from "vue";

import BaseCard from "@/components/common/BaseCard.vue";
import BaseTable from "@/components/common/BaseTable.vue";

import { useInventoryHistoryStore } from "@/stores/inventoryHistory";
import { useWarehouseStore } from "@/stores/warehouse";
import { useInventoryStore } from "@/stores/inventory";

const historyStore = useInventoryHistoryStore();
const warehouseStore = useWarehouseStore();
const inventoryStore = useInventoryStore();

const recentHistories = computed(() => historyStore.histories.slice(0, 10));

function warehouseName(id) {
  return warehouseStore.warehouses.find((item) => item.id === id)?.name ?? "-";
}

function productName(id) {
  return inventoryStore.products.find((item) => item.id === id)?.name ?? "-";
}

function quantityText(history) {
  switch (history.type) {
    case "입고":
      return `+${history.quantity}`;

    case "출고":
      return `-${history.quantity}`;

    default:
      return history.quantity;
  }
}

function badgeClass(type) {
  switch (type) {
    case "입고":
      return "badge--success";

    case "출고":
      return "badge--danger";

    case "이동":
      return "badge--info";

    default:
      return "";
  }
}
</script>

<style scoped>
.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  min-width: 56px;

  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
}

.badge--success {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.badge--danger {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

.badge--info {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

.empty {
  text-align: center;
  padding: 32px;

  color: var(--text-secondary);
}
</style>
