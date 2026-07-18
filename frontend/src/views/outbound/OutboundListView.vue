<template>
  <div class="page">
    <!-- Header -->
    <PageHeader
      title="출고 관리"
      description="출고 내역을 관리합니다."
      button-text="+ 출고 등록"
      @create="openCreate"
    />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="출고번호 또는 품목명을 검색하세요." />

    <!-- Table -->
    <OutboundTable :outbounds="filteredOutbounds" @edit="editOutbound" @delete="openDelete" />

    <!-- 등록 / 수정 -->
    <OutboundCreateModal v-model="openCreateModal" :outbound="selectedOutbound" />

    <!-- 삭제 -->
    <OutboundDeleteModal
      v-model="openDeleteModal"
      :outbound="deleteTarget"
      @delete="deleteOutbound"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { useOutboundStore } from "@/stores/outbound";
import { useInventoryStore } from "@/stores/inventory";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import OutboundTable from "@/components/outbound/OutboundTable.vue";
import OutboundCreateModal from "@/components/outbound/OutboundCreateModal.vue";
import OutboundDeleteModal from "@/components/outbound/OutboundDeleteModal.vue";

import { findById } from "@/utils/lookup";

const outboundStore = useOutboundStore();
const inventoryStore = useInventoryStore();

const keyword = ref("");

const openCreateModal = ref(false);
const openDeleteModal = ref(false);

const selectedOutbound = ref(null);
const deleteTarget = ref(null);

/* 검색 */

const filteredOutbounds = computed(() => {
  const search = keyword.value.trim().toLowerCase();

  return outboundStore.outbounds.filter((outbound) => {
    const productName = findById(inventoryStore.products, outbound.productId, "name");

    return (
      outbound.outboundNo.toLowerCase().includes(search) ||
      productName.toLowerCase().includes(search)
    );
  });
});

/* 등록 */

function openCreate() {
  selectedOutbound.value = null;
  openCreateModal.value = true;
}

/* 수정 */

function editOutbound(outbound) {
  selectedOutbound.value = {
    ...outbound,
  };

  openCreateModal.value = true;
}

/* 삭제 */

function openDelete(outbound) {
  deleteTarget.value = outbound;
  openDeleteModal.value = true;
}

function deleteOutbound() {
  if (!deleteTarget.value) return;

  outboundStore.removeOutbound(deleteTarget.value.id);

  deleteTarget.value = null;
  openDeleteModal.value = false;
}

watch(openCreateModal, (isOpen) => {
  if (!isOpen) {
    selectedOutbound.value = null;
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
