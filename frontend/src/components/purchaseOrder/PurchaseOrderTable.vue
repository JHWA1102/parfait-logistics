<template>
  <BaseTable>
    <thead>
      <tr>
        <th>발주번호</th>
        <th>공급업체</th>
        <th>발주일</th>
        <th>납기일</th>
        <th>품목수</th>
        <th>상태</th>
        <th>삭제</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="order in purchaseOrders" :key="order.orderNo">
        <td>{{ order.orderNo }}</td>

        <td>
          {{ getCustomerName(order.supplierId) }}
        </td>

        <td>{{ order.orderDate }}</td>

        <td>{{ order.dueDate }}</td>

        <td>{{ order.items.length }}건</td>

        <td>
          <BaseBadge :variant="statusVariant(order.status)">
            {{ order.status }}
          </BaseBadge>
        </td>

        <td>
          <BaseButton
            size="sm"
            :disabled="purchaseOrder.status === '입고완료'"
            @click="$emit('receive', purchaseOrder)"
          >
            입고등록
          </BaseButton>
          <BaseButton variant="danger" size="sm" @click="$emit('delete', order)"> 삭제 </BaseButton>
        </td>
      </tr>

      <tr v-if="purchaseOrders.length === 0">
        <td colspan="7" class="text-center py-8 text-gray-400">등록된 발주가 없습니다.</td>
      </tr>
    </tbody>
  </BaseTable>
</template>

<script setup>
import BaseTable from "@/components/common/BaseTable.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseBadge from "@/components/common/BaseBadge.vue";

import { useCustomerStore } from "@/stores/customer";

defineProps({
  purchaseOrders: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["edit", "delete", "receive"]);

const customerStore = useCustomerStore();

function getCustomerName(id) {
  return customerStore.findCustomer(id)?.name ?? "-";
}

function statusVariant(status) {
  switch (status) {
    case "발주중":
      return "warning";

    case "부분입고":
      return "primary";

    case "입고완료":
      return "success";

    default:
      return "secondary";
  }
}
</script>
