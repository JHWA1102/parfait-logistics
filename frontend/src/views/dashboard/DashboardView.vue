<template>
  <div class="dashboard">
    <!-- KPI -->
    <div class="dashboard__stats">
      <DashboardStatCard
        label="총 품목"
        :value="inventoryStore.totalProducts"
        unit="개"
        description="등록된 품목"
        to="/inventory"
      >
        <template #icon>
          <Package :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="총 창고"
        :value="warehouseStore.totalWarehouses"
        unit="개"
        description="운영 중"
        to="/warehouse"
      >
        <template #icon>
          <Warehouse :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="거래처"
        :value="customerStore.totalCustomers"
        unit="개"
        description="공급업체 + 고객사"
        to="/customer"
      >
        <template #icon>
          <Building2 :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="재고 부족"
        :value="inventoryStockStore.lowStockCount"
        unit="건"
        description="안전재고 이하"
        to="/inventory"
      >
        <template #icon>
          <TriangleAlert :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="입고"
        :value="inboundStore.totalInbounds"
        unit="건"
        description="누적 입고"
        to="/inbound"
      >
        <template #icon>
          <PackagePlus :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="출고"
        :value="outboundStore.totalOutbounds"
        unit="건"
        description="누적 출고"
        to="/outbound"
      >
        <template #icon>
          <PackageMinus :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="발주"
        :value="purchaseOrderStore.totalPurchaseOrders"
        unit="건"
        description="누적 발주"
        to="/purchase-order"
      >
        <template #icon>
          <ClipboardList :size="26" />
        </template>
      </DashboardStatCard>

      <DashboardStatCard
        label="주문"
        :value="salesOrderStore.totalSalesOrders"
        unit="건"
        description="누적 주문"
        to="/sales-order"
      >
        <template #icon>
          <ShoppingCart :size="26" />
        </template>
      </DashboardStatCard>
    </div>

    <!-- 최근 -->
    <div class="dashboard__grid">
      <DashboardRecentInbound />
      <DashboardRecentOutbound />
    </div>

    <!-- 차트 -->
    <DashboardChart />

    <!-- 재고 부족 -->
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
  ClipboardList,
  ShoppingCart,
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
import { useInventoryStockStore } from "@/stores/inventoryStock";
import { usePurchaseOrderStore } from "@/stores/purchaseOrder";
import { useSalesOrderStore } from "@/stores/salesOrder";

const inventoryStore = useInventoryStore();
const warehouseStore = useWarehouseStore();
const customerStore = useCustomerStore();
const inboundStore = useInboundStore();
const outboundStore = useOutboundStore();
const inventoryStockStore = useInventoryStockStore();
const purchaseOrderStore = usePurchaseOrderStore();
const salesOrderStore = useSalesOrderStore();
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
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 20px;
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 1400px) {
  .dashboard__stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .dashboard__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 20px;
  }

  .dashboard__stats {
    grid-template-columns: 1fr;
  }
}
</style>
