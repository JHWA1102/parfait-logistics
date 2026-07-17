<template>
  <div class="page">
    <!-- Header -->
    <PageHeader
      title="발주 관리"
      description="발주 내역을 관리합니다."
      button-text="+ 발주 등록"
      @create="openCreate"
    />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="발주번호 또는 품목명을 검색하세요." />

    <!-- Table -->
    <PurchaseOrderTable
      :purchase-orders="filteredPurchaseOrders"
      @edit="editPurchaseOrder"
      @delete="openDelete"
      @receive="receivePurchaseOrder"
    />

    <!-- 등록 / 수정 -->
    <PurchaseOrderCreateModal v-model="openCreateModal" :purchase-order="selectedPurchaseOrder" />

    <!-- 삭제 -->
    <PurchaseOrderDeleteModal
      v-model="openDeleteModal"
      :purchase-order="deleteTarget"
      @delete="deletePurchaseOrder"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { usePurchaseOrderStore } from "@/stores/purchaseOrder";
import { useInventoryStore } from "@/stores/inventory";
import { useCustomerStore } from "@/stores/customer";
import { useInboundStore } from "@/stores/inbound";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import PurchaseOrderTable from "@/components/purchaseOrder/PurchaseOrderTable.vue";
import PurchaseOrderCreateModal from "@/components/purchaseOrder/PurchaseOrderCreateModal.vue";
import PurchaseOrderDeleteModal from "@/components/purchaseOrder/PurchaseOrderDeleteModal.vue";

import { findById } from "@/utils/lookup";
import { generateDocumentNo } from "@/utils/numberGenerator";

const purchaseOrderStore = usePurchaseOrderStore();
const inventoryStore = useInventoryStore();
const customerStore = useCustomerStore();
const inboundStore = useInboundStore();

const keyword = ref("");

const openCreateModal = ref(false);
const openDeleteModal = ref(false);

const selectedPurchaseOrder = ref(null);
const deleteTarget = ref(null);

/* 검색 */

const filteredPurchaseOrders = computed(() => {
  const search = keyword.value.trim().toLowerCase();

  return purchaseOrderStore.purchaseOrders.filter((order) => {
    const productName = findById(inventoryStore.products, order.productId, "name");

    return (
      order.orderNo.toLowerCase().includes(search) || productName.toLowerCase().includes(search)
    );
  });
});

/* 등록 */

function openCreate() {
  selectedPurchaseOrder.value = null;
  openCreateModal.value = true;
}

/* 수정 */

function editPurchaseOrder(order) {
  selectedPurchaseOrder.value = { ...order };
  openCreateModal.value = true;
}

/* 삭제 */

function openDelete(order) {
  deleteTarget.value = order;
  openDeleteModal.value = true;
}

function deletePurchaseOrder() {
  if (!deleteTarget.value) return;

  purchaseOrderStore.removePurchaseOrder(deleteTarget.value.id);

  deleteTarget.value = null;
  openDeleteModal.value = false;
}

function receivePurchaseOrder(order) {
  if (order.status === "입고완료") {
    alert("이미 입고 완료된 발주입니다.");
    return;
  }

  inboundStore.addInbound({
    date: new Date().toISOString().slice(0, 10),

    warehouseId: order.warehouseId,

    productId: order.productId,

    quantity: order.quantity,

    memo: `[발주] ${order.orderNo}`,
  });

  purchaseOrderStore.updatePurchaseOrder({
    ...order,
    status: "입고완료",
  });
}

watch(openCreateModal, (isOpen) => {
  if (!isOpen) {
    selectedPurchaseOrder.value = null;
  }
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 32px;

  background: var(--bg-page);

  min-height: 100%;
}
</style>
