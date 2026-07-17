<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>조정번호</th>
        <th>조정일</th>
        <th>창고</th>
        <th>품목</th>
        <th>조정전</th>
        <th>조정후</th>
        <th>조정수량</th>
        <th>사유</th>
        <th width="170">관리</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="adjustment in adjustments" :key="adjustment.id">
        <td>{{ adjustment.adjustmentNo }}</td>

        <td>{{ adjustment.date }}</td>

        <td>
          {{ findById(warehouseStore.warehouses, adjustment.warehouseId, "name") }}
        </td>

        <td>
          {{ findById(inventoryStore.products, adjustment.productId, "name") }}
        </td>

        <td>{{ adjustment.beforeStock }}</td>

        <td>{{ adjustment.afterStock }}</td>

        <td>
          <span
            :class="[
              'quantity',
              adjustment.quantity > 0
                ? 'quantity--plus'
                : adjustment.quantity < 0
                  ? 'quantity--minus'
                  : '',
            ]"
          >
            {{ adjustment.quantity > 0 ? "+" : "" }}{{ adjustment.quantity }}
          </span>
        </td>

        <td>{{ adjustment.reason }}</td>

        <td>
          <div class="table-actions">
            <BaseButton size="sm" variant="secondary" @click="$emit('edit', adjustment)">
              수정
            </BaseButton>

            <BaseButton size="sm" variant="danger" @click="$emit('delete', adjustment)">
              삭제
            </BaseButton>
          </div>
        </td>
      </tr>
    </template>

    <template v-if="adjustments.length === 0" #empty> 등록된 재고조정 내역이 없습니다. </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from "@/components/common/BaseTable.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { useInventoryStore } from "@/stores/inventory";
import { useWarehouseStore } from "@/stores/warehouse";

import { findById } from "@/utils/lookup";

const inventoryStore = useInventoryStore();
const warehouseStore = useWarehouseStore();

defineProps({
  adjustments: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete"]);
</script>

<style scoped>
.table-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.quantity {
  font-weight: 600;
}

.quantity--plus {
  color: var(--color-success);
}

.quantity--minus {
  color: var(--color-danger);
}
</style>
