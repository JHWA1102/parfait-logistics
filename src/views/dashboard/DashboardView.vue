<script setup>
import BaseCard from '@/components/common/BaseCard.vue'
import {
  Package,
  Truck,
  PackageCheck,
  Building2
} from 'lucide-vue-next'
import { useInventoryStore } from '@/stores/inventory'

const inventoryStore = useInventoryStore()
</script>

<template>
  <div class="dashboard__cards">
    <BaseCard
      title="총 품목"
      :value="inventoryStore.products.length"
    >
      <template #icon>
        <Package :size="22" />
      </template>
    </BaseCard>
  </div>
</template>