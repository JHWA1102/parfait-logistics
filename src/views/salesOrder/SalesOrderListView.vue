<template>
  <div class="space-y-6">
    <PageHeader title="주문관리" description="고객 주문을 등록하고 관리합니다.">
      <template #actions>
        <BaseButton @click="showCreateModal = true"> 주문 등록 </BaseButton>
      </template>
    </PageHeader>

    <PageSearch>
      <BaseInput v-model="keyword" placeholder="주문번호, 거래처 검색" />
    </PageSearch>

    <SalesOrderTable
      :sales-orders="filteredSalesOrders"
      @delete="openDeleteModal"
      @release="releaseSalesOrder"
    />

    <SalesOrderCreateModal v-model="showCreateModal" />

    <SalesOrderDeleteModal v-model="showDeleteModal" :sales-order="selectedSalesOrder" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import BaseButton from "@/components/common/BaseButton.vue";
import BaseInput from "@/components/common/BaseInput.vue";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import SalesOrderTable from "@/components/salesOrder/SalesOrderTable.vue";
import SalesOrderCreateModal from "@/components/salesOrder/SalesOrderCreateModal.vue";
import SalesOrderDeleteModal from "@/components/salesOrder/SalesOrderDeleteModal.vue";

import { useSalesOrderStore } from "@/stores/salesOrder";
import { useCustomerStore } from "@/stores/customer";
import { useOutboundStore } from "@/stores/outbound";
import { useInventoryStockStore } from "@/stores/inventoryStock";
import { useInventoryHistoryStore } from "@/stores/inventoryHistory";

const salesOrderStore = useSalesOrderStore();
const customerStore = useCustomerStore();
const outboundStore = useOutboundStore();
const inventoryStockStore = useInventoryStockStore();
const inventoryHistoryStore = useInventoryHistoryStore();

const keyword = ref("");

const showCreateModal = ref(false);
const showDeleteModal = ref(false);

const selectedSalesOrder = ref(null);

const filteredSalesOrders = computed(() => {
  return salesOrderStore.salesOrders.filter((order) => {
    const customer = customerStore.customers.find((item) => item.id === order.customerId);

    return order.orderNo.includes(keyword.value) || customer?.name?.includes(keyword.value);
  });
});

function openDeleteModal(order) {
  selectedSalesOrder.value = order;
  showDeleteModal.value = true;
}

function releaseSalesOrder(order) {
  if (order.status === "출고완료") {
    return;
  }

  const beforeStock = inventoryStockStore.getStock(order.warehouseId, order.productId);

  if (beforeStock < order.quantity) {
    alert("재고가 부족합니다.");
    return;
  }

  // 출고 등록
  outboundStore.addOutbound({
    warehouseId: order.warehouseId,
    productId: order.productId,
    quantity: order.quantity,
    date: new Date().toISOString().slice(0, 10),
    memo: `[주문] ${order.orderNo}`,
  });

  const afterStock = inventoryStockStore.getStock(order.warehouseId, order.productId);

  // 재고이력
  inventoryHistoryStore.addHistory({
    type: "출고",
    documentNo: order.orderNo,

    warehouseId: order.warehouseId,
    productId: order.productId,

    quantity: order.quantity,

    beforeStock,
    afterStock,
  });

  // 주문상태 변경
  salesOrderStore.updateSalesOrder({
    ...order,
    status: "출고완료",
  });
}
</script>
