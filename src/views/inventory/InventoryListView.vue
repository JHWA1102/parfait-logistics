<template>
  <div class="page">
    <!-- Header -->
    <PageHeader
      title="품목 관리"
      description="등록된 품목을 관리합니다."
      button-text="+ 품목 등록"
      @create="openCreate"
    />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="품목명 또는 품목코드를 검색하세요." />

    <!-- Table -->
    <InventoryTable :products="filteredProducts" @edit="editProduct" @delete="openDelete" />

    <!-- 등록 / 수정 -->
    <InventoryCreateModal v-model="openCreateModal" :product="selectedProduct" />

    <!-- 삭제 -->
    <InventoryDeleteModal
      v-model="openDeleteModal"
      :product="deleteTarget"
      @delete="deleteProduct"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { useInventoryStore } from "@/stores/inventory";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import InventoryTable from "@/components/inventory/InventoryTable.vue";
import InventoryCreateModal from "@/components/inventory/InventoryCreateModal.vue";
import InventoryDeleteModal from "@/components/inventory/InventoryDeleteModal.vue";

const inventoryStore = useInventoryStore();

const keyword = ref("");

const openCreateModal = ref(false);
const openDeleteModal = ref(false);

const selectedProduct = ref(null);
const deleteTarget = ref(null);

const filteredProducts = computed(() => {
  const search = keyword.value.toLowerCase();

  return inventoryStore.products.filter((product) => {
    return (
      product.code.toLowerCase().includes(search) ||
      product.name.toLowerCase().includes(search) ||
      product.unit.toLowerCase().includes(search)
    );
  });
});

function openCreate() {
  selectedProduct.value = null;
  openCreateModal.value = true;
}

function editProduct(product) {
  selectedProduct.value = { ...product };
  openCreateModal.value = true;
}

function openDelete(product) {
  deleteTarget.value = product;
  openDeleteModal.value = true;
}

function deleteProduct() {
  if (!deleteTarget.value) return;

  inventoryStore.removeProduct(deleteTarget.value.id);

  deleteTarget.value = null;
  openDeleteModal.value = false;
}

watch(openCreateModal, (isOpen) => {
  if (!isOpen) {
    selectedProduct.value = null;
  }
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 32px;

  background: #f8fafc;

  min-height: 100%;
}
</style>
