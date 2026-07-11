<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>입고번호</th>
        <th>입고일</th>
        <th>공급업체</th>
        <th>창고</th>
        <th>품목</th>
        <th>수량</th>
        <th>상태</th>
        <th width="170">관리</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="inbound in inbounds" :key="inbound.id">
        <td>{{ inbound.inboundNo }}</td>

        <td>{{ inbound.date }}</td>

        <td>
          {{ findById(customerStore.customers, inbound.supplierId, "company") }}
        </td>

        <td>
          {{ findById(warehouseStore.warehouses, inbound.warehouseId, "name") }}
        </td>

        <td>
          {{ findById(inventoryStore.products, inbound.productId, "name") }}
        </td>

        <td>{{ inbound.quantity }}</td>

        <td>
          <BaseBadge :variant="getStatusVariant(inbound.status)">
            {{ inbound.status }}
          </BaseBadge>
        </td>

        <td>
          <div class="table-actions">
            <BaseButton size="sm" variant="secondary" @click="$emit('edit', inbound)">
              수정
            </BaseButton>

            <BaseButton size="sm" variant="danger" @click="$emit('delete', inbound)">
              삭제
            </BaseButton>
          </div>
        </td>
      </tr>
    </template>

    <template v-if="inbounds.length === 0" #empty> 등록된 입고 내역이 없습니다. </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from "@/components/common/BaseTable.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseBadge from "@/components/common/BaseBadge.vue";

import { useCustomerStore } from "@/stores/customer";
import { useWarehouseStore } from "@/stores/warehouse";
import { useInventoryStore } from "@/stores/inventory";

import { findById } from "@/utils/lookup";

const customerStore = useCustomerStore();
const warehouseStore = useWarehouseStore();
const inventoryStore = useInventoryStore();

defineProps({
  inbounds: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete"]);

function getStatusVariant(status) {
  switch (status) {
    case "완료":
      return "success";

    case "대기":
      return "warning";

    case "취소":
      return "danger";

    default:
      return "secondary";
  }
}
</script>

<style scoped>
.table-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
