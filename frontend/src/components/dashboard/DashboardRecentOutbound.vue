<template>
  <DashboardPanel title="최근 출고">
    <table class="recent-table">
      <thead>
        <tr>
          <th>출고번호</th>
          <th>고객사</th>
          <th>품목</th>
          <th>수량</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in recentOutbounds" :key="item.id">
          <td>{{ item.outboundNo }}</td>

          <td>
            {{ findById(customerStore.customers, item.customerId, "company") }}
          </td>

          <td>
            {{ findById(inventoryStore.products, item.productId, "name") }}
          </td>

          <td>{{ item.quantity }}</td>
        </tr>

        <tr v-if="recentOutbounds.length === 0">
          <td colspan="4" class="empty">최근 출고 내역이 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </DashboardPanel>
</template>

<script setup>
import { computed } from "vue";

import DashboardPanel from "@/components/dashboard/DashboardPanel.vue";

import { useOutboundStore } from "@/stores/outbound";
import { useCustomerStore } from "@/stores/customer";
import { useInventoryStore } from "@/stores/inventory";

import { findById } from "@/utils/lookup";

const outboundStore = useOutboundStore();
const customerStore = useCustomerStore();
const inventoryStore = useInventoryStore();

const recentOutbounds = computed(() =>
  [...outboundStore.outbounds].sort((a, b) => b.id - a.id).slice(0, 5),
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
  font-weight: var(--font-semibold);

  color: var(--text-secondary);
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
