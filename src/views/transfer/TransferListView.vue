<template>
  <div class="transfer-page">
    <PageHeader title="재고 이동" description="창고 간 재고를 이동합니다.">
      <template #actions>
        <BaseButton @click="showCreateModal = true"> 재고 이동 등록 </BaseButton>
      </template>
    </PageHeader>

    <TransferTable :transfers="transferStore.transfers" @delete="openDeleteModal" />

    <TransferCreateModal v-model="showCreateModal" />

    <TransferDeleteModal
      v-model="showDeleteModal"
      :transfer="selectedTransfer"
      @deleted="selectedTransfer = null"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

import PageHeader from "@/components/shared/PageHeader.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import TransferTable from "@/components/transfer/TransferTable.vue";
import TransferCreateModal from "@/components/transfer/TransferCreateModal.vue";
import TransferDeleteModal from "@/components/transfer/TransferDeleteModal.vue";

import { useTransferStore } from "@/stores/transfer";

const transferStore = useTransferStore();

const showCreateModal = ref(false);
const showDeleteModal = ref(false);

const selectedTransfer = ref(null);

function openDeleteModal(transfer) {
  selectedTransfer.value = transfer;
  showDeleteModal.value = true;
}
</script>

<style scoped>
.transfer-page {
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 32px;
}
</style>
