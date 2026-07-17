<template>
  <div class="page">
    <!-- Header -->
    <PageHeader title="창고별 재고" description="창고별 품목 재고를 조회합니다." />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="창고명 또는 품목명을 검색하세요." />

    <!-- Table -->
    <InventoryStockTable :stocks="filteredStocks" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import InventoryStockTable from "@/components/inventory/InventoryStockTable.vue";

import { useInventoryStockStore } from "@/stores/inventoryStock";
import { useInventoryStore } from "@/stores/inventory";
import { useWarehouseStore } from "@/stores/warehouse";

import { findById } from "@/utils/lookup";

const inventoryStockStore = useInventoryStockStore();
const inventoryStore = useInventoryStore();
const warehouseStore = useWarehouseStore();

const keyword = ref("");

const filteredStocks = computed(() => {
  const search = keyword.value.trim().toLowerCase();

  if (!search) {
    return inventoryStockStore.stocks;
  }

  return inventoryStockStore.stocks.filter((stock) => {
    const productName = findById(inventoryStore.products, stock.productId, "name").toLowerCase();

    const warehouseName = findById(
      warehouseStore.warehouses,
      stock.warehouseId,
      "name",
    ).toLowerCase();

    return productName.includes(search) || warehouseName.includes(search);
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
