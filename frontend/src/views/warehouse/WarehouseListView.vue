<template>
  <div class="page">
    <!-- Header -->
    <PageHeader
      title="창고 관리"
      description="등록된 창고를 관리합니다."
      button-text="+ 창고 등록"
      @create="openCreate"
    />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="창고명 또는 창고코드를 검색하세요." />

    <!-- Table -->
    <WarehouseTable :warehouses="filteredWarehouses" @edit="editWarehouse" @delete="openDelete" />

    <!-- 등록 / 수정 -->
    <WarehouseCreateModal v-model="openCreateModal" :warehouse="selectedWarehouse" />

    <!-- 삭제 -->
    <WarehouseDeleteModal
      v-model="openDeleteModal"
      :warehouse="deleteTarget"
      @delete="deleteWarehouse"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { useWarehouseStore } from "@/stores/warehouse";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import WarehouseTable from "@/components/warehouse/WarehouseTable.vue";
import WarehouseCreateModal from "@/components/warehouse/WarehouseCreateModal.vue";
import WarehouseDeleteModal from "@/components/warehouse/WarehouseDeleteModal.vue";

const warehouseStore = useWarehouseStore();

const keyword = ref("");

const openCreateModal = ref(false);
const openDeleteModal = ref(false);

const selectedWarehouse = ref(null);
const deleteTarget = ref(null);

const filteredWarehouses = computed(() => {
  const search = keyword.value.trim().toLowerCase();

  return warehouseStore.warehouses.filter((warehouse) => {
    return (
      warehouse.code.toLowerCase().includes(search) || warehouse.name.toLowerCase().includes(search)
    );
  });
});

function openCreate() {
  selectedWarehouse.value = null;
  openCreateModal.value = true;
}

function editWarehouse(warehouse) {
  selectedWarehouse.value = { ...warehouse };
  openCreateModal.value = true;
}

function openDelete(warehouse) {
  deleteTarget.value = warehouse;
  openDeleteModal.value = true;
}

function deleteWarehouse() {
  if (!deleteTarget.value) return;

  warehouseStore.removeWarehouse(deleteTarget.value.id);

  deleteTarget.value = null;
  openDeleteModal.value = false;
}

watch(openCreateModal, (isOpen) => {
  if (!isOpen) {
    selectedWarehouse.value = null;
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
