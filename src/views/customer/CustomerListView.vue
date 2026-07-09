<template>
  <div class="page">
    <!-- Header -->
    <PageHeader
      title="거래처 관리"
      description="등록된 거래처를 관리합니다."
      button-text="+ 거래처 등록"
      @create="openCreate"
    />

    <!-- Search -->
    <PageSearch v-model="keyword" placeholder="회사명 또는 거래처 코드를 검색하세요." />

    <!-- Table -->
    <CustomerTable :customers="filteredCustomers" @edit="editCustomer" @delete="openDelete" />

    <!-- 등록 / 수정 -->
    <CustomerCreateModal v-model="openCreateModal" :customer="selectedCustomer" />

    <!-- 삭제 -->
    <CustomerDeleteModal
      v-model="openDeleteModal"
      :customer="deleteTarget"
      @delete="deleteCustomer"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { useCustomerStore } from "@/stores/customer";

import PageHeader from "@/components/shared/PageHeader.vue";
import PageSearch from "@/components/shared/PageSearch.vue";

import CustomerTable from "@/components/customer/CustomerTable.vue";
import CustomerCreateModal from "@/components/customer/CustomerCreateModal.vue";
import CustomerDeleteModal from "@/components/customer/CustomerDeleteModal.vue";

const customerStore = useCustomerStore();

const keyword = ref("");

const openCreateModal = ref(false);
const openDeleteModal = ref(false);

const selectedCustomer = ref(null);
const deleteTarget = ref(null);

const filteredCustomers = computed(() => {
  const search = keyword.value.toLowerCase();

  return customerStore.customers.filter((customer) => {
    return (
      (customer.code ?? "").toLowerCase().includes(search) ||
      (customer.company ?? "").toLowerCase().includes(search) ||
      (customer.manager ?? "").toLowerCase().includes(search)
    );
  });
});

function openCreate() {
  selectedCustomer.value = null;
  openCreateModal.value = true;
}

function editCustomer(customer) {
  console.log("editCustomer", customer);

  selectedCustomer.value = { ...customer };
  openCreateModal.value = true;
}

function openDelete(customer) {
  deleteTarget.value = customer;
  openDeleteModal.value = true;
}

function deleteCustomer() {
  if (!deleteTarget.value) return;

  customerStore.removeCustomer(deleteTarget.value.id);

  deleteTarget.value = null;
  openDeleteModal.value = false;
}

watch(openCreateModal, (isOpen) => {
  if (!isOpen) {
    selectedCustomer.value = null;
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
