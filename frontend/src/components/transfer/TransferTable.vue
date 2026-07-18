<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>이동번호</th>
        <th>이동일</th>
        <th>출발창고</th>
        <th>도착창고</th>
        <th>품목</th>
        <th>수량</th>
        <th>메모</th>
        <th>관리</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="transfer in transfers" :key="transfer.id">
        <td>{{ transfer.transferNo }}</td>

        <td>{{ transfer.date }}</td>

        <td>
          {{ findById(warehouseStore.warehouses, transfer.fromWarehouseId, "name") }}
        </td>

        <td>
          {{ findById(warehouseStore.warehouses, transfer.toWarehouseId, "name") }}
        </td>

        <td>
          {{ findById(inventoryStore.products, transfer.productId, "name") }}
        </td>

        <td>{{ transfer.quantity }}</td>

        <td>{{ transfer.memo || "-" }}</td>

        <td>
          <BaseButton variant="danger" size="sm" @click="$emit('delete', transfer)">
            삭제
          </BaseButton>
        </td>
      </tr>
    </template>

    <template v-if="transfers.length === 0" #empty> 등록된 재고 이동이 없습니다. </template>
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
  transfers: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["delete"]);
</script>

<style scoped>
td,
th {
  text-align: center;
}
</style>
