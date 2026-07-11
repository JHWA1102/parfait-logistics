import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import DashboardView from "@/views/dashboard/DashboardView.vue";
import InventoryListView from "@/views/inventory/InventoryListView.vue";
import CustomerListView from "@/views/customer/CustomerListView.vue";
import WarehouseListView from "@/views/warehouse/WarehouseListView.vue";
import InboundListView from "@/views/inbound/InboundListView.vue";
import OutboundListView from "@/views/outbound/OutboundListView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "inventory", // ✅ children에서는 / 없이 사용
          name: "inventory",
          component: InventoryListView,
        },
        {
          path: "customer",
          name: "customer",
          component: CustomerListView,
        },
        {
          path: "warehouse",
          name: "warehouse",
          component: WarehouseListView,
        },
        {
          path: "/inbound",
          name: "inbound",
          component: InboundListView,
        },
        {
          path: "/outbound",
          name: "outbound",
          component: OutboundListView,
        },
      ],
    },
  ],
});

export default router;
