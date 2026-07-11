<template>
  <div class="page">
    <!-- Header -->
    <PageHeader
      title="입고 관리"
      description="입고 내역을 관리합니다."
      button-text="+ 입고 등록"
      @create="openCreate"
    />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="입고번호 또는 품목명을 검색하세요." />

    <!-- Table -->
    <InboundTable :inbounds="filteredInbounds" @edit="editInbound" @delete="openDelete" />

    <!-- 등록 / 수정 -->
    <InboundCreateModal v-model="openCreateModal" :inbound="selectedInbound" />

    <!-- 삭제 -->
    <InboundDeleteModal v-model="openDeleteModal" :inbound="deleteTarget" @delete="deleteInbound" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { useInboundStore } from "@/stores/inbound";
import { useInventoryStore } from "@/stores/inventory";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import InboundTable from "@/components/inbound/InboundTable.vue";
import InboundCreateModal from "@/components/inbound/InboundCreateModal.vue";
import InboundDeleteModal from "@/components/inbound/InboundDeleteModal.vue";

import { findById } from "@/utils/lookup";

const inboundStore = useInboundStore();
const inventoryStore = useInventoryStore();

const keyword = ref("");

const openCreateModal = ref(false);
const openDeleteModal = ref(false);

const selectedInbound = ref(null);
const deleteTarget = ref(null);

/* 검색 */

const filteredInbounds = computed(() => {
  const search = keyword.value.trim().toLowerCase();

  return inboundStore.inbounds.filter((inbound) => {
    const productName = findById(inventoryStore.products, inbound.productId, "name");

    return (
      inbound.inboundNo.toLowerCase().includes(search) || productName.toLowerCase().includes(search)
    );
  });
});

/* 등록 */

function openCreate() {
  selectedInbound.value = null;
  openCreateModal.value = true;
}

/* 수정 */

function editInbound(inbound) {
  selectedInbound.value = { ...inbound };
  openCreateModal.value = true;
}

/* 삭제 */

function openDelete(inbound) {
  deleteTarget.value = inbound;
  openDeleteModal.value = true;
}

function deleteInbound() {
  if (!deleteTarget.value) return;

  inboundStore.removeInbound(deleteTarget.value.id);

  deleteTarget.value = null;
  openDeleteModal.value = false;
}

watch(openCreateModal, (isOpen) => {
  if (!isOpen) {
    selectedInbound.value = null;
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
