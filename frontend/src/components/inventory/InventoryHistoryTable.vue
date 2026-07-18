<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>구분</th>
        <th>문서번호</th>
        <th>품목</th>
        <th>창고</th>
        <th>수량</th>
        <th>변경전</th>
        <th>변경후</th>
        <th>일자</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="history in histories" :key="history.id">
        <td>
          <BaseBadge :variant="getTypeVariant(history.type)">
            {{ history.type }}
          </BaseBadge>
        </td>

        <td>{{ history.documentNo }}</td>

        <td>
          {{ findById(inventoryStore.products, history.productId, "name") }}
        </td>

        <td>
          {{ findById(warehouseStore.warehouses, history.warehouseId, "name") }}
        </td>

        <td :class="quantityClass(history.type)">
          {{ quantityText(history) }}
        </td>

        <td>{{ history.beforeStock }}</td>

        <td>{{ history.afterStock }}</td>

        <td>{{ history.date }}</td>
      </tr>
    </template>

    <template v-if="histories.length === 0" #empty> 재고 이력이 없습니다. </template>
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
  histories: {
    type: Array,
    default: () => [],
  },
});

function getTypeVariant(type) {
  switch (type) {
    case "입고":
      return "success";

    case "출고":
      return "danger";

    case "조정":
      return "warning";

    default:
      return "secondary";
  }
}

function quantityText(history) {
  if (history.type === "출고") {
    return `-${history.quantity}`;
  }

  return `+${history.quantity}`;
}

function quantityClass(type) {
  switch (type) {
    case "입고":
      return "qty-plus";

    case "출고":
      return "qty-minus";

    case "조정":
      return "qty-adjust";

    default:
      return "";
  }
}
</script>

<style scoped>
td,
th {
  text-align: center;
}

.qty-plus {
  color: #16a34a;
  font-weight: 700;
}

.qty-minus {
  color: #dc2626;
  font-weight: 700;
}

.qty-adjust {
  color: #d97706;
  font-weight: 700;
}
</style>
