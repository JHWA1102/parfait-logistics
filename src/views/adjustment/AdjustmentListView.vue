<template>
  <div class="page">
    <!-- Header -->
    <PageHeader
      title="재고조정"
      description="재고를 조정하고 이력을 관리합니다."
      button-text="+ 재고조정"
      @create="openCreate"
    />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="조정번호 또는 품목명을 검색하세요." />

    <!-- Table -->
    <AdjustmentTable
      :adjustments="filteredAdjustments"
      @edit="editAdjustment"
      @delete="openDelete"
    />

    <!-- 등록 / 수정 -->
    <AdjustmentCreateModal v-model="openCreateModal" :adjustment="selectedAdjustment" />

    <!-- 삭제 -->
    <AdjustmentDeleteModal
      v-model="openDeleteModal"
      :adjustment="deleteTarget"
      @delete="deleteAdjustment"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { useAdjustmentStore } from "@/stores/adjustment";
import { useInventoryStore } from "@/stores/inventory";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import AdjustmentTable from "@/components/adjustment/AdjustmentTable.vue";
import AdjustmentCreateModal from "@/components/adjustment/AdjustmentCreateModal.vue";
import AdjustmentDeleteModal from "@/components/adjustment/AdjustmentDeleteModal.vue";

import { findById } from "@/utils/lookup";

const adjustmentStore = useAdjustmentStore();
const inventoryStore = useInventoryStore();

const keyword = ref("");

const openCreateModal = ref(false);
const openDeleteModal = ref(false);

const selectedAdjustment = ref(null);
const deleteTarget = ref(null);

/* 검색 */

const filteredAdjustments = computed(() => {
  const search = keyword.value.trim().toLowerCase();

  return adjustmentStore.adjustments.filter((adjustment) => {
    const productName = findById(inventoryStore.products, adjustment.productId, "name");

    return (
      adjustment.adjustmentNo.toLowerCase().includes(search) ||
      productName.toLowerCase().includes(search)
    );
  });
});

/* 등록 */

function openCreate() {
  selectedAdjustment.value = null;
  openCreateModal.value = true;
}

/* 수정 */

function editAdjustment(adjustment) {
  selectedAdjustment.value = {
    ...adjustment,
  };

  openCreateModal.value = true;
}

/* 삭제 */

function openDelete(adjustment) {
  deleteTarget.value = adjustment;
  openDeleteModal.value = true;
}

function deleteAdjustment() {
  if (!deleteTarget.value) return;

  adjustmentStore.removeAdjustment(deleteTarget.value.id);

  deleteTarget.value = null;
  openDeleteModal.value = false;
}

/* 모달 종료 */

watch(openCreateModal, (isOpen) => {
  if (!isOpen) {
    selectedAdjustment.value = null;
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
