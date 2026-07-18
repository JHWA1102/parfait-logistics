<template>
  <div class="page">
    <!-- Header -->
    <PageHeader title="재고 이력" description="입고 및 출고로 변경된 재고 이력을 조회합니다." />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="문서번호 또는 품목명을 검색하세요." />

    <!-- Table -->
    <InventoryHistoryTable :histories="filteredHistories" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import InventoryHistoryTable from "@/components/inventory/InventoryHistoryTable.vue";

import { useInventoryHistoryStore } from "@/stores/inventoryHistory";
import { useInventoryStore } from "@/stores/inventory";

import { findById } from "@/utils/lookup";

const historyStore = useInventoryHistoryStore();
const inventoryStore = useInventoryStore();

const keyword = ref("");

const filteredHistories = computed(() => {
  const search = keyword.value.trim().toLowerCase();

  if (!search) {
    return historyStore.histories;
  }

  return historyStore.histories.filter((history) => {
    const productName = findById(inventoryStore.products, history.productId, "name");

    return (
      history.documentNo.toLowerCase().includes(search) ||
      productName.toLowerCase().includes(search)
    );
  });
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
