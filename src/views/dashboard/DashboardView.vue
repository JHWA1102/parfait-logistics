<template>
  <div class="dashboard">
    <!-- 통계 -->
    <div class="dashboard__stats">
      <DashboardStatCard
        label="총 품목"
        :value="inventoryStore.totalProducts"
        description="등록된 품목"
      >
        <template #icon>
          <Package :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="총 창고"
        :value="warehouseStore.totalWarehouses"
        description="운영 중"
      >
        <template #icon>
          <Warehouse :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="거래처"
        :value="customerStore.totalCustomers"
        description="공급업체 + 고객사"
      >
        <template #icon>
          <Building2 :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="재고 부족"
        :value="inventoryStore.lowStockCount"
        description="20개 이하"
      >
        <template #icon>
          <TriangleAlert :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard label="입고" :value="inboundStore.totalInbounds" description="누적 입고">
        <template #icon>
          <PackagePlus :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard label="출고" :value="outboundStore.totalOutbounds" description="누적 출고">
        <template #icon>
          <PackageMinus :size="26" />
        </template>
      </DashboardStatCard>
    </div>

    <DashboardChart />

    <!-- 최근 -->
    <div class="dashboard__grid">
      <DashboardRecentInbound />

      <DashboardRecentOutbound />
    </div>

    <!-- 재고부족 -->
    <DashboardLowStock />
  </div>
</template>

<script setup>
import {
  Package,
  Warehouse,
  Building2,
  TriangleAlert,
  PackagePlus,
  PackageMinus,
} from "lucide-vue-next";

import DashboardStatCard from "@/components/dashboard/DashboardStatCard.vue";
import DashboardRecentInbound from "@/components/dashboard/DashboardRecentInbound.vue";
import DashboardRecentOutbound from "@/components/dashboard/DashboardRecentOutbound.vue";
import DashboardLowStock from "@/components/dashboard/DashboardLowStock.vue";
import DashboardChart from "@/components/dashboard/DashboardChart.vue";

import { useInventoryStore } from "@/stores/inventory";
import { useWarehouseStore } from "@/stores/warehouse";
import { useCustomerStore } from "@/stores/customer";
import { useInboundStore } from "@/stores/inbound";
import { useOutboundStore } from "@/stores/outbound";

const inventoryStore = useInventoryStore();
const warehouseStore = useWarehouseStore();
const customerStore = useCustomerStore();
const inboundStore = useInboundStore();
const outboundStore = useOutboundStore();
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 32px;
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.dashboard__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 1200px) {
  .dashboard__stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard__stats {
    grid-template-columns: 1fr;
  }
}
</style>
