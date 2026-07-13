<template>
  <DashboardPanel title="최근 입고">
    <table class="recent-table">
      <thead>
        <tr>
          <th>입고번호</th>
          <th>공급업체</th>
          <th>품목</th>
          <th>수량</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in recentInbounds" :key="item.id">
          <td>{{ item.inboundNo }}</td>

          <td>
            {{ findById(customerStore.customers, item.supplierId, "company") }}
          </td>

          <td>
            {{ findById(inventoryStore.products, item.productId, "name") }}
          </td>

          <td>{{ item.quantity }}</td>
        </tr>

        <tr v-if="recentInbounds.length === 0">
          <td colspan="4" class="empty">최근 입고 내역이 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </DashboardPanel>
</template>

<script setup>
import { computed } from "vue";

import DashboardPanel from "@/components/dashboard/DashboardPanel.vue";

import { useInboundStore } from "@/stores/inbound";
import { useCustomerStore } from "@/stores/customer";
import { useInventoryStore } from "@/stores/inventory";

import { findById } from "@/utils/lookup";

const inboundStore = useInboundStore();
const customerStore = useCustomerStore();
const inventoryStore = useInventoryStore();

const recentInbounds = computed(() =>
  [...inboundStore.inbounds].sort((a, b) => b.id - a.id).slice(0, 5),
);
</script>

<style scoped>
.recent-table {
  width: 100%;
  border-collapse: collapse;
}

.recent-table th {
  padding: 12px;

  text-align: left;

  border-bottom: 1px solid var(--border-color);

  font-size: 13px;

  color: var(--text-secondary);

  font-weight: var(--font-semibold);
}

.recent-table td {
  padding: 14px 12px;

  border-bottom: 1px solid #f1f5f9;

  font-size: 14px;

  color: var(--text-primary);
}

.recent-table tbody tr:hover {
  background: var(--color-gray-50);
}

.empty {
  text-align: center;

  padding: 32px;

  color: var(--text-secondary);
}
</style>
