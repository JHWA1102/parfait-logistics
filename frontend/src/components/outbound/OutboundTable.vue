<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>출고번호</th>
        <th>출고일</th>
        <th>고객사</th>
        <th>창고</th>
        <th>품목</th>
        <th>수량</th>
        <th>상태</th>
        <th width="170">관리</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="outbound in outbounds" :key="outbound.id">
        <td>{{ outbound.outboundNo }}</td>

        <td>{{ outbound.date }}</td>

        <td>
          {{ findById(customerStore.customers, outbound.customerId, "company") }}
        </td>

        <td>
          {{ findById(warehouseStore.warehouses, outbound.warehouseId, "name") }}
        </td>

        <td>
          {{ findById(inventoryStore.products, outbound.productId, "name") }}
        </td>

        <td>{{ outbound.quantity }}</td>

        <td>
          <BaseBadge :variant="getStatusVariant(outbound.status)">
            {{ outbound.status }}
          </BaseBadge>
        </td>

        <td>
          <div class="table-actions">
            <BaseButton size="sm" variant="secondary" @click="$emit('edit', outbound)">
              수정
            </BaseButton>

            <BaseButton size="sm" variant="danger" @click="$emit('delete', outbound)">
              삭제
            </BaseButton>
          </div>
        </td>
      </tr>
    </template>

    <template v-if="outbounds.length === 0" #empty> 등록된 출고 내역이 없습니다. </template>
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
  outbounds: {
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
